'use client'

/* eslint-disable @next/next/no-img-element */
import { Heart, Zap } from 'lucide-react'
import type { CommunityPost } from '@/lib/community'
import { getQuestById } from '@/lib/quests'
import Avatar from '@/components/ui/Avatar'

export function relativeTime(iso: string) {
  const secs = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return 'just now'
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  if (secs < 604800) return `${Math.floor(secs / 86400)}d ago`
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })
}

interface Props {
  post: CommunityPost
  onCheer: () => void
}

export default function FeedPostCard({ post, onCheer }: Props) {
  const quest = getQuestById(post.questId)

  return (
    <article className="qp-card space-y-3 !rounded-[24px] p-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="block w-11 h-11 rounded-full overflow-hidden bg-[var(--qp-inset)] ring-1 ring-[var(--fg-hairline)] shrink-0">
          <Avatar value={post.userAvatar} size={44} />
        </span>
        <div className="flex-1 min-w-0">
          <p className="qp-title text-[0.9rem] leading-tight truncate">{post.userName}</p>
          <p className="qp-body text-[0.7rem] mt-0.5 truncate">
            {quest?.title ?? 'A side quest'} · <span className="qp-num">{relativeTime(post.createdAt)}</span>
          </p>
        </div>
        <span className="qp-badge shrink-0">
          <Zap size={9} className="fill-[var(--fg-ink)]" /> +{post.xp}
        </span>
      </div>

      {/* Media */}
      {post.imageUrls.length > 0 && (
        <img src={post.imageUrls[0]} alt="" className="w-full max-h-64 object-cover rounded-[16px]" loading="lazy" />
      )}

      {/* Note */}
      {post.note && <p className="qp-body text-[0.8rem] leading-relaxed">{post.note}</p>}

      {/* Actions */}
      <div className="flex items-center pt-1">
        <button onClick={onCheer}
          className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 border transition-colors ${
            post.cheeredByMe
              ? 'bg-[var(--fg-ink)] text-white border-[var(--fg-ink)]'
              : 'bg-[var(--fg-canvas)] text-[var(--qp-gray)] border-[var(--fg-hairline)]'
          }`}>
          <Heart size={14} className={post.cheeredByMe ? 'fill-white' : ''} />
          <span className="qp-num text-[0.75rem]">{post.cheers}</span>
        </button>
      </div>
    </article>
  )
}
