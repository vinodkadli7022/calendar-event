'use client'

import { useCallback, useMemo, useState } from 'react'
import type { CalendarDirection } from '../types/calendar'

export interface UseCalendarResult {
  viewYear: number
  viewMonth: number
  direction: CalendarDirection
  goToNextMonth: () => void
  goToPrevMonth: () => void
}

export function useCalendar(initialDate: Date = new Date()): UseCalendarResult {
  const [viewDate, setViewDate] = useState(() => ({
    year: initialDate.getFullYear(),
    month: initialDate.getMonth(),
  }))
  const [direction, setDirection] = useState<CalendarDirection>(1)

  const goToNextMonth = useCallback(() => {
    setDirection(1)
    setViewDate((prev) => {
      if (prev.month === 11) {
        return { year: prev.year + 1, month: 0 }
      }
      return { year: prev.year, month: prev.month + 1 }
    })
  }, [])

  const goToPrevMonth = useCallback(() => {
    setDirection(-1)
    setViewDate((prev) => {
      if (prev.month === 0) {
        return { year: prev.year - 1, month: 11 }
      }
      return { year: prev.year, month: prev.month - 1 }
    })
  }, [])

  const viewYear = viewDate.year
  const viewMonth = viewDate.month

  return useMemo(
    () => ({ viewYear, viewMonth, direction, goToNextMonth, goToPrevMonth }),
    [viewYear, viewMonth, direction, goToNextMonth, goToPrevMonth],
  )
}
