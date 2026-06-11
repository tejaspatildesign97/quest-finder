'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { ACHIEVEMENTS } from '@/lib/achievements'
import AchievementCard from '@/components/ui/AchievementCard'
import type { AchievementRarity } from '@/lib/types'

const RARITIES: (AchievementRarity | 'All')[] = ['All', 'Common', 'Rare', 'Epic', 'Legendary']

export default function AchievementsPage() {
  const router = useRouter()
  const { character, unlockedAchievements, _hasHydrated } = useStore()

  const [filter, setFilter] = useState<AchievementRarity | 'All'>('All')
  const [showLocked, setShowLocked] = useState(true)

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) router.replace('/character/create')
  }, [_hasHydrated, character])
  if (!_hasHydrated || !character) return null

  const filtered = ACHIEVEMENTS.filter(a => {
    if (filter !== 'All' && a.rarity !== filter) return false
    if (!showLocked && !unlockedAchievements.includes(a.id)) return false
    return true
  })

  const unlockedCount = unlockedAchievements.length

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Achievements</h2>
        <p className="text-sm text-[var(--stone)]">{unlockedCount} / {ACHIEVEMENTS.length} unlocked</p>
      </div>

      {/* Progress bar */}
      <div className="h-2.5 bg-[var(--ink)]/8 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${(unlockedCount / ACHIEVEMENTS.length) * 100}%`, background: 'var(--grad-orange)' }}
        />
      </div>

      {/* Rarity filter */}
      <div className="flex gap-1.5 flex-wrap">
        {RARITIES.map(r => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all
              ${filter === r ? 'bg-[var(--quest-gold)] text-[#0c0c10] shadow-md shadow-amber-500/30' : 'bg-white/8 text-[var(--stone)] hover:text-[var(--ink)]'}`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Show locked toggle */}
      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={showLocked}
          onChange={e => setShowLocked(e.target.checked)}
          className="accent-[var(--quest-gold)] w-4 h-4"
        />
        <span className="text-[var(--stone)]">Show locked achievements</span>
      </label>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(ach => (
          <AchievementCard
            key={ach.id}
            achievement={ach}
            unlocked={unlockedAchievements.includes(ach.id)}
          />
        ))}
      </div>
    </div>
  )
}
