-- ───────────────────────────────────────────────────────────────
-- schema_v7 · Photos on the Community feed
-- Adds an image_urls column to shared_posts and a public storage
-- bucket so quest photos/videos appear on the Community tab.
-- Run this in the Supabase SQL editor.
-- ───────────────────────────────────────────────────────────────

-- 1) Store the public URLs of each post's media
alter table shared_posts
  add column if not exists image_urls jsonb not null default '[]'::jsonb;

-- 2) A public bucket for post media
insert into storage.buckets (id, name, public)
values ('post-media', 'post-media', true)
on conflict (id) do nothing;

-- 3) Anyone can read the media (public feed)
drop policy if exists "post-media public read" on storage.objects;
create policy "post-media public read"
  on storage.objects for select
  using (bucket_id = 'post-media');

-- 4) Signed-in users may upload into their own folder (<uid>/...)
drop policy if exists "post-media auth upload" on storage.objects;
create policy "post-media auth upload"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'post-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- 5) Users may remove their own media
drop policy if exists "post-media owner delete" on storage.objects;
create policy "post-media owner delete"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'post-media'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
