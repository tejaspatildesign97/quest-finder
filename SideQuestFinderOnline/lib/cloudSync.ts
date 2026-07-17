'use client'

import { supabase } from './supabase'
import { useStore, dedupeActiveQuests } from './store'
import type { ActiveQuest } from './types'

// The slice of store state that is synced to the cloud (per account).
const SYNC_KEYS = [
  'character', 'activeQuests', 'unlockedAchievements', 'party', 'playMode',
  'claimedCompletionIds', 'acceptedChallenges', 'settings', 'onlineParty',
] as const

type SyncSlice = Record<string, unknown>

export function snapshot(): SyncSlice {
  const s = useStore.getState() as unknown as Record<string, unknown>
  const out: SyncSlice = {}
  for (const k of SYNC_KEYS) out[k] = s[k]
  return out
}

export function hydrate(state: SyncSlice) {
  // Only set keys we actually sync, so transient store fields are untouched.
  const patch: SyncSlice = {}
  for (const k of SYNC_KEYS) if (k in state) patch[k] = state[k]
  // Collapse any historical duplicate completions on the way in; the debounced
  // autosave then writes the cleaned state back to the cloud automatically.
  if (Array.isArray(patch.activeQuests)) patch.activeQuests = dedupeActiveQuests(patch.activeQuests as ActiveQuest[])
  useStore.setState(patch as never)
}

export async function loadGameState(userId: string): Promise<SyncSlice | null> {
  const { data } = await supabase().from('game_state').select('state').eq('user_id', userId).single()
  return (data?.state as SyncSlice) ?? null
}

export async function saveGameState(userId: string, state: SyncSlice): Promise<void> {
  await supabase().from('game_state').upsert({ user_id: userId, state, updated_at: new Date().toISOString() })
}

/** Debounced autosave: pushes store changes to the cloud while signed in. */
export function startAutoSave(userId: string): () => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  // Push once on start so hydration-time normalization (e.g. duplicate cleanup)
  // is persisted to the cloud even if nothing else changes this session.
  saveGameState(userId, snapshot()).catch(() => {})
  const unsub = useStore.subscribe(() => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { saveGameState(userId, snapshot()).catch(() => {}) }, 1500)
  })
  return () => { if (timer) clearTimeout(timer); unsub() }
}
