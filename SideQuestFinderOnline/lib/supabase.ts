'use client'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

export function supabase(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key || key === 'PASTE_ANON_KEY_HERE') {
      throw new Error('Supabase env vars missing — set NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
    }
    client = createClient(url, key)
  }
  return client
}

export function supabaseConfigured(): boolean {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!key && key !== 'PASTE_ANON_KEY_HERE'
}

/** Signs in anonymously (device identity) and returns the user id. */
export async function ensureUser(): Promise<string> {
  const sb = supabase()
  const { data: { session } } = await sb.auth.getSession()
  if (session) return session.user.id
  const { data, error } = await sb.auth.signInAnonymously()
  if (error || !data.user) throw error ?? new Error('Anonymous sign-in failed')
  return data.user.id
}
