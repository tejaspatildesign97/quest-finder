'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Compass, Telescope, Sparkles, BookOpen, Music, Check, ArrowLeft, ArrowRight, Swords, type LucideIcon } from 'lucide-react'
import { useStore } from '@/lib/store'
import type { CharacterClass, PlayMode } from '@/lib/types'
import { getNextLevelInfo } from '@/lib/levels'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Input, Textarea } from '@/components/ui/Input'
import ModeToggle from '@/components/ui/ModeToggle'
import Avatar from '@/components/ui/Avatar'

const CLASSES: { value: CharacterClass; Icon: LucideIcon; gradient: string; desc: string; perk: string }[] = [
  { value: 'Wanderer',  Icon: Compass,   gradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)', desc: 'A restless soul drawn to paths unknown.',    perk: '+10% XP on Outdoor quests' },
  { value: 'Explorer',  Icon: Telescope, gradient: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)', desc: 'Obsessively curious about everything.',       perk: 'Reveals hidden quest details' },
  { value: 'Trickster', Icon: Sparkles,  gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)', desc: 'Thrives in chaos and spontaneous decisions.', perk: '+15% XP on spontaneous quests' },
  { value: 'Sage',      Icon: BookOpen,  gradient: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', desc: 'Finds wisdom in every experience.',           perk: '+10% XP on Learning quests' },
  { value: 'Bard',      Icon: Music,     gradient: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)', desc: 'Turns every adventure into a story.',        perk: '+15% XP on Creative quests' },
]

// DiceBear "big-smile" seeds — each renders a unique illustrated character
const AVATAR_SEEDS = [
  'luna', 'felix', 'aria', 'kai', 'nova', 'finn',
  'iris', 'leo', 'sage', 'remy', 'wren', 'jett',
]

export default function CharacterCreatePage() {
  const router = useRouter()
  const { setCharacter, setPlayMode, updateStreak } = useStore()

  const [step, setStep] = useState(1)
  const [selectedClass, setSelectedClass] = useState<CharacterClass | null>(null)
  const [avatar, setAvatar] = useState<string>('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [mode, setMode] = useState<PlayMode>('solo')
  const [nameError, setNameError] = useState('')

  const handleNext = () => {
    if (step === 1 && !selectedClass) return
    if (step === 2) {
      if (!name.trim()) { setNameError('Your hero needs a name!'); return }
      if (!avatar)      { setNameError('Pick an avatar first!'); return }
      setNameError('')
    }
    setStep(s => s + 1)
  }

  const handleCreate = () => {
    if (!selectedClass || !avatar || !name.trim()) return
    const now = new Date().toISOString()
    const nextLevel = getNextLevelInfo(0)
    setCharacter({
      id: Math.random().toString(36).slice(2),
      name: name.trim(),
      class: selectedClass,
      avatar,
      bio: bio.trim(),
      level: 1,
      xp: 0,
      xpToNextLevel: nextLevel?.xpRequired ?? 500,
      streak: 1,
      lastActiveDate: now,
      createdAt: now,
    })
    setPlayMode(mode)
    updateStreak()
    router.push('/dashboard')
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Progress */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold transition-all
              ${s === step ? 'bg-[var(--quest-gold)] text-[#0c0c10] shadow-md shadow-amber-500/30' :
                s < step  ? 'bg-[var(--forest)] text-[#0c0c10]' :
                'bg-[var(--ink)]/8 text-[var(--stone)]'}`}>
              {s < step ? <Check size={14} strokeWidth={3} /> : s}
            </div>
            {s < 3 && <div className={`flex-1 h-1 rounded-full ${s < step ? 'bg-[var(--forest)]' : 'bg-[var(--ink)]/8'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Class */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-display font-semibold">Choose Your Class</h2>
            <p className="text-sm font-semibold text-[var(--stone)] mt-1">Your class shapes how you earn XP</p>
          </div>
          <div className="space-y-2.5">
            {CLASSES.map(c => (
              <button
                key={c.value}
                onClick={() => setSelectedClass(c.value)}
                className={`w-full text-left rounded-3xl p-4 transition-all
                  ${selectedClass === c.value
                    ? 'bg-[var(--pastel-orange)] ring-4 ring-amber-400/50 shadow-lg shadow-amber-500/15 scale-[1.01]'
                    : 'bg-[var(--surface-2)] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.5)] hover:scale-[1.01]'
                  }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-13 h-13 min-w-13 rounded-2xl flex items-center justify-center shadow-md" style={{ background: c.gradient, width: 52, height: 52 }}>
                    <c.Icon size={24} className="text-white" strokeWidth={2.2} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold">{c.value}</div>
                    <div className="text-xs font-semibold text-[var(--stone)] mt-0.5">{c.desc}</div>
                    <div className="text-xs text-amber-400 font-extrabold mt-1">✦ {c.perk}</div>
                  </div>
                  {selectedClass === c.value && (
                    <span className="w-7 h-7 rounded-full bg-[var(--quest-gold)] flex items-center justify-center shrink-0">
                      <Check size={15} className="text-white" strokeWidth={3} />
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
          <Button variant="primary" size="lg" className="w-full" onClick={handleNext} disabled={!selectedClass} icon={<Swords size={18} />}>
            Choose Class
          </Button>
        </div>
      )}

      {/* Step 2: Avatar + Name */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-display font-semibold">Create Your Hero</h2>
            <p className="text-sm font-semibold text-[var(--stone)] mt-1">Choose an avatar and name your adventurer</p>
          </div>
          <div>
            <p className="text-sm font-bold text-[var(--ink)] mb-2">Pick Your Avatar</p>
            <div className="grid grid-cols-4 gap-3">
              {AVATAR_SEEDS.map(seed => (
                <button
                  key={seed}
                  onClick={() => setAvatar(seed)}
                  className={`aspect-square flex items-center justify-center rounded-3xl transition-all overflow-hidden p-1
                    ${avatar === seed
                      ? 'bg-[var(--pastel-orange)] ring-4 ring-amber-400/60 scale-105 shadow-lg'
                      : 'bg-[var(--surface-2)] shadow-sm hover:scale-105 hover:shadow-md'}`}
                >
                  <Avatar value={seed} size={68} />
                </button>
              ))}
            </div>
          </div>
          <Input
            label="Hero Name"
            placeholder="What shall the world call you?"
            value={name}
            onChange={e => setName(e.target.value)}
            error={nameError}
          />
          <Textarea
            label="Your Legend (optional)"
            placeholder="A brief story of who you are..."
            value={bio}
            onChange={e => setBio(e.target.value)}
          />
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(1)} className="flex-1" icon={<ArrowLeft size={16} />}>Back</Button>
            <Button variant="primary" onClick={handleNext} className="flex-1">Next <ArrowRight size={16} /></Button>
          </div>
        </div>
      )}

      {/* Step 3: Mode */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-display font-semibold">How Do You Quest?</h2>
            <p className="text-sm font-semibold text-[var(--stone)] mt-1">You can change this anytime</p>
          </div>
          <ModeToggle value={mode} onChange={setMode} />
          <div className="scroll-border p-5 text-center space-y-3">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-[var(--pastel-mint)] flex items-center justify-center overflow-hidden float">
              <Avatar value={avatar || 'luna'} size={88} />
            </div>
            <div className="font-display font-semibold text-lg">{name || 'Hero'}</div>
            <div className="flex justify-center gap-2">
              <Badge variant="gold">{selectedClass}</Badge>
              <Badge variant="magic">Level 1</Badge>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => setStep(2)} className="flex-1" icon={<ArrowLeft size={16} />}>Back</Button>
            <Button variant="magic" size="lg" onClick={handleCreate} className="flex-1" icon={<Sparkles size={18} />}>Begin Quest!</Button>
          </div>
        </div>
      )}
    </div>
  )
}
