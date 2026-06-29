'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Character, ActiveQuest, Party, PlayMode, Quest, Difficulty } from './types'
import { postCompletion, type OnlineParty, type OnlineCompletion } from './partySync'
import { getLevelInfo, getNextLevelInfo, calcXP } from './levels'
import { ACHIEVEMENTS } from './achievements'
import { QUESTS } from './quests'

interface Toast {
  id: string
  type: 'achievement' | 'levelup' | 'xp'
  message: string
  icon: string
}

export interface Settings {
  appearInCommunity: boolean
  publicProfile: boolean
  notifyFollowers: boolean
  notifyLikes: boolean
  dailyReminders: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  appearInCommunity: true,
  publicProfile: true,
  notifyFollowers: true,
  notifyLikes: true,
  dailyReminders: true,
}

interface StoreState {
  character: Character | null
  activeQuests: ActiveQuest[]
  unlockedAchievements: string[]
  party: Party | null
  playMode: PlayMode
  toasts: Toast[]
  pendingLevelUp: string | null
  _hasHydrated: boolean
  setHasHydrated: (v: boolean) => void

  // Settings
  settings: Settings
  updateSettings: (patch: Partial<Settings>) => void

  // Character
  setCharacter: (c: Character) => void
  updateCharacter: (patch: Partial<Pick<Character, 'name' | 'bio' | 'avatar' | 'class'>>) => void
  resetCharacter: () => void

  // Play mode
  setPlayMode: (m: PlayMode) => void

  // Quests
  acceptQuest: (questId: string) => void
  completeQuest: (questId: string, note?: string, mediaIds?: string[], shareToCommunity?: boolean, imageUrls?: string[]) => void
  abandonQuest: (questId: string) => void
  /** quest id currently in the completion modal */
  completingQuestId: string | null
  setCompletingQuest: (id: string | null) => void

  // Party
  createParty: (party: Party) => void
  leaveParty: () => void

  // Online party (Supabase-synced)
  onlineParty: OnlineParty | null
  myUserId: string | null
  claimedCompletionIds: string[]
  setOnlineParty: (p: OnlineParty | null) => void
  setMyUserId: (id: string | null) => void
  /** questId → challengeId for dares this user accepted */
  acceptedChallenges: Record<string, string>
  recordAcceptedChallenge: (questId: string, challengeId: string) => void
  /** Apply a party-mate's completion to this device: XP + diary entry. */
  claimCompletion: (c: OnlineCompletion) => void

  // Achievements
  unlockAchievement: (id: string) => void
  checkAchievements: () => void

  // Toasts
  addToast: (t: Omit<Toast, 'id'>) => void
  dismissToast: (id: string) => void
  dismissLevelUp: () => void

  // Streak
  updateStreak: () => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      character: null,
      activeQuests: [],
      unlockedAchievements: [],
      party: null,
      playMode: 'solo',
      toasts: [],
      pendingLevelUp: null,
      _hasHydrated: false,
      setHasHydrated: (v) => set({ _hasHydrated: v }),

      settings: DEFAULT_SETTINGS,
      updateSettings: (patch) => set(s => ({ settings: { ...s.settings, ...patch } })),

      setCharacter: (c) => set({ character: c }),
      updateCharacter: (patch) => {
        const { character } = get()
        if (!character) return
        set({ character: { ...character, ...patch } })
      },
      resetCharacter: () => set({ character: null, activeQuests: [], unlockedAchievements: [], party: null, playMode: 'solo' }),
      setPlayMode: (m) => set({ playMode: m }),

      acceptQuest: (questId) => {
        const { activeQuests } = get()
        const alreadyActive = activeQuests.find(q => q.questId === questId && q.status === 'active')
        if (alreadyActive) return
        set({ activeQuests: [...activeQuests, { questId, status: 'active', acceptedAt: new Date().toISOString() }] })
        get().checkAchievements()
      },

      completingQuestId: null,
      setCompletingQuest: (id) => set({ completingQuestId: id }),

