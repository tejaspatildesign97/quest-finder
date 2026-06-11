import type { Quest, Difficulty, Mood, PlayMode } from './types'
import { QUESTS } from './quests'

export interface ForgeInput {
  mode: PlayMode
  /** available minutes; Infinity = no limit */
  time: number
  mood: Mood
  /** category name or 'Any' */
  category: string
}

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Legendary']

function pickRandom<T>(arr: T[], avoid?: T): T | undefined {
  if (!arr.length) return undefined
  if (arr.length > 1 && avoid) {
    const without = arr.filter(x => x !== avoid)
    return without[Math.floor(Math.random() * without.length)]
  }
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Forge one quest per difficulty matching the input, relaxing constraints
 * progressively (category → mood → time) when nothing matches.
 * `avoidIds` biases rerolls away from the previous result.
 */
export function forgeQuests(input: ForgeInput, excludeIds: string[] = [], avoidIds: string[] = []): Quest[] {
  const base = QUESTS.filter(q => q.mode.includes(input.mode) && !excludeIds.includes(q.id))

  return DIFFICULTIES.flatMap(difficulty => {
    const pool = base.filter(q => q.difficulty === difficulty)

    const filters: ((q: Quest) => boolean)[] = [
      q => q.duration <= input.time && q.moods.includes(input.mood) && (input.category === 'Any' || q.category === input.category),
      q => q.duration <= input.time && q.moods.includes(input.mood),
      q => q.duration <= input.time,
      () => true,
    ]

    for (const filter of filters) {
      const matches = pool.filter(filter)
      if (matches.length) {
        const avoid = matches.find(q => avoidIds.includes(q.id))
        const pick = pickRandom(matches, avoid)
        return pick ? [pick] : []
      }
    }
    return []
  })
}
