'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'

export default function Home() {
  const { character, _hasHydrated } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!_hasHydrated) return
    if (character) {
      router.replace('/dashboard')
    } else {
      router.replace('/character/create')
    }
  }, [character, _hasHydrated, router])

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-2">
        <div className="text-5xl float inline-block">🗺️</div>
        <p className="text-[var(--stone)]">Loading your adventure...</p>
      </div>
    </div>
  )
}
