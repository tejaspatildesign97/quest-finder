'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import DiaryList from '@/components/DiaryList'

// Legacy route — the diary now lives on /profile, but deep links keep working.
export default function JournalPage() {
  const router = useRouter()
  const { character, activeQuests, _hasHydrated } = useStore()

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) router.replace('/character/create')
  }, [_hasHydrated, character, router])

  if (!_hasHydrated || !character) return null

  const count = activeQuests.filter(q => q.status === 'completed').length

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl">Quest Diary</h2>
        <p className="text-sm font-semibold text-[var(--stone)]">
          {count} {count === 1 ? 'memory' : 'memories'}
        </p>
      </div>
      <DiaryList />
    </div>
  )
}
