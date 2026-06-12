'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Globe, Heart, Zap, RefreshCw, Compass, Loader2 } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getQuestById } from '@/lib/quests'
import { getCategoryStyle } from '@/lib/categories'
import { fetchPosts, toggleCheer, type CommunityPost } from '@/lib/community'
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

export default function ExplorePage() {
  const router = useRouter()
  const { character, myUserId, activeQuests, acceptQuest, addToast, _hasHydrated } = useStore()
  const [posts, setPosts] = useState<CommunityPost[] | null>(null)
  const [refreshing, setRefreshing] = useState(false)

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
        <h2 className="text-2xl">Explore</h2>
        <p className="text-sm font-semibold text-[var(--stone)]">Real quests, completed by real adventurers</p>
      </div>

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
    </div>
  )
}
