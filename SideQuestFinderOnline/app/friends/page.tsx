'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Search, UserPlus, Users, Loader2, X, Copy, Check } from 'lucide-react'
import { useStore } from '@/lib/store'
import { ensureUsername, fetchFriends, removeFriend, type FriendProfile } from '@/lib/friends'
import { supabaseConfigured } from '@/lib/supabase'
import Avatar from '@/components/ui/Avatar'
import AddFriendModal from '@/components/AddFriendModal'

export default function FriendsPage() {
  const router = useRouter()
  const { character, myUserId, setMyUserId, addToast, _hasHydrated } = useStore()

  const [username, setUsername] = useState<string | null>(null)
  const [friends, setFriends] = useState<FriendProfile[] | null>(null)
  const [filter, setFilter] = useState('')
  const [adding, setAdding] = useState(false)
  const [copied, setCopied] = useState(false)

  const load = useCallback(async (uid: string) => {
    try { setFriends(await fetchFriends(uid)) } catch { setFriends([]) }
  }, [])

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) { router.replace('/character/create'); return }
    if (!supabaseConfigured()) { setFriends([]); return }
    ensureUsername(character).then(({ userId, username }) => {
      setMyUserId(userId)
      setUsername(username)
      load(userId)
    }).catch(() => setFriends([]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_hasHydrated, character])

  if (!_hasHydrated || !character) return null

  const shown = (friends ?? []).filter(f => {
    const q = filter.trim().toLowerCase()
    return !q || f.name.toLowerCase().includes(q) || f.username.toLowerCase().includes(q)
  })

  const handleRemove = async (f: FriendProfile) => {
    setFriends(fs => (fs ?? []).filter(x => x.id !== f.id))
    try { await removeFriend(f.id) } catch { if (myUserId) load(myUserId) }
  }

  const copyUsername = () => {
    if (!username) return
    navigator.clipboard.writeText(`@${username}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => router.back()} aria-label="Back"
          className="absolute left-0 w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-all">
          <ArrowLeft size={18} className="text-[var(--ink)]" />
        </button>
        <div className="text-center">
          <h2 className="text-2xl">Friends</h2>
          <p className="text-sm font-semibold text-[var(--stone)]">{friends?.length ?? 0} adventurers</p>
        </div>
      </div>

      {/* Your handle */}
      {username && (
        <button onClick={copyUsername}
          className="w-full flex items-center gap-2 bg-[var(--surface-2)] rounded-2xl px-4 py-2.5 hover:bg-white/8 transition-all">
          <span className="text-xs font-bold text-[var(--stone)]">Your username</span>
          <span className="text-sm font-extrabold text-[var(--quest-gold)]">@{username}</span>
          <span className="flex-1" />
          {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-[var(--stone)]" />}
        </button>
      )}

      {/* Add + search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--stone-light)]" />
          <input
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Search your friends..."
            className="w-full bg-[var(--surface-2)] text-[var(--ink)] border-2 border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm placeholder:text-[var(--stone-light)] focus:outline-none focus:border-[var(--quest-gold)]"
          />
        </div>
        <button onClick={() => setAdding(true)}
          className="flex items-center gap-1.5 shrink-0 bg-[var(--forest)] text-[#0c0c10] font-extrabold text-sm rounded-2xl px-4 hover:opacity-90 transition-all">
          <UserPlus size={16} /> Add
        </button>
      </div>

      {/* List */}
      {friends === null ? (
        <div className="py-16"><Loader2 size={28} className="animate-spin mx-auto text-[var(--stone)]" /></div>
      ) : friends.length === 0 ? (
        <div className="text-center py-14 space-y-3">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-white/5 flex items-center justify-center">
            <Users size={28} className="text-[var(--stone-light)]" />
          </div>
          <p className="text-sm font-bold text-[var(--stone)]">No friends yet.</p>
          <p className="text-xs font-semibold text-[var(--stone-light)] max-w-xs mx-auto">
            Tap <span className="text-[var(--forest)] font-extrabold">Add</span> and search by username to build your party of adventurers.
          </p>
        </div>
      ) : shown.length === 0 ? (
        <p className="text-center text-xs font-semibold text-[var(--stone-light)] py-10">No friends match &quot;{filter}&quot;.</p>
      ) : (
        <div className="space-y-2">
          {shown.map(f => (
            <div key={f.id} className="flex items-center gap-3 bg-[var(--surface-2)] rounded-2xl px-3 py-2.5">
              <span className="w-10 h-10 rounded-full overflow-hidden bg-[var(--pastel-orange)] flex items-center justify-center shrink-0">
                <Avatar value={f.avatar} size={38} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-extrabold truncate">{f.name}</p>
                <p className="text-xs font-bold text-[var(--stone-light)] truncate">@{f.username}</p>
              </div>
              <button onClick={() => handleRemove(f)} aria-label="Remove friend"
                className="w-8 h-8 rounded-full bg-white/8 hover:bg-rose-500/20 flex items-center justify-center transition-all group">
                <X size={15} className="text-[var(--stone)] group-hover:text-rose-400" />
              </button>
            </div>
          ))}
        </div>
      )}

      <AddFriendModal
        open={adding}
        onClose={() => setAdding(false)}
        myUserId={myUserId}
        existingIds={(friends ?? []).map(f => f.id)}
        onAdded={() => { if (myUserId) load(myUserId) }}
      />
    </div>
  )
}
