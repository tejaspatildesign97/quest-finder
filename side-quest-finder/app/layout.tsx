import type { Metadata } from 'next'
import { Anton, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Nav from '@/components/layout/Nav'
import ToastContainer from '@/components/ui/Toast'
import LevelUpModal from '@/components/ui/LevelUpModal'
import CompleteQuestModal from '@/components/CompleteQuestModal'

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

export const metadata: Metadata = {
  title: 'Side Quest Finder',
  description: 'Discover your next adventure',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${grotesk.variable}`}>
      <body className="min-h-screen">
        <Header />
        <main className="max-w-lg mx-auto px-4 py-6 relative z-[1]">
          {children}
        </main>
        <Nav />
        <ToastContainer />
        <LevelUpModal />
        <CompleteQuestModal />
      </body>
    </html>
  )
}
