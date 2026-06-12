import type { Quest, Difficulty, ForgeMood, PlayMode } from './types'
import { QUESTS } from './quests'

export interface ForgeInput {
  mode: PlayMode
  /** available minutes; Infinity = no limit */
  time: number
  mood: ForgeMood
  /** category name or 'Any' */
  category: string
}

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard', 'Legendary']

/** Maps each Forge picker vibe to the quest moods it covers. */
export const MOOD_GROUPS: Record<ForgeMood, string[]> = {
  chill:       ['chill', 'calm', 'peaceful', 'reflective', 'nostalgic', 'humble', 'anxious', 'present'],
  social:      ['social', 'heartfelt', 'helpful', 'vulnerable', 'positive', 'happy', 'romantic', 'intimate', 'connected', 'trusting', 'joyful'],
  creative:    ['creative', 'inspired', 'playful'],
  adventurous: ['adventurous', 'bold', 'brave', 'free', 'confident', 'determined', 'hopeful'],
  curious:     ['curious', 'thoughtful', 'focused', 'open-minded', 'productive'],
  chaotic:     ['chaotic', 'playful', 'bold', 'free'],
}

function moodMatches(quest: Quest, mood: ForgeMood): boolean {
  const group = MOOD_GROUPS[mood]
  return quest.moods.some(m => group.includes(m))
}

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
      q => q.duration <= input.time && moodMatches(q, input.mood) && (input.category === 'Any' || q.category === input.category),
      q => q.duration <= input.time && moodMatches(q, input.mood),
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
