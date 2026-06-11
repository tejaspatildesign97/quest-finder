'use client'

import { User, Heart, Users, type LucideIcon } from 'lucide-react'
import type { PlayMode } from '@/lib/types'

interface ModeToggleProps {
  value: PlayMode
  onChange: (m: PlayMode) => void
  className?: string
}

const MODES: { value: PlayMode; label: string; Icon: LucideIcon; desc: string; bg: string; ring: string; iconBg: string; iconColor: string }[] = [
  { value: 'solo',  label: 'Solo',    Icon: User,  desc: 'Your adventure alone', bg: 'bg-[var(--pastel-orange)]', ring: 'ring-amber-400/60',  iconBg: 'bg-amber-400',  iconColor: 'text-white' },
  { value: 'duo',   label: 'Couples', Icon: Heart, desc: 'With your partner',    bg: 'bg-[var(--pastel-pink)]',   ring: 'ring-pink-400/60',   iconBg: 'bg-pink-400',   iconColor: 'text-white' },
  { value: 'group', label: 'Friends', Icon: Users, desc: 'With your crew',       bg: 'bg-[var(--pastel-purple)]', ring: 'ring-violet-400/60', iconBg: 'bg-violet-400', iconColor: 'text-white' },
]

export default function ModeToggle({ value, onChange, className = '' }: ModeToggleProps) {
  return (
    <div className={`grid grid-cols-3 gap-3 ${className}`}>
      {MODES.map(m => (
        <button
          key={m.value}
          onClick={() => onChange(m.value)}
          className={`flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl text-xs font-bold transition-all duration-150
            ${value === m.value
              ? `${m.bg} ring-4 ${m.ring} scale-[1.02] shadow-lg`
              : `${m.bg} opacity-60 hover:opacity-100 hover:scale-[1.02]`
            }`}
        >
          <span className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${m.iconBg}`}>
            <m.Icon size={19} className={m.iconColor} strokeWidth={2.4} />
          </span>
          <span className="font-display font-semibold text-sm text-[var(--ink)]">{m.label}</span>
          <span className="text-[0.65rem] font-semibold text-[var(--stone)] leading-none">{m.desc}</span>
        </button>
      ))}
    </div>
  )
}
