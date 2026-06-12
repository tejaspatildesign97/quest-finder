'use client'

import { useEffect, useState } from 'react'
import { getXPProgress, getLevelInfo, getNextLevelInfo } from '@/lib/levels'

interface XPBarProps {
  xp: number
  level: number
  className?: string
}

export default function XPBar({ xp, level, className = '' }: XPBarProps) {
  const [animatedPercent, setAnimatedPercent] = useState(0)
  const { current, needed, percent } = getXPProgress(xp)
  const levelInfo = getLevelInfo(xp)
  const nextLevel = getNextLevelInfo(xp)

  useEffect(() => {
    const t = setTimeout(() => setAnimatedPercent(percent), 100)
    return () => clearTimeout(t)
  }, [percent])

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex justify-between items-center text-xs font-bold">
        <span className="text-[var(--ink)]">Lvl {level} · {levelInfo.title}</span>
        {nextLevel ? (
          <span className="text-[var(--stone)]">{current} / {needed} XP</span>
        ) : (
          <span className="text-[var(--quest-gold)]">MAX LEVEL</span>
        )}
      </div>
      <div className="h-2.5 bg-[var(--ink)]/8 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out relative"
          style={{ width: `${animatedPercent}%`, background: 'var(--grad-orange)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  )
}
