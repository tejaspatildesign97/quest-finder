'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Map as MapIcon, ChevronDown, ChevronUp, ScrollText } from 'lucide-react'
import { useStore } from '@/lib/store'
import { QUESTS } from '@/lib/quests'
import type { Quest } from '@/lib/types'
import QuestCard from '@/components/ui/QuestCard'
import QuestForge from '@/components/QuestForge'
import { CATEGORY_STYLES } from '@/lib/categories'

const CATEGORIES = ['All', ...Object.keys(CATEGORY_STYLES)]
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard', 'Legendary']
const TABS = ['Available', 'Active', 'Completed'] as const

export default function QuestsPage() {
  const router = useRouter()
  const { character, activeQuests, playMode, acceptQuest, setCompletingQuest, abandonQuest, party, _hasHydrated } = useStore()

  const [tab, setTab]           = useState<typeof TABS[number]>('Available')
  const [category, setCategory] = useState('All')
  const [difficulty, setDifficulty] = useState('All')
  const [browseOpen, setBrowseOpen] = useState(false)

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) router.replace('/character/create')
  }, [_hasHydrated, character])
  if (!_hasHydrated || !character) return null

  const modeQuests = QUESTS.filter(q => q.mode.includes(playMode))
  const activeCount = activeQuests.filter(a => a.status === 'active').length

  const filtered = modeQuests.filter(q => {
    if (category !== 'All' && q.category !== category) return false
    if (difficulty !== 'All' && q.difficulty !== difficulty) return false
    const aq = activeQuests.find(a => a.questId === q.id)
    if (tab === 'Available') return !aq || aq.status === 'abandoned'
    if (tab === 'Active')    return aq?.status === 'active'
    if (tab === 'Completed') return aq?.status === 'completed'
    return true
  })

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

      {/* Browse all — collapsed by default */}
      <button
        onClick={() => setBrowseOpen(o => !o)}
        className="w-full flex items-center justify-between bg-white/5 hover:bg-white/8 rounded-2xl px-4 py-3.5 transition-all"
      >
        <span className="flex items-center gap-2 font-display text-sm tracking-wide">
          <ScrollText size={16} className="text-[var(--quest-gold)]" />
          Browse all {modeQuests.length} quests
        </span>
        {browseOpen ? <ChevronUp size={18} className="text-[var(--stone)]" /> : <ChevronDown size={18} className="text-[var(--stone)]" />}
      </button>

      {browseOpen && (
        <div className="space-y-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-[var(--ink)]/5 rounded-2xl p-1">
            {TABS.map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all
                  ${tab === t ? 'bg-[var(--surface-2)] text-[var(--ink)] shadow-sm' : 'text-[var(--stone)] hover:text-[var(--ink)]'}`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all
                  ${category === c ? 'bg-[var(--quest-gold)] text-[#0c0c10] shadow-md shadow-amber-500/30' : 'bg-white/8 text-[var(--stone)] hover:text-[var(--ink)]'}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Difficulty filter */}
          <div className="flex gap-1.5 flex-wrap">
            {DIFFICULTIES.map(d => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all
                  ${difficulty === d ? 'bg-[var(--magic)] text-white shadow-md shadow-violet-500/30' : 'bg-white/8 text-[var(--stone)] hover:text-[var(--ink)]'}`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Quest list */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-10 text-[var(--stone)]">
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[var(--ink)]/5 flex items-center justify-center">
                  <MapIcon size={24} className="text-[var(--stone-light)]" />
                </div>
                <p className="text-sm font-bold">No quests found. Try different filters.</p>
              </div>
            ) : (
              filtered.map(q => (
                <QuestCard
                  key={q.id}
                  quest={q}
                  activeQuest={activeQuests.find(a => a.questId === q.id)}
                  onAccept={(quest: Quest) => acceptQuest(quest.id)}
                  onComplete={setCompletingQuest}
                  onAbandon={abandonQuest}
                  isParty={!!party}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
