import type { Achievement } from './types'

export const ACHIEVEMENTS: Achievement[] = [
  // ── Common ────────────────────────────────────────────────────────────────
  { id: 'ach-001', title: 'First Blood',      icon: '⚔️',  rarity: 'Common',    description: 'Complete your first quest.',          condition: 'Complete 1 quest' },
  { id: 'ach-002', title: 'Getting Started',  icon: '🥾',  rarity: 'Common',    description: 'Accept 3 quests.',                    condition: 'Accept 3 quests' },
  { id: 'ach-003', title: 'On a Roll',        icon: '🔥',  rarity: 'Common',    description: 'Maintain a 3-day streak.',            condition: '3-day streak' },
  { id: 'ach-004', title: 'Foodie',           icon: '🍽️',  rarity: 'Common',    description: 'Complete 3 Food quests.',             condition: 'Complete 3 Food quests' },
  { id: 'ach-005', title: 'Social Butterfly', icon: '🦋',  rarity: 'Common',    description: 'Complete 5 Social quests.',           condition: 'Complete 5 Social quests' },
  { id: 'ach-006', title: 'Nature Lover',     icon: '🌿',  rarity: 'Common',    description: 'Complete 5 Discovery quests.',          condition: 'Complete 5 Discovery quests' },
  { id: 'ach-007', title: 'Mind Palace',      icon: '🧘',  rarity: 'Common',    description: 'Complete 3 Mindfulness quests.',      condition: 'Complete 3 Mindfulness quests' },
  { id: 'ach-008', title: 'Artisan',          icon: '🎨',  rarity: 'Common',    description: 'Complete 3 Creativity quests.',         condition: 'Complete 3 Creativity quests' },

  // ── Rare ──────────────────────────────────────────────────────────────────
  { id: 'ach-009', title: 'Streak Keeper',    icon: '📅',  rarity: 'Rare',      description: 'Maintain a 7-day streak.',            condition: '7-day streak' },
  { id: 'ach-010', title: 'Quest Hoarder',    icon: '📜',  rarity: 'Rare',      description: 'Have 5 active quests at once.',       condition: 'Accept 5 quests simultaneously' },
  { id: 'ach-011', title: 'Hard Boiled',      icon: '💪',  rarity: 'Rare',      description: 'Complete 3 Hard quests.',             condition: 'Complete 3 Hard quests' },
  { id: 'ach-012', title: 'Scholar',          icon: '📚',  rarity: 'Rare',      description: 'Complete 5 Learning quests.',         condition: 'Complete 5 Learning quests' },
  { id: 'ach-013', title: 'Level Up!',        icon: '⬆️',  rarity: 'Rare',      description: 'Reach level 5.',                      condition: 'Reach level 5' },
  { id: 'ach-014', title: 'Duo Dynamic',      icon: '👫',  rarity: 'Rare',      description: 'Complete 5 quests in Couples mode.', condition: 'Complete 5 couple quests' },
  { id: 'ach-015', title: 'Fellowship',       icon: '👥',  rarity: 'Rare',      description: 'Complete 5 quests in Friends mode.', condition: 'Complete 5 friends quests' },
  { id: 'ach-016', title: 'Globe Trotter',    icon: '🌍',  rarity: 'Rare',      description: 'Complete quests in 4 categories.',   condition: 'Complete quests in 4 different categories' },

  // ── Epic ──────────────────────────────────────────────────────────────────
  { id: 'ach-017', title: 'Speed Runner',     icon: '⚡',  rarity: 'Epic',      description: 'Complete a timed quest with over half the time remaining.', condition: 'Finish timed quest with >50% time left' },
  { id: 'ach-018', title: 'Fortnight Flame',  icon: '🕯️',  rarity: 'Epic',      description: 'Maintain a 14-day streak.',           condition: '14-day streak' },
  { id: 'ach-019', title: 'Centurion',        icon: '🏅',  rarity: 'Epic',      description: 'Earn 10,000 XP total.',               condition: 'Earn 10,000 XP' },
  { id: 'ach-020', title: 'Polymath',         icon: '🔬',  rarity: 'Epic',      description: 'Complete quests in every category.', condition: 'Complete quests in all categories' },
  { id: 'ach-021', title: 'Questmaster',      icon: '🎓',  rarity: 'Epic',      description: 'Reach level 10.',                     condition: 'Reach level 10' },
  { id: 'ach-022', title: 'The Hard Way',     icon: '🗡️',  rarity: 'Epic',      description: 'Complete 10 Hard quests.',            condition: 'Complete 10 Hard quests' },

  // ── Legendary ─────────────────────────────────────────────────────────────
  { id: 'ach-023', title: 'Legendary Wanderer', icon: '🌟', rarity: 'Legendary', description: 'Complete a Legendary quest.',        condition: 'Complete 1 Legendary quest' },
  { id: 'ach-024', title: 'The Completionist',  icon: '💎', rarity: 'Legendary', description: 'Complete every quest in one category.', condition: 'Complete all quests in a single category' },
  { id: 'ach-025', title: 'The Eternal Flame',  icon: '🔥', rarity: 'Legendary', description: 'Maintain a 30-day streak.',           condition: '30-day streak' },
  { id: 'ach-026', title: 'Legend',             icon: '👑', rarity: 'Legendary', description: 'Reach level 20.',                    condition: 'Reach level 20' },
  { id: 'ach-027', title: 'Quest God',          icon: '⚜️', rarity: 'Legendary', description: 'Complete 50 quests total.',           condition: 'Complete 50 quests' },
  { id: 'ach-028', title: 'All Modes Mastered', icon: '🎭', rarity: 'Legendary', description: 'Complete quests in Solo, Couples, and Friends modes.', condition: 'Complete quests in all 3 play modes' },
  { id: 'ach-029', title: 'Legendary x5',       icon: '🌠', rarity: 'Legendary', description: 'Complete 5 Legendary-difficulty quests.', condition: 'Complete 5 Legendary quests' },
  { id: 'ach-030', title: 'The Oracle',         icon: '🔮', rarity: 'Legendary', description: 'Earn 50,000 XP total.',               condition: 'Earn 50,000 XP' },
]

export function getAchievementById(id: string): Achievement | undefined {
  return ACHIEVEMENTS.find(a => a.id === id)
}
