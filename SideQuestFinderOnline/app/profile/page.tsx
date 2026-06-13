'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Profile has merged into Home — redirect any old links.
export default function ProfileRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/dashboard') }, [router])
  return null
}
