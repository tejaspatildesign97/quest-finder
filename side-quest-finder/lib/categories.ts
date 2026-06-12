import {
  Mountain, HeartHandshake, Shield, Palette, Compass, UtensilsCrossed,
  GraduationCap, Leaf, Moon, MessagesSquare, Heart, Link2, Shuffle,
  type LucideIcon,
} from 'lucide-react'

export interface CategoryStyle {
  Icon: LucideIcon
  /** gradient for poster cards */
  gradient: string
  /** soft tile behind icons */
  tile: string
  /** icon color on tiles */
  iconColor: string
}

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  Adventure: {
    Icon: Mountain,
    gradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
    tile: 'bg-emerald-400/15',
    iconColor: 'text-emerald-300',
  },
  Discovery: {
    Icon: Compass,
    gradient: 'linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)',
    tile: 'bg-cyan-400/15',
    iconColor: 'text-cyan-300',
  },
  Food: {
    Icon: UtensilsCrossed,
    gradient: 'linear-gradient(135deg, #fb923c 0%, #ea580c 100%)',
    tile: 'bg-orange-400/15',
    iconColor: 'text-orange-300',
  },
  Social: {
    Icon: MessagesSquare,
    gradient: 'linear-gradient(135deg, #f472b6 0%, #db2777 100%)',
    tile: 'bg-pink-400/15',
    iconColor: 'text-pink-300',
  },
  Creativity: {
    Icon: Palette,
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)',
    tile: 'bg-violet-400/15',
    iconColor: 'text-violet-300',
  },
  Learning: {
    Icon: GraduationCap,
    gradient: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
    tile: 'bg-blue-400/15',
    iconColor: 'text-blue-300',
  },
  Mindfulness: {
    Icon: Leaf,
    gradient: 'linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)',
    tile: 'bg-teal-400/15',
    iconColor: 'text-teal-300',
  },
  Community: {
    Icon: HeartHandshake,
    gradient: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
    tile: 'bg-amber-400/15',
    iconColor: 'text-amber-300',
  },
  Courage: {
    Icon: Shield,
    gradient: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
    tile: 'bg-red-400/15',
    iconColor: 'text-red-300',
  },
  'Night Quest': {
    Icon: Moon,
    gradient: 'linear-gradient(135deg, #6366f1 0%, #312e81 100%)',
    tile: 'bg-indigo-400/15',
    iconColor: 'text-indigo-300',
  },
  Romance: {
    Icon: Heart,
    gradient: 'linear-gradient(135deg, #fb7185 0%, #be123c 100%)',
    tile: 'bg-rose-400/15',
    iconColor: 'text-rose-300',
  },
  Connection: {
    Icon: Link2,
    gradient: 'linear-gradient(135deg, #e879f9 0%, #a21caf 100%)',
    tile: 'bg-fuchsia-400/15',
    iconColor: 'text-fuchsia-300',
  },
  Chaos: {
    Icon: Shuffle,
    gradient: 'linear-gradient(135deg, #facc15 0%, #ea580c 100%)',
    tile: 'bg-yellow-400/15',
    iconColor: 'text-yellow-300',
  },
}

export function getCategoryStyle(category: string): CategoryStyle {
  return CATEGORY_STYLES[category] ?? CATEGORY_STYLES.Discovery
}
