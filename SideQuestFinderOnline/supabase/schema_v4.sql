-- Side Quest Finder — v4: record who accepted a dare
-- Run AFTER schema_v3.sql, in Supabase Dashboard → SQL Editor

alter table challenges add column if not exists accepted_by uuid references profiles(id);
alter table challenges add column if not exists accepted_name text;

-- The recipient (any authed user) sets these when accepting — already covered by
-- the existing "challenges update status" policy (auth.role() = 'authenticated').
