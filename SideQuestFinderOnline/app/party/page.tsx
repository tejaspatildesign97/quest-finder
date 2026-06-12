'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Users, Swords, Crown, Copy, Check, LogIn, Lock, Hammer, Zap } from 'lucide-react'
import { useStore } from '@/lib/store'
import { QUESTS } from '@/lib/quests'
import type { PartyMode } from '@/lib/types'
import { createOnlineParty, joinOnlineParty, leaveOnlineParty, refreshParty, fetchCompletions, type OnlineCompletion } from '@/lib/partySync'
import { supabaseConfigured } from '@/lib/supabase'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import QuestCard from '@/components/ui/QuestCard'
import Badge from '@/components/ui/Badge'
import { getQuestById } from '@/lib/quests'
import Link from 'next/link'
import Avatar from '@/components/ui/Avatar'

export default function PartyPage() {
  const router = useRouter()
  const { character, onlineParty, myUserId, setOnlineParty, setMyUserId, setPlayMode,
          activeQuests, setCompletingQuest, abandonQuest, _hasHydrated, addToast } = useStore()

  const [partyName, setPartyName] = useState('')
  const [partyMode, setPartyMode] = useState<PartyMode>('friends')
  const [joinCode, setJoinCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<OnlineCompletion[] | null>(null)

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) router.replace('/character/create')
  }, [_hasHydrated, character])

  // Refresh member list + shared history when viewing an existing party
  useEffect(() => {
    if (!onlineParty) return
    refreshParty(onlineParty.id).then(p => setOnlineParty(p)).catch(() => {})
    fetchCompletions(onlineParty.id).then(setHistory).catch(() => setHistory([]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineParty?.id])

  if (!_hasHydrated || !character) return null

  const run = async (fn: () => Promise<void>) => {
    setBusy(true); setError('')
    try { await fn() } catch (e) { setError(e instanceof Error ? e.message : 'Something went wrong') }
    setBusy(false)
  }

  const handleCreate = () => run(async () => {
    const p = await createOnlineParty(character, partyName.trim(), partyMode)
    setOnlineParty(p)
    setMyUserId(p.leaderId)
    setPlayMode(partyMode === 'couples' ? 'couple' : 'friends')
    addToast({ type: 'xp', message: 'Party created! Share your invite code', icon: '⚔️' })
  })

  const handleJoin = () => run(async () => {
    const p = await joinOnlineParty(character, joinCode)
    setOnlineParty(p)
    const me = p.members.find(m => m.name === character.name)
    setMyUserId(me?.id ?? null)
    setPlayMode(p.mode === 'couples' ? 'couple' : 'friends')
    addToast({ type: 'xp', message: `Joined ${p.name}!`, icon: '🤝' })
  })

  const handleLeave = () => run(async () => {
    if (myUserId && onlineParty) await leaveOnlineParty(onlineParty, myUserId)
    setOnlineParty(null)
    setPlayMode('solo')
  })

  const copyCode = () => {
    if (!onlineParty) return
    navigator.clipboard.writeText(onlineParty.inviteCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (!supabaseConfigured()) {
    return <p className="text-center text-sm font-bold text-[var(--stone)] py-20">Supabase isn't configured — add keys to .env.local</p>
  }

  // ── Active party view ──────────────────────────────────────────────────────
  if (onlineParty) {
    const isLeader = myUserId === onlineParty.leaderId
    const partyMode = onlineParty.mode === 'couples' ? 'couple' : 'friends'
    const activePartyQuests = activeQuests.filter(a => {
      if (a.status !== 'active') return false
      const q = QUESTS.find(x => x.id === a.questId)
      return q?.mode.includes(partyMode)
    })

    return (
      <div className="space-y-5">
        <div className="scroll-border p-5 text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-3xl flex items-center justify-center shadow-lg float"
            style={{ background: onlineParty.mode === 'couples' ? 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)' : 'var(--grad-purple)' }}>
            {onlineParty.mode === 'couples' ? <Heart size={28} className="text-white fill-white/30" /> : <Users size={28} className="text-white" />}
          </div>
          <h2 className="text-xl">{onlineParty.name}</h2>

          {/* Invite code */}
          <button onClick={copyCode}
            className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 rounded-2xl px-4 py-2.5 transition-all">
            <span className="font-display text-2xl tracking-[0.3em] text-[var(--quest-gold)]">{onlineParty.inviteCode}</span>
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-[var(--stone)]" />}
          </button>
          <p className="text-xs font-semibold text-[var(--stone)]">Share this code — your {onlineParty.mode === 'couples' ? 'partner' : 'friends'} can join from their own device</p>

          {/* Members (live from server) */}
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {onlineParty.members.map(m => (
              <span key={m.id} className="flex items-center gap-1.5 bg-white/5 rounded-full pl-1 pr-3 py-1">
                <span className="w-7 h-7 rounded-full overflow-hidden bg-[var(--pastel-orange)] flex items-center justify-center">
                  <Avatar value={m.avatar} size={26} />
                </span>
                <span className="text-xs font-extrabold">{m.name}</span>
                {m.id === onlineParty.leaderId && <Crown size={11} className="text-[var(--quest-gold)]" />}
              </span>
            ))}
          </div>
          <p className="text-xs text-[var(--quest-gold)] font-extrabold">+20% XP on all quests!</p>
        </div>

        {/* Active party quests (leader-run) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="font-display font-semibold text-[var(--ink)]">Active Party Quests</p>
            {!isLeader && (
              <span className="flex items-center gap-1 text-xs font-bold text-[var(--stone)]">
                <Lock size={11} /> Leader runs the quests
              </span>
            )}
          </div>
          {isLeader ? (
            <>
              {activePartyQuests.map(a => {
                const q = QUESTS.find(x => x.id === a.questId)
                if (!q) return null
                return (
                  <QuestCard key={q.id} quest={q} activeQuest={a}
                    onComplete={setCompletingQuest} onAbandon={abandonQuest} isParty={true} />
                )
              })}
              <Link href="/quests"
                className="flex items-center justify-center gap-2 w-full rounded-2xl border-2 border-dashed border-white/15 py-3.5 text-sm font-extrabold text-[var(--stone)] hover:border-[var(--magic)] hover:text-[var(--magic-light)] transition-all">
                <Hammer size={15} /> {activePartyQuests.length ? 'Forge more party quests' : 'Forge your first party quest'}
              </Link>
            </>
          ) : (
            activePartyQuests.length === 0 && (
              <p className="text-xs font-semibold text-[var(--stone-light)] text-center py-3">
                Waiting on {onlineParty.members.find(m => m.id === onlineParty.leaderId)?.name ?? 'the leader'} to pick the next quest…
              </p>
            )
          )}
        </div>

        {/* Completed together */}
        {history && history.length > 0 && (
          <div className="space-y-2">
            <p className="font-display font-semibold text-[var(--ink)]">Completed Together</p>
            {history.map(c => {
              const q = getQuestById(c.questId)
              if (!q) return null
              return (
                <div key={c.id} className="bg-[var(--surface-2)] rounded-2xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.5)] space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="flex-1 text-sm font-bold truncate">{q.title}</p>
                    <Badge variant="gold" icon={<Zap size={11} className="fill-amber-500 text-amber-500" />}>+{c.xp}</Badge>
                  </div>
                  {c.note && <p className="text-xs font-medium text-[var(--stone)] leading-relaxed">{c.note}</p>}
                  <p className="text-[0.65rem] font-bold text-[var(--stone-light)]">
                    {c.completedByName} · {new Date(c.completedAt).toLocaleDateString()}
                  </p>
                </div>
              )
            })}
          </div>
        )}

        <Button variant="danger" size="sm" className="w-full" onClick={handleLeave} loading={busy}>
          {isLeader ? 'Disband Party' : 'Leave Party'}
        </Button>
        {error && <p className="text-xs font-bold text-center text-[var(--danger)]">⚠ {error}</p>}
      </div>
    )
  }

  // ── Create / Join ──────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl">Party Up</h2>
        <p className="text-sm font-semibold text-[var(--stone)]">Real sync — quest with people on their own devices</p>
      </div>

      {/* Join */}
      <div className="scroll-border p-5 space-y-3">
        <p className="font-display font-semibold flex items-center gap-2"><LogIn size={16} className="text-[var(--forest)]" /> Join a party</p>
        <div className="flex gap-2">
          <Input placeholder="Enter invite code..." value={joinCode}
            onChange={e => setJoinCode(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === 'Enter' && joinCode.trim() && handleJoin()} />
          <Button variant="secondary" onClick={handleJoin} disabled={!joinCode.trim()} loading={busy} className="shrink-0">Join</Button>
        </div>
      </div>

      <div className="quest-divider text-xs text-[var(--stone)]">or create your own</div>

      {/* Create */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {([['couples', Heart, 'Couples', 'Just the two of you', 'bg-pink-400'], ['friends', Users, 'Friends', 'Any size crew', 'bg-violet-400']] as const).map(([val, Icon, label, desc, iconBg]) => (
            <button key={val} onClick={() => setPartyMode(val)}
              className={`flex flex-col items-center gap-1.5 p-5 rounded-3xl transition-all
                ${partyMode === val
                  ? (val === 'couples' ? 'bg-[var(--pastel-pink)] ring-4 ring-pink-400/50 shadow-lg scale-[1.02]' : 'bg-[var(--pastel-purple)] ring-4 ring-violet-400/50 shadow-lg scale-[1.02]')
                  : 'bg-[var(--surface-2)] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.5)] hover:scale-[1.02]'}`}>
              <span className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm ${iconBg}`}>
                <Icon size={20} className="text-white" strokeWidth={2.4} />
              </span>
              <span className="font-display font-semibold text-sm">{label}</span>
              <span className="text-[0.65rem] font-semibold text-[var(--stone)]">{desc}</span>
            </button>
          ))}
        </div>

        <Input label="Party Name" placeholder="The Legendary Fellowship..."
          value={partyName} onChange={e => setPartyName(e.target.value)} />

        <Button variant="magic" size="lg" className="w-full" onClick={handleCreate}
          disabled={!partyName.trim()} loading={busy} icon={<Swords size={18} />}>
          Create Party & Get Invite Code
        </Button>
        {error && <p className="text-xs font-bold text-center text-[var(--danger)]">⚠ {error}</p>}
        <p className="text-xs font-semibold text-center text-[var(--stone-light)]">
          You'll be the party leader — only you run the quests; everyone shares the XP and diary.
        </p>
      </div>
    </div>
  )
}
