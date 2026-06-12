-- Side Quest Finder — party sync schema
-- Run this in Supabase Dashboard → SQL Editor → New query → Run

-- ── Profiles (one per device/user, created on first launch) ────────────────
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  avatar text not null default 'luna',
  class text not null default 'Wanderer',
  created_at timestamptz not null default now()
);

-- ── Parties ─────────────────────────────────────────────────────────────────
create table if not exists parties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  mode text not null check (mode in ('couples', 'friends')),
  leader uuid not null references profiles(id),
  invite_code text not null unique default upper(substr(md5(random()::text), 1, 6)),
  created_at timestamptz not null default now()
);

create table if not exists party_members (
  party_id uuid not null references parties(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (party_id, user_id)
);

-- ── Completions (leader posts; everyone in the party reads) ────────────────
create table if not exists party_completions (
  id uuid primary key default gen_random_uuid(),
  party_id uuid not null references parties(id) on delete cascade,
  quest_id text not null,
  note text not null default '',
  xp int not null,
  completed_by uuid not null references profiles(id),
  completed_at timestamptz not null default now()
);

-- ── Row Level Security ──────────────────────────────────────────────────────
alter table profiles enable row level security;
alter table parties enable row level security;
alter table party_members enable row level security;
alter table party_completions enable row level security;

-- Profiles: read anyone (names/avatars shown to party mates), write own
create policy "profiles read" on profiles for select using (true);
create policy "profiles insert own" on profiles for insert with check (auth.uid() = id);
create policy "profiles update own" on profiles for update using (auth.uid() = id);

-- Helper: membership check
create or replace function is_party_member(p uuid)
returns boolean language sql security definer stable as $$
  select exists (select 1 from party_members where party_id = p and user_id = auth.uid())
$$;

-- Parties: members read; anyone authed can read by invite code (needed to join);
-- creator inserts; only leader updates/deletes
create policy "parties read" on parties for select using (true);
create policy "parties insert" on parties for insert with check (auth.uid() = leader);
create policy "parties leader update" on parties for update using (auth.uid() = leader);
create policy "parties leader delete" on parties for delete using (auth.uid() = leader);

-- Members: party members read; users add/remove themselves
create policy "members read" on party_members for select using (is_party_member(party_id));
create policy "members join self" on party_members for insert with check (auth.uid() = user_id);
create policy "members leave self" on party_members for delete using (auth.uid() = user_id);

-- Completions: members read; only the party leader inserts
create policy "completions read" on party_completions for select
  using (is_party_member(party_id));
create policy "completions leader insert" on party_completions for insert
  with check (
    auth.uid() = completed_by
    and exists (select 1 from parties where id = party_id and leader = auth.uid())
  );

-- ── Realtime (live diary/XP updates on member devices) ─────────────────────
alter publication supabase_realtime add table party_completions;
alter publication supabase_realtime add table party_members;
