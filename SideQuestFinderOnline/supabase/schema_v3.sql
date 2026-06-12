-- Side Quest Finder — v3: XP events + monthly leaderboard
-- Run AFTER schema_v2.sql, in Supabase Dashboard → SQL Editor

create table if not exists xp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  xp int not null check (xp > 0),
  created_at timestamptz not null default now()
);

alter table xp_events enable row level security;
create policy "xp read" on xp_events for select using (true);
create policy "xp insert own" on xp_events for insert with check (auth.uid() = user_id);

-- Monthly ranking: everyone who earned XP this calendar month
create or replace function monthly_leaderboard()
returns table (user_id uuid, name text, avatar text, total_xp bigint, rank bigint)
language sql security definer stable as $$
  select p.id, p.name, p.avatar,
         coalesce(sum(e.xp), 0) as total_xp,
         rank() over (order by coalesce(sum(e.xp), 0) desc) as rank
  from profiles p
  join xp_events e on e.user_id = p.id
    and e.created_at >= date_trunc('month', now())
  group by p.id
  order by total_xp desc
  limit 500
$$;
