'use client'

import Link from 'next/link'
import { Flame } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getLevelInfo, getXPProgress } from '@/lib/levels'
import Avatar from '@/components/ui/Avatar'
import NotificationBell from '@/components/notifications/NotificationBell'
import ChatButton from '@/components/home/ChatButton'

/**
 * Home header per the wireframe: a folder-tab profile card (the LV chip sits
 * on a tab that grows out of the card's top edge) with round bell/chat
 * buttons floating beside it.
 */
export default function HomeHeader() {
  const { character } = useStore()
  if (!character) return null

  const level = getLevelInfo(character.xp)
  const xp = getXPProgress(character.xp)

  return (
    <div className="pt-7 flex items-end gap-3">
      {/* Folder-tab profile card */}
      <div className="flex-1 min-w-0">
        <div className="qp-folder-tab">
          <span className="qp-num text-[0.68rem] text-[var(--qp-gold)] tracking-wide">
            LV {String(level.level).padStart(2, '0')}
          </span>
          <Flame size={11} className="text-[var(--qp-gold)] fill-[var(--qp-gold)]" />
          <span className="qp-num text-[0.68rem] text-[var(--qp-gold)]">{character.streak}</span>
        </div>
        <Link href="/profile" className="qp-folder-body flex items-center gap-3.5 p-4 pr-5">
          <span className="block w-14 h-14 rounded-full overflow-hidden bg-[var(--qp-inset)] ring-2 ring-[var(--qp-pink)] ring-offset-2 ring-offset-[var(--qp-paper)] shrink-0">
            <Avatar value={character.avatar} size={56} />
          </span>
          <span className="flex-1 min-w-0 block">
            <span className="qp-title block text-lg leading-tight truncate">{character.name}</span>
            <span className="qp-body block text-xs mt-0.5 truncate">{level.title}</span>
            <span className="block h-1.5 rounded-full bg-[var(--qp-inset)] overflow-hidden mt-2.5">
              <span className="block h-full rounded-full bg-[var(--qp-pink)]"
                style={{ width: `${Math.max(4, xp.percent)}%` }} />
            </span>
          </span>
        </Link>
      </div>

      {/* Round bell + chat, stacked beside the card */}
      <div className="flex flex-col gap-2.5 shrink-0 pb-1">
        <NotificationBell />
        <ChatButton />
      </div>
    </div>
  )
}
