'use client'

import { formatDateLabel } from '../../lib/dateUtils'
import type { DatePoint } from '../../types/calendar'
import styles from '../../styles/calendar.module.css'

export interface RangePillProps {
  start: DatePoint
  end: DatePoint
  onClear: () => void
}

export function RangePill({ start, end, onClear }: RangePillProps): JSX.Element {
  return (
    <div className={styles.rangePill}>
      <span>{formatDateLabel(start)} - {formatDateLabel(end)}</span>
      <button
        type="button"
        aria-label="Clear selected range"
        className={styles.clearButton}
        onClick={onClear}
      >
        ×
      </button>
    </div>
  )
}
