'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Compass, ChevronRight } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getDailyQuests } from '@/lib/dailyQuests'
import { getQuestById } from '@/lib/quests'
import HomeHeader from '@/components/home/HomeHeader'
import QuestRail from '@/components/home/QuestRail'
import RailQuestCard from '@/components/home/RailQuestCard'
import ForYouFeed from '@/components/home/ForYouFeed'

export default function DashboardPage() {
  const router = useRouter()
  const { character, activeQuests, playMode, setPlayMode, acceptQuest, setCompletingQuest,
          updateStreak, onlineParty, setMyUserId, _hasHydrated } = useStore()

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) { router.replace('/character/create'); return }
    updateStreak()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_hasHydrated, character])

  // Ensure profile/username exists and seed myUserId (feed, notifications and
  // chat all depend on it) — load-bearing, keep on home.
  useEffect(() => {
    if (!_hasHydrated || !character) return
    import('@/lib/supabase').then(({ supabaseConfigured }) => {
      if (!supabaseConfigured()) return
      import('@/lib/friends').then(async ({ ensureUsername }) => {
        try {
          const { userId } = await ensureUsername(character)
          setMyUserId(userId)
        } catch { /* offline or schema not migrated */ }
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_hasHydrated, character?.id])

  // Play mode is derived from party status: no party = solo
  useEffect(() => {
    if (!_hasHydrated) return
    const target = onlineParty ? (onlineParty.mode === 'couples' ? 'couple' : 'friends') : 'solo'
    if (playMode !== target) setPlayMode(target)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_hasHydrated, onlineParty?.id, onlineParty?.mode])

  if (!_hasHydrated || !character) return null

  const suggested = getDailyQuests(playMode, 5)
  const activeList = activeQuests.filter(q => q.status === 'active')

  return (
    <div className="qp-screen space-y-8">
      <HomeHeader />

      {/* Suggested Quest Challenge — lime color block (the signature surface) */}
      <section className="fg-block fg-lime -mx-5 rounded-none px-5 py-6 space-y-4 sm:mx-0 sm:rounded-[24px]">
        <h2 className="qp-section-title">Suggested Quest Challenge</h2>
        <QuestRail>
          {suggested.map(q => {
            const state = activeQuests.find(a => a.questId === q.id && a.status !== 'abandoned')
            return (
              <RailQuestCard key={q.id} quest={q} state={state}
                onStart={() => acceptQuest(q.id)}
                onDone={() => setCompletingQuest(q.id)} />
            )
          })}
        </QuestRail>
      </section>

      {/* Active Quests */}
      <section className="space-y-3.5">
        <h2 className="qp-section-title">Active Quests</h2>
        {activeList.length === 0 ? (
          <Link href="/quests" className="qp-card flex items-center gap-3 p-4">
            <span className="qp-inset w-10 h-10 flex items-center justify-center shrink-0">
              <Compass size={19} className="text-[var(--qp-pink-text)]" strokeWidth={2.2} />
            </span>
            <span className="flex-1">
              <span className="qp-title block text-sm">No active quests</span>
              <span className="qp-body text-xs">Pick an adventure from the quest board.</span>
            </span>
            <ChevronRight size={16} className="text-[var(--qp-gray)]" />
          </Link>
        ) : (
          <QuestRail>
            {activeList.map(aq => {
              const quest = getQuestById(aq.questId)
              if (!quest) return null
              return (
                <RailQuestCard key={aq.id ?? aq.questId} quest={quest} state={aq}
                  onDone={() => setCompletingQuest(aq.questId)} />
              )
            })}
          </QuestRail>
        )}
      </section>

      {/* For You Feed — cream color block */}
      <section className="fg-block fg-cream -mx-5 rounded-none px-5 py-6 space-y-4 sm:mx-0 sm:rounded-[24px] mb-6">
        <h2 className="qp-section-title">For You Feed</h2>
        <ForYouFeed />
      </section>
    </div>
  )
}
