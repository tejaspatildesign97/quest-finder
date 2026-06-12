'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { BookOpen, Share2, Zap, Compass, Loader2 } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getQuestById } from '@/lib/quests'
import type { ActiveQuest } from '@/lib/types'
import { getCategoryStyle } from '@/lib/categories'
import { getMediaURL } from '@/lib/media'
import { generateStoryCard, shareCard, shareText, PLATFORM_LINKS } from '@/lib/share'
import QuestCard from '@/components/ui/QuestCard'
import Badge from '@/components/ui/Badge'
import MediaThumb from '@/components/MediaThumb'

const TABS = ['Diary', 'Active'] as const

function DiaryEntry({ entry }: { entry: ActiveQuest }) {
  const { character, addToast } = useStore()
  const [sharing, setSharing] = useState(false)
  const quest = getQuestById(entry.questId)
  if (!quest) return null
  const cat = getCategoryStyle(quest.category)
  const mediaIds = entry.mediaIds ?? []

  const handleShareCard = async () => {
    setSharing(true)
    try {
      let photoURL: string | undefined
      if (mediaIds.length) {
        const m = await getMediaURL(mediaIds[0])
        if (m?.type.startsWith('image/')) photoURL = m.url
      }
      const blob = await generateStoryCard(quest, entry, character, photoURL)
      const result = await shareCard(blob, shareText(quest, entry))
      addToast({ type: 'xp', message: result === 'shared' ? 'Story shared!' : 'Story card downloaded!', icon: '📤' })
      if (photoURL) URL.revokeObjectURL(photoURL)
    } finally {
      setSharing(false)
    }
  }

  const text = shareText(quest, entry)

  return (
    <article className="rounded-3xl bg-[var(--surface-2)] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.5)]">
      {/* Gradient accent */}
      <div className="h-1.5" style={{ background: cat.gradient }} />

      <div className="p-4 space-y-3">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 flex items-center justify-center rounded-xl shadow-md shrink-0" style={{ background: cat.gradient }}>
            <cat.Icon size={18} className="text-white" strokeWidth={2.2} />
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-base leading-tight">{quest.title}</h3>
            <p className="text-xs font-bold text-[var(--stone-light)]">
              {entry.completedAt && new Date(entry.completedAt).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <Badge variant="gold" icon={<Zap size={11} className="fill-amber-500 text-amber-500" />}>+{entry.xpEarned ?? quest.xp}</Badge>
        </div>

        {/* Media */}
        {mediaIds.length === 1 && (
          <MediaThumb mediaId={mediaIds[0]} className="w-full max-h-96 rounded-2xl" />
        )}
        {mediaIds.length > 1 && (
          <div className={`grid gap-2 ${mediaIds.length === 2 ? 'grid-cols-2' : 'grid-cols-2'}`}>
            {mediaIds.map((id, i) => (
              <MediaThumb key={id} mediaId={id}
                className={`w-full h-44 rounded-2xl ${mediaIds.length === 3 && i === 0 ? 'col-span-2 h-56' : ''}`} />
            ))}
          </div>
        )}

        {/* Story */}
        {entry.note ? (
          <p className="text-sm font-medium text-[var(--ink)]/90 leading-relaxed">{entry.note}</p>
        ) : (
          <p className="text-sm italic text-[var(--stone-light)]">No journal entry for this quest.</p>
        )}

        {/* Share row */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/5">
          <button onClick={handleShareCard} disabled={sharing}
            className="flex items-center gap-1.5 text-xs font-extrabold text-[var(--ink)] bg-white/8 hover:bg-white/15 rounded-full px-3.5 py-2 transition-all disabled:opacity-50">
            {sharing ? <Loader2 size={13} className="animate-spin" /> : <Share2 size={13} />}
            Share story card
          </button>
          <div className="flex-1" />
          <a href={PLATFORM_LINKS.x(text)} target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-xs font-extrabold">𝕏</a>
          <a href={PLATFORM_LINKS.whatsapp(text)} target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-sm">💬</a>
          <a href={PLATFORM_LINKS.facebook(text)} target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-xs font-extrabold">f</a>
        </div>
      </div>
    </article>
  )
}

export default function JournalPage() {
  const router = useRouter()
  const { character, activeQuests, setCompletingQuest, abandonQuest, party, _hasHydrated,
          onlineParty, myUserId, claimedCompletionIds, claimCompletion } = useStore()
  const [tab, setTab] = useState<typeof TABS[number]>('Diary')

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) router.replace('/character/create')
  }, [_hasHydrated, character])

  // Party sync: pull completions posted by party mates and claim XP + diary entries
  useEffect(() => {
    if (!onlineParty || !myUserId) return
    let cancelled = false
    const pull = async () => {
      try {
        const { fetchCompletions } = await import('@/lib/partySync')
        const completions = await fetchCompletions(onlineParty.id)
        if (cancelled) return
        const { claimedCompletionIds: claimed } = useStore.getState()
        completions
          .filter(c => c.completedBy !== myUserId && !claimed.includes(c.id))
          .forEach(c => claimCompletion(c))
      } catch { /* offline or schema missing — retry on next visit */ }
    }
    pull()
    let unsub: (() => void) | undefined
    import('@/lib/partySync').then(({ subscribeCompletions }) => {
      if (!cancelled) unsub = subscribeCompletions(onlineParty.id, pull)
    })
    return () => { cancelled = true; unsub?.() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineParty?.id, myUserId])

  if (!_hasHydrated || !character) return null

  const completed = activeQuests
    .filter(q => q.status === 'completed')
    .sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? ''))
  const active = activeQuests.filter(q => q.status === 'active')

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl">Quest Diary</h2>
        <p className="text-sm font-semibold text-[var(--stone)]">
          {completed.length} memories · {active.length} in progress
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[var(--ink)]/5 rounded-2xl p-1">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all
              ${tab === t ? 'bg-[var(--surface-2)] text-[var(--ink)] shadow-sm' : 'text-[var(--stone)] hover:text-[var(--ink)]'}`}>
            {t === 'Diary' ? `Diary (${completed.length})` : `Active (${active.length})`}
          </button>
        ))}
      </div>

      {/* Diary feed */}
      {tab === 'Diary' && (
        completed.length === 0 ? (
          <div className="text-center py-14 space-y-3">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-white/5 flex items-center justify-center">
              <BookOpen size={28} className="text-[var(--stone-light)]" />
            </div>
            <p className="text-sm font-bold text-[var(--stone)]">Your diary is empty.</p>
            <p className="text-xs font-semibold text-[var(--stone-light)] max-w-xs mx-auto">
              Complete a quest and write about the experience — every adventure becomes a page here.
            </p>
            <Link href="/quests" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[var(--quest-gold)]">
              <Compass size={14} /> Find a quest
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {completed.map((entry, i) => <DiaryEntry key={`${entry.questId}-${i}`} entry={entry} />)}
          </div>
        )
      )}

      {/* Active quests */}
      {tab === 'Active' && (
        active.length === 0 ? (
          <div className="text-center py-14 space-y-3">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-white/5 flex items-center justify-center">
              <Compass size={28} className="text-[var(--stone-light)]" />
            </div>
            <p className="text-sm font-bold text-[var(--stone)]">No active quests.</p>
            <Link href="/quests" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[var(--quest-gold)]">
              <Compass size={14} /> Visit the Quest Board
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {active.map(aq => {
              const q = getQuestById(aq.questId)
              if (!q) return null
              return (
                <QuestCard key={aq.questId} quest={q} activeQuest={aq}
                  onComplete={setCompletingQuest} onAbandon={abandonQuest} isParty={!!party} />
              )
            })}
          </div>
        )
      )}
    </div>
  )
}
