'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import React, { Component, useEffect, useMemo, useState } from 'react'
import { useAccentColor } from '../../hooks/useAccentColor'
import { useCalendar } from '../../hooks/useCalendar'
import { useDateRange } from '../../hooks/useDateRange'
import { useNotes } from '../../hooks/useNotes'
import { useTheme } from '../../hooks/useTheme'
import {
  HERO_IMAGES,
  NOTES_DEBOUNCE_MS,
  pageFlipTransition,
  pageFlipVariants,
} from '../../lib/constants'
import { compareDates, formatDate } from '../../lib/dateUtils'
import type { DatePoint } from '../../types/calendar'
import styles from '../../styles/calendar.module.css'
import { CalendarGrid } from './CalendarGrid'
import { CalendarHero } from './CalendarHero'
import { NotesPanel } from './NotesPanel'

interface ErrorBoundaryState {
  hasError: boolean
}

class CalendarErrorBoundary extends Component<React.PropsWithChildren, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false }

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles.calendarRoot}>
          <div className={styles.calendarCard} style={{ padding: '1rem' }}>
            Calendar failed to render. Please refresh.
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function enumerateDaysInRange(start: DatePoint, end: DatePoint): DatePoint[] {
  const result: DatePoint[] = []
  const cursor = new Date(start.year, start.month, start.day)
  const finish = new Date(end.year, end.month, end.day)

  while (cursor <= finish) {
    result.push({
      year: cursor.getFullYear(),
      month: cursor.getMonth(),
      day: cursor.getDate(),
    })
    cursor.setDate(cursor.getDate() + 1)
  }

  return result
}

function parseRangeKey(key: string): { start: DatePoint; end: DatePoint } | null {
  if (!key.startsWith('rangeNote_')) return null
  const value = key.replace('rangeNote_', '')
  const [startRaw, endRaw] = value.split('_')
  if (!startRaw || !endRaw) return null
  const startParts = startRaw.split('-').map(Number)
  const endParts = endRaw.split('-').map(Number)
  if (startParts.length !== 3 || endParts.length !== 3) return null
  return {
    start: { year: startParts[0], month: startParts[1] - 1, day: startParts[2] },
    end: { year: endParts[0], month: endParts[1] - 1, day: endParts[2] },
  }
}

function WallCalendarInner(): JSX.Element {
  const prefersReducedMotion = useReducedMotion()
  const { viewYear, viewMonth, direction, goToNextMonth, goToPrevMonth } = useCalendar()
  const { state: rangeState, selectDate, setHovering, clearRange } = useDateRange()
  const { getMonthNote, saveMonthNote, getRangeNote, saveRangeNote, getRangeNoteKeys } = useNotes()
  const { theme, toggleTheme } = useTheme()

  const heroImage = HERO_IMAGES[viewMonth]
  const accent = useAccentColor(heroImage)

  const [monthlyNote, setMonthlyNote] = useState('')
  const [rangeNote, setRangeNote] = useState('')

  useEffect(() => {
    setMonthlyNote(getMonthNote(viewYear, viewMonth))
  }, [getMonthNote, viewYear, viewMonth])

  const selectedRange = useMemo(() => {
    if (!rangeState.start || !rangeState.end) return null
    if (compareDates(rangeState.start, rangeState.end) <= 0) {
      return { start: rangeState.start, end: rangeState.end }
    }
    return { start: rangeState.end, end: rangeState.start }
  }, [rangeState.end, rangeState.start])

  useEffect(() => {
    if (!selectedRange) {
      setRangeNote('')
      return
    }
    setRangeNote(getRangeNote(formatDate(selectedRange.start), formatDate(selectedRange.end)))
  }, [getRangeNote, selectedRange])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      saveMonthNote(viewYear, viewMonth, monthlyNote)
    }, NOTES_DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [monthlyNote, saveMonthNote, viewMonth, viewYear])

  useEffect(() => {
    if (!selectedRange) return
    const timer = window.setTimeout(() => {
      saveRangeNote(formatDate(selectedRange.start), formatDate(selectedRange.end), rangeNote)
    }, NOTES_DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [rangeNote, saveRangeNote, selectedRange])

  const noteDays = useMemo(() => {
    const days = new Set<number>()

    const keys = getRangeNoteKeys()
    for (const key of keys) {
      const parsed = parseRangeKey(key)
      if (!parsed) continue
      const stored = getRangeNote(formatDate(parsed.start), formatDate(parsed.end))
      if (!stored.trim()) continue
      const rangeDays = enumerateDaysInRange(parsed.start, parsed.end)
      rangeDays.forEach((point) => {
        if (point.year === viewYear && point.month === viewMonth) {
          days.add(point.day)
        }
      })
    }

    return days
  }, [getRangeNote, getRangeNoteKeys, viewMonth, viewYear])

  return (
    <div className={`${styles.calendarRoot} ${theme === 'dark' ? styles.dark : ''}`} style={{ ['--accent' as string]: accent }}>
      <motion.div
        className={styles.perspectiveWrap}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: 'easeOut' }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.section
            key={`${viewYear}-${viewMonth}`}
            className={styles.calendarCard}
            custom={direction}
            variants={pageFlipVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ transformOrigin: direction > 0 ? '50% 0%' : '50% 100%' }}
            transition={prefersReducedMotion ? { duration: 0 } : pageFlipTransition}
          >
            <CalendarHero
              year={viewYear}
              month={viewMonth}
              heroImage={heroImage}
              theme={theme}
              onToggleTheme={toggleTheme}
              onPrev={goToPrevMonth}
              onNext={goToNextMonth}
            />

            <div className={styles.bodyLayout}>
              <div className={styles.calendarSection}>
                <CalendarGrid
                  year={viewYear}
                  month={viewMonth}
                  rangeState={rangeState}
                  onSelectDate={selectDate}
                  onHoverDate={setHovering}
                  onClearRange={clearRange}
                  noteDays={noteDays}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: 'easeOut' }}
              >
                <NotesPanel
                  monthlyNote={monthlyNote}
                  onMonthlyNoteChange={setMonthlyNote}
                  rangeStart={selectedRange?.start ?? null}
                  rangeEnd={selectedRange?.end ?? null}
                  rangeNote={rangeNote}
                  onRangeNoteChange={setRangeNote}
                  onClearRange={clearRange}
                />
              </motion.div>
            </div>
          </motion.section>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export function WallCalendar(): JSX.Element {
  return (
    <CalendarErrorBoundary>
      <WallCalendarInner />
    </CalendarErrorBoundary>
  )
}
