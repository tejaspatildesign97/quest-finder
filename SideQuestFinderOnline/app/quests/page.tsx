'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Swords, Hourglass, Check, Flag, Compass, Loader2, User, Heart, Users, ChevronRight } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getQuestById } from '@/lib/quests'
import { getCategoryStyle } from '@/lib/categories'
import { fetchSentChallenges, type SentChallenge } from '@/lib/community'
import QuestForge from '@/components/QuestForge'
import QuestCard from '@/components/ui/QuestCard'
import Badge from '@/components/ui/Badge'

// Two high-level quest categories going forward: Solo and Multiplayer.
// Party is reached through Multiplayer (no longer a nav destination).
const TABS = ['Solo', 'Multiplayer', 'Active'] as const

const DARE_STATUS: Record<string, { label: string; variant: 'stone' | 'gold' | 'forest' | 'danger'; Icon: typeof Check }> = {
  pending:   { label: 'Waiting',   variant: 'stone',  Icon: Hourglass },
  accepted:  { label: 'Accepted',  variant: 'gold',   Icon: Swords },
  completed: { label: 'Completed', variant: 'forest', Icon: Check },
  declined:  { label: 'Declined',  variant: 'danger', Icon: Flag },
}

export default function QuestsPage() {
  const router = useRouter()
  const { character, activeQuests, setCompletingQuest, abandonQuest, party, onlineParty, playMode, myUserId, _hasHydrated } = useStore()
  const [tab, setTab] = useState<typeof TABS[number]>('Solo')
  const [dares, setDares] = useState<SentChallenge[] | null>(null)

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) router.replace('/character/create')
  }, [_hasHydrated, character])

  // Deep links: /quests?tab=Multiplayer (e.g. from dare notifications)
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('tab')
    if (t && (TABS as readonly string[]).includes(t)) setTab(t as typeof TABS[number])
  }, [])

  useEffect(() => {
    if (tab !== 'Multiplayer' || !myUserId) return
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
            {t === 'Active' ? `Active (${active.length})` : t}
          </button>
        ))}
      </div>

      {/* Solo — the quest forge */}
      {tab === 'Solo' && <QuestForge />}

      {/* Multiplayer — party + dares */}
      {tab === 'Multiplayer' && (
        <div className="space-y-5">
          {/* Party status — the canonical route into party features */}
          <Link href="/party" className="flex items-center gap-3 bg-[var(--surface-2)] rounded-2xl px-4 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.5)] hover:bg-white/8 transition-all">
            <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              playMode === 'solo' ? 'bg-amber-400/15' : playMode === 'couple' ? 'bg-pink-400/15' : 'bg-violet-400/15'}`}>
              {playMode === 'solo' ? <User size={17} className="text-amber-300" />
                : playMode === 'couple' ? <Heart size={17} className="text-pink-300" />
                : <Users size={17} className="text-violet-300" />}
            </span>
            <span className="flex-1">
              <span className="font-display block text-sm">
                {onlineParty ? `Your party · ${onlineParty.name}` : 'Join or create a party'}
              </span>
              <span className="text-xs font-semibold text-[var(--stone)]">
                {onlineParty ? 'Shared XP, shared diary — quest together' : '+20% XP on all quests with friends'}
              </span>
            </span>
            <ChevronRight size={16} className="text-[var(--stone)]" />
          </Link>

          {/* Sent dares */}
          <div className="space-y-2">
            <p className="font-display font-semibold text-[var(--ink)] text-sm">Dares you&apos;ve sent</p>
            {!myUserId || dares?.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <Swords size={26} className="mx-auto text-[var(--stone-light)]" />
                <p className="text-sm font-bold text-[var(--stone)]">No dares sent yet.</p>
                <p className="text-xs font-semibold text-[var(--stone-light)] max-w-xs mx-auto">
                  Hit &quot;Dare&quot; on any quest to challenge a friend — your sent dares and their fate show up here.
                </p>
              </div>
            ) : dares === null ? (
              <div className="text-center py-10"><Loader2 size={26} className="animate-spin mx-auto text-[var(--stone)]" /></div>
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
            )}
          </div>
        </div>
      )}

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

    </div>
  )
}
