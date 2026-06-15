'use client'

import { supabase } from './supabase'
import type { Session } from '@supabase/supabase-js'

export async function getSession(): Promise<Session | null> {
  const { data: { session } } = await supabase().auth.getSession()
  return session
}

/** Real (non-anonymous) signed-in session, or null. */
export function isRealSession(session: Session | null): boolean {
  return !!session && !session.user.is_anonymous
}

export async function signUpEmail(email: string, password: string): Promise<{ needsConfirm: boolean }> {
  const { data, error } = await supabase().auth.signUp({ email, password })
  if (error) throw error
  // If "Confirm email" is OFF in Supabase, a session is returned immediately.
  return { needsConfirm: !data.session }
}

export async function signInEmail(email: string, password: string): Promise<void> {
  const { error } = await supabase().auth.signInWithPassword({ email, password })
  if (error) throw error
}

export async function signInGoogle(): Promise<void> {
  const { error } = await supabase().auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback` },
  })
  if (error) throw error
}

export async function signOut(): Promise<void> {
  await supabase().auth.signOut()
}

export async function changePassword(password: string): Promise<void> {
  const { error } = await supabase().auth.updateUser({ password })
  if (error) throw error
}

export function onAuthChange(cb: (session: Session | null) => void): () => void {
  const { data } = supabase().auth.onAuthStateChange((_event, session) => cb(session))
  return () => data.subscription.unsubscribe()
}
