'use client'

import { Zap, Timer, Check, Users, User, Heart } from 'lucide-react'
import type { Quest, ActiveQuest } from '@/lib/types'
import { getCategoryStyle } from '@/lib/categories'
import Badge from './Badge'
import Button from './Button'
import ChallengeButton from '../ChallengeButton'

interface QuestCardProps {
  quest: Quest
  activeQuest?: ActiveQuest
  onAccept?: (quest: Quest) => void
  onComplete?: (questId: string) => void
  onAbandon?: (questId: string) => void
  isParty?: boolean
}

const diffBadge: Record<string, 'forest' | 'gold' | 'danger' | 'magic'> = {
  Easy: 'forest', Medium: 'gold', Hard: 'danger', Legendary: 'magic',
}

export default function QuestCard({ quest, activeQuest, onAccept, onComplete, onAbandon, isParty }: QuestCardProps) {
  const isActive    = activeQuest?.status === 'active'
  const isCompleted = activeQuest?.status === 'completed'
  const isAbandoned = activeQuest?.status === 'abandoned'
  const cat = getCategoryStyle(quest.category)

  return (
    <div className={`rounded-3xl p-4 transition-all ${
      isCompleted ? 'bg-[var(--pastel-mint)] opacity-90' :
      isAbandoned ? 'bg-[var(--ink)]/4 opacity-60' :
      isActive    ? 'bg-[var(--surface-2)] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(245,158,11,0.2)] ring-2 ring-amber-400/40' :
      'bg-[var(--surface-2)] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.5),0_12px_32px_rgba(0,0,0,0.5)] hover:scale-[1.01]'
    }`}>
      <div className="flex items-start gap-3">
        <span
          className="w-14 h-14 flex items-center justify-center rounded-2xl shrink-0 shadow-md"
          style={{ background: cat.gradient }}
        >
          <cat.Icon size={26} className="text-white" strokeWidth={2.2} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1">
            <span className="font-display font-semibold text-[0.95rem]">{quest.title}</span>
            <Badge variant={diffBadge[quest.difficulty]}>{quest.difficulty}</Badge>
            {isParty && <Badge variant="magic" icon={<Users size={11} />}>+20% XP</Badge>}
            <Badge variant="stone" icon={<Timer size={11} />}>{quest.duration >= 120 ? '2h+' : quest.duration >= 60 ? `${Math.round(quest.duration / 60)}h` : `${quest.duration}m`}</Badge>
            {quest.timeLimit && <Badge variant="danger" icon={<Timer size={11} />}>⏱ {quest.timeLimit}m limit</Badge>}
            <Badge variant="stone">{quest.category}</Badge>
            <span title={quest.mode.join(' · ')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--ink)]/8 text-[var(--stone)]">
              {quest.mode.includes('solo') && <User size={11} />}
              {quest.mode.includes('couple') && <Heart size={11} className="text-pink-400" />}
              {quest.mode.includes('friends') && <Users size={11} className="text-violet-400" />}
            </span>
            {isCompleted && <Badge variant="forest" icon={<Check size={11} />}>Done</Badge>}
            {isAbandoned && <Badge variant="stone">Abandoned</Badge>}
          </div>

          <p className="text-xs font-semibold text-[var(--stone)] leading-relaxed mb-1">{quest.description}</p>
          <p className="text-xs italic text-[var(--stone-light)] leading-relaxed">"{quest.lore}"</p>

          <div className="flex flex-wrap gap-1 mt-2">
            {quest.tags.map(tag => (
              <span key={tag} className="text-[0.65rem] font-bold px-2 py-0.5 bg-[var(--ink)]/5 rounded-full text-[var(--stone)] capitalize">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-1.5">
              <Badge variant="gold" icon={<Zap size={11} className="fill-amber-500 text-amber-500" />}>+{quest.xp} XP</Badge>
            </div>
            <div className="flex gap-1.5">
              {!activeQuest && <ChallengeButton quest={quest} />}
              {!activeQuest && onAccept && (
                <Button size="sm" variant="secondary" onClick={() => onAccept(quest)}>Accept</Button>
              )}
              {isActive && onComplete && (
                <Button size="sm" variant="primary" onClick={() => onComplete(quest.id)} icon={<Check size={14} />}>Complete</Button>
              )}
              {isActive && onAbandon && (
                <Button size="sm" variant="ghost" onClick={() => onAbandon(quest.id)}>Abandon</Button>
              )}
              {isCompleted && activeQuest?.xpEarned && (
                <span className="text-xs font-extrabold text-emerald-300">+{activeQuest.xpEarned} XP earned</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
