import { QUESTS } from './quests'
import type { Quest, QuestMode } from './types'

function dayOfYear() {
  const now = new Date()
  return Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)
}

/**
 * Deterministic day-seeded quest suggestions (generalized from the old
 * dashboard "Daily Quests" logic). Stable all day, no persistence needed.
 * Spread: 2 Easy, 2 Medium, 1 Hard/Legendary (trimmed to `count`).
 */
export function getDailyQuests(playMode: QuestMode, count = 5): Quest[] {
  const day = dayOfYear()
  const pool = QUESTS.filter(q => q.mode.includes(playMode))
  const pick = (sub: Quest[], salt: number) => (sub.length ? sub[(day * 7 + salt * 13) % sub.length] : undefined)

  const easy = pool.filter(q => q.difficulty === 'Easy')
  const medium = pool.filter(q => q.difficulty === 'Medium')
  const hard = pool.filter(q => q.difficulty === 'Hard' || q.difficulty === 'Legendary')

  const picks = [pick(easy, 1), pick(medium, 2), pick(hard, 3), pick(easy, 4), pick(medium, 5)]
  const seen = new Set<string>()
  const out: Quest[] = []
  for (const q of picks) {
    if (q && !seen.has(q.id)) { seen.add(q.id); out.push(q) }
    if (out.length >= count) break
  }
  return out
}
