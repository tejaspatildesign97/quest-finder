'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Users, UserRound, Plus, X, Swords } from 'lucide-react'
import { useStore } from '@/lib/store'
import { QUESTS } from '@/lib/quests'
import type { PartyMode } from '@/lib/types'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import QuestCard from '@/components/ui/QuestCard'

export default function PartyPage() {
  const router = useRouter()
  const { character, party, playMode, setPlayMode, createParty, leaveParty, activeQuests, acceptQuest, completeQuest, abandonQuest, _hasHydrated } = useStore()

  const [partyName, setPartyName] = useState('')
  const [partyMode, setPartyMode] = useState<PartyMode>('friends')
  const [memberName, setMemberName] = useState('')
  const [members, setMembers] = useState<string[]>([])

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) router.replace('/character/create')
  }, [_hasHydrated, character])
  if (!_hasHydrated || !character) return null

  const handleCreate = () => {
    if (!partyName.trim()) return
    const allMembers = [character.name, ...members.filter(Boolean)]
    createParty({
      id: Math.random().toString(36).slice(2),
      name: partyName.trim(),
      mode: partyMode,
      members: allMembers,
      activeQuestIds: [],
      createdAt: new Date().toISOString(),
    })
    setPlayMode(partyMode === 'couples' ? 'duo' : 'group')
  }

  const addMember = () => {
    if (memberName.trim() && !members.includes(memberName.trim())) {
      setMembers(m => [...m, memberName.trim()])
      setMemberName('')
    }
  }

  const partyQuests = party
    ? QUESTS.filter(q => q.mode.includes(party.mode === 'couples' ? 'duo' : 'group'))
    : []

  if (party) {
    return (
      <div className="space-y-5">
        <div className="scroll-border p-5 text-center space-y-2.5">
          <div className="w-16 h-16 mx-auto rounded-3xl flex items-center justify-center shadow-lg float"
            style={{ background: party.mode === 'couples' ? 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)' : 'var(--grad-purple)' }}>
            {party.mode === 'couples' ? <Heart size={28} className="text-white fill-white/30" /> : <Users size={28} className="text-white" />}
          </div>
          <h2 className="text-xl font-display font-semibold">{party.name}</h2>
          <Badge variant={party.mode === 'couples' ? 'magic' : 'forest'}>
            {party.mode === 'couples' ? 'Couples Mode' : 'Friends Mode'}
          </Badge>
          <div className="flex flex-wrap justify-center gap-1.5 pt-1">
            {party.members.map(m => (
              <Badge key={m} variant="stone" icon={<UserRound size={11} />}>{m}</Badge>
            ))}
          </div>
          <p className="text-xs text-[var(--quest-gold)] font-extrabold">+20% XP on all quests!</p>
        </div>

        <div className="space-y-3">
          <p className="font-display font-semibold text-[var(--ink)]">Party Quests</p>
          {partyQuests.map(q => (
            <QuestCard
              key={q.id}
              quest={q}
              activeQuest={activeQuests.find(a => a.questId === q.id)}
              onAccept={quest => acceptQuest(quest.id)}
              onComplete={completeQuest}
              onAbandon={abandonQuest}
              isParty={true}
            />
          ))}
        </div>

        <Button variant="danger" size="sm" className="w-full" onClick={() => { leaveParty(); setPlayMode('solo') }}>
          Leave Party
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Create a Party</h2>
        <p className="text-sm text-[var(--stone)]">Quest together, earn bonus XP</p>
      </div>

      {/* Mode picker */}
      <div className="grid grid-cols-2 gap-3">
        {([['couples', Heart, 'Couples', 'Romantic duo quests', 'bg-pink-400'], ['friends', Users, 'Friends', 'Group adventure quests', 'bg-violet-400']] as const).map(([val, Icon, label, desc, iconBg]) => (
          <button
            key={val}
            onClick={() => setPartyMode(val)}
            className={`flex flex-col items-center gap-1.5 p-5 rounded-3xl transition-all
              ${partyMode === val
                ? (val === 'couples' ? 'bg-[var(--pastel-pink)] ring-4 ring-pink-400/50 shadow-lg scale-[1.02]' : 'bg-[var(--pastel-purple)] ring-4 ring-violet-400/50 shadow-lg scale-[1.02]')
                : 'bg-[var(--surface-2)] shadow-[0_1px_3px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.5)] hover:scale-[1.02]'}`}
          >
            <span className={`w-11 h-11 rounded-full flex items-center justify-center shadow-sm ${iconBg}`}>
              <Icon size={20} className="text-white" strokeWidth={2.4} />
            </span>
            <span className="font-display font-semibold text-sm">{label}</span>
            <span className="text-[0.65rem] font-semibold text-[var(--stone)]">{desc}</span>
          </button>
        ))}
      </div>

      <Input
        label="Party Name"
        placeholder="The Legendary Fellowship..."
        value={partyName}
        onChange={e => setPartyName(e.target.value)}
      />

      <div className="space-y-2">
        <p className="text-sm font-bold text-[var(--ink)]">Members (optional)</p>
        <div className="flex gap-2">
          <Input placeholder="Add member name..." value={memberName} onChange={e => setMemberName(e.target.value)} />
          <Button variant="secondary" size="sm" onClick={addMember} className="shrink-0" icon={<Plus size={14} />}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="gold" icon={<UserRound size={11} />}>{character.name} (you)</Badge>
          {members.map(m => (
            <button key={m} onClick={() => setMembers(ms => ms.filter(x => x !== m))}>
              <Badge variant="stone" icon={<X size={11} />}>{m}</Badge>
            </button>
          ))}
        </div>
      </div>

      <Button variant="magic" size="lg" className="w-full" onClick={handleCreate} disabled={!partyName.trim()} icon={<Swords size={18} />}>
        Form Party!
      </Button>
    </div>
  )
}
