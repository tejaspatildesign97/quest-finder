import { Compass, Telescope, Sparkles, BookOpen, Music, type LucideIcon } from 'lucide-react'
import type { Character, CharacterClass } from '@/lib/types'
import Badge from './Badge'
import XPBar from './XPBar'
import Avatar from './Avatar'

const CLASS_PERKS: Record<CharacterClass, { perk: string; Icon: LucideIcon }> = {
  Wanderer:  { perk: '+10% XP on Outdoor quests',    Icon: Compass },
  Explorer:  { perk: 'Reveals hidden quest details',  Icon: Telescope },
  Trickster: { perk: '+15% XP on spontaneous quests', Icon: Sparkles },
  Sage:      { perk: '+10% XP on Learning quests',    Icon: BookOpen },
  Bard:      { perk: '+15% XP on Creative quests',    Icon: Music },
}

interface CharacterCardProps {
  character: Character
  compact?: boolean
}

export default function CharacterCard({ character, compact }: CharacterCardProps) {
  const perk = CLASS_PERKS[character.class]

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center bg-[var(--pastel-orange)] rounded-2xl shadow-sm overflow-hidden">
          <Avatar value={character.avatar} size={44} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold text-sm truncate">{character.name}</div>
          <XPBar xp={character.xp} level={character.level} />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.5)]"
         style={{ background: 'var(--grad-hero)' }}>
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/20 rounded-3xl shadow-lg float shrink-0 overflow-hidden">
          <Avatar value={character.avatar} size={72} />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-display font-semibold text-[var(--ink)] leading-tight">{character.name}</h2>
          <div className="flex gap-1.5 mt-1.5 flex-wrap">
            <Badge variant="gold">{character.class}</Badge>
            <Badge variant="magic">LVL {character.level}</Badge>
          </div>
        </div>
      </div>
      {character.bio && (
        <p className="text-sm font-semibold text-[var(--stone)] mt-3 italic">"{character.bio}"</p>
      )}
      <div className="text-xs font-extrabold text-emerald-300 mt-3 flex items-center gap-1.5">
        <perk.Icon size={14} /> {perk.perk}
      </div>
      <div className="mt-3">
        <XPBar xp={character.xp} level={character.level} />
      </div>
    </div>
  )
}
