'use client'

import type { ReactNode } from 'react'

/**
 * Horizontal snap carousel. The -mx-5/px-5 full-bleed trick lets the next
 * card peek past the 20px .qp-screen padding, per the wireframe.
 * Children should set `snap-start shrink-0 w-[78%]`.
 */
export default function QuestRail({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-1 no-scrollbar">
      {children}
    </div>
  )
}
