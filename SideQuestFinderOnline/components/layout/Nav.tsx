'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Map, Globe } from 'lucide-react'
import { useStore } from '@/lib/store'
import { avatarUrl } from '@/components/ui/Avatar'

const NAV_ITEMS = [
  { href: '/dashboard', Icon: Home,    label: 'Home' },
  { href: '/quests',    Icon: Compass, label: 'Quests' },
  { href: '/map',       Icon: Map,     label: 'Map' },
  { href: '/explore',   Icon: Globe,   label: 'Feed' },
  { href: '/profile',   Icon: null,    label: 'Profile' },
] as const

export default function Nav() {
  const pathname = usePathname()
  const { character } = useStore()

  if (!character) return null

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-40 max-w-lg mx-auto qp-dock safe-area-bottom">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16">
        {NAV_ITEMS.map(({ href, Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-1.5 py-1.5 transition-all duration-150"
            >
              {Icon ? (
                <span className={active ? 'qp-nav-glow' : ''}>
                  <Icon
                    size={24}
                    strokeWidth={2.2}
                    className={active ? 'text-white' : 'text-[var(--qp-gray)]'}
                    fill={active ? 'rgba(255,255,255,0.18)' : 'none'}
                  />
                </span>
              ) : (
                <span
                  className={`w-6 h-6 rounded-full overflow-hidden bg-[var(--qp-inset)] ${
                    active ? 'ring-2 ring-white qp-nav-glow' : 'ring-1 ring-[rgba(255,244,228,0.2)]'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={avatarUrl(character.avatar, 48)} alt="Profile" className="w-full h-full" />
                </span>
              )}
              <span
                className={`text-[0.6rem] font-extrabold ${active ? 'text-white' : 'text-[var(--qp-gray)]'}`}
                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
