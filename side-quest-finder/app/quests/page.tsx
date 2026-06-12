'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import QuestForge from '@/components/QuestForge'

export default function QuestsPage() {
  const router = useRouter()
  const { character, activeQuests, playMode, _hasHydrated } = useStore()

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) router.replace('/character/create')
  }, [_hasHydrated, character])
  if (!_hasHydrated || !character) return null

  const activeCount = activeQuests.filter(a => a.status === 'active').length

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl">Quest Board</h2>
        <p className="text-sm font-semibold text-[var(--stone)]">
          {playMode === 'solo' ? 'Solo quests' : playMode === 'duo' ? 'Couples quests' : 'Friends quests'}
          {activeCount > 0 && ` · ${activeCount} active`}
        </p>
      </div>

      {/* The Forge — hero experience */}
      <QuestForge />
    </div>
  )
}
