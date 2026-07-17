'use client'

import { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import { useStore } from '@/lib/store'
import { fetchUnreadNotificationCount, subscribeNotifications } from '@/lib/notifications'
import NotificationPanel from './NotificationPanel'

export default function NotificationBell() {
  const myUserId = useStore(s => s.myUserId)
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!myUserId) return
    let cancelled = false
    const refresh = () => fetchUnreadNotificationCount(myUserId).then(c => { if (!cancelled) setCount(c) })
    refresh()
    const unsub = subscribeNotifications(myUserId, () => setCount(c => c + 1))
    window.addEventListener('focus', refresh) // fallback if realtime drops
    return () => { cancelled = true; unsub(); window.removeEventListener('focus', refresh) }
  }, [myUserId])

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Notifications"
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative bg-[var(--qp-paper)] border border-[rgba(255,244,228,0.1)] shadow-[0_8px_16px_rgba(0,0,0,0.4)]">
        <Bell size={19} className="text-[var(--qp-gray)]" strokeWidth={2.2} />
        {count > 0 && (
          <span className="qp-num absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--qp-coral)] text-white text-[0.6rem] flex items-center justify-center">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </button>
      <NotificationPanel open={open} onClose={() => { setOpen(false); setCount(0) }} />
    </>
  )
}
