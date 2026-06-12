'use client'

import { useState } from 'react'
import { Swords, Loader2 } from 'lucide-react'
import { useStore } from '@/lib/store'
import { createChallenge } from '@/lib/community'
import type { Quest } from '@/lib/types'

/** "Dare a friend" — creates a challenge link and shares/copies it. */
export default function ChallengeButton({ quest }: { quest: Quest }) {
  const { character, addToast } = useStore()
  const [busy, setBusy] = useState(false)

  if (!character) return null

  const dare = async () => {
    setBusy(true)
    try {
      const id = await createChallenge(character, quest.id, `${character.name} dares you!`)
      const url = `${window.location.origin}/challenge/${id}`
      const text = `⚔️ I dare you: "${quest.title}" (+${quest.xp} XP). Accept if you're brave enough → ${url}`
      if (navigator.share) {
        await navigator.share({ text }).catch(() => navigator.clipboard.writeText(text))
      } else {
        await navigator.clipboard.writeText(text)
      }
      addToast({ type: 'xp', message: 'Dare link copied — send it!', icon: '⚔️' })
    } catch {
      addToast({ type: 'xp', message: 'Could not create dare — check connection', icon: '⚠️' })
    }
    setBusy(false)
  }

  return (
    <button
      onClick={dare}
      disabled={busy}
      title="Dare a friend"
      className="flex items-center gap-1 text-xs font-extrabold text-[var(--magic-light)] bg-[var(--magic)]/15 hover:bg-[var(--magic)]/30 rounded-full px-3 py-1.5 transition-all disabled:opacity-50"
    >
      {busy ? <Loader2 size={12} className="animate-spin" /> : <Swords size={12} />}
      Dare
    </button>
  )
}
