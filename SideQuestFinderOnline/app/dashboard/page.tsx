'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Swords, Trophy, Zap, Clock, ChevronRight, PartyPopper, User, Heart, Users } from 'lucide-react'
import { useStore } from '@/lib/store'
import { QUESTS } from '@/lib/quests'
import { ACHIEVEMENTS } from '@/lib/achievements'
import { getCategoryStyle } from '@/lib/categories'
import CharacterCard from '@/components/ui/CharacterCard'
import StreakCounter from '@/components/ui/StreakCounter'
import StatCard from '@/components/ui/StatCard'
import QuestCard from '@/components/ui/QuestCard'
import AchievementCard from '@/components/ui/AchievementCard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

function dayOfYear() {
  const now = new Date()
  return Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
}

function hoursLeftToday() {
  const now = new Date()
  const midnight = new Date(now); midnight.setHours(24, 0, 0, 0)
  const mins = Math.floor((midnight.getTime() - now.getTime()) / 60000)
  return `${Math.floor(mins / 60)}h ${mins % 60}m left`
}

export default function DashboardPage() {
  const router = useRouter()
  const { character, activeQuests, unlockedAchievements, playMode, setPlayMode, acceptQuest, setCompletingQuest, abandonQuest, updateStreak, party, onlineParty, _hasHydrated } = useStore()

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) { router.replace('/character/create'); return }
    updateStreak()
  }, [_hasHydrated, character])

  // Play mode is derived from party status: no party = solo
  useEffect(() => {
    if (!_hasHydrated) return
    const target = onlineParty ? (onlineParty.mode === 'couples' ? 'couple' : 'friends') : 'solo'
    if (playMode !== target) setPlayMode(target)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_hasHydrated, onlineParty?.id, onlineParty?.mode])

  if (!_hasHydrated || !character) return null

  const activeList = activeQuests.filter(q => q.status === 'active')
  const completed  = activeQuests.filter(q => q.status === 'completed')
  const recentAchs = unlockedAchievements.slice(-3).reverse()

  // Daily quests — 3 deterministic picks per day: one quick easy, one medium, one wildcard
  const day = dayOfYear()
  const modePool = QUESTS.filter(q => q.mode.includes(playMode))
  const pickDaily = (pool: typeof QUESTS, salt: number) => pool.length ? pool[(day * 7 + salt * 13) % pool.length] : undefined
  const dailyQuests = [
    pickDaily(modePool.filter(q => q.difficulty === 'Easy'), 1),
    pickDaily(modePool.filter(q => q.difficulty === 'Medium'), 2),
    pickDaily(modePool.filter(q => q.difficulty === 'Hard' || q.difficulty === 'Legendary'), 3),
  ].filter((q, i, arr): q is NonNullable<typeof q> => !!q && arr.findIndex(x => x?.id === q.id) === i)
  const dailyDoneCount = dailyQuests.filter(q => activeQuests.find(a => a.questId === q.id)?.status === 'completed').length

  return (
    <div className="space-y-6">
      {/* Character hero */}
      <CharacterCard character={character} />

      {/* Streak + stats */}
      <div className="scroll-border p-4 space-y-4">
        <StreakCounter streak={character.streak} />
        <div className="grid grid-cols-3 gap-2">
          <StatCard label="Quests" value={completed.length} tile="bg-emerald-400/15"
            icon={<CheckCircle2 size={18} className="text-emerald-400" />} />
          <StatCard label="Active" value={activeList.length} tile="bg-amber-400/15"
            icon={<Swords size={18} className="text-amber-400" />} />
          <StatCard label="Awards" value={unlockedAchievements.length} tile="bg-violet-400/15"
            icon={<Trophy size={18} className="text-violet-400" />} />
        </div>
      </div>

      {/* Play mode — auto from party status */}
      <Link href="/party" className="flex items-center gap-3 bg-[var(--surface-2)] rounded-2xl px-4 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.5)] hover:bg-white/8 transition-all">
        <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${
          playMode === 'solo' ? 'bg-amber-400/15' : playMode === 'couple' ? 'bg-pink-400/15' : 'bg-violet-400/15'}`}>
          {playMode === 'solo' ? <User size={17} className="text-amber-300" />
            : playMode === 'couple' ? <Heart size={17} className="text-pink-300" />
            : <Users size={17} className="text-violet-300" />}
        </span>
        <span className="flex-1">
          <span className="font-display block text-sm">
            {playMode === 'solo' ? 'Solo Mode' : playMode === 'couple' ? `Couples Mode${onlineParty ? ` · ${onlineParty.name}` : ''}` : `Friends Mode${onlineParty ? ` · ${onlineParty.name}` : ''}`}
          </span>
          <span className="text-xs font-semibold text-[var(--stone)]">
            {onlineParty ? 'Set by your party' : 'Join or create a party to unlock Couples & Friends quests'}
          </span>
        </span>
        <ChevronRight size={16} className="text-[var(--stone)]" />
      </Link>

      {/* Daily quests — 3 per day */}
      {dailyQuests.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-display font-semibold text-[var(--ink)]">Daily Quests <span className="text-[var(--quest-gold)]">{dailyDoneCount}/{dailyQuests.length}</span></p>
            <span className="flex items-center gap-1 text-xs font-bold text-[var(--stone)]">
              <Clock size={12} /> {hoursLeftToday()}
            </span>
          </div>
          <div className="space-y-2">
            {dailyQuests.map(dq => {
              const state = activeQuests.find(a => a.questId === dq.id)
              const done = state?.status === 'completed'
              const cat = getCategoryStyle(dq.category)
              return (
                <div key={dq.id} className={`rounded-3xl p-3.5 ${done ? 'bg-[var(--pastel-mint)] opacity-80' : 'bg-[var(--surface-2)] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.5)]'}`}>
                  <div className="flex items-start gap-3">
                    <span className="w-11 h-11 flex items-center justify-center rounded-2xl shadow-md shrink-0"
                      style={{ background: cat.gradient }}>
                      <cat.Icon size={20} className="text-white" strokeWidth={2.2} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-sm">{dq.title}</div>
                      <p className="text-xs font-semibold text-[var(--stone)] leading-relaxed mt-0.5">{dq.description}</p>
                      <p className="text-xs italic text-[var(--stone-light)] mt-0.5">"{dq.lore}"</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        <Badge variant={dq.difficulty === 'Easy' ? 'forest' : dq.difficulty === 'Medium' ? 'gold' : dq.difficulty === 'Hard' ? 'danger' : 'magic'}>{dq.difficulty}</Badge>
                        <Badge variant="gold" icon={<Zap size={11} className="fill-amber-500 text-amber-500" />}>+{dq.xp}</Badge>
                        <Badge variant="stone" icon={<Clock size={11} />}>{dq.duration >= 120 ? '2h+' : dq.duration >= 60 ? `${Math.round(dq.duration / 60)}h` : `${dq.duration}m`}</Badge>
                        <Badge variant="stone">{dq.category}</Badge>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {done ? (
                        <CheckCircle2 size={26} className="text-emerald-500" />
                      ) : state?.status === 'active' ? (
                        <Button size="sm" variant="primary" onClick={() => setCompletingQuest(dq.id)}>Done!</Button>
                      ) : (
                        <Button size="sm" variant="secondary" onClick={() => acceptQuest(dq.id)}>Start</Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Active quests */}
      {activeList.length > 0 && (
        <div className="space-y-3">
          <p className="font-display font-semibold text-[var(--ink)]">Active Quests</p>
          {activeList.map(aq => {
            const q = QUESTS.find(x => x.id === aq.questId)
            if (!q) return null
            return (
              <QuestCard key={aq.questId} quest={q} activeQuest={aq}
                onComplete={setCompletingQuest} onAbandon={abandonQuest} isParty={!!party} />
            )
          })}
        </div>
      )}

      {/* Party bonus promo */}
      {!party && (
        <Link href="/party" className="block rounded-3xl p-5 text-white shadow-lg shadow-violet-500/30 hover:scale-[1.01] transition-transform"
          style={{ background: 'var(--grad-purple)' }}>
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <PartyPopper size={24} />
            </span>
            <div className="flex-1">
              <div className="font-display font-semibold">Party Bonus</div>
              <div className="text-sm font-bold text-white/85">+20% XP on all quests with friends</div>
            </div>
            <ChevronRight size={20} className="opacity-80" />
          </div>
        </Link>
      )}

      {/* Recent achievements */}
      {recentAchs.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="font-display font-semibold text-[var(--ink)]">Recent Achievements</p>
            <Link href="/achievements" className="flex items-center text-xs font-extrabold text-[var(--quest-gold)]">
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {recentAchs.map(id => {
              const ach = ACHIEVEMENTS.find(a => a.id === id)
              if (!ach) return null
              return <AchievementCard key={id} achievement={ach} unlocked={true} />
            })}
          </div>
        </div>
      )}
    </div>
  )
}
