'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Search, UserPlus, Check, Loader2 } from 'lucide-react'
import { useStore } from '@/lib/store'
import { searchProfiles, addFriend, type FriendProfile } from '@/lib/friends'
import Avatar from './ui/Avatar'

interface AddFriendModalProps {
  open: boolean
  onClose: () => void
  myUserId: string | null
  existingIds: string[]
  onAdded: () => void
}

export default function AddFriendModal({ open, onClose, myUserId, existingIds, onAdded }: AddFriendModalProps) {
  const { addToast } = useStore()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<FriendProfile[] | null>(null)
  const [searching, setSearching] = useState(false)
  const [added, setAdded] = useState<string[]>([])
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Lock background scroll
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  useEffect(() => {
    if (!open) { setQuery(''); setResults(null); setAdded([]) }
  }, [open])

  // Debounced search
  useEffect(() => {
    if (!open) return
    if (debounce.current) clearTimeout(debounce.current)
    if (!query.trim()) { setResults(null); return }
    setSearching(true)
    debounce.current = setTimeout(async () => {
      try {
        const exclude = [...existingIds, ...(myUserId ? [myUserId] : [])]
        setResults(await searchProfiles(query, exclude))
      } catch {
        setResults([])
      }
      setSearching(false)
    }, 350)
    return () => { if (debounce.current) clearTimeout(debounce.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, open])

  if (!open) return null

  const handleAdd = async (p: FriendProfile) => {
    setAdded(a => [...a, p.id])
    try {
      await addFriend(p.id)
      addToast({ type: 'xp', message: `Added ${p.name}!`, icon: '🤝' })
      onAdded()
    } catch {
      setAdded(a => a.filter(id => id !== p.id))
      addToast({ type: 'xp', message: 'Could not add — try again', icon: '⚠️' })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[var(--surface)] border border-white/10 rounded-t-3xl sm:rounded-3xl w-full max-w-lg max-h-[88dvh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-5 pb-3 shrink-0">
          <span className="w-10 h-10 rounded-2xl bg-[var(--pastel-mint)] flex items-center justify-center">
            <UserPlus size={18} className="text-emerald-300" />
          </span>
          <h2 className="text-lg flex-1">Add Friend</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center hover:bg-white/15">
            <X size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 shrink-0">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--stone-light)]" />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by username..."
              className="w-full bg-[var(--surface-2)] text-[var(--ink)] border-2 border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm placeholder:text-[var(--stone-light)] focus:outline-none focus:border-[var(--forest)]"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-5 py-4 min-h-0 space-y-2">
          {!query.trim() ? (
            <p className="text-center text-xs font-semibold text-[var(--stone-light)] py-10">
              Type a username to find adventurers to add.
            </p>
          ) : searching ? (
            <div className="py-10"><Loader2 size={24} className="animate-spin mx-auto text-[var(--stone)]" /></div>
          ) : results && results.length === 0 ? (
            <p className="text-center text-xs font-semibold text-[var(--stone-light)] py-10">
              No one found for &quot;{query}&quot;.
            </p>
          ) : (
            (results ?? []).map(p => {
              const isAdded = added.includes(p.id)
              return (
                <div key={p.id} className="flex items-center gap-3 bg-[var(--surface-2)] rounded-2xl px-3 py-2.5">
                  <span className="w-10 h-10 rounded-full overflow-hidden bg-[var(--pastel-orange)] flex items-center justify-center shrink-0">
                    <Avatar value={p.avatar} size={38} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-extrabold truncate">{p.name}</p>
                    <p className="text-xs font-bold text-[var(--stone-light)] truncate">@{p.username}</p>
                  </div>
                  <button
                    onClick={() => handleAdd(p)}
                    disabled={isAdded}
                    className={`flex items-center gap-1 text-xs font-extrabold rounded-full px-3.5 py-2 transition-all
                      ${isAdded ? 'bg-emerald-500/20 text-emerald-300' : 'bg-[var(--forest)] text-[#0c0c10] hover:opacity-90'}`}
                  >
                    {isAdded ? <><Check size={13} /> Added</> : <><UserPlus size={13} /> Add</>}
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
