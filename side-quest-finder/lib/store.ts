'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Character, ActiveQuest, Party, PlayMode, Quest, Difficulty } from './types'
import { getLevelInfo, getNextLevelInfo, calcXP } from './levels'
import { ACHIEVEMENTS } from './achievements'
import { QUESTS } from './quests'

interface Toast {
  id: string
  type: 'achievement' | 'levelup' | 'xp'
  message: string
  icon: string
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

  // Character
  setCharacter: (c: Character) => void
  resetCharacter: () => void

  // Play mode
  setPlayMode: (m: PlayMode) => void

  // Quests
  acceptQuest: (questId: string) => void
  completeQuest: (questId: string) => void
  abandonQuest: (questId: string) => void

  // Party
  createParty: (party: Party) => void
  leaveParty: () => void

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

      setCharacter: (c) => set({ character: c }),
      resetCharacter: () => set({ character: null, activeQuests: [], unlockedAchievements: [], party: null, playMode: 'solo' }),
      setPlayMode: (m) => set({ playMode: m }),

      acceptQuest: (questId) => {
        const { activeQuests } = get()
        const alreadyActive = activeQuests.find(q => q.questId === questId && q.status === 'active')
        if (alreadyActive) return
        set({ activeQuests: [...activeQuests, { questId, status: 'active', acceptedAt: new Date().toISOString() }] })
        get().checkAchievements()
      },

      completeQuest: (questId) => {
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
          q.questId === questId ? { ...q, status: 'completed' as const, completedAt: new Date().toISOString(), xpEarned: earned } : q
        )

        set({ character: updatedCharacter, activeQuests: updatedQuests })

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
        const duoCompleted   = completed.filter(q => { const quest = QUESTS.find(x => x.id === q.questId); return quest?.mode.length === 1 && quest.mode[0] === 'duo' }).length
        const groupCompleted = completed.filter(q => { const quest = QUESTS.find(x => x.id === q.questId); return quest?.mode.length === 1 && quest.mode[0] === 'group' }).length
        if (duoCompleted >= 5)   unlock('ach-014')
        if (groupCompleted >= 5) unlock('ach-015')
        if (soloCompleted >= 1 && duoCompleted >= 1 && groupCompleted >= 1) unlock('ach-028')
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
      onRehydrateStorage: () => (state) => { state?.setHasHydrated(true) },
    }
  )
)
