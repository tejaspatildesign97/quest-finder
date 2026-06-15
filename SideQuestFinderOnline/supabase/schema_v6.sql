-- Side Quest Finder — v6: cloud-synced game state (required auth)
-- Run AFTER schema_v5.sql, in Supabase Dashboard → SQL Editor
--
-- ALSO in the dashboard:
--   Auth → Providers → Email: ON, "Confirm email" OFF (instant sign-in)
--   Auth → Providers → Google: ON (paste Google OAuth client id + secret)

create table if not exists game_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table game_state enable row level security;

create policy "game_state read own"   on game_state for select using (auth.uid() = user_id);
create policy "game_state insert own" on game_state for insert with check (auth.uid() = user_id);
create policy "game_state update own" on game_state for update using (auth.uid() = user_id);
