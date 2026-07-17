'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, AlertCircle } from 'lucide-react'
import { useStore } from '@/lib/store'
import { fetchMessages, sendMessage, markThreadRead, fetchPeerProfile, subscribeMessages,
         isUuid, type ChatMessage } from '@/lib/chat'
import Avatar from '@/components/ui/Avatar'

function dayLabel(iso: string) {
  const d = new Date(iso)
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const that = new Date(d); that.setHours(0, 0, 0, 0)
  const diff = (today.getTime() - that.getTime()) / 86400000
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
}

const hhmm = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

export default function ChatThreadPage() {
  const { peerId } = useParams<{ peerId: string }>()
  const { myUserId, character, addToast } = useStore()
  const [peer, setPeer] = useState<{ name: string; avatar: string } | null>(null)
  const [messages, setMessages] = useState<ChatMessage[] | null>(null)
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const valid = typeof peerId === 'string' && isUuid(peerId)

  // Load history + peer info, mark read, subscribe to incoming
  useEffect(() => {
    if (!myUserId || !valid) return
    let cancelled = false
    fetchMessages(myUserId, peerId).then(ms => {
      if (cancelled) return
      setMessages(ms)
      markThreadRead(myUserId, peerId)
    })
    fetchPeerProfile(peerId).then(p => { if (!cancelled && p) setPeer(p) })
    const unsub = subscribeMessages(myUserId, m => {
      if (m.senderId !== peerId) return
      setMessages(ms => [...(ms ?? []), m])
      markThreadRead(myUserId, peerId)
    })
    return () => { cancelled = true; unsub() }
  }, [myUserId, peerId, valid])

  // Keep scrolled to the newest message
  useEffect(() => { bottomRef.current?.scrollIntoView({ block: 'end' }) }, [messages?.length])

  const send = async () => {
    const body = draft.trim()
    if (!body || !character || !valid || sending) return
    setSending(true)
    setDraft('')
    const temp: ChatMessage = {
      id: `temp-${Date.now()}`, senderId: myUserId ?? 'me', recipientId: peerId,
      body, createdAt: new Date().toISOString(), readAt: null, pending: true,
    }
    setMessages(ms => [...(ms ?? []), temp])
    try {
      const real = await sendMessage(character, peerId, body)
      setMessages(ms => (ms ?? []).map(m => (m.id === temp.id ? real : m)))
    } catch {
      setMessages(ms => (ms ?? []).map(m => (m.id === temp.id ? { ...m, pending: false, failed: true } : m)))
      addToast({ type: 'xp', message: "Couldn't send — chat may not be set up yet.", icon: '⚠️' })
    } finally {
      setSending(false)
    }
  }

  if (!valid) {
    return (
      <div className="qp-screen flex flex-col items-center justify-center gap-3 text-center">
        <AlertCircle size={28} className="text-[var(--qp-coral)]" />
        <p className="qp-body text-sm">Adventurer not found.</p>
        <Link href="/chat" className="qp-btn-primary px-6 py-2.5 text-sm">Back to messages</Link>
      </div>
    )
  }

  return (
    <div className="qp-screen flex flex-col !p-0 h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-3 border-b border-[rgba(255,244,228,0.08)]">
        <Link href="/chat" className="qp-inset w-9 h-9 flex items-center justify-center shrink-0">
          <ArrowLeft size={16} className="text-[var(--qp-gray)]" />
        </Link>
        <span className="block w-9 h-9 rounded-full overflow-hidden bg-[var(--qp-inset)] ring-1 ring-[rgba(255,244,228,0.2)] shrink-0">
          {peer && <Avatar value={peer.avatar} size={36} />}
        </span>
        <h1 className="qp-title text-base truncate">{peer?.name ?? 'Adventurer'}</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-2">
        {messages === null ? (
          <p className="qp-body text-xs text-center py-8">Loading…</p>
        ) : messages.length === 0 ? (
          <p className="qp-body text-xs text-center py-8">Say hi — every party starts with one message.</p>
        ) : (
          messages.map((m, i) => {
            const mine = m.senderId !== peerId
            const newDay = i === 0 || dayLabel(m.createdAt) !== dayLabel(messages[i - 1].createdAt)
            return (
              <div key={m.id}>
                {newDay && (
                  <p className="qp-overline text-center py-2">{dayLabel(m.createdAt)}</p>
                )}
                <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed ${
                    mine
                      ? 'bg-[var(--qp-pink)] text-white rounded-[18px] rounded-br-[5px]'
                      : 'bg-[var(--qp-inset)] text-[var(--qp-cream)] rounded-[18px] rounded-bl-[5px]'
                  } ${m.pending ? 'opacity-60' : ''} ${m.failed ? 'opacity-60 ring-1 ring-[var(--qp-coral)]' : ''}`}
                    style={{ fontFamily: 'var(--font-jakarta), sans-serif', fontWeight: 500 }}>
                    {m.body}
                    <span className={`qp-num block text-right text-[0.55rem] mt-1 ${mine ? 'text-white/70' : 'text-[var(--qp-gray)]'}`}>
                      {m.failed ? 'failed' : m.pending ? 'sending…' : hhmm(m.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar — owns the bottom edge (nav is hidden on this route) */}
      <div className="px-4 pt-2" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)' }}>
        <div className="qp-card flex items-center gap-2 pl-4 pr-2 py-2">
          <input
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Send a message…"
            className="flex-1 bg-transparent text-sm text-[var(--qp-cream)] placeholder:text-[var(--qp-gray)] focus:outline-none"
            style={{ fontFamily: 'var(--font-jakarta), sans-serif', fontWeight: 500 }}
          />
          <button onClick={send} disabled={!draft.trim() || sending} aria-label="Send"
            className="qp-btn-primary w-9 h-9 !p-0">
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
