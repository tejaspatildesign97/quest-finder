'use client'

import Link from 'next/link'
import { Flame } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getLevelInfo, getXPProgress } from '@/lib/levels'
import Avatar from '@/components/ui/Avatar'
import NotificationBell from '@/components/notifications/NotificationBell'
import ChatButton from '@/components/home/ChatButton'

/**
 * Home header: compact profile summary (→ /profile) + notification bell and
 * chat entry points. The bell/chat tiles are inert shells until the
 * notifications (Phase 4) and chat (Phase 5) systems wire them up.
 */
export default function HomeHeader() {
  const { character } = useStore()
  if (!character) return null

  const level = getLevelInfo(character.xp)
  const xp = getXPProgress(character.xp)

  return (
    <div className="space-y-3 pt-6">
      <div className="flex items-center gap-2.5">
        {/* Profile summary card */}
        <Link href="/profile" className="qp-card flex-1 min-w-0 flex items-center gap-3 p-3">
          <div className="relative shrink-0">
            <span className="block w-12 h-12 rounded-full overflow-hidden bg-[var(--qp-inset)] ring-2 ring-[var(--qp-pink)]">
              <Avatar value={character.avatar} size={48} />
            </span>
            <span className="qp-badge qp-num absolute -bottom-1.5 left-1/2 -translate-x-1/2 text-[0.5rem] px-1 py-0"
              style={{ color: 'var(--qp-gold)', background: '#3a2c14', borderColor: 'rgba(255,182,64,0.45)' }}>
              LV{String(level.level).padStart(2, '0')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="qp-title text-[0.95rem] leading-tight truncate">{character.name}</h2>
            <p className="qp-body text-[0.68rem] truncate flex items-center gap-1.5">
              {level.title}
              <Flame size={10} className="text-[var(--qp-gold)] fill-[var(--qp-gold)] shrink-0" />
              <span className="qp-num text-[var(--qp-gold)]">{character.streak}</span>
            </p>
            <div className="h-1.5 rounded-full bg-[var(--qp-inset)] overflow-hidden mt-1.5">
              <div className="h-full rounded-full bg-[var(--qp-pink)]"
                style={{ width: `${Math.max(4, xp.percent)}%` }} />
            </div>
          </div>
        </Link>

        {/* Notifications + chat */}
        <NotificationBell />
        <ChatButton />
      </div>
    </div>
  )
}
