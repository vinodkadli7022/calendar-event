'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Theme } from '../types/calendar'
import { safeGetItem, safeSetItem } from '../lib/storageUtils'

const THEME_STORAGE_KEY = 'calendarTheme'

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const stored = safeGetItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    safeSetItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggleTheme }
}
