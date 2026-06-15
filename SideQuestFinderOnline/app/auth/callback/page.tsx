'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { getSession, isRealSession } from '@/lib/auth'

// Supabase parses the OAuth redirect hash on load; we just wait for the session.
export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    let tries = 0
    const check = async () => {
      const session = await getSession()
      if (isRealSession(session)) { router.replace('/dashboard'); return }
      if (tries++ < 20) setTimeout(check, 250)
      else router.replace('/signin')
    }
    check()
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <Loader2 size={32} className="animate-spin text-[var(--stone)]" />
      <p className="text-sm font-semibold text-[var(--stone)]">Signing you in…</p>
    </div>
  )
}
