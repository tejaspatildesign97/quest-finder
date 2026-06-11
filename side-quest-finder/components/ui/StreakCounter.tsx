import { Flame, Moon } from 'lucide-react'

interface StreakCounterProps {
  streak: number
  className?: string
}

export default function StreakCounter({ streak, className = '' }: StreakCounterProps) {
  const isHot = streak >= 3
  const isLegendary = streak >= 14

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-md ${
        streak === 0 ? 'bg-[var(--ink)]/8' : ''
      } ${isLegendary ? 'float' : ''}`}
        style={streak > 0 ? { background: isHot ? 'linear-gradient(135deg, #fb923c 0%, #ef4444 100%)' : 'var(--grad-orange)' } : undefined}
      >
        {streak === 0
          ? <Moon size={20} className="text-[var(--stone-light)]" />
          : <Flame size={22} className="text-white fill-white/30" strokeWidth={2.2} />}
      </span>
      <div>
        <div className={`font-display font-semibold text-lg leading-none ${isLegendary ? 'text-[var(--danger)]' : isHot ? 'text-[var(--quest-gold)]' : 'text-[var(--ink)]'}`}>
          {streak} {streak === 1 ? 'day' : 'days'}
        </div>
        <div className="text-xs font-bold text-[var(--stone)]">
          {streak === 0 ? 'No streak yet' : isLegendary ? 'Legendary streak!' : isHot ? 'On fire!' : 'Keep going!'}
        </div>
      </div>
    </div>
  )
}
