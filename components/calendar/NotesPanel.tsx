'use client'

import styles from '../../styles/calendar.module.css'
import type { DatePoint } from '../../types/calendar'
import { RangePill } from './RangePill'

export interface NotesPanelProps {
  monthlyNote: string
  onMonthlyNoteChange: (value: string) => void
  rangeStart: DatePoint | null
  rangeEnd: DatePoint | null
  rangeNote: string
  onRangeNoteChange: (value: string) => void
  onClearRange: () => void
}

export function NotesPanel(props: NotesPanelProps): JSX.Element {
  const {
    monthlyNote,
    onMonthlyNoteChange,
    rangeStart,
    rangeEnd,
    rangeNote,
    onRangeNoteChange,
    onClearRange,
  } = props

  return (
    <aside className={styles.notesPanel} aria-label="Notes panel">
      <h3 className={styles.notesTitle}>Notes</h3>
      <textarea
        aria-label="Monthly notes"
        className={`${styles.textarea} ${styles.linedPad}`}
        placeholder="Write your monthly memo..."
        value={monthlyNote}
        onChange={(event) => onMonthlyNoteChange(event.target.value)}
      />

      {rangeStart && rangeEnd ? (
        <>
          <RangePill start={rangeStart} end={rangeEnd} onClear={onClearRange} />
          <textarea
            aria-label="Selected range note"
            className={styles.textarea}
            placeholder="Attach a note to this date range..."
            value={rangeNote}
            onChange={(event) => onRangeNoteChange(event.target.value)}
          />
        </>
      ) : null}
    </aside>
  )
}
