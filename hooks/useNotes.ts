'use client'

import { useCallback } from 'react'
import { safeGetItem, safeSetItem } from '../lib/storageUtils'

export interface UseNotesResult {
  getMonthNote: (year: number, month: number) => string
  saveMonthNote: (year: number, month: number, value: string) => void
  getRangeNote: (startISO: string, endISO: string) => string
  saveRangeNote: (startISO: string, endISO: string, value: string) => void
  getRangeNoteKeys: () => string[]
}

export function useNotes(): UseNotesResult {
  const getMonthNote = useCallback((year: number, month: number): string => {
    return safeGetItem(`monthNote_${year}_${month}`) ?? ''
  }, [])

  const saveMonthNote = useCallback((year: number, month: number, value: string): void => {
    safeSetItem(`monthNote_${year}_${month}`, value)
  }, [])

  const getRangeNote = useCallback((startISO: string, endISO: string): string => {
    return safeGetItem(`rangeNote_${startISO}_${endISO}`) ?? ''
  }, [])

  const saveRangeNote = useCallback((startISO: string, endISO: string, value: string): void => {
    safeSetItem(`rangeNote_${startISO}_${endISO}`, value)
  }, [])

  const getRangeNoteKeys = useCallback((): string[] => {
    if (typeof window === 'undefined') return []
    return Object.keys(window.localStorage).filter((key) => key.startsWith('rangeNote_'))
  }, [])

  return { getMonthNote, saveMonthNote, getRangeNote, saveRangeNote, getRangeNoteKeys }
}
