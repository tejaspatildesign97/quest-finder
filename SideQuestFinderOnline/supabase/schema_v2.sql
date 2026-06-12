-- Side Quest Finder — v2: challenges + community feed
-- Run AFTER schema.sql, in Supabase Dashboard → SQL Editor

-- ── Challenges ("I dare you to do this quest") ──────────────────────────────
create table if not exists challenges (
  id uuid primary key default gen_random_uuid(),
  quest_id text not null,
  from_user uuid references profiles(id) on delete set null,
  from_name text not null,
  message text not null default '',
  status text not null default 'pending' check (status in ('pending', 'accepted', 'completed', 'declined')),
  created_at timestamptz not null default now()
);

alter table challenges enable row level security;

-- Anyone (even logged-out, opening a share link) can view a challenge by id
create policy "challenges read" on challenges for select using (true);
create policy "challenges insert own" on challenges for insert
  with check (auth.uid() = from_user);
-- Recipient (any signed-in user) can update the status when accepting
create policy "challenges update status" on challenges for update
  using (auth.role() = 'authenticated');

-- ── Community feed (completed quests shared publicly) ──────────────────────
create table if not exists shared_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  user_name text not null,
  user_avatar text not null default 'luna',
  quest_id text not null,
  note text not null default '',
  xp int not null,
  created_at timestamptz not null default now()
);

alter table shared_posts enable row level security;

create policy "posts read" on shared_posts for select using (true);
create policy "posts insert own" on shared_posts for insert
  with check (auth.uid() = user_id);
create policy "posts delete own" on shared_posts for delete
  using (auth.uid() = user_id);

-- ── Cheers (community likes) ────────────────────────────────────────────────
create table if not exists cheers (
  post_id uuid not null references shared_posts(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  primary key (post_id, user_id)
);

alter table cheers enable row level security;
create policy "cheers read" on cheers for select using (true);
create policy "cheers insert own" on cheers for insert with check (auth.uid() = user_id);
create policy "cheers delete own" on cheers for delete using (auth.uid() = user_id);

-- Realtime for the community feed
alter publication supabase_realtime add table shared_posts;
