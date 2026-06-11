'use client'

import type { Quest, ActiveQuest, Character } from './types'

const CATEGORY_GRADIENTS: Record<string, [string, string]> = {
  Adventure: ['#34d399', '#059669'],
  Discovery: ['#22d3ee', '#0891b2'],
  Food: ['#fb923c', '#ea580c'],
  Social: ['#f472b6', '#db2777'],
  Creativity: ['#a78bfa', '#7c3aed'],
  Learning: ['#60a5fa', '#2563eb'],
  Mindfulness: ['#2dd4bf', '#0d9488'],
  Community: ['#fbbf24', '#d97706'],
  Courage: ['#f87171', '#dc2626'],
  'Night Quest': ['#6366f1', '#312e81'],
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = w
      if (lines.length === maxLines) {
        lines[maxLines - 1] = lines[maxLines - 1].replace(/\s+\S*$/, '') + '…'
        return lines
      }
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines.slice(0, maxLines)
}

/** Renders a 1080×1920 story card for a completed quest. */
export async function generateStoryCard(
  quest: Quest,
  entry: ActiveQuest,
  character: Character | null,
  photoURL?: string,
): Promise<Blob> {
  await document.fonts.load('80px Anton').catch(() => {})

  const W = 1080, H = 1920
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Background
  ctx.fillStyle = '#0c0c10'
  ctx.fillRect(0, 0, W, H)

  // Category gradient glow
  const [c1, c2] = CATEGORY_GRADIENTS[quest.category] ?? CATEGORY_GRADIENTS.Discovery
  const grad = ctx.createLinearGradient(0, 0, W, 600)
  grad.addColorStop(0, c1); grad.addColorStop(1, c2)
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, 14)
  ctx.globalAlpha = 0.22
  const glow = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 900)
  glow.addColorStop(0, c1); glow.addColorStop(1, 'transparent')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, 900)
  ctx.globalAlpha = 1

  let y = 140

  // Header
  ctx.fillStyle = c1
  ctx.font = '600 34px "Space Grotesk", sans-serif'
  ctx.fillText('⚔ QUEST COMPLETED', 80, y)
  y += 30

  // Title
  ctx.fillStyle = '#f5f5f7'
  ctx.font = '110px Anton, Impact, sans-serif'
  const titleLines = wrapText(ctx, quest.title.toUpperCase(), W - 160, 3)
  for (const line of titleLines) { y += 120; ctx.fillText(line, 80, y) }
  y += 50

  // Badges row
  ctx.font = 'bold 36px "Space Grotesk", sans-serif'
  const badge = (text: string, color: string) => {
    const w = ctx.measureText(text).width + 56
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.roundRect(badgeX, y, w, 70, 35)
    ctx.fill()
    ctx.fillStyle = '#0c0c10'
    ctx.fillText(text, badgeX + 28, y + 48)
    badgeX += w + 20
  }
  let badgeX = 80
  badge(`+${entry.xpEarned ?? quest.xp} XP`, '#fbbf24')
  badge(quest.difficulty, '#a3e635')
  badge(quest.category, '#c4c4cc')
  y += 130

  // Photo
  if (photoURL) {
    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      await new Promise<void>((res, rej) => { img.onload = () => res(); img.onerror = rej; img.src = photoURL })
      const ph = 760, pw = W - 160
      const scale = Math.max(pw / img.width, ph / img.height)
      ctx.save()
      ctx.beginPath()
      ctx.roundRect(80, y, pw, ph, 48)
      ctx.clip()
      ctx.drawImage(img, 80 + (pw - img.width * scale) / 2, y + (ph - img.height * scale) / 2, img.width * scale, img.height * scale)
      ctx.restore()
      y += ph + 70
    } catch { /* skip photo on failure */ }
  } else {
    y += 30
  }

  // Note
  if (entry.note) {
    ctx.fillStyle = '#c9c9d1'
    ctx.font = 'italic 44px Georgia, serif'
    const noteLines = wrapText(ctx, `“${entry.note}”`, W - 200, photoURL ? 5 : 12)
    for (const line of noteLines) { ctx.fillText(line, 100, y); y += 62 }
  }

  // Footer
  ctx.fillStyle = '#f5f5f7'
  ctx.font = '52px Anton, Impact, sans-serif'
  ctx.fillText('SIDE QUEST FINDER', 80, H - 110)
  ctx.fillStyle = '#9b9ba6'
  ctx.font = '600 32px "Space Grotesk", sans-serif'
  const date = entry.completedAt ? new Date(entry.completedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' }) : ''
  ctx.fillText(`${character ? character.name + ' · ' : ''}${date}`, 80, H - 60)

  return new Promise(resolve => canvas.toBlob(b => resolve(b!), 'image/png'))
}

export function shareText(quest: Quest, entry: ActiveQuest): string {
  const note = entry.note ? ` — "${entry.note.slice(0, 120)}${entry.note.length > 120 ? '…' : ''}"` : ''
  return `⚔️ Quest completed: ${quest.title} (+${entry.xpEarned ?? quest.xp} XP)${note} #SideQuestFinder`
}

/** Native share with the story card image (mobile: Instagram, WhatsApp, etc.). */
export async function shareCard(blob: Blob, text: string): Promise<'shared' | 'downloaded'> {
  const file = new File([blob], 'side-quest.png', { type: 'image/png' })
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text })
      return 'shared'
    } catch { /* user cancelled — fall through to download */ }
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'side-quest-story.png'
  a.click()
  URL.revokeObjectURL(url)
  return 'downloaded'
}

const REPO_URL = 'https://github.com/tejaspatildesign97/quest-finder'

export const PLATFORM_LINKS = {
  x: (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
  whatsapp: (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`,
  facebook: (text: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(REPO_URL)}&quote=${encodeURIComponent(text)}`,
}
