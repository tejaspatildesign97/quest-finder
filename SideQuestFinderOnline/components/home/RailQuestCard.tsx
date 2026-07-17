'use client'

import { Zap, Clock, CheckCircle2 } from 'lucide-react'
import type { Quest, ActiveQuest } from '@/lib/types'
import { getCategoryStyle } from '@/lib/categories'

// Flat Quest-Pop accent per category (the old gradient tiles are banned on
// new surfaces — one hue per card, all pink-harmonized).
const CATEGORY_ACCENT: Record<string, string> = {
  Adventure: 'var(--qp-coral)',
  Discovery: 'var(--qp-grape)',
  Food: 'var(--qp-peach)',
  Creativity: 'var(--qp-pink)',
  Kindness: 'var(--qp-rose)',
  Learning: 'var(--qp-lavender)',
  Mindfulness: 'var(--qp-lavender)',
  Social: 'var(--qp-gold)',
  Romance: 'var(--qp-pink)',
  Chaos: 'var(--qp-coral)',
  Nature: 'var(--qp-peach)',
  Courage: 'var(--qp-gold)',
}

const DIFFICULTY_COLOR: Record<string, string> = {
  Easy: 'var(--qp-rose)',
  Medium: 'var(--qp-gold)',
  Hard: 'var(--qp-coral)',
  Legendary: 'var(--qp-lavender)',
}

function fmtDuration(mins: number) {
  if (mins >= 120) return '2h+'
  if (mins >= 60) return `${Math.round(mins / 60)}h`
  return `${mins}m`
}

interface Props {
  quest: Quest
  state?: ActiveQuest
  onStart?: () => void
  onDone?: () => void
}

export default function RailQuestCard({ quest, state, onStart, onDone }: Props) {
  const cat = getCategoryStyle(quest.category)
  const accent = CATEGORY_ACCENT[quest.category] ?? 'var(--qp-pink)'
  const diffColor = DIFFICULTY_COLOR[quest.difficulty] ?? 'var(--qp-gold)'
  const done = state?.status === 'completed'
  const active = state?.status === 'active'

  return (
    <div className="qp-card snap-start shrink-0 w-[78%] p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="qp-inset w-10 h-10 flex items-center justify-center shrink-0">
          <cat.Icon size={19} strokeWidth={2.2} style={{ color: accent }} />
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="qp-title text-[0.95rem] leading-tight line-clamp-2">{quest.title}</h3>
          <p className="qp-overline mt-0.5">{quest.category}</p>
        </div>
      </div>

      <p className="qp-body text-xs leading-relaxed line-clamp-2 flex-1">{quest.description}</p>

      <div className="qp-inset flex items-center gap-2 px-3 py-2.5">
        <span className="qp-badge qp-num text-[0.65rem]"
          style={{ color: 'var(--qp-gold)', background: 'rgba(255,182,64,0.1)', borderColor: 'rgba(255,182,64,0.22)' }}>
          <Zap size={10} className="fill-[var(--qp-gold)]" /> +{quest.xp}
        </span>
        <span className="qp-badge text-[0.65rem]"
          style={{ color: diffColor, background: 'rgba(255,244,228,0.06)', borderColor: 'rgba(255,244,228,0.14)' }}>
          {quest.difficulty}
        </span>
        <span className="flex items-center gap-1 qp-num text-[0.65rem] text-[var(--qp-gray)]">
          <Clock size={11} /> {fmtDuration(quest.duration)}
        </span>
        <span className="flex-1" />
        {done ? (
          <CheckCircle2 size={22} className="text-[var(--qp-gold)]" />
        ) : active ? (
          <button onClick={onDone} className="qp-btn-primary px-4 py-1.5 text-xs">Done!</button>
        ) : (
          <button onClick={onStart} className="qp-btn-primary px-4 py-1.5 text-xs">Start</button>
        )}
      </div>
    </div>
  )
}