      completeQuest: (questId, note, mediaIds, shareToCommunity, imageUrls) => {
        const { activeQuests, character, party } = get()
        const quest = QUESTS.find(q => q.id === questId)
        if (!quest || !character) return

        const isParty = !!party
        const earned = calcXP(quest.xp, quest.difficulty as Difficulty, isParty)
        const newXP = character.xp + earned
        const oldLevel = getLevelInfo(character.xp)
        const newLevel = getLevelInfo(newXP)
        const nextLevel = getNextLevelInfo(newXP)

        const updatedCharacter: Character = {
          ...character,
          xp: newXP,
          level: newLevel.level,
          xpToNextLevel: nextLevel?.xpRequired ?? character.xpToNextLevel,
        }

        const updatedQuests = activeQuests.map(q =>
          q.questId === questId ? { ...q, status: 'completed' as const, completedAt: new Date().toISOString(), xpEarned: earned, note, mediaIds } : q
        )

        set({ character: updatedCharacter, activeQuests: updatedQuests, completingQuestId: null })

        // Fan out to party members via Supabase (leader-only; RLS enforces)
        const { onlineParty } = get()
        if (onlineParty && (quest.mode.includes('couple') || quest.mode.includes('friends'))) {
          postCompletion(onlineParty.id, questId, note ?? '', earned)
            .catch(err => console.error('party sync failed:', err))
        }

        // Share to the public community feed (Explore tab)
        if (shareToCommunity && note) {
          import('./community').then(({ sharePost }) =>
            sharePost(updatedCharacter, questId, note, earned, imageUrls ?? [])
          ).catch(err => console.error('community share failed:', err))
        }

        // Leaderboard XP event + close out any dare attached to this quest
        const { acceptedChallenges } = get()
        const challengeId = acceptedChallenges[questId]
        import('./community').then(({ postXpEvent, completeChallenge }) => {
          postXpEvent(updatedCharacter, earned).catch(() => {})
          if (challengeId) completeChallenge(challengeId).catch(() => {})
        }).catch(() => {})
        if (challengeId) {
          const rest = { ...acceptedChallenges }
          delete rest[questId]
          set({ acceptedChallenges: rest })
        }

        get().addToast({ type: 'xp', message: `+${earned} XP earned!`, icon: '⚡' })

        if (newLevel.level > oldLevel.level) {
          set({ pendingLevelUp: newLevel.title })
        }

        get().checkAchievements()
      },

      abandonQuest: (questId) => {
        const { activeQuests } = get()
        set({
          activeQuests: activeQuests.map(q =>
            q.questId === questId ? { ...q, status: 'abandoned' as const } : q
          )
        })
      },

      createParty: (party) => set({ party }),
      leaveParty: () => set({ party: null }),

      onlineParty: null,
      myUserId: null,
      claimedCompletionIds: [],
      setOnlineParty: (p) => set({ onlineParty: p }),
      setMyUserId: (id) => set({ myUserId: id }),
      acceptedChallenges: {},
      recordAcceptedChallenge: (questId, challengeId) =>
        set(s => ({ acceptedChallenges: { ...s.acceptedChallenges, [questId]: challengeId } })),

      claimCompletion: (c) => {
        const { character, claimedCompletionIds, activeQuests } = get()
        if (!character || claimedCompletionIds.includes(c.id)) return
        const newXP = character.xp + c.xp
        const oldLevel = getLevelInfo(character.xp)
        const newLevel = getLevelInfo(newXP)
        const nextLevel = getNextLevelInfo(newXP)
        set({
          character: { ...character, xp: newXP, level: newLevel.level, xpToNextLevel: nextLevel?.xpRequired ?? character.xpToNextLevel },
          claimedCompletionIds: [...claimedCompletionIds, c.id],
          activeQuests: [...activeQuests, {
            questId: c.questId,
            status: 'completed',
            acceptedAt: c.completedAt,
            completedAt: c.completedAt,
            xpEarned: c.xp,
            note: `🤝 Completed with ${c.completedByName}: ${c.note}`,
          }],
        })
        import('./community').then(({ postXpEvent }) => {
          const ch = get().character
          if (ch) postXpEvent(ch, c.xp).catch(() => {})
        }).catch(() => {})
        get().addToast({ type: 'xp', message: `Party quest! +${c.xp} XP from ${c.completedByName}`, icon: '🤝' })
        if (newLevel.level > oldLevel.level) set({ pendingLevelUp: newLevel.title })
        get().checkAchievements()
      },

      unlockAchievement: (id) => {
        const { unlockedAchievements } = get()
        if (unlockedAchievements.includes(id)) return
        const ach = ACHIEVEMENTS.find(a => a.id === id)
        if (!ach) return
        set({ unlockedAchievements: [...unlockedAchievements, id] })
        get().addToast({ type: 'achievement', message: `Achievement: ${ach.title}`, icon: ach.icon })
      },

