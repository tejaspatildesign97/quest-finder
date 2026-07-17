-- schema_v8.sql — Notifications inbox
-- Run AFTER schema_v7. Powers the home-screen notification bell.
--
-- Design: rows are written ONLY by security-definer triggers on the source
-- events (follows, cheers, dare status changes) — there is deliberately no
-- INSERT policy, so clients cannot forge notifications. The recipient reads
-- and marks their own rows. Chat messages do NOT create rows here (chat has
-- its own unread badge computed from the messages table).

-- ── Table ────────────────────────────────────────────────────────────────────
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,  -- recipient
  actor_id uuid references profiles(id) on delete set null,
  actor_name text not null default 'Adventurer',                    -- denormalized, like shared_posts
  actor_avatar text not null default 'luna',
  type text not null check (type in ('follow', 'cheer', 'dare_accepted', 'dare_completed')),
  ref_id text,                                                      -- post id / challenge id
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists notifications_user_created on notifications (user_id, created_at desc);
create index if not exists notifications_unread on notifications (user_id) where read_at is null;

-- ── RLS ──────────────────────────────────────────────────────────────────────
alter table notifications enable row level security;

create policy "notifications read own" on notifications
  for select using (auth.uid() = user_id);

create policy "notifications update own" on notifications
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- No insert/delete policies: writes happen only via the triggers below.

-- ── Trigger helper ───────────────────────────────────────────────────────────
create or replace function notify_user(
  recipient uuid,
  actor uuid,
  notif_type text,
  ref text
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  a_name text := 'Adventurer';
  a_avatar text := 'luna';
begin
  if recipient is null or recipient = actor then return; end if;
  if actor is not null then
    select name, avatar into a_name, a_avatar from profiles where id = actor;
    a_name := coalesce(a_name, 'Adventurer');
    a_avatar := coalesce(a_avatar, 'luna');
  end if;
  insert into notifications (user_id, actor_id, actor_name, actor_avatar, type, ref_id)
  values (recipient, actor, a_name, a_avatar, notif_type, ref);
end;
$$;

-- ── Follow → notify the followed user ───────────────────────────────────────
create or replace function on_friend_insert() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  perform notify_user(new.friend_id, new.user_id, 'follow', null);
  return new;
end;
$$;

drop trigger if exists trg_notify_follow on friends;
create trigger trg_notify_follow after insert on friends
  for each row execute function on_friend_insert();

-- ── Cheer → notify the post owner ───────────────────────────────────────────
create or replace function on_cheer_insert() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  owner uuid;
begin
  select user_id into owner from shared_posts where id = new.post_id;
  perform notify_user(owner, new.user_id, 'cheer', new.post_id::text);
  return new;
end;
$$;

drop trigger if exists trg_notify_cheer on cheers;
create trigger trg_notify_cheer after insert on cheers
  for each row execute function on_cheer_insert();

-- ── Dare accepted / completed → notify the sender ───────────────────────────
-- (Dares are link-based with no recipient column, so only sender-side events
-- are notifiable — consistent with the current challenges schema.)
create or replace function on_challenge_update() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.status = 'accepted' and old.status is distinct from 'accepted' then
    perform notify_user(new.from_user, new.accepted_by, 'dare_accepted', new.id::text);
  elsif new.status = 'completed' and old.status is distinct from 'completed' then
    perform notify_user(new.from_user, new.accepted_by, 'dare_completed', new.id::text);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_notify_challenge on challenges;
create trigger trg_notify_challenge after update on challenges
  for each row execute function on_challenge_update();

-- ── Realtime ─────────────────────────────────────────────────────────────────
alter publication supabase_realtime add table notifications;
