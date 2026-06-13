'use client'

import { supabase } from './supabase'
import { ensureProfile } from './partySync'
import type { Character } from './types'

export interface CommunityPost {
  id: string
  userId: string
  userName: string
  userAvatar: string
  questId: string
  note: string
  xp: number
  createdAt: string
  cheers: number
  cheeredByMe: boolean
}

export interface Challenge {
  id: string
  questId: string
  fromName: string
  message: string
  status: 'pending' | 'accepted' | 'completed' | 'declined'
}

// ── Community feed ────────────────────────────────────────────────────────────

export async function sharePost(character: Character, questId: string, note: string, xp: number): Promise<void> {
  const uid = await ensureProfile(character)
  const { error } = await supabase().from('shared_posts').insert({
    user_id: uid, user_name: character.name, user_avatar: character.avatar,
    quest_id: questId, note, xp,
  })
  if (error) throw error
}

export async function fetchPosts(myUserId: string | null): Promise<CommunityPost[]> {
  const sb = supabase()
  const { data: posts } = await sb
    .from('shared_posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)
  if (!posts?.length) return []

  const ids = posts.map(p => p.id)
  const { data: cheers } = await sb.from('cheers').select('post_id, user_id').in('post_id', ids)

  return posts.map(p => ({
    id: p.id, userId: p.user_id, userName: p.user_name, userAvatar: p.user_avatar,
    questId: p.quest_id, note: p.note, xp: p.xp, createdAt: p.created_at,
    cheers: (cheers ?? []).filter(c => c.post_id === p.id).length,
    cheeredByMe: !!myUserId && (cheers ?? []).some(c => c.post_id === p.id && c.user_id === myUserId),
  }))
}

export async function toggleCheer(postId: string, character: Character, cheered: boolean): Promise<void> {
  const uid = await ensureProfile(character)
  const sb = supabase()
  if (cheered) {
    await sb.from('cheers').delete().eq('post_id', postId).eq('user_id', uid)
  } else {
    await sb.from('cheers').upsert({ post_id: postId, user_id: uid })
  }
}

// ── Challenges ────────────────────────────────────────────────────────────────

export async function createChallenge(character: Character, questId: string, message: string): Promise<{ id: string; userId: string }> {
  const uid = await ensureProfile(character)
  const { data, error } = await supabase().from('challenges')
    .insert({ quest_id: questId, from_user: uid, from_name: character.name, message })
    .select('id').single()
  if (error || !data) throw error ?? new Error('Could not create challenge')
  return { id: data.id, userId: uid }
}

export async function fetchChallenge(id: string): Promise<Challenge | null> {
  const { data } = await supabase().from('challenges').select('*').eq('id', id).single()
  if (!data) return null
  return { id: data.id, questId: data.quest_id, fromName: data.from_name, message: data.message, status: data.status }
}

export async function acceptChallenge(id: string, character: Character): Promise<string> {
  const uid = await ensureProfile(character) // signs in, so the update passes RLS
  await supabase().from('challenges')
    .update({ status: 'accepted', accepted_by: uid, accepted_name: character.name })
    .eq('id', id)
  return uid
}

export async function completeChallenge(id: string): Promise<void> {
  await supabase().from('challenges').update({ status: 'completed' }).eq('id', id)
}

export interface SentChallenge {
  id: string
  questId: string
  status: 'pending' | 'accepted' | 'completed' | 'declined'
  createdAt: string
  acceptedName: string | null
}

export async function fetchSentChallenges(userId: string): Promise<SentChallenge[]> {
  const sb = supabase()
  const query = (cols: string) => sb.from('challenges')
    .select(cols).eq('from_user', userId).order('created_at', { ascending: false })

  // Try the v4 shape (with accepted_name); fall back if that column isn't migrated yet.
  let res = await query('id, quest_id, status, created_at, accepted_name')
  if (res.error) res = await query('id, quest_id, status, created_at')

  const rows = (res.data ?? []) as unknown as Record<string, unknown>[]
  return rows.map(c => ({
    id: c.id as string, questId: c.quest_id as string,
    status: c.status as SentChallenge['status'], createdAt: c.created_at as string,
    acceptedName: (c.accepted_name as string | undefined) ?? null,
  }))
}

// ── XP events + leaderboard ──────────────────────────────────────────────────

export async function postXpEvent(character: Character, xp: number): Promise<void> {
  const uid = await ensureProfile(character)
  await supabase().from('xp_events').insert({ user_id: uid, xp })
}

export interface LeaderboardRow {
  userId: string
  name: string
  avatar: string
  totalXp: number
  rank: number
}

export async function fetchLeaderboard(): Promise<LeaderboardRow[]> {
  const { data, error } = await supabase().rpc('monthly_leaderboard')
  if (error) throw error
  return (data ?? []).map((r: any) => ({
    userId: r.user_id, name: r.name, avatar: r.avatar,
    totalXp: Number(r.total_xp), rank: Number(r.rank),
  }))
}
