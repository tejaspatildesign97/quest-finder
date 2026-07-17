'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { useStore } from '@/lib/store'
import { fetchUnreadMessageCount, subscribeMessages } from '@/lib/chat'

export default function ChatButton() {
  const myUserId = useStore(s => s.myUserId)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!myUserId) return
    let cancelled = false
    const refresh = () => fetchUnreadMessageCount(myUserId).then(c => { if (!cancelled) setCount(c) })
    refresh()
    const unsub = subscribeMessages(myUserId, () => setCount(c => c + 1))
    window.addEventListener('focus', refresh)
    return () => { cancelled = true; unsub(); window.removeEventListener('focus', refresh) }
  }, [myUserId])

  return (
    <Link href="/chat" aria-label="Messages"
      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative bg-[var(--qp-paper)] border border-[var(--fg-hairline)]">
      <MessageCircle size={19} className="text-[var(--qp-gray)]" strokeWidth={2.2} />
      {count > 0 && (
        <span className="qp-num absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--fg-magenta)] text-white text-[0.6rem] flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  )
}
