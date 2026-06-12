'use client'

import { supabase, ensureUser } from './supabase'
import type { Character } from './types'

export interface OnlineMember { id: string; name: string; avatar: string }
export interface OnlineParty {
  id: string
  name: string
  mode: 'couples' | 'friends'
  leaderId: string
  inviteCode: string
  members: OnlineMember[]
}

export interface OnlineCompletion {
  id: string
  questId: string
  note: string
  xp: number
  completedBy: string
  completedByName: string
  completedAt: string
}

/** Create/refresh this device's profile from the local character. */
export async function ensureProfile(character: Character): Promise<string> {
  const uid = await ensureUser()
  const { error } = await supabase().from('profiles').upsert({
    id: uid, name: character.name, avatar: character.avatar, class: character.class,
  })
  if (error) throw error
  return uid
}

async function loadParty(partyId: string): Promise<OnlineParty | null> {
  const sb = supabase()
  const { data: p } = await sb.from('parties').select('*').eq('id', partyId).single()
  if (!p) return null
  const { data: members } = await sb
    .from('party_members').select('user_id, profiles(name, avatar)').eq('party_id', partyId)
  return {
    id: p.id, name: p.name, mode: p.mode, leaderId: p.leader, inviteCode: p.invite_code,
    members: (members ?? []).map((m: any) => ({
      id: m.user_id, name: m.profiles?.name ?? 'Adventurer', avatar: m.profiles?.avatar ?? 'luna',
    })),
  }
}

export async function createOnlineParty(character: Character, name: string, mode: 'couples' | 'friends'): Promise<OnlineParty> {
  const uid = await ensureProfile(character)
  const sb = supabase()
  const { data: p, error } = await sb.from('parties')
    .insert({ name, mode, leader: uid }).select().single()
  if (error || !p) throw error ?? new Error('Could not create party')
  await sb.from('party_members').insert({ party_id: p.id, user_id: uid })
  return (await loadParty(p.id))!
}

export async function joinOnlineParty(character: Character, inviteCode: string): Promise<OnlineParty> {
  const uid = await ensureProfile(character)
  const sb = supabase()
  const { data: p } = await sb.from('parties').select('id, mode')
    .eq('invite_code', inviteCode.trim().toUpperCase()).single()
  if (!p) throw new Error('No party found for that code')
  // Couples cap: max 2 members
  if (p.mode === 'couples') {
    const { count } = await sb.from('party_members')
      .select('*', { count: 'exact', head: true }).eq('party_id', p.id)
    if ((count ?? 0) >= 2) throw new Error('This couples party is already full')
  }
  const { error } = await sb.from('party_members').upsert({ party_id: p.id, user_id: uid })
  if (error) throw error
  return (await loadParty(p.id))!
}

export async function refreshParty(partyId: string): Promise<OnlineParty | null> {
  return loadParty(partyId)
}

export async function leaveOnlineParty(party: OnlineParty, myUserId: string): Promise<void> {
  const sb = supabase()
  if (party.leaderId === myUserId) {
    await sb.from('parties').delete().eq('id', party.id) // disband
  } else {
    await sb.from('party_members').delete().eq('party_id', party.id).eq('user_id', myUserId)
  }
}

export async function postCompletion(partyId: string, questId: string, note: string, xp: number): Promise<void> {
  const uid = await ensureUser()
  const { error } = await supabase().from('party_completions')
    .insert({ party_id: partyId, quest_id: questId, note, xp, completed_by: uid })
  if (error) throw error
}

export async function fetchCompletions(partyId: string): Promise<OnlineCompletion[]> {
  const { data } = await supabase()
    .from('party_completions')
    .select('id, quest_id, note, xp, completed_by, completed_at, profiles!party_completions_completed_by_fkey(name)')
    .eq('party_id', partyId)
    .order('completed_at', { ascending: false })
  return (data ?? []).map((c: any) => ({
    id: c.id, questId: c.quest_id, note: c.note, xp: c.xp,
    completedBy: c.completed_by,
    completedByName: c.profiles?.name ?? 'Party leader',
    completedAt: c.completed_at,
  }))
}

/** Live updates: invoke cb whenever a new completion lands for this party. */
export function subscribeCompletions(partyId: string, cb: () => void): () => void {
  const channel = supabase()
    .channel(`party-${partyId}`)
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'party_completions', filter: `party_id=eq.${partyId}` },
      cb)
    .subscribe()
  return () => { supabase().removeChannel(channel) }
}
