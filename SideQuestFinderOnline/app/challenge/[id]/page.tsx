'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Swords, Loader2, Zap, Check } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getQuestById } from '@/lib/quests'
import { getCategoryStyle } from '@/lib/categories'
import { fetchChallenge, acceptChallenge, type Challenge } from '@/lib/community'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export default function ChallengePage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const { character, acceptQuest, addToast, _hasHydrated } = useStore()

  const [challenge, setChallenge] = useState<Challenge | null | 'missing'>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    fetchChallenge(id).then(c => setChallenge(c ?? 'missing')).catch(() => setChallenge('missing'))
  }, [id])

  if (!_hasHydrated || challenge === null) {
    return <div className="text-center py-24"><Loader2 size={28} className="animate-spin mx-auto text-[var(--stone)]" /></div>
  }

  if (challenge === 'missing') {
    return (
      <div className="text-center py-20 space-y-3">
        <div className="text-5xl">🕸️</div>
        <h2 className="text-xl">Challenge not found</h2>
        <p className="text-sm font-semibold text-[var(--stone)]">This dare may have expired or the link is broken.</p>
      </div>
    )
  }

  const quest = getQuestById(challenge.questId)
  if (!quest) return null
  const cat = getCategoryStyle(quest.category)
  const accepted = challenge.status !== 'pending'

  const handleAccept = async () => {
    if (!character) { router.push('/character/create'); return }
    setBusy(true)
    try {
      await acceptChallenge(challenge.id, character)
      acceptQuest(quest.id)
      addToast({ type: 'xp', message: 'Dare accepted — go get it!', icon: '⚔️' })
      setChallenge({ ...challenge, status: 'accepted' })
      router.push('/journal')
    } catch {
      addToast({ type: 'xp', message: 'Could not accept — try again', icon: '⚠️' })
    }
    setBusy(false)
  }

  return (
    <div className="space-y-6 pt-4">
      <div className="text-center space-y-1.5">
        <div className="w-16 h-16 mx-auto rounded-3xl flex items-center justify-center shadow-lg shadow-violet-500/30 float"
          style={{ background: 'var(--grad-synth)' }}>
          <Swords size={28} className="text-white" strokeWidth={2.4} />
        </div>
        <h2 className="text-2xl">You've been dared!</h2>
        <p className="text-sm font-semibold text-[var(--stone)]">
          <span className="text-[var(--quest-gold)] font-extrabold">{challenge.fromName}</span> challenges you to:
        </p>
      </div>

      {/* The quest */}
      <div className="scroll-border p-5 space-y-3">
        <div className="flex items-start gap-3">
          <span className="w-14 h-14 flex items-center justify-center rounded-2xl shrink-0 shadow-md" style={{ background: cat.gradient }}>
            <cat.Icon size={26} className="text-white" strokeWidth={2.2} />
          </span>
          <div className="min-w-0">
            <h3 className="text-lg leading-tight">{quest.title}</h3>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              <Badge variant={quest.difficulty === 'Easy' ? 'forest' : quest.difficulty === 'Medium' ? 'gold' : quest.difficulty === 'Hard' ? 'danger' : 'magic'}>{quest.difficulty}</Badge>
              <Badge variant="gold" icon={<Zap size={11} className="fill-amber-500 text-amber-500" />}>+{quest.xp} XP</Badge>
              <Badge variant="stone">{quest.category}</Badge>
            </div>
          </div>
        </div>
        <p className="text-sm font-semibold text-[var(--stone)] leading-relaxed">{quest.description}</p>
        <p className="text-sm italic text-[var(--stone-light)]">"{quest.lore}"</p>
      </div>

      {accepted ? (
        <div className="text-center space-y-2">
          <Badge variant="forest" icon={<Check size={12} />}>Dare accepted</Badge>
          <p className="text-xs font-semibold text-[var(--stone)]">This challenge has already been taken on.</p>
        </div>
      ) : (
        <Button variant="magic" size="lg" className="w-full font-display tracking-wide" onClick={handleAccept} loading={busy} icon={<Swords size={18} />}>
          {character ? 'ACCEPT THE DARE' : 'CREATE YOUR HERO & ACCEPT'}
        </Button>
      )}
      <p className="text-xs font-semibold text-center text-[var(--stone-light)]">
        Side Quest Finder — touch grass, but make it an RPG.
      </p>
    </div>
  )
}
