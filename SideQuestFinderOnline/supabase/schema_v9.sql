-- schema_v9.sql — 1:1 chat (direct messages)
-- Run AFTER schema_v8. Powers /chat and the home-screen chat badge.
--
-- Design: a single messages table — for strictly-1:1 chat the (sender,
-- recipient) pair IS the conversation; the client groups by peer. Chat unread
-- counts come straight from this table (read_at is null), NOT from
-- notification rows, so conversations don't flood the bell inbox.

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references profiles(id) on delete cascade,
  recipient_id uuid not null references profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now(),
  read_at timestamptz,
  constraint no_self_dm check (sender_id <> recipient_id)
);

create index if not exists messages_recipient on messages (recipient_id, created_at desc);
create index if not exists messages_sender on messages (sender_id, created_at desc);
create index if not exists messages_unread on messages (recipient_id) where read_at is null;

alter table messages enable row level security;

create policy "messages read own" on messages
  for select using (auth.uid() in (sender_id, recipient_id));

create policy "messages send own" on messages
  for insert with check (auth.uid() = sender_id);

-- Recipient marks messages read.
create policy "messages mark read" on messages
  for update using (auth.uid() = recipient_id) with check (auth.uid() = recipient_id);

alter publication supabase_realtime add table messages;
