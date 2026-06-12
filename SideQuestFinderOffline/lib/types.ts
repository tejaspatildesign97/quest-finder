export type CharacterClass = 'Wanderer' | 'Explorer' | 'Trickster' | 'Sage' | 'Bard'

export interface Character {
  id: string
  name: string
  class: CharacterClass
  avatar: string
  bio: string
  level: number
  xp: number
  xpToNextLevel: number
  streak: number
  lastActiveDate: string
  createdAt: string
}

export type QuestMode = 'solo' | 'couple' | 'friends'
export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Legendary'
/** Quest moods are free-form (27 distinct in the library); the Forge groups them into 6 picker vibes. */
export type Mood = string
export type ForgeMood = 'chill' | 'social' | 'creative' | 'adventurous' | 'curious' | 'chaotic'

export interface Quest {
  id: string
  title: string
  description: string
  lore: string
  difficulty: Difficulty
  category: string
  mode: QuestMode[]
  xp: number
  icon: string
  tags: string[]
  repeatable: boolean
  /** estimated minutes to complete */
  duration: number
  /** vibes this quest fits */
  moods: Mood[]
  timeLimit?: number
  chain?: string
}

export type ActiveQuestStatus = 'active' | 'completed' | 'abandoned'

export interface ActiveQuest {
  questId: string
  status: ActiveQuestStatus
  acceptedAt: string
  completedAt?: string
  xpEarned?: number
  /** journal entry written on completion */
  note?: string
  /** IndexedDB keys of attached photos/videos */
  mediaIds?: string[]
}

export type AchievementRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: AchievementRarity
  condition: string
  unlockedAt?: string
}

export type PartyMode = 'couples' | 'friends'

export interface Party {
  id: string
  name: string
  mode: PartyMode
  members: string[]
  /** member name who controls party quests (the creator) */
  leader: string
  activeQuestIds: string[]
  createdAt: string
}

export type PlayMode = 'solo' | 'couple' | 'friends'
