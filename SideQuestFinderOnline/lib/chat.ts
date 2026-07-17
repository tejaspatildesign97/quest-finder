'use client'

import { supabase, supabaseConfigured } from './supabase'
import { ensureProfile } from './partySync'
import type { Character } from './types'

// Requires supabase/schema_v9.sql. Every read fails gracefully (empty/zero)
// while the migration isn't applied; sendMessage throws so the UI can toast.

export interface ChatMessage {
  id: string
  senderId: string
  recipientId: string
  body: string
  createdAt: string
  readAt: string | null
  /** local-only: optimistic message awaiting server confirmation */
  pending?: boolean
  failed?: boolean
}

export interface Conversation {
  peerId: string
  peerName: string
  peerAvatar: string
  lastBody: string
  lastAt: string
  lastFromMe: boolean
  unread: number
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
export const isUuid = (s: string) => UUID_RE.test(s)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(r: any): ChatMessage {
  return { id: r.id, senderId: r.sender_id, recipientId: r.recipient_id, body: r.body, createdAt: r.created_at, readAt: r.read_at }
}

export async function fetchConversations(myId: string): Promise<Conversation[]> {
  if (!supabaseConfigured()) return []
  try {
    const { data, error } = await supabase().from('messages')
      .select('*')
      .or(`sender_id.eq.${myId},recipient_id.eq.${myId}`)
      .order('created_at', { ascending: false })
      .limit(200)
    if (error || !data?.length) return []

    const byPeer = new Map<string, { last: ChatMessage; unread: number }>()
    for (const r of data.map(mapRow)) {
      const peer = r.senderId === myId ? r.recipientId : r.senderId
      const entry = byPeer.get(peer)
      if (!entry) byPeer.set(peer, { last: r, unread: 0 })
      if (r.recipientId === myId && !r.readAt) {
        byPeer.get(peer)!.unread += 1
      }
    }

    const peerIds = [...byPeer.keys()]
    const { data: profiles } = await supabase().from('profiles')
      .select('id, name, avatar').in('id', peerIds)
    const pmap = new Map((profiles ?? []).map(p => [p.id, p]))

    return peerIds.map(peerId => {
      const { last, unread } = byPeer.get(peerId)!
      const prof = pmap.get(peerId)
      return {
        peerId,
        peerName: prof?.name ?? 'Adventurer',
        peerAvatar: prof?.avatar ?? 'luna',
        lastBody: last.body,
        lastAt: last.createdAt,
        lastFromMe: last.senderId === myId,
        unread,
      }
    })
  } catch { return [] }
}

export async function fetchMessages(myId: string, peerId: string, limit = 100): Promise<ChatMessage[]> {
  if (!supabaseConfigured() || !isUuid(peerId)) return []
  try {
    const { data, error } = await supabase().from('messages')
      .select('*')
      .or(`and(sender_id.eq.${myId},recipient_id.eq.${peerId}),and(sender_id.eq.${peerId},recipient_id.eq.${myId})`)
      .order('created_at', { ascending: true })
      .limit(limit)
    if (error) return []
    return (data ?? []).map(mapRow)
  } catch { return [] }
}

export async function sendMessage(character: Character, peerId: string, body: string): Promise<ChatMessage> {
  const myId = await ensureProfile(character) // guarantees my profiles row (FK)
  const { data, error } = await supabase().from('messages')
    .insert({ sender_id: myId, recipient_id: peerId, body })
    .select().single()
  if (error) throw error
  return mapRow(data)
}

export async function markThreadRead(myId: string, peerId: string): Promise<void> {
  if (!supabaseConfigured() || !isUuid(peerId)) return
  try {
    await supabase().from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('recipient_id', myId).eq('sender_id', peerId).is('read_at', null)
  } catch { /* pre-migration */ }
}

export async function fetchUnreadMessageCount(myId: string): Promise<number> {
  if (!supabaseConfigured()) return 0
  try {
    const { count, error } = await supabase().from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('recipient_id', myId).is('read_at', null)
    if (error) return 0
    return count ?? 0
  } catch { return 0 }
}

export async function fetchPeerProfile(peerId: string): Promise<{ id: string; name: string; avatar: string } | null> {
  if (!supabaseConfigured() || !isUuid(peerId)) return null
  try {
    const { data } = await supabase().from('profiles').select('id, name, avatar').eq('id', peerId).single()
    return data ?? null
  } catch { return null }
}

/** Live incoming messages (recipient side only — own sends never echo). */
export function subscribeMessages(myId: string, cb: (m: ChatMessage) => void): () => void {
  if (!supabaseConfigured()) return () => {}
  try {
    const channel = supabase()
      .channel(`chat-${myId}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `recipient_id=eq.${myId}` },
        payload => cb(mapRow(payload.new)))
      .subscribe()
    return () => { supabase().removeChannel(channel) }
  } catch { return () => {} }
}
