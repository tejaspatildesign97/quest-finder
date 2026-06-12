import type { Difficulty } from './types'

export interface LevelInfo {
  level: number
  title: string
  xpRequired: number
}

export const LEVELS: LevelInfo[] = [
  { level: 1,  title: 'Wandering Soul',  xpRequired: 0 },
  { level: 2,  title: 'Apprentice',      xpRequired: 500 },
  { level: 3,  title: 'Adventurer',      xpRequired: 1200 },
  { level: 4,  title: 'Scout',           xpRequired: 2200 },
  { level: 5,  title: 'Pathfinder',      xpRequired: 3500 },
  { level: 6,  title: 'Trailblazer',     xpRequired: 5200 },
  { level: 7,  title: 'Wayfarer',        xpRequired: 7200 },
  { level: 8,  title: 'Ranger',          xpRequired: 9800 },
  { level: 9,  title: 'Seeker',          xpRequired: 12800 },
  { level: 10, title: 'Questmaster',     xpRequired: 16500 },
  { level: 15, title: 'Champion',        xpRequired: 35000 },
  { level: 20, title: 'Legend',          xpRequired: 70000 },
]

export const XP_MULTIPLIERS: Record<Difficulty, number> = {
  Easy:      1,
  Medium:    1.5,
  Hard:      2.5,
  Legendary: 5,
}

export const PARTY_BONUS = 0.2

export function getLevelInfo(xp: number): LevelInfo {
  let current = LEVELS[0]
  for (const lvl of LEVELS) {
    if (xp >= lvl.xpRequired) current = lvl
    else break
  }
  return current
}

export function getNextLevelInfo(xp: number): LevelInfo | null {
  const currentLevel = getLevelInfo(xp)
  const idx = LEVELS.findIndex(l => l.level === currentLevel.level)
  return LEVELS[idx + 1] ?? null
}

export function getXPProgress(xp: number): { current: number; needed: number; percent: number } {
  const current = getLevelInfo(xp)
  const next = getNextLevelInfo(xp)
  if (!next) return { current: xp - current.xpRequired, needed: 0, percent: 100 }
  const current_xp = xp - current.xpRequired
  const needed = next.xpRequired - current.xpRequired
  return { current: current_xp, needed, percent: Math.round((current_xp / needed) * 100) }
}

export function calcXP(baseXP: number, difficulty: Difficulty, isParty = false): number {
  const base = Math.round(baseXP * XP_MULTIPLIERS[difficulty])
  return isParty ? Math.round(base * (1 + PARTY_BONUS)) : base
}