      checkAchievements: () => {
        const { activeQuests, character, unlockedAchievements, party } = get()
        if (!character) return

        const completed = activeQuests.filter(q => q.status === 'completed')
        const totalXP = character.xp

        const unlock = (id: string) => {
          if (!unlockedAchievements.includes(id)) get().unlockAchievement(id)
        }

        // First quest
        if (completed.length >= 1) unlock('ach-001')
        // Accept 3
        if (activeQuests.length >= 3) unlock('ach-002')
        // 5 simultaneous active
        if (activeQuests.filter(q => q.status === 'active').length >= 5) unlock('ach-010')

        // Category counts
        const categories = (cat: string) => completed.filter(q => QUESTS.find(x => x.id === q.questId)?.category === cat).length
        if (categories('Food') >= 3)       unlock('ach-004')
        if (categories('Social') >= 5)     unlock('ach-005')
        if (categories('Discovery') >= 5)    unlock('ach-006')
        if (categories('Mindfulness') >= 3) unlock('ach-007')
        if (categories('Creativity') >= 3)   unlock('ach-008')
        if (categories('Learning') >= 5)   unlock('ach-012')

        // Difficulty counts
        const diff = (d: string) => completed.filter(q => QUESTS.find(x => x.id === q.questId)?.difficulty === d).length
        if (diff('Hard') >= 3)     unlock('ach-011')
        if (diff('Hard') >= 10)    unlock('ach-022')
        if (diff('Legendary') >= 1) unlock('ach-023')
        if (diff('Legendary') >= 5) unlock('ach-029')

        // XP milestones
        if (totalXP >= 10000) unlock('ach-019')
        if (totalXP >= 50000) unlock('ach-030')

        // Level milestones
        if (character.level >= 5)  unlock('ach-013')
        if (character.level >= 10) unlock('ach-021')
        if (character.level >= 20) unlock('ach-026')

        // Total quests
        if (completed.length >= 50) unlock('ach-027')

        // Streak
        if (character.streak >= 3)  unlock('ach-003')
        if (character.streak >= 7)  unlock('ach-009')
        if (character.streak >= 14) unlock('ach-018')
        if (character.streak >= 30) unlock('ach-025')

        // All categories
        const uniqueCats = new Set(completed.map(q => QUESTS.find(x => x.id === q.questId)?.category).filter(Boolean))
        if (uniqueCats.size >= 4) unlock('ach-016')
        if (uniqueCats.size >= 6) unlock('ach-020')

        // Modes
        const soloCompleted  = completed.filter(q => { const quest = QUESTS.find(x => x.id === q.questId); return quest?.mode.includes('solo') }).length
        const coupleCompleted = completed.filter(q => { const quest = QUESTS.find(x => x.id === q.questId); return quest?.mode.length === 1 && quest.mode[0] === 'couple' }).length
        const friendsCompleted = completed.filter(q => { const quest = QUESTS.find(x => x.id === q.questId); return quest?.mode.length === 1 && quest.mode[0] === 'friends' }).length
        if (coupleCompleted >= 5)  unlock('ach-014')
        if (friendsCompleted >= 5) unlock('ach-015')
        if (soloCompleted >= 1 && coupleCompleted >= 1 && friendsCompleted >= 1) unlock('ach-028')
      },

      addToast: (t) => {
        const id = Math.random().toString(36).slice(2)
        set(s => ({ toasts: [...s.toasts, { ...t, id }] }))
        setTimeout(() => get().dismissToast(id), 4000)
      },

      dismissToast: (id) => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })),
      dismissLevelUp: () => set({ pendingLevelUp: null }),

      updateStreak: () => {
        const { character } = get()
        if (!character) return
        const today = new Date().toDateString()
        const last = character.lastActiveDate ? new Date(character.lastActiveDate).toDateString() : null
        if (last === today) return
        const yesterday = new Date(Date.now() - 86400000).toDateString()
        const newStreak = last === yesterday ? character.streak + 1 : 1
        set({ character: { ...character, streak: newStreak, lastActiveDate: new Date().toISOString() } })
        get().checkAchievements()
      },
    }),
    {
      name: 'side-quest-store',
      version: 1,
      migrate: (persisted: unknown) => {
        // v0 → v1: play modes renamed duo→couple, group→friends
        const s = persisted as { playMode?: string } & Record<string, unknown>
        if (s?.playMode === 'duo') s.playMode = 'couple'
        if (s?.playMode === 'group') s.playMode = 'friends'
        return s as unknown as StoreState
      },
      onRehydrateStorage: () => (state) => { state?.setHasHydrated(true) },
      partialize: (s) => ({
        character: s.character,
        activeQuests: s.activeQuests,
        unlockedAchievements: s.unlockedAchievements,
        party: s.party,
        playMode: s.playMode,
        onlineParty: s.onlineParty,
        myUserId: s.myUserId,
        claimedCompletionIds: s.claimedCompletionIds,
        acceptedChallenges: s.acceptedChallenges,
        settings: s.settings,
      }) as StoreState,
    }
  )
)
