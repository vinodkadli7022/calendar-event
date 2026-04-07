'use client'

import { useCallback, useMemo, useRef } from 'react'
import type { DatePoint } from '../types/calendar'

export interface UseKeyboardNavOptions {
  year: number
  month: number
  daysInMonth: number
  onSelect: (date: DatePoint) => void
  onEscape: () => void
}

export interface UseKeyboardNavResult {
  cellRefs: React.MutableRefObject<Array<HTMLButtonElement | null>>
  handleKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>, day: number) => void
}

export function useKeyboardNav(options: UseKeyboardNavOptions): UseKeyboardNavResult {
  const { year, month, daysInMonth, onSelect, onEscape } = options
  const cellRefs = useRef<Array<HTMLButtonElement | null>>([])

  const focusDay = useCallback(
    (day: number) => {
      if (day < 1 || day > daysInMonth) return
      cellRefs.current[day - 1]?.focus()
    },
    [daysInMonth],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, day: number) => {
      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault()
          focusDay(day + 1)
          break
        case 'ArrowLeft':
          event.preventDefault()
          focusDay(day - 1)
          break
        case 'ArrowUp':
          event.preventDefault()
          focusDay(day - 7)
          break
        case 'ArrowDown':
          event.preventDefault()
          focusDay(day + 7)
          break
        case 'Enter':
        case ' ': {
          event.preventDefault()
          onSelect({ year, month, day })
          break
        }
        case 'Escape':
          event.preventDefault()
          onEscape()
          break
        default:
          break
      }
    },
    [focusDay, month, onEscape, onSelect, year],
  )

  return useMemo(() => ({ cellRefs, handleKeyDown }), [handleKeyDown])
}
