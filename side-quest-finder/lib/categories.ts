import {
  TreePine, UtensilsCrossed, MessagesSquare, Palette, GraduationCap, Leaf,
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
  Outdoor: {
    Icon: TreePine,
    gradient: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
    tile: 'bg-emerald-400/15',
    iconColor: 'text-emerald-300',
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
  Creative: {
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
}

export function getCategoryStyle(category: string): CategoryStyle {
  return CATEGORY_STYLES[category] ?? CATEGORY_STYLES.Outdoor
}
