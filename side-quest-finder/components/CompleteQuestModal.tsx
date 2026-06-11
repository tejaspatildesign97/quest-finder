'use client'

import { useRef, useState } from 'react'
import { X, Camera, Trash2, Check, Feather } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getQuestById } from '@/lib/quests'
import { getCategoryStyle } from '@/lib/categories'
import { saveMedia, compressImage, MAX_FILES, MAX_VIDEO_MB } from '@/lib/media'
import Button from './ui/Button'
import Badge from './ui/Badge'

interface Draft {
  blob: Blob
  previewUrl: string
  type: string
}

export default function CompleteQuestModal() {
  const { completingQuestId, setCompletingQuest, completeQuest } = useStore()
  const [note, setNote] = useState('')
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const quest = completingQuestId ? getQuestById(completingQuestId) : undefined
  if (!quest) return null
  const cat = getCategoryStyle(quest.category)

  const reset = () => { setNote(''); setDrafts([]); setError(''); setSaving(false) }

  const close = () => { reset(); setCompletingQuest(null) }

  const addFiles = async (files: FileList | null) => {
    if (!files) return
    setError('')
    const next: Draft[] = []
    for (const file of Array.from(files)) {
      if (drafts.length + next.length >= MAX_FILES) { setError(`Max ${MAX_FILES} files per quest`); break }
      if (file.type.startsWith('image/')) {
        const blob = await compressImage(file)
        next.push({ blob, previewUrl: URL.createObjectURL(blob), type: 'image/jpeg' })
      } else if (file.type.startsWith('video/')) {
        if (file.size > MAX_VIDEO_MB * 1024 * 1024) { setError(`Videos must be under ${MAX_VIDEO_MB}MB`); continue }
        next.push({ blob: file, previewUrl: URL.createObjectURL(file), type: file.type })
      }
    }
    setDrafts(d => [...d, ...next])
  }

  const removeDraft = (i: number) => {
    URL.revokeObjectURL(drafts[i].previewUrl)
    setDrafts(d => d.filter((_, idx) => idx !== i))
  }

  const submit = async () => {
    if (note.trim().length < 10) { setError('Tell the tale! At least a sentence about your experience.'); return }
    setSaving(true)
    try {
      const mediaIds: string[] = []
      for (const d of drafts) mediaIds.push(await saveMedia(d.blob))
      drafts.forEach(d => URL.revokeObjectURL(d.previewUrl))
      completeQuest(quest.id, note.trim(), mediaIds)
      reset()
    } catch {
      setError('Could not save your media — try again or remove a file.')
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[var(--surface)] border border-white/10 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <span className="w-12 h-12 flex items-center justify-center rounded-2xl shadow-md shrink-0" style={{ background: cat.gradient }}>
            <cat.Icon size={22} className="text-white" strokeWidth={2.2} />
          </span>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg leading-tight">{quest.title}</h2>
            <div className="flex gap-1.5 mt-1">
              <Badge variant="forest">Completing</Badge>
              <Badge variant="gold">+{quest.xp} XP</Badge>
            </div>
          </div>
          <button onClick={close} className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center shrink-0 hover:bg-white/15">
            <X size={16} />
          </button>
        </div>

        {/* Story */}
        <div className="space-y-1.5">
          <p className="text-xs font-bold text-[var(--stone)] flex items-center gap-1.5">
            <Feather size={12} /> HOW DID IT GO? <span className="text-[var(--danger)]">*</span>
          </p>
          <textarea
            rows={4}
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="What happened? Who did you meet? What surprised you? This becomes a page in your quest diary..."
            className="w-full bg-[var(--surface-2)] text-[var(--ink)] border-2 border-white/10 rounded-2xl px-4 py-3 text-sm placeholder:text-[var(--stone-light)] focus:outline-none focus:border-[var(--quest-gold)] resize-none"
          />
        </div>

        {/* Media */}
        <div className="space-y-1.5">
          <p className="text-xs font-bold text-[var(--stone)] flex items-center gap-1.5">
            <Camera size={12} /> PHOTOS & VIDEOS <span className="text-[var(--stone-light)] normal-case font-semibold">(optional, up to {MAX_FILES})</span>
          </p>
          <div className="grid grid-cols-4 gap-2">
            {drafts.map((d, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-black/40">
                {d.type.startsWith('image/')
                  ? <img src={d.previewUrl} alt="" className="w-full h-full object-cover" />
                  : <video src={d.previewUrl} className="w-full h-full object-cover" muted />}
                <button onClick={() => removeDraft(i)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center">
                  <Trash2 size={12} className="text-rose-400" />
                </button>
                {d.type.startsWith('video/') && (
                  <span className="absolute bottom-1 left-1 text-[0.6rem] font-bold bg-black/70 rounded-full px-1.5 py-0.5">VIDEO</span>
                )}
              </div>
            ))}
            {drafts.length < MAX_FILES && (
              <button onClick={() => fileRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-white/15 flex flex-col items-center justify-center gap-1 text-[var(--stone)] hover:border-[var(--quest-gold)] hover:text-[var(--quest-gold)] transition-all">
                <Camera size={20} />
                <span className="text-[0.6rem] font-bold">Add</span>
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*,video/*" multiple hidden
            onChange={e => { addFiles(e.target.files); e.target.value = '' }} />
        </div>

        {error && <p className="text-xs font-bold text-[var(--danger)]">⚠ {error}</p>}

        <Button variant="secondary" size="lg" className="w-full" onClick={submit} loading={saving} icon={<Check size={18} />}>
          Complete Quest & Save Memory
        </Button>
      </div>
    </div>
  )
}
