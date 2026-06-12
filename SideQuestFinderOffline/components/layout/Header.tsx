'use client'

import { Map, Zap } from 'lucide-react'
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
          <div className="flex items-center gap-1 bg-[var(--pastel-orange)] rounded-full px-3 py-1.5 shadow-sm">
            <Zap size={13} className="text-amber-400 fill-amber-500" />
            <span className="text-xs font-extrabold text-amber-300">{character.xp.toLocaleString()} XP</span>
          </div>
        )}
      </div>
    </header>
  )
}
