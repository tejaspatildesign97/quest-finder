'use client'

import { Zap, Clock, CheckCircle2 } from 'lucide-react'
import type { Quest, ActiveQuest } from '@/lib/types'
import { getCategoryStyle } from '@/lib/categories'

// Pastel color-block surface per category (DESIGN-figma.md block palette).
// Tiles get the pastel ground; the glyph stays black ink.
const CATEGORY_BLOCK: Record<string, string> = {
  Adventure: 'var(--block-coral)',
  Discovery: 'var(--block-lilac)',
  Food: 'var(--block-cream)',
  Creativity: 'var(--block-pink)',
  Kindness: 'var(--block-pink)',
  Learning: 'var(--block-mint)',
  Mindfulness: 'var(--block-lilac)',
  Social: 'var(--block-lime)',
  Romance: 'var(--block-pink)',
  Chaos: 'var(--block-coral)',
  Nature: 'var(--block-mint)',
  Courage: 'var(--block-lime)',
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

/** Ticket-shaped quest card: asymmetric corners + perforated stat stub. */
export default function RailQuestCard({ quest, state, onStart, onDone }: Props) {
  const cat = getCategoryStyle(quest.category)
  const block = CATEGORY_BLOCK[quest.category] ?? 'var(--block-cream)'
  const done = state?.status === 'completed'
  const active = state?.status === 'active'

  return (
    <div className="qp-ticket snap-start shrink-0 w-[80%] flex flex-col">
      <div className="p-5 pb-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-3.5">
          <span className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
            style={{ background: block }}>
            <cat.Icon size={20} strokeWidth={2.2} className="text-[var(--fg-ink)]" />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="qp-title text-[1.05rem] leading-snug line-clamp-2">{quest.title}</h3>
            <p className="qp-overline mt-1 text-[var(--qp-gray)]">{quest.category}</p>
          </div>
        </div>
        <p className="qp-body text-[0.8rem] leading-relaxed line-clamp-2">{quest.description}</p>
      </div>

      {/* Tear-off stub */}
      <div className="qp-stub flex items-center gap-2.5 px-5 py-3.5">
        <span className="qp-notch left" />
        <span className="qp-notch right" />
        <span className="qp-badge">
          <Zap size={10} className="fill-[var(--fg-ink)]" /> +{quest.xp}
        </span>
        <span className="qp-badge">{quest.difficulty}</span>
        <span className="flex items-center gap-1 qp-num text-[0.65rem] text-[var(--qp-gray)]">
          <Clock size={12} /> {fmtDuration(quest.duration)}
        </span>
        <span className="flex-1" />
        {done ? (
          <CheckCircle2 size={24} className="text-[var(--qp-gold)]" />
        ) : active ? (
          <button onClick={onDone} className="qp-btn-primary px-5 py-2 text-[0.8rem]">Done!</button>
        ) : (
          <button onClick={onStart} className="qp-btn-primary px-5 py-2 text-[0.8rem]">Start</button>
        )}
      </div>
    </div>
  )
}
