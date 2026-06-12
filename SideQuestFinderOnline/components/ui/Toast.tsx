'use client'

import { Trophy, ChevronsUp, Zap } from 'lucide-react'
import { useStore } from '@/lib/store'

const TYPE_ICON = {
  achievement: Trophy,
  levelup: ChevronsUp,
  xp: Zap,
}

export default function ToastContainer() {
  const { toasts, dismissToast } = useStore()

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[calc(100vw-2rem)] max-w-sm pointer-events-none">
      {toasts.map(t => {
        const Icon = TYPE_ICON[t.type] ?? Zap
        return (
          <div
            key={t.id}
            onClick={() => dismissToast(t.id)}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl cursor-pointer
              animate-[slideUp_0.3s_ease-out]
              ${t.type === 'achievement' ? 'bg-[var(--magic)] text-white shadow-violet-500/30' :
                t.type === 'levelup'     ? 'bg-[var(--quest-gold)] text-[#0c0c10] shadow-amber-500/30' :
                'bg-[var(--ink)] text-white shadow-black/20'
              }`}
          >
            <span className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <Icon size={18} strokeWidth={2.4} />
            </span>
            <span className="font-extrabold text-sm">{t.message}</span>
          </div>
        )
      })}
    </div>
  )
}
