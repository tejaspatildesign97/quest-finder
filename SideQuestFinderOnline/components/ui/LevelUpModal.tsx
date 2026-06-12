'use client'

import { ChevronsUp, Swords } from 'lucide-react'
import { useStore } from '@/lib/store'
import Button from './Button'

export default function LevelUpModal() {
  const { pendingLevelUp, dismissLevelUp, character } = useStore()

  if (!pendingLevelUp) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--ink)]/60 backdrop-blur-sm px-4">
      <div className="bg-[var(--surface-2)] rounded-3xl p-8 text-center max-w-xs w-full shadow-2xl glow">
        <div className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center shadow-lg shadow-amber-500/40 float"
          style={{ background: 'var(--grad-orange)' }}>
          <ChevronsUp size={40} className="text-white" strokeWidth={2.5} />
        </div>
        <div className="shimmer-text text-3xl font-display font-semibold mb-2">LEVEL UP!</div>
        <p className="text-[var(--stone)] font-semibold text-sm mb-1">You are now</p>
        <p className="text-2xl font-display font-semibold text-[var(--ink)] mb-1">{pendingLevelUp}</p>
        <p className="text-sm font-bold text-[var(--stone)] mb-6">Level {character?.level}</p>
        <Button variant="primary" size="lg" onClick={dismissLevelUp} className="w-full" icon={<Swords size={18} />}>
          Onwards!
        </Button>
      </div>
    </div>
  )
}
