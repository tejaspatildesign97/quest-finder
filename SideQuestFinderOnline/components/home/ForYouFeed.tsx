'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Globe, ChevronRight } from 'lucide-react'
import { useStore } from '@/lib/store'
import { fetchPosts, toggleCheer, type CommunityPost } from '@/lib/community'
import { supabaseConfigured } from '@/lib/supabase'
import FeedPostCard from './FeedPostCard'

const FEED_LIMIT = 10

/** Global community feed for now — upgrade path: filter by followed authors. */
export default function ForYouFeed() {
  const { myUserId, character } = useStore()
  const [posts, setPosts] = useState<CommunityPost[] | null>(null)

  useEffect(() => {
    if (!supabaseConfigured()) { setPosts([]); return }
    let cancelled = false
    fetchPosts(myUserId)
      .then(p => { if (!cancelled) setPosts(p.slice(0, FEED_LIMIT)) })
      .catch(() => { if (!cancelled) setPosts([]) })
    return () => { cancelled = true }
  }, [myUserId])

  const cheer = (post: CommunityPost) => {
    if (!character) return
    // Optimistic toggle, same pattern as /explore
    setPosts(ps => ps?.map(p => p.id === post.id
      ? { ...p, cheeredByMe: !p.cheeredByMe, cheers: p.cheers + (p.cheeredByMe ? -1 : 1) }
      : p) ?? null)
    toggleCheer(post.id, character, post.cheeredByMe).catch(() => {
      setPosts(ps => ps?.map(p => p.id === post.id
        ? { ...p, cheeredByMe: post.cheeredByMe, cheers: post.cheers }
        : p) ?? null)
    })
  }

  if (posts === null) {
    return (
      <div className="space-y-3">
        {[0, 1].map(i => (
          <div key={i} className="qp-card p-3.5 space-y-3 animate-pulse">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full bg-[var(--qp-inset)]" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 w-24 rounded bg-[var(--qp-inset)]" />
                <div className="h-2 w-36 rounded bg-[var(--qp-inset)]" />
              </div>
            </div>
            <div className="h-2.5 w-full rounded bg-[var(--qp-inset)]" />
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="qp-card flex flex-col items-center text-center gap-2.5 px-6 py-8">
        <span className="qp-inset w-12 h-12 flex items-center justify-center">
          <Globe size={22} className="text-[var(--qp-gray)]" strokeWidth={2.2} />
        </span>
        <p className="qp-body text-xs max-w-[220px]">
          No adventures shared yet — complete a quest and be the first on the feed.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {posts.map(p => <FeedPostCard key={p.id} post={p} onCheer={() => cheer(p)} />)}
      <Link href="/explore"
        className="qp-card flex items-center justify-center gap-1 py-3 text-xs font-extrabold text-[var(--qp-pink-text)]"
        style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
        View the full feed <ChevronRight size={14} />
      </Link>
    </div>
  )
}
