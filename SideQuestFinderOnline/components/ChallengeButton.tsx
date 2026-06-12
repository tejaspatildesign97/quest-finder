'use client'

import { useState } from 'react'
import { Swords, Loader2, Copy, Check } from 'lucide-react'
import { useStore } from '@/lib/store'
import { createChallenge } from '@/lib/community'
import type { Quest } from '@/lib/types'

/** "Dare a friend" — creates a challenge link and shares/copies it. */
export default function ChallengeButton({ quest }: { quest: Quest }) {
  const { character, addToast } = useStore()
  const [busy, setBusy] = useState(false)
  const [link, setLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  if (!character) return null

  const dare = async () => {
    setBusy(true)
    try {
      const id = await createChallenge(character, quest.id, `${character.name} dares you!`)
      const url = `${window.location.origin}/challenge/${id}`
      const text = `⚔️ I dare you: "${quest.title}" (+${quest.xp} XP). Accept if you're brave enough → ${url}`

      // Best effort: native share, then clipboard, then show the link inline
      let delivered = false
      if (navigator.share) {
        try { await navigator.share({ text }); delivered = true } catch { /* cancelled or blocked */ }
      }
      if (!delivered) {
        try { await navigator.clipboard.writeText(text); delivered = true; addToast({ type: 'xp', message: 'Dare link copied — send it!', icon: '⚔️' }) }
        catch { /* clipboard blocked — fall through */ }
      }
      if (!delivered) setLink(url)
      else setLink(null)
    } catch {
      // Only an actual creation failure lands here
      addToast({ type: 'xp', message: 'Could not create dare — check connection', icon: '⚠️' })
    }
    setBusy(false)
  }

  const copyShown = async () => {
    try {
      await navigator.clipboard.writeText(link!)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* user can select the text manually */ }
  }

  if (link) {
    return (
      <span className="flex items-center gap-1 min-w-0">
        <input readOnly value={link} onFocus={e => e.target.select()}
          className="text-[0.65rem] font-bold bg-white/8 rounded-full px-2.5 py-1.5 w-32 truncate text-[var(--magic-light)] focus:outline-none" />
        <button onClick={copyShown} title="Copy link"
          className="w-7 h-7 rounded-full bg-[var(--magic)]/20 hover:bg-[var(--magic)]/40 flex items-center justify-center shrink-0">
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="text-[var(--magic-light)]" />}
        </button>
      </span>
    )
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
