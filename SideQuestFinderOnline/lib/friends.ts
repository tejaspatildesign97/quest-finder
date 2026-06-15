'use client'

import { supabase, ensureUser } from './supabase'
import { ensureProfile } from './partySync'
import type { Character } from './types'

export interface FriendProfile {
  id: string
  name: string
  avatar: string
  username: string
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 16) || 'hero'

/** Ensures this device has a profile + a unique username, returns both. */
export async function ensureUsername(character: Character): Promise<{ userId: string; username: string }> {
  const uid = await ensureProfile(character)
  const sb = supabase()
  const { data } = await sb.from('profiles').select('username').eq('id', uid).single()
  if (data?.username) return { userId: uid, username: data.username }
  const username = `${slug(character.name)}-${uid.slice(0, 6)}`
  await sb.from('profiles').update({ username }).eq('id', uid)
  return { userId: uid, username }
}

/** Search profiles by username/name prefix, excluding given ids (self + existing friends). */
export async function searchProfiles(query: string, excludeIds: string[]): Promise<FriendProfile[]> {
  const q = query.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
  if (!q) return []
  const { data } = await supabase()
    .from('profiles')
    .select('id, name, avatar, username')
    .or(`username.ilike.${q}%,name.ilike.${q}%`)
    .limit(20)
  return (data ?? [])
    .filter((p) => p.username && !excludeIds.includes(p.id))
    .map((p) => ({ id: p.id, name: p.name, avatar: p.avatar, username: p.username as string }))
}

export async function addFriend(friendId: string): Promise<void> {
  const uid = await ensureUser()
  const { error } = await supabase().from('friends').upsert({ user_id: uid, friend_id: friendId })
  if (error) throw error
}

export async function removeFriend(friendId: string): Promise<void> {
  const uid = await ensureUser()
  await supabase().from('friends').delete().eq('user_id', uid).eq('friend_id', friendId)
}

export async function fetchFriends(userId: string): Promise<FriendProfile[]> {
  const { data } = await supabase()
    .from('friends')
    .select('friend_id, profiles!friends_friend_id_fkey(id, name, avatar, username)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return (data ?? [])
    .map((r) => r.profiles as unknown as FriendProfile)
    .filter(Boolean)
}

export async function fetchFriendCount(userId: string): Promise<number> {
  const { count } = await supabase()
    .from('friends')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
  return count ?? 0
}
