'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Swords, Hourglass, Check, Flag, Compass, Loader2 } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getQuestById } from '@/lib/quests'
import { getCategoryStyle } from '@/lib/categories'
import { fetchSentChallenges, type SentChallenge } from '@/lib/community'
import QuestForge from '@/components/QuestForge'
import QuestCard from '@/components/ui/QuestCard'
import Badge from '@/components/ui/Badge'

const TABS = ['Forge', 'Active', 'Dares'] as const

const DARE_STATUS: Record<string, { label: string; variant: 'stone' | 'gold' | 'forest' | 'danger'; Icon: typeof Check }> = {
  pending:   { label: 'Waiting',   variant: 'stone',  Icon: Hourglass },
  accepted:  { label: 'Accepted',  variant: 'gold',   Icon: Swords },
  completed: { label: 'Completed', variant: 'forest', Icon: Check },
  declined:  { label: 'Declined',  variant: 'danger', Icon: Flag },
}

export default function QuestsPage() {
  const router = useRouter()
  const { character, activeQuests, setCompletingQuest, abandonQuest, party, myUserId, _hasHydrated } = useStore()
  const [tab, setTab] = useState<typeof TABS[number]>('Forge')
  const [dares, setDares] = useState<SentChallenge[] | null>(null)

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) router.replace('/character/create')
  }, [_hasHydrated, character])

  useEffect(() => {
    if (tab !== 'Dares' || !myUserId) return
    fetchSentChallenges(myUserId).then(setDares).catch(() => setDares([]))
  }, [tab, myUserId])

  if (!_hasHydrated || !character) return null

  const active = activeQuests.filter(q => q.status === 'active')

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl">Quests</h2>
        <p className="text-sm font-semibold text-[var(--stone)]">Forge new adventures · track what&apos;s in motion</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[var(--ink)]/5 rounded-2xl p-1">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all
              ${tab === t ? 'bg-[var(--surface-2)] text-[var(--ink)] shadow-sm' : 'text-[var(--stone)] hover:text-[var(--ink)]'}`}>
            {t === 'Active' ? `Active (${active.length})` : t === 'Dares' ? 'Dares ⚔' : '🔨 Forge'}
          </button>
        ))}
      </div>

      {/* Forge */}
      {tab === 'Forge' && <QuestForge />}

      {/* Active quests */}
      {tab === 'Active' && (
        active.length === 0 ? (
          <div className="text-center py-14 space-y-2">
            <Compass size={28} className="mx-auto text-[var(--stone-light)]" />
            <p className="text-sm font-bold text-[var(--stone)]">No active quests.</p>
            <p className="text-xs font-semibold text-[var(--stone-light)]">Forge one to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {active.map(aq => {
              const q = getQuestById(aq.questId)
              if (!q) return null
              return (
                <QuestCard key={aq.questId} quest={q} activeQuest={aq}
                  onComplete={setCompletingQuest} onAbandon={abandonQuest} isParty={!!party} />
              )
            })}
          </div>
        )
      )}

      {/* Sent dares */}
      {tab === 'Dares' && (
        !myUserId ? (
          <div className="text-center py-14 space-y-2">
            <Swords size={28} className="mx-auto text-[var(--stone-light)]" />
            <p className="text-sm font-bold text-[var(--stone)]">No dares sent yet.</p>
            <p className="text-xs font-semibold text-[var(--stone-light)] max-w-xs mx-auto">Hit &quot;Dare&quot; on any quest to challenge a friend — your sent dares and their fate show up here.</p>
          </div>
        ) : dares === null ? (
          <div className="text-center py-14"><Loader2 size={26} className="animate-spin mx-auto text-[var(--stone)]" /></div>
        ) : dares.length === 0 ? (
          <div className="text-center py-14 space-y-2">
            <Swords size={28} className="mx-auto text-[var(--stone-light)]" />
            <p className="text-sm font-bold text-[var(--stone)]">No dares sent yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {dares.map(d => {
              const q = getQuestById(d.questId)
              if (!q) return null
              const cat = getCategoryStyle(q.category)
              const st = DARE_STATUS[d.status]
              return (
                <div key={d.id} className="flex items-center gap-3 bg-[var(--surface-2)] rounded-2xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cat.tile}`}>
                    <cat.Icon size={17} className={cat.iconColor} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">{q.title}</p>
                    <p className="text-xs font-semibold text-[var(--stone-light)]">
                      {d.acceptedName
                        ? <>Taken by <span className="text-[var(--quest-gold)]">{d.acceptedName}</span> · {new Date(d.createdAt).toLocaleDateString()}</>
                        : <>Awaiting a taker · {new Date(d.createdAt).toLocaleDateString()}</>}
                    </p>
                  </div>
                  <Badge variant={st.variant} icon={<st.Icon size={11} />}>{st.label}</Badge>
                </div>
              )
            })}
          </div>
        )
      )}
    </div>
  )
}
