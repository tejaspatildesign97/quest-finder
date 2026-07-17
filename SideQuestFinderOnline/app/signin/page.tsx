'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Map, Mail, Lock, Loader2, KeyRound, ArrowLeft } from 'lucide-react'
import { getSession, isRealSession, signInEmail, signUpEmail, signInGoogle,
         requestPasswordReset, verifyResetCode, changePassword } from '@/lib/auth'
import { supabaseConfigured } from '@/lib/supabase'
import Button from '@/components/ui/Button'

export default function SignInPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  // Forgot-password flow: null = normal sign-in, 'request' = enter email, 'verify' = enter code + new password
  const [resetStep, setResetStep] = useState<'request' | 'verify' | null>(null)
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // If already signed in, bounce to the app.
  useEffect(() => {
    if (!supabaseConfigured()) { router.replace('/dashboard'); return }
    getSession().then(s => { if (isRealSession(s)) router.replace('/dashboard') })
  }, [router])

  const submit = async () => {
    setError(''); setInfo('')
    if (!email.trim() || password.length < 6) {
      setError('Enter a valid email and a password of at least 6 characters.')
      return
    }
    setBusy(true)
    try {
      if (mode === 'signup') {
        const { needsConfirm } = await signUpEmail(email.trim(), password)
        if (needsConfirm) {
          setInfo('Check your inbox to confirm your email, then sign in.')
          setMode('signin')
          setBusy(false)
          return
        }
      } else {
        await signInEmail(email.trim(), password)
      }
      router.replace('/dashboard')  // AuthGate completes onboarding
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
      setBusy(false)
    }
  }

  const sendResetCode = async () => {
    setError(''); setInfo('')
    if (!email.trim()) { setError('Enter your account email first.'); return }
    setBusy(true)
    try {
      await requestPasswordReset(email.trim())
      setResetStep('verify')
      setInfo(`We emailed a one-time code to ${email.trim()}.`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send the code')
    } finally { setBusy(false) }
  }

  const confirmReset = async () => {
    setError(''); setInfo('')
    if (code.trim().length < 6) { setError('Enter the one-time code from the email.'); return }
    if (newPassword.length < 6) { setError('New password must be at least 6 characters.'); return }
    setBusy(true)
    try {
      await verifyResetCode(email.trim(), code.trim())
      await changePassword(newPassword)
      router.replace('/dashboard')  // verifyOtp signs the user in
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not reset the password')
      setBusy(false)
    }
  }

  const exitReset = () => {
    setResetStep(null); setCode(''); setNewPassword(''); setError(''); setInfo('')
  }

  const google = async () => {
    setError(''); setBusy(true)
    try { await signInGoogle() } // redirects away
    catch (e) { setError(e instanceof Error ? e.message : 'Google sign-in failed'); setBusy(false) }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 max-w-md mx-auto">
      {/* Brand */}
      <div className="text-center mb-8">
        <span className="w-16 h-16 mx-auto rounded-3xl flex items-center justify-center shadow-lg shadow-amber-500/30 float mb-4"
          style={{ background: 'var(--grad-orange)' }}>
          <Map size={30} className="text-white" strokeWidth={2.4} />
        </span>
        <h1 className="text-3xl font-display">Side Quest <span className="text-[var(--quest-gold)]">Finder</span></h1>
        <p className="text-sm font-semibold text-[var(--stone)] mt-1">Touch grass, but make it an RPG.</p>
      </div>

      {/* Card */}
      <div className="w-full scroll-border p-6 space-y-4">
        {resetStep ? (
          <>
            <button onClick={exitReset}
              className="flex items-center gap-1.5 text-xs font-bold text-[var(--stone)] hover:text-[var(--ink)] transition-colors">
              <ArrowLeft size={14} /> Back to sign in
            </button>

            <div className="text-center space-y-1">
              <h2 className="text-lg font-display">Reset password</h2>
              <p className="text-xs font-semibold text-[var(--stone)]">
                {resetStep === 'request'
                  ? "Enter your account email and we'll send a one-time code."
                  : 'Enter the code from the email and pick a new password.'}
              </p>
            </div>

            {resetStep === 'request' ? (
              <>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--stone-light)]" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
                    onKeyDown={e => e.key === 'Enter' && sendResetCode()}
                    className="w-full bg-[var(--surface-2)] text-[var(--ink)] border-2 border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm placeholder:text-[var(--stone-light)] focus:outline-none focus:border-[var(--quest-gold)]" />
                </div>

                {error && <p className="text-xs font-bold text-[var(--danger)]">⚠ {error}</p>}

                <Button variant="primary" size="lg" className="w-full" onClick={sendResetCode} loading={busy}>
                  Send code
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2.5">
                  <div className="relative">
                    <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--stone-light)]" />
                    <input type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={10}
                      value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ''))} placeholder="One-time code"
                      className="w-full bg-[var(--surface-2)] text-[var(--ink)] border-2 border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm tracking-[0.3em] placeholder:tracking-normal placeholder:text-[var(--stone-light)] focus:outline-none focus:border-[var(--quest-gold)]" />
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--stone-light)]" />
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New password"
                      onKeyDown={e => e.key === 'Enter' && confirmReset()}
                      className="w-full bg-[var(--surface-2)] text-[var(--ink)] border-2 border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm placeholder:text-[var(--stone-light)] focus:outline-none focus:border-[var(--quest-gold)]" />
                  </div>
                </div>

                {error && <p className="text-xs font-bold text-[var(--danger)]">⚠ {error}</p>}
                {info && <p className="text-xs font-bold text-emerald-400">{info}</p>}

                <Button variant="primary" size="lg" className="w-full" onClick={confirmReset} loading={busy}>
                  Reset password
                </Button>

                <button onClick={sendResetCode} disabled={busy}
                  className="block mx-auto text-xs font-bold text-[var(--quest-gold)] hover:underline disabled:opacity-50">
                  Resend code
                </button>
              </>
            )}
          </>
        ) : (
          <>
        {/* Tabs */}
        <div className="flex gap-1 bg-[var(--ink)]/5 rounded-2xl p-1">
          {(['signin', 'signup'] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); setInfo('') }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all
                ${mode === m ? 'bg-[var(--surface-2)] text-[var(--ink)] shadow-sm' : 'text-[var(--stone)] hover:text-[var(--ink)]'}`}>
              {m === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          ))}
        </div>

        <div className="space-y-2.5">
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--stone-light)]" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
              className="w-full bg-[var(--surface-2)] text-[var(--ink)] border-2 border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm placeholder:text-[var(--stone-light)] focus:outline-none focus:border-[var(--quest-gold)]" />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--stone-light)]" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"
              onKeyDown={e => e.key === 'Enter' && submit()}
              className="w-full bg-[var(--surface-2)] text-[var(--ink)] border-2 border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm placeholder:text-[var(--stone-light)] focus:outline-none focus:border-[var(--quest-gold)]" />
          </div>
          {mode === 'signin' && (
            <button onClick={() => { setResetStep('request'); setError(''); setInfo('') }}
              className="block ml-auto text-xs font-bold text-[var(--quest-gold)] hover:underline">
              Forgot password?
            </button>
          )}
        </div>

        {error && <p className="text-xs font-bold text-[var(--danger)]">⚠ {error}</p>}
        {info && <p className="text-xs font-bold text-emerald-400">{info}</p>}

        <Button variant="primary" size="lg" className="w-full" onClick={submit} loading={busy}>
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </Button>

        <div className="flex items-center gap-3">
          <span className="flex-1 h-px bg-white/10" />
          <span className="text-xs font-bold text-[var(--stone-light)]">or</span>
          <span className="flex-1 h-px bg-white/10" />
        </div>

        <button onClick={google} disabled={busy}
          className="w-full flex items-center justify-center gap-3 bg-white text-[#1f1f27] font-extrabold text-sm rounded-2xl py-3 hover:opacity-90 transition-all disabled:opacity-50">
          {busy ? <Loader2 size={16} className="animate-spin" /> : <GoogleIcon />}
          Continue with Google
        </button>
          </>
        )}
      </div>

      <p className="text-xs font-semibold text-[var(--stone-light)] mt-5 text-center">
        Every adventurer needs an account — your progress syncs across all your devices.
      </p>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.3 17.6 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-2.8-.4-4.1H24v7.8h12.4c-.3 2-1.6 5-4.6 7l7.1 5.5c4.2-3.9 6.6-9.6 6.6-16.2z"/>
      <path fill="#FBBC05" d="M10.4 28.3c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-7.8-6.1C1 16 0 19.9 0 23.5s1 7.5 2.6 10.9l7.8-6.1z"/>
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.1-5.5c-2 1.3-4.6 2.3-8.8 2.3-6.4 0-11.7-3.8-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z"/>
    </svg>
  )
}
