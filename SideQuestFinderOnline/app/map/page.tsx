'use client'

import Link from 'next/link'
import { Map, Compass } from 'lucide-react'

export default function QuestMapPage() {
  return (
    <div className="qp-screen flex flex-col">
      <h1 className="qp-title text-2xl pt-6 pb-4">Quest Map</h1>

      <div className="fg-block fg-mint flex flex-col items-center text-center gap-4 px-6 py-12 mt-4">
        <span className="w-16 h-16 rounded-[12px] bg-[var(--fg-canvas)] flex items-center justify-center">
          <Map size={30} className="text-[var(--fg-ink)]" strokeWidth={2.2} />
        </span>
        <div className="space-y-1.5">
          <h2 className="qp-title text-lg">Coming soon</h2>
          <p className="qp-body text-sm leading-relaxed max-w-[240px]">
            Quests near you, plotted on a living map of your neighborhood.
          </p>
        </div>
        <Link href="/quests" className="qp-btn-primary px-7 py-3 text-sm mt-2">
          <Compass size={16} strokeWidth={2.4} />
          Browse quests instead
        </Link>
      </div>
    </div>
  )
}
