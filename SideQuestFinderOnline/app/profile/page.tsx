'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Pencil, Settings, CheckCircle2, Swords, Flame, ChevronRight } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getLevelInfo, getXPProgress } from '@/lib/levels'
import { ACHIEVEMENTS } from '@/lib/achievements'
import Avatar from '@/components/ui/Avatar'
import AchievementCard from '@/components/ui/AchievementCard'
import EditProfileModal from '@/components/EditProfileModal'
import DiaryList from '@/components/DiaryList'

export default function ProfilePage() {
  const router = useRouter()
  const { character, activeQuests, unlockedAchievements, myUserId, _hasHydrated } = useStore()
  const [editing, setEditing] = useState(false)
  const [follow, setFollow] = useState<{ following: number; followers: number } | null>(null)

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) router.replace('/character/create')
  }, [_hasHydrated, character, router])

  // Follow counts (myUserId is seeded by the dashboard's ensureUsername effect)
  useEffect(() => {
    if (!myUserId) return
    import('@/lib/supabase').then(({ supabaseConfigured }) => {
      if (!supabaseConfigured()) return
      import('@/lib/friends').then(async ({ fetchFollowCounts }) => {
        try { setFollow(await fetchFollowCounts(myUserId)) } catch { /* offline */ }
      })
    })
  }, [myUserId])

  if (!_hasHydrated || !character) return null

  const level = getLevelInfo(character.xp)
  const xp = getXPProgress(character.xp)
  const completed = activeQuests.filter(q => q.status === 'completed').length
  const active = activeQuests.filter(q => q.status === 'active').length
  const recentAchs = unlockedAchievements.slice(-3).reverse()

  return (
    <div className="qp-screen space-y-5">
      {/* Title row */}
      <div className="flex items-center justify-between pt-7">
        <h1 className="qp-title text-[1.7rem]">Profile</h1>
        <Link href="/settings"
          className="w-11 h-11 rounded-full flex items-center justify-center bg-[var(--qp-paper)] border border-[rgba(255,244,228,0.1)]">
          <Settings size={18} className="text-[var(--qp-gray)]" strokeWidth={2.2} />
        </Link>
      </div>

      {/* Summary card — folder tab, like home */}
      <div>
        <div className="qp-folder-tab">
          <span className="qp-num text-[0.7rem] text-[var(--qp-gold)] tracking-wide">
            LV {String(level.level).padStart(2, '0')}
          </span>
          <Flame size={11} className="text-[var(--qp-gold)] fill-[var(--qp-gold)]" />
          <span className="qp-num text-[0.7rem] text-[var(--qp-gold)]">{character.streak} day streak</span>
        </div>
        <div className="qp-folder-body p-5 space-y-4">
        <div className="flex items-center gap-4">
          <span className="block w-20 h-20 rounded-full overflow-hidden bg-[var(--qp-inset)] ring-2 ring-[var(--qp-pink)] ring-offset-2 ring-offset-[var(--qp-paper)] shrink-0">
            <Avatar value={character.avatar} size={80} />
          </span>
          <div className="flex-1 min-w-0">
            <h2 className="qp-title text-xl leading-tight truncate">{character.name}</h2>
            <p className="qp-body text-[0.8rem] mt-1">{level.title} · {character.class}</p>
          </div>
          <button onClick={() => setEditing(true)}
            className="qp-inset w-10 h-10 !rounded-full flex items-center justify-center shrink-0">
            <Pencil size={15} className="text-[var(--qp-gray)]" />
          </button>
        </div>

        {/* XP bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="qp-overline">XP</span>
            <span className="qp-num text-[0.65rem] text-[var(--qp-gray)]">
              {xp.needed ? `${xp.current} / ${xp.needed}` : 'MAX LEVEL'}
            </span>
          </div>
          <div className="h-2 rounded-full bg-[var(--qp-inset)] overflow-hidden">
            <div className="h-full rounded-full bg-[var(--qp-pink)] transition-all"
              style={{ width: `${Math.max(4, xp.percent)}%` }} />
          </div>
        </div>

        {character.bio && <p className="qp-body text-[0.8rem] leading-relaxed">{character.bio}</p>}
        </div>
      </div>

      <EditProfileModal open={editing} onClose={() => setEditing(false)} />

      {/* Follows + stats — one roomy strip */}
      <div className="qp-card !rounded-[26px] px-2 py-4">
        <div className="grid grid-cols-4">
          {[
            { value: follow?.following ?? '—', label: 'Following', onClick: () => router.push('/friends') },
            { value: follow?.followers ?? '—', label: 'Followers', onClick: () => router.push('/friends') },
            { value: completed, label: 'Quests' },
            { value: active, label: 'Active' },
          ].map((s, i) => (
            <button key={s.label} onClick={s.onClick} disabled={!s.onClick}
              className={`text-center ${i > 0 ? 'border-l border-[rgba(255,244,228,0.08)]' : ''}`}>
              <span className="qp-num block text-xl text-[var(--qp-cream)]">{s.value}</span>
              <span className="qp-overline text-[0.58rem]">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent achievements */}
      {recentAchs.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="qp-overline">Achievements</span>
            <Link href="/achievements" className="flex items-center text-xs font-extrabold text-[var(--qp-pink-text)]"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
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

      {/* Diary */}
      <div className="space-y-2 pb-4">
        <span className="qp-overline">Quest Diary</span>
        <DiaryList />
      </div>
    </div>
  )
}
