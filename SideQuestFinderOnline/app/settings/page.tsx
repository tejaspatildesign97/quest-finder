'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft, ChevronRight, Pencil, AtSign, Globe2, Lock, Bell, Star,
  MessageSquare, Camera, Hash, FileText, ShieldCheck, LogOut, Trash2, Loader2, Mail,
} from 'lucide-react'
import { useStore } from '@/lib/store'
import { ensureUsername } from '@/lib/friends'
import { supabaseConfigured } from '@/lib/supabase'
import { getSession, signOut } from '@/lib/auth'
import EditProfileModal from '@/components/EditProfileModal'
import type { Settings } from '@/lib/store'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-extrabold uppercase tracking-widest text-[var(--stone-light)] px-1">{title}</p>
      <div className="bg-[var(--surface-2)] rounded-2xl overflow-hidden divide-y divide-white/5">
        {children}
      </div>
    </div>
  )
}

function Row({ icon, label, value, onClick, href, danger }: {
  icon?: ReactNode; label: string; value?: ReactNode; onClick?: () => void; href?: string; danger?: boolean
}) {
  const content = (
    <div className={`flex items-center gap-3 px-4 py-3.5 ${onClick || href ? 'hover:bg-white/4 cursor-pointer' : ''} transition-colors`}>
      {icon && <span className={danger ? 'text-rose-400' : 'text-[var(--stone)]'}>{icon}</span>}
      <span className={`flex-1 text-sm font-bold ${danger ? 'text-rose-400' : 'text-[var(--ink)]'}`}>{label}</span>
      {value !== undefined && <span className="text-sm font-semibold text-[var(--stone-light)]">{value}</span>}
      {(onClick || href) && !value && <ChevronRight size={16} className="text-[var(--stone-light)]" />}
    </div>
  )
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>
  if (onClick) return <button onClick={onClick} className="w-full text-left">{content}</button>
  return content
}

function Toggle({ icon, label, desc, on, onChange }: {
  icon?: ReactNode; label: string; desc?: string; on: boolean; onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      {icon && <span className="text-[var(--stone)] shrink-0">{icon}</span>}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[var(--ink)]">{label}</p>
        {desc && <p className="text-xs font-semibold text-[var(--stone-light)] mt-0.5">{desc}</p>}
      </div>
      <button onClick={() => onChange(!on)} role="switch" aria-checked={on}
        className={`w-11 h-6 rounded-full shrink-0 transition-colors relative ${on ? 'bg-[var(--forest)]' : 'bg-white/15'}`}>
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${on ? 'left-[1.375rem]' : 'left-0.5'}`} />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const { character, settings, updateSettings, resetCharacter, _hasHydrated } = useStore()
  const [editing, setEditing] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    if (!_hasHydrated) return
    if (!character) { router.replace('/character/create'); return }
    if (supabaseConfigured()) {
      ensureUsername(character).then(({ username }) => setUsername(username)).catch(() => {})
      getSession().then(s => setEmail(s?.user.email ?? null)).catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_hasHydrated, character])

  const handleSignOut = async () => {
    await signOut().catch(() => {})
    router.replace('/signin')
  }

  if (!_hasHydrated || !character) return null

  const set = (patch: Partial<Settings>) => updateSettings(patch)

  const handleReset = async () => {
    if (!confirm('Delete your character and all progress? This cannot be undone.')) return
    resetCharacter()
    // Wipe the cloud copy too, then sign out → back to the sign-in screen.
    try {
      const { supabase } = await import('@/lib/supabase')
      const s = await getSession()
      if (s) await supabase().from('game_state').delete().eq('user_id', s.user.id)
    } catch { /* ignore */ }
    await signOut().catch(() => {})
    router.replace('/signin')
  }

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div className="relative flex items-center justify-center">
        <button onClick={() => router.back()} aria-label="Back"
          className="absolute left-0 w-9 h-9 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center transition-all">
          <ArrowLeft size={18} className="text-[var(--ink)]" />
        </button>
        <h2 className="text-2xl">Settings</h2>
      </div>

      <EditProfileModal open={editing} onClose={() => setEditing(false)} />

      <Section title="Account">
        {email && <Row icon={<Mail size={17} />} label="Email" value={email} />}
        <Row icon={<AtSign size={17} />} label="Username" value={username ? `@${username}` : <Loader2 size={14} className="animate-spin" />} />
        <Row icon={<Pencil size={17} />} label="Edit Profile" onClick={() => setEditing(true)} />
      </Section>

      <Section title="Preferences">
        <Toggle icon={<Globe2 size={17} />} label="Appear in Community"
          desc="Your completions are shared to the Community feed by default"
          on={settings.appearInCommunity} onChange={v => set({ appearInCommunity: v })} />
      </Section>

      <Section title="Privacy">
        <Toggle icon={<Lock size={17} />} label="Public profile"
          desc="Anyone can see your class and achievements. Only followers see your completed quests."
          on={settings.publicProfile} onChange={v => set({ publicProfile: v })} />
      </Section>

      <Section title="Notifications">
        <Toggle icon={<Bell size={17} />} label="New followers"
          on={settings.notifyFollowers} onChange={v => set({ notifyFollowers: v })} />
        <Toggle icon={<Star size={17} />} label="Quest cheers"
          on={settings.notifyLikes} onChange={v => set({ notifyLikes: v })} />
        <Toggle icon={<Bell size={17} />} label="Daily quest reminders"
          on={settings.dailyReminders} onChange={v => set({ dailyReminders: v })} />
      </Section>

      <Section title="Feedback">
        <Row icon={<MessageSquare size={17} />} label="Send Feedback" href="mailto:hello@sidequestfinder.app?subject=Feedback" />
        <Row icon={<Star size={17} />} label="Rate Side Quest Finder" onClick={() => {}} />
      </Section>

      <Section title="Follow Us">
        <Row icon={<Camera size={17} />} label="Instagram" href="https://instagram.com" />
        <Row icon={<Hash size={17} />} label="X (Twitter)" href="https://x.com" />
        <Row icon={<MessageSquare size={17} />} label="Reddit" href="https://reddit.com" />
      </Section>

      <Section title="About">
        <Row icon={<FileText size={17} />} label="Privacy Policy" href="https://example.com/privacy" />
        <Row icon={<FileText size={17} />} label="Terms & Conditions" href="https://example.com/terms" />
        <Row icon={<ShieldCheck size={17} />} label="App Version" value="1.0.0" />
      </Section>

      <Section title="Danger Zone">
        <Row icon={<LogOut size={17} />} label="Sign Out" onClick={handleSignOut} danger />
        <Row icon={<Trash2 size={17} />} label="Delete Character" onClick={handleReset} danger />
      </Section>

      <p className="text-center text-xs font-semibold text-[var(--stone-light)] pt-2">
        Side Quest Finder · touch grass, but make it an RPG.
      </p>
    </div>
  )
}
