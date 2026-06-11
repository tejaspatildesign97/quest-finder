'use client'

import { useState } from 'react'
import { Hammer, Dices, Clock, Snowflake, MessagesSquare, Palette, Mountain, Search, Shuffle, type LucideIcon } from 'lucide-react'
import type { ForgeMood, Quest } from '@/lib/types'
import { forgeQuests } from '@/lib/forge'
import { CATEGORY_STYLES } from '@/lib/categories'
import { useStore } from '@/lib/store'
import QuestCard from './ui/QuestCard'
import Button from './ui/Button'

const TIMES: { label: string; minutes: number }[] = [
  { label: '15m', minutes: 15 },
  { label: '30m', minutes: 30 },
  { label: '1h', minutes: 60 },
  { label: '2h+', minutes: Infinity },
]

const MOODS: { value: ForgeMood; label: string; Icon: LucideIcon; active: string }[] = [
  { value: 'chill',       label: 'Chill',       Icon: Snowflake,      active: 'bg-cyan-400 text-[#0c0c10] shadow-md shadow-cyan-400/40' },
  { value: 'social',      label: 'Social',      Icon: MessagesSquare, active: 'bg-pink-400 text-[#0c0c10] shadow-md shadow-pink-400/40' },
  { value: 'creative',    label: 'Creative',    Icon: Palette,        active: 'bg-violet-400 text-[#0c0c10] shadow-md shadow-violet-400/40' },
  { value: 'adventurous', label: 'Adventurous', Icon: Mountain,       active: 'bg-emerald-400 text-[#0c0c10] shadow-md shadow-emerald-400/40' },
  { value: 'curious',     label: 'Curious',     Icon: Search,         active: 'bg-blue-400 text-[#0c0c10] shadow-md shadow-blue-400/40' },
  { value: 'chaotic',     label: 'Chaotic',     Icon: Shuffle,        active: 'bg-amber-400 text-[#0c0c10] shadow-md shadow-amber-400/40' },
]

const CATEGORIES = ['Any', ...Object.keys(CATEGORY_STYLES)]

export default function QuestForge() {
  const { playMode, activeQuests, acceptQuest, setCompletingQuest, abandonQuest, party } = useStore()

  const [time, setTime] = useState(30)
  const [mood, setMood] = useState<ForgeMood>('curious')
  const [category, setCategory] = useState('Any')
  const [forged, setForged] = useState<Quest[] | null>(null)
  const [rolling, setRolling] = useState(false)

  const doneIds = activeQuests.filter(q => q.status === 'completed').map(q => q.questId)

  const forge = (reroll = false) => {
    setRolling(true)
    setTimeout(() => {
      const avoid = reroll && forged ? forged.map(q => q.id) : []
      setForged(forgeQuests({ mode: playMode, time, mood, category }, doneIds, avoid))
      setRolling(false)
    }, reroll ? 450 : 150)
  }

  return (
    <div className="scroll-border p-5 space-y-4">
      <div className="flex items-center gap-3">
        <span className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/30"
          style={{ background: 'var(--grad-synth)' }}>
          <Hammer size={20} className="text-white" strokeWidth={2.4} />
        </span>
        <div>
          <h2 className="text-lg leading-none">Quest Forge</h2>
          <p className="text-xs font-semibold text-[var(--stone)] mt-1">Tell us your vibe — get 4 custom quests</p>
        </div>
      </div>

      {/* Time */}
      <div className="space-y-1.5">
        <p className="text-xs font-bold text-[var(--stone)] flex items-center gap-1"><Clock size={12} /> HOW MUCH TIME DO YOU HAVE?</p>
        <div className="grid grid-cols-4 gap-1.5">
          {TIMES.map(t => (
            <button key={t.label} onClick={() => setTime(t.minutes)}
              className={`py-2 text-sm font-bold rounded-xl transition-all
                ${time === t.minutes ? 'bg-[var(--forest)] text-[#0c0c10] shadow-md shadow-lime-400/40' : 'bg-white/8 text-[var(--stone)] hover:text-[var(--ink)]'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mood */}
      <div className="space-y-1.5">
        <p className="text-xs font-bold text-[var(--stone)]">WHAT'S YOUR MOOD?</p>
        <div className="grid grid-cols-3 gap-1.5">
          {MOODS.map(m => (
            <button key={m.value} onClick={() => setMood(m.value)}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-xl transition-all
                ${mood === m.value ? m.active : 'bg-white/8 text-[var(--stone)] hover:text-[var(--ink)]'}`}>
              <m.Icon size={13} /> {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-1.5">
        <p className="text-xs font-bold text-[var(--stone)]">QUEST TYPE</p>
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all
                ${category === c ? 'bg-[var(--magic)] text-white shadow-md shadow-violet-500/30' : 'bg-white/8 text-[var(--stone)] hover:text-[var(--ink)]'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Forge / Reroll */}
      {!forged ? (
        <Button variant="magic" size="lg" className="w-full font-display tracking-wide" onClick={() => forge()} loading={rolling} icon={<Hammer size={18} />}>
          FORGE MY QUESTS
        </Button>
      ) : (
        <Button variant="ghost" size="md" className="w-full" onClick={() => forge(true)} loading={rolling} icon={<Dices size={17} />}>
          Not feeling it — reroll all 4
        </Button>
      )}

      {/* Results */}
      {forged && !rolling && (
        <div className="space-y-3 pt-1">
          {forged.map(q => (
            <div key={q.id} className="space-y-1">
              <p className={`text-[0.65rem] font-extrabold tracking-widest uppercase ${
                q.difficulty === 'Easy' ? 'text-emerald-400' :
                q.difficulty === 'Medium' ? 'text-amber-400' :
                q.difficulty === 'Hard' ? 'text-rose-400' : 'text-violet-400'
              }`}>⚒ {q.difficulty} forge</p>
              <QuestCard
                quest={q}
                activeQuest={activeQuests.find(a => a.questId === q.id && a.status !== 'abandoned')}
                onAccept={quest => acceptQuest(quest.id)}
                onComplete={setCompletingQuest}
                onAbandon={abandonQuest}
                isParty={!!party}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
