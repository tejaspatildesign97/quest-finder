'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { supabaseConfigured } from '@/lib/supabase'
import { getSession, isRealSession, onAuthChange } from '@/lib/auth'
import { loadGameState, saveGameState, hydrate, snapshot, startAutoSave } from '@/lib/cloudSync'
import { useStore } from '@/lib/store'
import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
import ToastContainer from '@/components/ui/Toast'
import LevelUpModal from '@/components/ui/LevelUpModal'
import CompleteQuestModal from '@/components/CompleteQuestModal'

// Routes that render WITHOUT auth (the sign-in flow itself).
const PUBLIC_ROUTES = ['/signin', '/auth/callback']

type Status = 'loading' | 'signedout' | 'ready'

function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="max-w-lg mx-auto px-4 py-6 relative z-[1]">{children}</main>
      <Nav />
      <ToastContainer />
      <LevelUpModal />
      <CompleteQuestModal />
    </>
  )
}

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const setMyUserId = useStore(s => s.setMyUserId)
  const [status, setStatus] = useState<Status>('loading')

  const isPublic = PUBLIC_ROUTES.some(r => pathname?.startsWith(r))

  // Redirect to sign-in when signed out (in an effect, never during render).
  useEffect(() => {
    if (status === 'signedout' && !isPublic) router.replace('/signin')
  }, [status, isPublic, router])

  useEffect(() => {
    // Dev fallback: if Supabase isn't configured, skip the gate entirely.
    if (!supabaseConfigured()) { setStatus('ready'); return }

    let stopAutoSave: (() => void) | undefined

    const onboard = async (userId: string) => {
      const cloud = await loadGameState(userId).catch(() => null)
      if (cloud) {
        hydrate(cloud)                 // returning user → restore everything
      } else {
        await saveGameState(userId, snapshot()).catch(() => {}) // first login → seed from local
      }
      setMyUserId(userId)
      stopAutoSave?.()
      stopAutoSave = startAutoSave(userId)
      setStatus('ready')
    }

    getSession().then(session => {
      if (isRealSession(session)) onboard(session!.user.id)
      else setStatus('signedout')
    })

    const unsub = onAuthChange(session => {
      if (isRealSession(session)) onboard(session!.user.id)
      else { stopAutoSave?.(); setStatus('signedout') }
    })

    return () => { unsub(); stopAutoSave?.() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Public auth routes always render their own content (no chrome).
  if (isPublic) return <>{children}</>

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[var(--stone)]" />
      </div>
    )
  }

  if (status === 'signedout') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-[var(--stone)]" />
      </div>
    )
  }

  return <Chrome>{children}</Chrome>
}
