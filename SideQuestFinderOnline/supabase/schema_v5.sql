-- Side Quest Finder — v5: usernames + friends
-- Run AFTER schema_v4.sql, in Supabase Dashboard → SQL Editor

-- Unique, searchable usernames on profiles
alter table profiles add column if not exists username text;

-- Backfill existing profiles (slug of name + first 6 chars of id)
update profiles
set username = lower(regexp_replace(coalesce(name, 'hero'), '[^a-zA-Z0-9]', '', 'g')) || '-' || substr(id::text, 1, 6)
where username is null;

create unique index if not exists profiles_username_key on profiles(username);

-- Friends (directional: rows in your list are the friends you maintain)
create table if not exists friends (
  user_id uuid not null references profiles(id) on delete cascade,
  friend_id uuid not null references profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, friend_id)
);

alter table friends enable row level security;

create policy "friends read own"       on friends for select using (auth.uid() = user_id);
create policy "friends read as friend" on friends for select using (auth.uid() = friend_id);
create policy "friends add own"        on friends for insert with check (auth.uid() = user_id);
create policy "friends remove own"     on friends for delete using (auth.uid() = user_id);
