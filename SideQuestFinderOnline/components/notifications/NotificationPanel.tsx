'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BellOff, X } from 'lucide-react'
import { useStore } from '@/lib/store'
import { fetchNotifications, markAllNotificationsRead, type Notification } from '@/lib/notifications'
import { relativeTime } from '@/components/home/FeedPostCard'
import Avatar from '@/components/ui/Avatar'

const MESSAGE: Record<Notification['type'], string> = {
  follow: 'started following you',
  cheer: 'cheered your quest',
  dare_accepted: 'accepted your dare',
  dare_completed: 'completed your dare!',
}

const LINK: Record<Notification['type'], string> = {
  follow: '/friends',
  cheer: '/explore',
  dare_accepted: '/quests?tab=Multiplayer',
  dare_completed: '/quests?tab=Multiplayer',
}

export default function NotificationPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter()
  const myUserId = useStore(s => s.myUserId)
  const [items, setItems] = useState<Notification[] | null>(null)

  useEffect(() => {
    if (!open || !myUserId) return
    let cancelled = false
    fetchNotifications(myUserId).then(list => {
      if (cancelled) return
      setItems(list)
      // Mark read on open; unread rows keep their pink dot for this render.
      markAllNotificationsRead(myUserId)
    })
    return () => { cancelled = true }
  }, [open, myUserId])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute left-4 right-4 top-16 max-w-lg mx-auto qp-card max-h-[70vh] overflow-y-auto no-scrollbar"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 pt-4 pb-2 sticky top-0 bg-[var(--qp-paper)]">
          <h2 className="qp-title text-base">Notifications</h2>
          <button onClick={onClose} aria-label="Close"
            className="qp-inset w-8 h-8 flex items-center justify-center">
            <X size={15} className="text-[var(--qp-gray)]" />
          </button>
        </div>

        {items === null ? (
          <div className="px-4 pb-5 space-y-3">
            {[0, 1, 2].map(i => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <span className="w-9 h-9 rounded-full bg-[var(--qp-inset)]" />
                <span className="h-2.5 flex-1 rounded bg-[var(--qp-inset)]" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-2.5 px-6 py-10 text-center">
            <span className="qp-inset w-12 h-12 flex items-center justify-center">
              <BellOff size={20} className="text-[var(--qp-gray)]" strokeWidth={2.2} />
            </span>
            <p className="qp-body text-xs">All quiet, adventurer.</p>
          </div>
        ) : (
          <div className="px-2 pb-3">
            {items.map(n => (
              <button key={n.id}
                onClick={() => { onClose(); router.push(LINK[n.type]) }}
                className="w-full flex items-center gap-3 px-2 py-2.5 rounded-[14px] hover:bg-[var(--qp-inset)] transition-colors text-left">
                <span className="block w-9 h-9 rounded-full overflow-hidden bg-[var(--qp-inset)] ring-1 ring-[rgba(255,244,228,0.2)] shrink-0">
                  <Avatar value={n.actorAvatar} size={36} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="qp-body block text-xs leading-snug">
                    <span className="qp-title text-xs">{n.actorName}</span>{' '}{MESSAGE[n.type]}
                  </span>
                  <span className="qp-num text-[0.62rem] text-[var(--qp-gray)]">{relativeTime(n.createdAt)}</span>
                </span>
                {!n.readAt && <span className="w-2 h-2 rounded-full bg-[var(--qp-pink)] shrink-0" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
