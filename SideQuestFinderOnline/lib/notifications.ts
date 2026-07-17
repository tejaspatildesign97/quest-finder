'use client'

import { supabase, supabaseConfigured } from './supabase'

// Requires supabase/schema_v8.sql. Every function fails gracefully (empty /
// zero / no-op) while the migration isn't applied yet.

export type NotificationType = 'follow' | 'cheer' | 'dare_accepted' | 'dare_completed'

export interface Notification {
  id: string
  actorId: string | null
  actorName: string
  actorAvatar: string
  type: NotificationType
  refId: string | null
  createdAt: string
  readAt: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(r: any): Notification {
  return {
    id: r.id, actorId: r.actor_id, actorName: r.actor_name, actorAvatar: r.actor_avatar,
    type: r.type, refId: r.ref_id, createdAt: r.created_at, readAt: r.read_at,
  }
}

export async function fetchNotifications(userId: string, limit = 30): Promise<Notification[]> {
  if (!supabaseConfigured()) return []
  try {
    const { data, error } = await supabase().from('notifications')
      .select('*').eq('user_id', userId)
      .order('created_at', { ascending: false }).limit(limit)
    if (error) return []
    return (data ?? []).map(mapRow)
  } catch { return [] }
}

export async function fetchUnreadNotificationCount(userId: string): Promise<number> {
  if (!supabaseConfigured()) return 0
  try {
    const { count, error } = await supabase().from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId).is('read_at', null)
    if (error) return 0
    return count ?? 0
  } catch { return 0 }
}

export async function markAllNotificationsRead(userId: string): Promise<void> {
  if (!supabaseConfigured()) return
  try {
    await supabase().from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('user_id', userId).is('read_at', null)
  } catch { /* table missing — nothing to mark */ }
}

/** Live INSERT subscription for the badge. Same pattern as subscribeCompletions. */
export function subscribeNotifications(userId: string, cb: () => void): () => void {
  if (!supabaseConfigured()) return () => {}
  try {
    const channel = supabase()
      .channel(`notif-${userId}`)
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${userId}` },
        cb)
      .subscribe()
    return () => { supabase().removeChannel(channel) }
  } catch { return () => {} }
}
