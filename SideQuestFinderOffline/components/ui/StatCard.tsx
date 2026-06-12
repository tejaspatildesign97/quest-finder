import { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon: ReactNode
  /** pastel tile behind the icon, e.g. 'bg-emerald-400/15' */
  tile?: string
  sub?: string
  className?: string
}

export default function StatCard({ label, value, icon, tile = 'bg-[var(--pastel-orange)]', sub, className = '' }: StatCardProps) {
  return (
    <div className={`bg-[var(--surface-2)] rounded-2xl p-3.5 text-center shadow-[0_1px_3px_rgba(0,0,0,0.5),0_4px_12px_rgba(0,0,0,0.5)] ${className}`}>
      <div className={`w-9 h-9 mx-auto mb-1.5 rounded-xl flex items-center justify-center ${tile}`}>{icon}</div>
      <div className="text-xl font-extrabold text-[var(--ink)] leading-none">{value}</div>
      <div className="text-[0.65rem] font-extrabold text-[var(--stone-light)] uppercase tracking-wider mt-1">{label}</div>
      {sub && <div className="text-xs text-[var(--stone-light)] mt-0.5">{sub}</div>}
    </div>
  )
}
