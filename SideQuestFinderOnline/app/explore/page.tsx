'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Globe, Heart, Zap, RefreshCw, Compass, Loader2, Trophy, Crown } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getQuestById } from '@/lib/quests'
import { getCategoryStyle } from '@/lib/categories'
import { fetchPosts, toggleCheer, fetchLeaderboard, type CommunityPost, type LeaderboardRow } from '@/lib/community'
import { supabaseConfigured } from '@/lib/supabase'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'

function timeAgo(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`
  return `${Math.floor(mins / 1440)}d ago`
}

function PostCard({ post, onCheer, onTry, tried }: {
  post: CommunityPost
  onCheer: (p: CommunityPost) => void
  onTry: (questId: string) => void
  tried: boolean
}) {
  const quest = getQuestById(post.questId)
  if (!quest) return null
  const cat = getCategoryStyle(quest.category)

  return (
    <article className="rounded-3xl bg-[var(--surface-2)] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.5)]">
      <div className="h-1.5" style={{ background: cat.gradient }} />
      <div className="p-4 space-y-3">
        {/* Author */}
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-full overflow-hidden bg-[var(--pastel-orange)] flex items-center justify-center shrink-0">
            <Avatar value={post.userAvatar} size={34} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-extrabold truncate">{post.userName}</p>
            <p className="text-[0.65rem] font-bold text-[var(--stone-light)]">{timeAgo(post.createdAt)}</p>
          </div>
          <Badge variant="gold" icon={<Zap size={11} className="fill-amber-500 text-amber-500" />}>+{post.xp}</Badge>
        </div>

        {/* Quest */}
        <div className="flex items-center gap-2.5 bg-white/4 rounded-2xl p-2.5">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md" style={{ background: cat.gradient }}>
            <cat.Icon size={16} className="text-white" strokeWidth={2.2} />
          </span>
          <div className="min-w-0">
            <p className="font-display text-sm truncate">{quest.title}</p>
            <p className="text-[0.65rem] font-bold text-[var(--stone)]">{quest.difficulty} · {quest.category}</p>
          </div>
        </div>

        {/* Story */}
        {post.note && <p className="text-sm font-medium text-[var(--ink)]/90 leading-relaxed">{post.note}</p>}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/5">
          <button onClick={() => onCheer(post)}
            className={`flex items-center gap-1.5 text-xs font-extrabold rounded-full px-3 py-1.5 transition-all
              ${post.cheeredByMe ? 'bg-pink-500/20 text-pink-300' : 'bg-white/8 text-[var(--stone)] hover:text-[var(--ink)]'}`}>
            <Heart size={13} className={post.cheeredByMe ? 'fill-pink-400 text-pink-400' : ''} />
            {post.cheers > 0 ? post.cheers : 'Cheer'}
          </button>
          <div className="flex-1" />
          <Button size="sm" variant={tried ? 'ghost' : 'secondary'} onClick={() => onTry(quest.id)} disabled={tried}>
            {tried ? 'On your board ✓' : 'Try this quest'}
          </Button>
        </div>
      </div>
    </article>
  )
}

function GapBars() {
  return (
    <div className="flex flex-col items-center gap-1 py-2" aria-hidden>
      <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
      <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
      <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
    </div>
  )
}

function LeaderRow({ row, me }: { row: LeaderboardRow; me: boolean }) {
  const medal = row.rank === 1 ? 'text-amber-400' : row.rank === 2 ? 'text-slate-300' : row.rank === 3 ? 'text-orange-400' : null
  return (
    <div className={`flex items-center gap-3 rounded-2xl px-3.5 py-2.5 ${
      me ? 'bg-[var(--pastel-orange)] ring-2 ring-amber-400/60 shadow-lg shadow-amber-500/10'
         : 'bg-[var(--surface-2)] shadow-[0_1px_3px_rgba(0,0,0,0.5)]'}`}>
      <span className={`w-7 text-center font-display text-sm ${medal ?? 'text-[var(--stone)]'}`}>
        {row.rank <= 3 ? <Crown size={15} className={`inline ${medal}`} /> : row.rank}
      </span>
      <span className="w-8 h-8 rounded-full overflow-hidden bg-[var(--pastel-orange)] flex items-center justify-center shrink-0">
        <Avatar value={row.avatar} size={30} />
      </span>
      <span className={`flex-1 text-sm font-extrabold truncate ${me ? 'text-amber-300' : ''}`}>
        {row.name}{me ? ' (you)' : ''}
      </span>
      <span className="flex items-center gap-1 text-xs font-extrabold text-[var(--quest-gold)]">
        <Zap size={11} className="fill-amber-500 text-amber-500" /> {row.totalXp.toLocaleString()}
      </span>
    </div>
  )
}

function Leaderboard({ myUserId }: { myUserId: string | null }) {
  const [rows, setRows] = useState<LeaderboardRow[] | null>(null)

  useEffect(() => {
    fetchLeaderboard().then(setRows).catch(() => setRows([]))
  }, [])

  if (rows === null) return <div className="text-center py-16"><Loader2 size={28} className="animate-spin mx-auto text-[var(--stone)]" /></div>

  if (rows.length === 0) {
    return (
      <div className="text-center py-14 space-y-3">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-white/5 flex items-center justify-center">
          <Trophy size={28} className="text-[var(--stone-light)]" />
        </div>
        <p className="text-sm font-bold text-[var(--stone)]">No rankings yet this month.</p>
        <p className="text-xs font-semibold text-[var(--stone-light)]">Complete any quest to enter the board.</p>
      </div>
    )
  }

  const myIdx = myUserId ? rows.findIndex(r => r.userId === myUserId) : -1
  const top = rows.slice(0, 50)
  const showAroundMe = myIdx >= 50
  const around = showAroundMe ? rows.slice(Math.max(50, myIdx - 5), Math.min(rows.length, myIdx + 4)) : []
  const moreBelow = showAroundMe ? rows.length > myIdx + 4 : rows.length > 50

  const monthName = new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })

  return (
    <div className="space-y-2">
      <p className="text-center text-xs font-extrabold text-[var(--stone)] uppercase tracking-widest">{monthName} · resets monthly</p>
      {top.map(r => <LeaderRow key={r.userId} row={r} me={r.userId === myUserId} />)}
      {showAroundMe && <GapBars />}
      {around.map(r => <LeaderRow key={r.userId} row={r} me={r.userId === myUserId} />)}
      {moreBelow && <GapBars />}
      {myIdx === -1 && (
        <p className="text-center text-xs font-semibold text-[var(--stone-light)] pt-2">
          You're not on the board yet — complete a quest this month to claim a rank.
        </p>
      )}
    </div>
  )
}

export default function ExplorePage() {
  const router = useRouter()
  const { character, myUserId, activeQuests, acceptQuest, addToast, _hasHydrated } = useStore()
  const [posts, setPosts] = useState<CommunityPost[] | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [tab, setTab] = useState<'Feed' | 'Leaderboard'>('Feed')

  const load = useCallback(async () => {
    setRefreshing(true)
    try { setPosts(await fetchPosts(myUserId)) }
    catch { setPosts([]) }
    setRefreshing(false)
  }, [myUserId])

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) { router.replace('/character/create'); return }
    if (supabaseConfigured()) load()
  }, [_hasHydrated, character, load])

  if (!_hasHydrated || !character) return null

  const handleCheer = async (post: CommunityPost) => {
    // optimistic
    setPosts(ps => (ps ?? []).map(p => p.id === post.id
      ? { ...p, cheeredByMe: !p.cheeredByMe, cheers: p.cheers + (p.cheeredByMe ? -1 : 1) }
      : p))
    try { await toggleCheer(post.id, character, post.cheeredByMe) } catch { /* revert on next load */ }
  }

  const handleTry = (questId: string) => {
    acceptQuest(questId)
    addToast({ type: 'xp', message: 'Quest added to your board!', icon: '🗺️' })
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl">Community</h2>
        <p className="text-sm font-semibold text-[var(--stone)]">Real quests, completed by real adventurers</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[var(--ink)]/5 rounded-2xl p-1">
        {(['Feed', 'Leaderboard'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all
              ${tab === t ? 'bg-[var(--surface-2)] text-[var(--ink)] shadow-sm' : 'text-[var(--stone)] hover:text-[var(--ink)]'}`}>
            {t === 'Leaderboard' ? '🏆 Leaderboard' : '🌍 Feed'}
          </button>
        ))}
      </div>

      {tab === 'Leaderboard' ? (
        <Leaderboard myUserId={myUserId} />
      ) : (
      <>
      <div className="flex justify-end">
        <button onClick={load} disabled={refreshing}
          className="flex items-center gap-1.5 text-xs font-extrabold text-[var(--stone)] hover:text-[var(--ink)] bg-white/5 rounded-full px-3 py-1.5 transition-all">
          {refreshing ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />} Refresh
        </button>
      </div>

      {posts === null ? (
        <div className="text-center py-16"><Loader2 size={28} className="animate-spin mx-auto text-[var(--stone)]" /></div>
      ) : posts.length === 0 ? (
        <div className="text-center py-14 space-y-3">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-white/5 flex items-center justify-center">
            <Globe size={28} className="text-[var(--stone-light)]" />
          </div>
          <p className="text-sm font-bold text-[var(--stone)]">No shared quests yet.</p>
          <p className="text-xs font-semibold text-[var(--stone-light)] max-w-xs mx-auto">
            Be the first — complete a quest and tick "Share to Community" to put your story here.
          </p>
          <Button size="sm" variant="secondary" icon={<Compass size={14} />} onClick={() => router.push('/quests')}>
            Find a quest
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map(p => (
            <PostCard key={p.id} post={p}
              onCheer={handleCheer} onTry={handleTry}
              tried={!!activeQuests.find(a => a.questId === p.questId && a.status !== 'abandoned')} />
          ))}
        </div>
      )}
      </>
      )}
    </div>
  )
}
