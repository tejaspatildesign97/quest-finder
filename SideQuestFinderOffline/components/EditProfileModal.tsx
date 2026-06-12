'use client'

import { useEffect, useState } from 'react'
import { X, Check, Compass, Telescope, Sparkles, BookOpen, Music, type LucideIcon } from 'lucide-react'
import { useStore } from '@/lib/store'
import type { CharacterClass } from '@/lib/types'
import Button from './ui/Button'
import { Input, Textarea } from './ui/Input'
import Avatar from './ui/Avatar'

const CLASSES: { value: CharacterClass; Icon: LucideIcon; gradient: string; perk: string }[] = [
  { value: 'Wanderer',  Icon: Compass,   gradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)', perk: '+10% XP on Outdoor quests' },
  { value: 'Explorer',  Icon: Telescope, gradient: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)', perk: 'Reveals hidden quest details' },
  { value: 'Trickster', Icon: Sparkles,  gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)', perk: '+15% XP on spontaneous quests' },
  { value: 'Sage',      Icon: BookOpen,  gradient: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', perk: '+10% XP on Learning quests' },
  { value: 'Bard',      Icon: Music,     gradient: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)', perk: '+15% XP on Creative quests' },
]

const AVATAR_SEEDS = [
  'luna', 'felix', 'aria', 'kai', 'nova', 'finn',
  'iris', 'leo', 'sage', 'remy', 'wren', 'jett',
  'milo', 'zara', 'ash', 'pixel',
]

interface EditProfileModalProps {
  open: boolean
  onClose: () => void
}

export default function EditProfileModal({ open, onClose }: EditProfileModalProps) {
  const { character, updateCharacter, addToast } = useStore()

  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')
  const [charClass, setCharClass] = useState<CharacterClass>('Wanderer')
  const [error, setError] = useState('')

  // Seed the form from the live character each time the modal opens
  useEffect(() => {
    if (open && character) {
      setName(character.name)
      setBio(character.bio)
      setAvatar(character.avatar)
      setCharClass(character.class)
      setError('')
    }
  }, [open, character])

  // Lock background scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  if (!open || !character) return null

  const isLegacyEmojiAvatar = !AVATAR_SEEDS.includes(character.avatar)

  const save = () => {
    if (!name.trim()) { setError('Your hero needs a name!'); return }
    updateCharacter({ name: name.trim(), bio: bio.trim(), avatar, class: charClass })
    addToast({ type: 'xp', message: 'Profile updated!', icon: '✨' })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[var(--surface)] border border-white/10 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[88dvh] flex flex-col overflow-hidden">
        {/* Header — pinned */}
        <div className="flex items-center gap-3 p-5 pb-3 shrink-0">
          <div className="w-12 h-12 flex items-center justify-center bg-[var(--pastel-orange)] rounded-2xl overflow-hidden shrink-0">
            <Avatar value={avatar} size={44} />
          </div>
          <h2 className="text-lg flex-1">Edit Profile</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center shrink-0 hover:bg-white/15">
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 space-y-4 min-h-0">
          <Input
            label="Hero Name"
            placeholder="What shall the world call you?"
            value={name}
            onChange={e => setName(e.target.value)}
            error={error}
          />

          <Textarea
            label="Your Legend (optional)"
            placeholder="A brief story of who you are..."
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={2}
          />

          {/* Avatar picker */}
          <div className="space-y-1.5">
            <p className="text-sm font-bold text-[var(--ink)]">Avatar</p>
            <div className="grid grid-cols-4 gap-2.5">
              {/* Keep the legacy emoji avatar selectable if that's what they have */}
              {isLegacyEmojiAvatar && (
                <button
                  onClick={() => setAvatar(character.avatar)}
                  className={`aspect-square flex items-center justify-center rounded-2xl transition-all overflow-hidden
                    ${avatar === character.avatar
                      ? 'bg-[var(--pastel-orange)] ring-4 ring-amber-400/60 scale-105 shadow-lg'
                      : 'bg-[var(--surface-2)] shadow-sm hover:scale-105'}`}
                >
                  <Avatar value={character.avatar} size={56} />
                </button>
              )}
              {AVATAR_SEEDS.map(seed => (
                <button
                  key={seed}
                  onClick={() => setAvatar(seed)}
                  className={`aspect-square flex items-center justify-center rounded-2xl transition-all overflow-hidden p-1
                    ${avatar === seed
                      ? 'bg-[var(--pastel-orange)] ring-4 ring-amber-400/60 scale-105 shadow-lg'
                      : 'bg-[var(--surface-2)] shadow-sm hover:scale-105'}`}
                >
                  <Avatar value={seed} size={56} />
                </button>
              ))}
            </div>
          </div>

          {/* Class picker */}
          <div className="space-y-1.5 pb-2">
            <p className="text-sm font-bold text-[var(--ink)]">Class</p>
            <div className="space-y-2">
              {CLASSES.map(c => (
                <button
                  key={c.value}
                  onClick={() => setCharClass(c.value)}
                  className={`w-full flex items-center gap-3 rounded-2xl p-3 text-left transition-all
                    ${charClass === c.value
                      ? 'bg-[var(--pastel-orange)] ring-2 ring-amber-400/60'
                      : 'bg-[var(--surface-2)] hover:bg-white/8'}`}
                >
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md" style={{ background: c.gradient }}>
                    <c.Icon size={18} className="text-white" strokeWidth={2.2} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="font-display block text-sm">{c.value}</span>
                    <span className="text-xs font-semibold text-[var(--stone)]">{c.perk}</span>
                  </span>
                  {charClass === c.value && (
                    <span className="w-6 h-6 rounded-full bg-[var(--quest-gold)] flex items-center justify-center shrink-0">
                      <Check size={13} className="text-[#0c0c10]" strokeWidth={3} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer — pinned */}
        <div className="p-5 pt-3 shrink-0 safe-area-bottom">
          <Button variant="primary" size="lg" className="w-full" onClick={save} icon={<Check size={18} />}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
