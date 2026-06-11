'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, Flame, CheckCircle2, Flag, RotateCcw } from 'lucide-react'
import { useStore } from '@/lib/store'
import { QUESTS } from '@/lib/quests'
import { getCategoryStyle } from '@/lib/categories'
import CharacterCard from '@/components/ui/CharacterCard'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export default function ProfilePage() {
  const router = useRouter()
  const { character, activeQuests, resetCharacter, _hasHydrated } = useStore()

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) router.replace('/character/create')
  }, [_hasHydrated, character])
  if (!_hasHydrated || !character) return null

  const completed  = activeQuests.filter(q => q.status === 'completed')
  const abandoned  = activeQuests.filter(q => q.status === 'abandoned')

  const byDiff = (d: string) => completed.filter(q => QUESTS.find(x => x.id === q.questId)?.difficulty === d).length
  const totalXPEarned = completed.reduce((sum, q) => sum + (q.xpEarned ?? 0), 0)

  const handleReset = () => {
    if (confirm('Start over? This will delete your character and all progress.')) {
      resetCharacter()
      router.replace('/character/create')
    }
  }

  return (
    <div className="space-y-6">
      <CharacterCard character={character} />

      {/* Stats */}
      <div className="space-y-2">
        <p className="font-display font-semibold text-[var(--ink)]">Stats</p>
        <div className="grid grid-cols-2 gap-2">
          <StatCard label="Total XP" value={totalXPEarned.toLocaleString()} tile="bg-amber-400/15"
            icon={<Zap size={18} className="text-amber-400 fill-amber-400" />} />
          <StatCard label="Streak" value={`${character.streak}d`} tile="bg-orange-400/15"
            icon={<Flame size={18} className="text-orange-400" />} />
          <StatCard label="Completed" value={completed.length} tile="bg-emerald-400/15"
            icon={<CheckCircle2 size={18} className="text-emerald-400" />} />
          <StatCard label="Abandoned" value={abandoned.length} tile="bg-white/10"
            icon={<Flag size={18} className="text-stone-400" />} />
        </div>
      </div>

      {/* Difficulty breakdown */}
      <div className="space-y-2">
        <p className="font-display font-semibold text-[var(--ink)]">By Difficulty</p>
        <div className="grid grid-cols-4 gap-2">
          {([['Easy','text-emerald-400'],['Medium','text-amber-400'],['Hard','text-rose-400'],['Legendary','text-violet-400']] as const).map(([d, color]) => (
            <div key={d} className="text-center bg-[var(--surface-2)] rounded-2xl py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.5),0_4px_12px_rgba(0,0,0,0.5)]">
              <div className={`text-lg font-extrabold ${color}`}>{byDiff(d)}</div>
              <div className="text-[0.6rem] font-extrabold uppercase tracking-wide text-[var(--stone-light)]">{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quest history */}
      {activeQuests.length > 0 && (
        <div className="space-y-2">
          <p className="font-display font-semibold text-[var(--ink)]">Quest History</p>
          <div className="space-y-1.5">
            {[...activeQuests].reverse().map((aq, i) => {
              const q = QUESTS.find(x => x.id === aq.questId)
              if (!q) return null
              const cat = getCategoryStyle(q.category)
              return (
                <div key={i} className="flex items-center gap-3 bg-[var(--surface-2)] rounded-2xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.5),0_4px_12px_rgba(0,0,0,0.5)]">
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cat.tile}`}>
                    <cat.Icon size={17} className={cat.iconColor} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold truncate">{q.title}</div>
                    <div className="text-xs font-semibold text-[var(--stone-light)]">{new Date(aq.acceptedAt).toLocaleDateString()}</div>
                  </div>
                  <Badge variant={aq.status === 'completed' ? 'forest' : aq.status === 'active' ? 'gold' : 'stone'}>
                    {aq.status}
                  </Badge>
                  {aq.xpEarned && <span className="text-xs font-extrabold text-[var(--quest-gold)]">+{aq.xpEarned}</span>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="pt-2 border-t border-[var(--ink)]/8">
        <Button variant="danger" size="sm" className="w-full" onClick={handleReset} icon={<RotateCcw size={14} />}>
          Reset Character
        </Button>
        <p className="text-xs font-semibold text-center text-[var(--stone-light)] mt-1.5">This will permanently delete all progress</p>
      </div>
    </div>
  )
}
