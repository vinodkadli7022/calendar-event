'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { gridContainerVariants, WEEKDAY_LABELS } from '../../lib/constants'
import {
  compareDates,
  getDaysInMonth,
  getFirstDayOfWeek,
  getTodayPoint,
  isInRange,
  isSameDay,
  toMonthDayKey,
} from '../../lib/dateUtils'
import type { DatePoint, RangeState } from '../../types/calendar'
import { useKeyboardNav } from '../../hooks/useKeyboardNav'
import styles from '../../styles/calendar.module.css'
import { HOLIDAYS } from '../../lib/constants'
import { DayCell } from './DayCell'

export interface CalendarGridProps {
  year: number
  month: number
  rangeState: RangeState
  onSelectDate: (date: DatePoint) => void
  onHoverDate: (date: DatePoint | null) => void
  onClearRange: () => void
  noteDays: Set<number>
}

export function CalendarGrid({
  year,
  month,
  rangeState,
  onSelectDate,
  onHoverDate,
  onClearRange,
  noteDays,
}: CalendarGridProps): JSX.Element {
  const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month])
  const firstDayOffset = useMemo(() => getFirstDayOfWeek(year, month), [year, month])
  const today = useMemo(() => getTodayPoint(), [])

  const previewEnd = useMemo(() => {
    if (rangeState.end) return rangeState.end
    if (rangeState.selecting && rangeState.hovering && rangeState.start) {
      return compareDates(rangeState.hovering, rangeState.start) < 0 ? rangeState.start : rangeState.hovering
    }
    return null
  }, [rangeState])

  const previewStart = useMemo(() => {
    if (!rangeState.start) return null
    if (rangeState.end) return rangeState.start
    if (rangeState.selecting && rangeState.hovering && compareDates(rangeState.hovering, rangeState.start) < 0) {
      return rangeState.hovering
    }
    return rangeState.start
  }, [rangeState])

  const { cellRefs, handleKeyDown } = useKeyboardNav({
    year,
    month,
    daysInMonth,
    onSelect: onSelectDate,
    onEscape: onClearRange,
  })

  return (
    <div role="grid" aria-label="Calendar">
      <div className={styles.grid}>
        {WEEKDAY_LABELS.map((label) => (
          <div className={styles.weekday} key={label}>
            {label}
          </div>
        ))}
      </div>

      <motion.div className={styles.grid} variants={gridContainerVariants} initial={false} animate="animate">
        {Array.from({ length: firstDayOffset }).map((_, idx) => (
          <div key={`empty-${idx}`} className={styles.dayMuted} aria-hidden="true" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const point: DatePoint = { year, month, day }
          const holiday = HOLIDAYS[toMonthDayKey(month, day)] ?? null
          const isRangeStart = isSameDay(point, previewStart)
          const isRangeEnd = isSameDay(point, previewEnd)
          const singleDay = Boolean(isRangeStart && isRangeEnd)
          const inRange = isInRange(point, previewStart, previewEnd) && !isRangeStart && !isRangeEnd
          const selected = Boolean(isRangeStart || isRangeEnd || inRange)
          const isWeekend = [0, 6].includes(new Date(year, month, day).getDay())
          const isToday = isSameDay(today, point)

          return (
            <div className={styles.dayCellWrap} key={day}>
              <DayCell
                day={day}
                isToday={isToday}
                isWeekend={isWeekend}
                isInRange={inRange}
                isRangeStart={isRangeStart}
                isRangeEnd={isRangeEnd}
                isSingleDay={singleDay}
                hasNote={noteDays.has(day)}
                holidayLabel={holiday}
                ariaSelected={selected}
                onClick={() => onSelectDate(point)}
                onMouseEnter={() => onHoverDate(point)}
                onMouseLeave={() => onHoverDate(null)}
                onKeyDown={(event) => handleKeyDown(event, day)}
                buttonRef={(node) => {
                  cellRefs.current[index] = node
                }}
              />
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
