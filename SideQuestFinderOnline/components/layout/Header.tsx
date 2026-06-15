'use client'

import Link from 'next/link'
import { Map, Settings } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getLevelInfo } from '@/lib/levels'

export default function Header() {
  const { character } = useStore()
  const levelInfo = character ? getLevelInfo(character.xp) : null

  return (
    <header className="sticky top-0 z-10 bg-[var(--parchment)]/90 backdrop-blur-md px-4 py-3 border-b border-[var(--ink)]/5">
      <div className="max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-md shadow-amber-500/30" style={{ background: 'var(--grad-orange)' }}>
            <Map size={18} className="text-white" strokeWidth={2.5} />
          </span>
          <div>
            <h1 className="font-display font-semibold text-base leading-none text-[var(--ink)]">
              Side Quest <span className="text-[var(--quest-gold)]">Finder</span>
            </h1>
            <p className="text-xs text-[var(--stone)] mt-0.5 font-bold">
              {character ? `${levelInfo?.title} · ${character.name}` : 'Your adventure awaits'}
            </p>
          </div>
        </div>
        {character && (
          <Link href="/settings" aria-label="Settings"
            className="w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-all">
            <Settings size={18} className="text-[var(--stone)]" />
          </Link>
        )}
      </div>
    </header>
  )
}
