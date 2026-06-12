import { Medal, Award, Gem, Crown, Lock, type LucideIcon } from 'lucide-react'
import type { Achievement } from '@/lib/types'
import Badge from './Badge'

interface AchievementCardProps {
  achievement: Achievement
  unlocked: boolean
  unlockedAt?: string
}

const rarityBadge: Record<string, 'stone' | 'forest' | 'magic' | 'gold'> = {
  Common: 'stone', Rare: 'forest', Epic: 'magic', Legendary: 'gold',
}

const rarityArt: Record<string, { Icon: LucideIcon; gradient: string }> = {
  Common:    { Icon: Medal, gradient: 'linear-gradient(135deg, #a8a29e 0%, #78716c 100%)' },
  Rare:      { Icon: Award, gradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)' },
  Epic:      { Icon: Gem,   gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)' },
  Legendary: { Icon: Crown, gradient: 'var(--grad-orange)' },
}

export default function AchievementCard({ achievement, unlocked, unlockedAt }: AchievementCardProps) {
  const art = rarityArt[achievement.rarity]

  return (
    <div className={`rounded-3xl p-4 transition-all ${
      unlocked
        ? 'bg-[var(--pastel-orange)] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(245,158,11,0.18)]'
        : 'bg-[var(--surface-2)] shadow-[0_1px_3px_rgba(0,0,0,0.5)] opacity-60'
    }`}>
      <div className="flex justify-center mb-2.5">
        <span
          className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${unlocked ? 'float' : ''}`}
          style={unlocked ? { background: art.gradient } : { background: '#26262e' }}
        >
          {unlocked
            ? <art.Icon size={22} className="text-white" strokeWidth={2.2} />
            : <Lock size={18} className="text-[var(--stone-light)]" />}
        </span>
      </div>
      <div className="text-center space-y-1">
        <div className="font-display font-semibold text-sm">{achievement.title}</div>
        <p className="text-xs font-semibold text-[var(--stone)] leading-snug">{achievement.description}</p>
        <div className="flex justify-center">
          <Badge variant={rarityBadge[achievement.rarity]}>{achievement.rarity}</Badge>
        </div>
        {unlocked && unlockedAt && (
          <div className="text-[0.65rem] font-bold text-[var(--stone-light)]">
            Unlocked {new Date(unlockedAt).toLocaleDateString()}
          </div>
        )}
        {!unlocked && (
          <div className="text-[0.65rem] font-semibold text-[var(--stone-light)] italic">{achievement.condition}</div>
        )}
      </div>
    </div>
  )
}
