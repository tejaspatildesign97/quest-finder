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

/** Returns the signed-in user id. Auth is required app-wide (the AuthGate
 *  guarantees a real session before any feature code runs). */
export async function ensureUser(): Promise<string> {
  const sb = supabase()
  const { data: { session } } = await sb.auth.getSession()
  if (!session || session.user.is_anonymous) throw new Error('Not signed in')
  return session.user.id
}
