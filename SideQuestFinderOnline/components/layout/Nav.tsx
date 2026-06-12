'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, BookOpen, Globe, User, Swords } from 'lucide-react'
import { useStore } from '@/lib/store'

const NAV_ITEMS = [
  { href: '/dashboard',    Icon: Home,     label: 'Home',    activeBg: 'bg-[var(--pastel-orange)]', activeText: 'text-amber-400' },
  { href: '/quests',       Icon: Compass,  label: 'Quests',  activeBg: 'bg-[var(--pastel-mint)]',   activeText: 'text-emerald-400' },
  { href: '/journal',      Icon: BookOpen, label: 'Diary',   activeBg: 'bg-[var(--pastel-blue)]',   activeText: 'text-cyan-400' },
  { href: '/explore',      Icon: Globe,    label: 'Explore', activeBg: 'bg-[var(--pastel-mint)]',   activeText: 'text-emerald-400' },
  { href: '/profile',      Icon: User,     label: 'Profile', activeBg: 'bg-[var(--pastel-pink)]',   activeText: 'text-pink-400' },
  { href: '/party',        Icon: Swords,   label: 'Party',   activeBg: 'bg-[var(--pastel-purple)]', activeText: 'text-violet-400' },
]

const MODE_COLOR: Record<string, string> = {
  solo:  'bg-[var(--quest-gold)]',
  couple:  'bg-pink-400',
  friends: 'bg-[var(--magic)]',
}

export default function Nav() {
  const pathname = usePathname()
  const { character, playMode } = useStore()

  if (!character) return null

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 max-w-lg mx-auto bg-[#16161c]/85 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)] safe-area-bottom">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {NAV_ITEMS.map(({ href, Icon, label, activeBg, activeText }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-1.5 py-1.5 transition-all duration-150"
            >
              <span className={`relative px-3 py-1 rounded-full transition-all ${active ? activeBg : ''}`}>
                <Icon
                  size={21}
                  strokeWidth={active ? 2.5 : 2}
                  className={active ? activeText : 'text-[var(--stone-light)]'}
                />
                {href === '/party' && (
                  <span className={`absolute top-0.5 right-2 w-2 h-2 rounded-full border-2 border-white ${MODE_COLOR[playMode]}`} />
                )}
              </span>
              <span className={`text-[0.6rem] font-extrabold ${active ? activeText : 'text-[var(--stone-light)]'}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
