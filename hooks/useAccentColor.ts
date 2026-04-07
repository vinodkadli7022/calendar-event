'use client'

import { useEffect, useState } from 'react'
import { ACCENT_FALLBACK } from '../lib/constants'
import { extractDominantColor } from '../lib/colorUtils'

export function useAccentColor(imageUrl: string): string {
  const [accent, setAccent] = useState(ACCENT_FALLBACK)

  useEffect(() => {
    let isMounted = true
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.referrerPolicy = 'no-referrer'

    image.onload = () => {
      if (!isMounted) return
      const extracted = extractDominantColor(image)
      setAccent(extracted || ACCENT_FALLBACK)
    }

    image.onerror = () => {
      if (!isMounted) return
      setAccent(ACCENT_FALLBACK)
    }

    image.src = imageUrl

    return () => {
      isMounted = false
    }
  }, [imageUrl])

  return accent
}
