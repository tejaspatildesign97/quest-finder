import type { Metadata } from 'next'
import { Anton, Space_Grotesk, Bricolage_Grotesque, Plus_Jakarta_Sans, Titan_One, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import AuthGate from '@/components/AuthGate'

const anton = Anton({
  variable: '--font-anton',
  subsets: ['latin'],
  weight: '400',
})

const grotesk = Space_Grotesk({
  variable: '--font-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

// Quest-Pop design system fonts (new surfaces only; old screens keep Anton/Grotesk)
const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  weight: '800',
})

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['500', '700', '800'],
})

const titan = Titan_One({
  variable: '--font-titan',
  subsets: ['latin'],
  weight: '400',
})

// DESIGN-figma.md system fonts: Inter ≈ figmaSans (variable weights),
// JetBrains Mono ≈ figmaMono (eyebrows/captions only)
const fsans = Inter({
  variable: '--font-fsans',
  subsets: ['latin'],
})

const fmono = JetBrains_Mono({
  variable: '--font-fmono',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Side Quest Finder (Online)',
  description: 'Discover your next adventure',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${grotesk.variable} ${bricolage.variable} ${jakarta.variable} ${titan.variable} ${fsans.variable} ${fmono.variable}`}>
      <body className="min-h-screen">
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  )
}
