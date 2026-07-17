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
      <div className="flex items-center justify-between pt-6">
        <h1 className="qp-title text-2xl">Profile</h1>
        <Link href="/settings" className="qp-inset w-10 h-10 flex items-center justify-center">
          <Settings size={18} className="text-[var(--qp-gray)]" strokeWidth={2.2} />
        </Link>
      </div>

      {/* Summary card */}
      <div className="qp-card p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <span className="block w-[72px] h-[72px] rounded-full overflow-hidden bg-[var(--qp-inset)] ring-2 ring-[var(--qp-pink)]">
              <Avatar value={character.avatar} size={72} />
            </span>
            <span className="qp-badge qp-num absolute -bottom-1 -right-1 text-[0.6rem] px-1.5 py-0.5"
              style={{ color: 'var(--qp-gold)', background: '#3a2c14', borderColor: 'rgba(255,182,64,0.45)' }}>
              LV {String(level.level).padStart(2, '0')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="qp-title text-lg leading-tight truncate">{character.name}</h2>
            <p className="qp-body text-xs mt-0.5">{level.title} · {character.class}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <Flame size={13} className="text-[var(--qp-gold)] fill-[var(--qp-gold)]" />
              <span className="qp-num text-xs text-[var(--qp-gold)]">{character.streak} day streak</span>
            </div>
          </div>
          <button onClick={() => setEditing(true)}
            className="qp-inset w-9 h-9 flex items-center justify-center shrink-0">
            <Pencil size={14} className="text-[var(--qp-gray)]" />
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

        {character.bio && <p className="qp-body text-xs leading-relaxed">{character.bio}</p>}
      </div>

      <EditProfileModal open={editing} onClose={() => setEditing(false)} />

      {/* Follows + stats */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => router.push('/friends')} className="qp-card p-3.5 text-left">
          <div className="flex items-center justify-around">
            <span className="text-center">
              <span className="qp-num block text-lg text-[var(--qp-cream)]">{follow?.following ?? '—'}</span>
              <span className="qp-overline">Following</span>
            </span>
            <span className="w-px h-7 bg-[rgba(255,244,228,0.08)]" />
            <span className="text-center">
              <span className="qp-num block text-lg text-[var(--qp-cream)]">{follow?.followers ?? '—'}</span>
              <span className="qp-overline">Followers</span>
            </span>
          </div>
        </button>
        <div className="qp-card p-3.5">
          <div className="flex items-center justify-around">
            <span className="text-center">
              <span className="flex items-center justify-center gap-1">
                <CheckCircle2 size={13} className="text-[var(--qp-gold)]" />
                <span className="qp-num text-lg text-[var(--qp-cream)]">{completed}</span>
              </span>
              <span className="qp-overline">Quests</span>
            </span>
            <span className="w-px h-7 bg-[rgba(255,244,228,0.08)]" />
            <span className="text-center">
              <span className="flex items-center justify-center gap-1">
                <Swords size={13} className="text-[var(--qp-pink-text)]" />
                <span className="qp-num text-lg text-[var(--qp-cream)]">{active}</span>
              </span>
              <span className="qp-overline">Active</span>
            </span>
          </div>
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
