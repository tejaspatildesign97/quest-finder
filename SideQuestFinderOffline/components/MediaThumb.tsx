'use client'

import { useEffect, useState } from 'react'
import { getMediaURL } from '@/lib/media'

interface MediaThumbProps {
  mediaId: string
  className?: string
}

export default function MediaThumb({ mediaId, className = '' }: MediaThumbProps) {
  const [media, setMedia] = useState<{ url: string; type: string } | null>(null)

  useEffect(() => {
    let revoked = false
    getMediaURL(mediaId).then(m => {
      if (m && !revoked) setMedia(m)
    })
    return () => {
      revoked = true
      if (media?.url) URL.revokeObjectURL(media.url)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaId])

  if (!media) {
    return <div className={`bg-white/5 animate-pulse ${className}`} />
  }

  return media.type.startsWith('video/') ? (
    <video src={media.url} controls playsInline className={`${className} bg-black`} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={media.url} alt="quest memory" className={`${className} object-cover`} />
  )
}
