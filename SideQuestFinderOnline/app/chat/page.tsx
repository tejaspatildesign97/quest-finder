'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, PenSquare, X } from 'lucide-react'
import { useStore } from '@/lib/store'
import { fetchConversations, type Conversation } from '@/lib/chat'
import { relativeTime } from '@/components/home/FeedPostCard'
import Avatar from '@/components/ui/Avatar'
import type { FriendProfile } from '@/lib/friends'

export default function ChatListPage() {
  const { myUserId, character } = useStore()
  const [convos, setConvos] = useState<Conversation[] | null>(null)
  const [picking, setPicking] = useState(false)
  const [contacts, setContacts] = useState<FriendProfile[] | null>(null)

  useEffect(() => {
    if (!myUserId) return
    let cancelled = false
    fetchConversations(myUserId).then(c => { if (!cancelled) setConvos(c) })
    return () => { cancelled = true }
  }, [myUserId])

  // Friend picker: people you follow + your followers, deduped
  useEffect(() => {
    if (!picking || !myUserId || contacts) return
    import('@/lib/friends').then(async ({ fetchFriends, fetchFollowers }) => {
      try {
        const [a, b] = await Promise.all([fetchFriends(myUserId), fetchFollowers(myUserId)])
        const seen = new Set<string>()
        setContacts([...a, ...b].filter(p => !seen.has(p.id) && seen.add(p.id) !== undefined))
      } catch { setContacts([]) }
    })
  }, [picking, myUserId, contacts])

  if (!character) return null

  return (
    <div className="qp-screen space-y-4">
      <div className="flex items-center justify-between pt-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="qp-inset w-9 h-9 flex items-center justify-center">
            <ArrowLeft size={16} className="text-[var(--qp-gray)]" />
          </Link>
          <h1 className="qp-title text-2xl">Messages</h1>
        </div>
        <button onClick={() => setPicking(p => !p)} aria-label="New message"
          className="qp-btn-primary w-10 h-10 !p-0">
          {picking ? <X size={17} /> : <PenSquare size={16} />}
        </button>
      </div>

      {/* New-message picker */}
      {picking && (
        <div className="qp-card p-3 space-y-1">
          <p className="qp-overline px-1 pb-1">Start a conversation</p>
          {contacts === null ? (
            <p className="qp-body text-xs px-1 py-2">Loading your people…</p>
          ) : contacts.length === 0 ? (
            <p className="qp-body text-xs px-1 py-2">
              No connections yet — follow adventurers from the <Link href="/friends" className="text-[var(--qp-pink-text)] font-bold">Friends</Link> page first.
            </p>
          ) : contacts.map(c => (
            <Link key={c.id} href={`/chat/${c.id}`}
              className="flex items-center gap-3 px-1.5 py-2 rounded-[14px] hover:bg-[var(--qp-inset)] transition-colors">
              <span className="block w-9 h-9 rounded-full overflow-hidden bg-[var(--qp-inset)] ring-1 ring-[var(--fg-hairline)]">
                <Avatar value={c.avatar} size={36} />
              </span>
              <span className="qp-title text-sm flex-1 truncate">{c.name}</span>
              <span className="qp-body text-[0.65rem]">@{c.username}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Conversations */}
      {convos === null ? (
        <div className="qp-card p-4 space-y-4 animate-pulse">
          {[0, 1, 2].map(i => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-full bg-[var(--qp-inset)]" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 w-24 rounded bg-[var(--qp-inset)]" />
                <div className="h-2 w-40 rounded bg-[var(--qp-inset)]" />
              </div>
            </div>
          ))}
        </div>
      ) : convos.length === 0 ? (
        <div className="qp-card flex flex-col items-center text-center gap-3 px-6 py-12">
          <span className="qp-inset w-14 h-14 flex items-center justify-center">
            <MessageCircle size={24} className="text-[var(--qp-pink-text)]" strokeWidth={2.2} />
          </span>
          <p className="qp-body text-xs max-w-[220px]">
            Start a conversation with a fellow adventurer — tap the pen up top.
          </p>
        </div>
      ) : (
        <div className="qp-card px-2 py-2">
          {convos.map(c => (
            <Link key={c.peerId} href={`/chat/${c.peerId}`}
              className="flex items-center gap-3 px-2 py-2.5 rounded-[14px] hover:bg-[var(--qp-inset)] transition-colors">
              <span className="block w-11 h-11 rounded-full overflow-hidden bg-[var(--qp-inset)] ring-1 ring-[var(--fg-hairline)] shrink-0">
                <Avatar value={c.peerAvatar} size={44} />
              </span>
              <span className="flex-1 min-w-0">
                <span className="qp-title block text-sm truncate">{c.peerName}</span>
                <span className={`block text-xs truncate ${c.unread ? 'text-[var(--qp-cream)] font-bold' : 'text-[var(--qp-gray)]'}`}
                  style={{ fontFamily: 'var(--font-fsans), sans-serif' }}>
                  {c.lastFromMe ? 'You: ' : ''}{c.lastBody}
                </span>
              </span>
              <span className="flex flex-col items-end gap-1 shrink-0">
                <span className="qp-num text-[0.6rem] text-[var(--qp-gray)]">{relativeTime(c.lastAt)}</span>
                {c.unread > 0 && (
                  <span className="qp-num min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--fg-magenta)] text-white text-[0.6rem] flex items-center justify-center">
                    {c.unread > 9 ? '9+' : c.unread}
                  </span>
                )}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
