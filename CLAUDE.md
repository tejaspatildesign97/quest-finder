# Quest Finder — project handoff

Context for anyone (human or Claude Code) picking this up, especially on a new machine.

## What this is
**Side Quest Finder** — a gamified, mobile-first web app that turns real-life micro-adventures into RPG quests (XP, levels, achievements, parties, a community feed). Built with Next.js + Supabase.

## Monorepo layout
```
quest-finder/
├── SideQuestFinderOnline/    ← ACTIVE app (Supabase-backed, cloud sync). Work here.
├── SideQuestFinderOffline/   ← FROZEN snapshot (localStorage-only, no backend). Do NOT change.
├── android/  ios/            ← native shells / scaffolding
└── CLAUDE.md                 ← this file
```
**Only `SideQuestFinderOnline` is under active development.** The Offline app is a deliberate frozen copy — leave it alone unless explicitly asked.

## SideQuestFinderOnline — stack
- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** · **Tailwind CSS 4**
- **Zustand** (`lib/store.ts`) with `persist` (localStorage) for client game state
- **Supabase**: email/password + Google auth, Postgres + Row Level Security, Storage, realtime
- **DiceBear** avatars (API), **Lucide** icons, **Anton** + **Space Grotesk** fonts (next/font)
- Quest media (photos/videos) for the local diary lives in **IndexedDB** (`lib/media.ts`); media shared to the community feed is uploaded to Supabase Storage

### Dev
```bash
cd SideQuestFinderOnline
npm install
npm run dev        # local dev server
npm run build      # production build (passes clean as of last check)
npx tsc --noEmit   # typecheck
```

### Env (`SideQuestFinderOnline/.env.local`, git-ignored — recreate on each machine)
```
NEXT_PUBLIC_SUPABASE_URL=https://pxdgfikgvcreplljjkmm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from Supabase → Settings → API>
```

## Supabase backend
One hosted project (URL above) shared across machines — no local DB to run.

### Migrations — `SideQuestFinderOnline/supabase/`, apply in order in the SQL editor
- `schema.sql`, `schema_v2.sql` — base: profiles, parties, party_members, shared_posts, cheers, challenges
- `schema_v3.sql` — xp_events + `monthly_leaderboard` RPC
- `schema_v4.sql` — challenge `accepted_by` / `accepted_name` columns
- `schema_v5.sql` — friends / usernames (follows)
- `schema_v6.sql` — `game_state` table (cloud-synced progress; **email confirmation OFF** in Auth)
- `schema_v7.sql` — `image_urls` on shared_posts + public `post-media` storage bucket (photos on the feed)

All seven are currently applied to the live project. RLS is enabled and enforced (verified: anon can't write `shared_posts`, can't read others' `game_state`).

### Auth
- Required sign-in (email/password or Google) → progress cloud-synced via `game_state`.
- `AuthGate` (`components/AuthGate.tsx`) gates the app and hydrates the store from the cloud.
- Google OAuth consent screen is in **Testing** mode (only added test users until published).
- For any new deploy domain: update Supabase → Auth → URL Configuration (Site URL + redirect allowlist) and Google Cloud authorized origins, or OAuth/email links break.

## What's built
Character creation · quest board + Quest Forge (generates 4 quests by time/mood/type) · daily quests · 160-quest library (`lib/quests.ts`) · XP/levels/streaks · achievements · solo/couples/friends modes · online parties (invite codes, leader-only controls, shared XP/diaries) · dares/challenge links · community feed with photos · monthly leaderboard · friends (usernames, follow) · quest diary (required reflection + photo/video + shareable story cards) · settings.

## Conventions / gotchas
- Keep the **Offline app frozen**.
- Commit messages end with: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
- `.safe-area-bottom` sets `padding-bottom: env(...)` and **overrides** Tailwind `pb-*` (env = 0 on desktop) — use `calc(env(safe-area-inset-bottom) + Nrem)` when you need real bottom padding alongside the safe area.
- `lib/community.ts` features fall back gracefully if a migration isn't applied yet (e.g. text-only share before `image_urls` exists).

## Deploy + open loose ends
**Deploy:** Vercel → import this repo → **Root Directory = `SideQuestFinderOnline`** (it's a monorepo) → add the two `NEXT_PUBLIC_SUPABASE_*` env vars → deploy.

**Before public launch:**
- Set Supabase Auth URL config + Google authorized origins for the prod domain
- Publish/verify the Google OAuth consent screen (currently Testing)
- Replace `example.com` Privacy Policy + Terms links (`app/settings/page.tsx`) with real pages
- Make account deletion cascade (today "Delete Character" only wipes `game_state`)
- Add moderation/report + rate limiting for user-generated content (feed, challenges, profiles)
- Add error monitoring (Sentry) + analytics
- Add PWA manifest + icons + favicon (none yet)
- Remove seeded/test data (demo leaderboard adventurers, the "End-to-end photo upload test" post)
- **Rotate the GitHub PAT** that was once shared in plaintext
