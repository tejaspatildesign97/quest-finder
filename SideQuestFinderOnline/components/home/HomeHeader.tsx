'use client'

import Link from 'next/link'
import { Flame } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getLevelInfo, getXPProgress } from '@/lib/levels'
import Avatar from '@/components/ui/Avatar'
import NotificationBell from '@/components/notifications/NotificationBell'
import ChatButton from '@/components/home/ChatButton'

/**
 * Home header per the wireframe: folder-tab profile card — the LV/streak chip
 * sits on a tab growing from the card's top edge, with the bell and chat
 * buttons on the same row as the tab.
 */
export default function HomeHeader() {
  const { character } = useStore()
  if (!character) return null

  const level = getLevelInfo(character.xp)
  const xp = getXPProgress(character.xp)

  return (
    <div className="pt-6">
      {/* Tab row: LV chip left, bell + chat right */}
      <div className="flex items-end justify-between">
        <div className="qp-folder-tab">
          <span className="qp-num text-xs text-[var(--qp-gold)] tracking-wide">
            LV {String(level.level).padStart(2, '0')}
          </span>
          <span className="w-px h-3 bg-[var(--fg-hairline)] mx-1" />
          <Flame size={12} className="text-[var(--qp-gold)] fill-[var(--qp-gold)]" />
          <span className="qp-num text-xs text-[var(--qp-gold)]">{character.streak}</span>
        </div>
        <div className="flex gap-2 pb-2">
          <NotificationBell />
          <ChatButton />
        </div>
      </div>

      {/* Card body */}
      <Link href="/profile" className="qp-folder-body flex items-center gap-4 p-4">
        <span className="block w-14 h-14 rounded-full overflow-hidden bg-[var(--qp-inset)] ring-2 ring-[var(--qp-pink)] shrink-0">
          <Avatar value={character.avatar} size={56} />
        </span>
        <span className="flex-1 min-w-0 block">
          <span className="qp-title block text-lg leading-tight truncate">{character.name}</span>
          <span className="qp-body block text-xs mt-1 truncate">{level.title}</span>
          <span className="flex items-center gap-2.5 mt-2.5">
            <span className="block flex-1 h-1.5 rounded-full bg-[var(--qp-inset)] overflow-hidden">
              <span className="block h-full rounded-full bg-[var(--qp-pink)]"
                style={{ width: `${Math.max(4, xp.percent)}%` }} />
            </span>
            <span className="qp-num text-[0.62rem] text-[var(--qp-gray)] shrink-0">
              {xp.needed ? `${xp.current}/${xp.needed}` : 'MAX'}
            </span>
          </span>
        </span>
      </Link>
    </div>
  )
}
