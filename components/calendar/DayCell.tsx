'use client'

import { motion } from 'framer-motion'
import styles from '../../styles/calendar.module.css'
import { dayCellTransition, dayCellVariants, rangeEndpointVariants } from '../../lib/constants'
import { Tooltip } from './Tooltip'

export interface DayCellProps {
  day: number
  isToday: boolean
  isWeekend: boolean
  isInRange: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
  isSingleDay: boolean
  hasNote: boolean
  holidayLabel: string | null
  ariaSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void
  buttonRef: (node: HTMLButtonElement | null) => void
}

export function DayCell(props: DayCellProps): JSX.Element {
  const {
    day,
    isToday,
    isWeekend,
    isInRange,
    isRangeStart,
    isRangeEnd,
    isSingleDay,
    hasNote,
    holidayLabel,
    ariaSelected,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    buttonRef,
  } = props

  const classNames = [styles.dayCell]
  if (isWeekend) classNames.push(styles.weekend)
  if (isToday) classNames.push(styles.today)
  if (isInRange) classNames.push(styles.inRange)
  if (isRangeStart) classNames.push(styles.rangeStart)
  if (isRangeEnd) classNames.push(styles.rangeEnd)
  if (isSingleDay) classNames.push(styles.singleDay)

  const button = (
    <motion.button
      ref={buttonRef}
      type="button"
      role="gridcell"
      aria-selected={ariaSelected}
      aria-label={`Select ${day}`}
      className={classNames.join(' ')}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDown}
      variants={dayCellVariants}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: [0.9, 1.15, 1] }}
      transition={dayCellTransition}
    >
      {(isRangeStart || isRangeEnd) ? (
        <motion.span variants={rangeEndpointVariants} initial="initial" animate="animate">
          {day}
        </motion.span>
      ) : day}
      {hasNote ? <span className={styles.noteDot} aria-hidden="true" /> : null}
      {holidayLabel ? <span className={styles.holidayDot} aria-hidden="true" /> : null}
    </motion.button>
  )

  if (holidayLabel) {
    return <Tooltip label={holidayLabel}>{button}</Tooltip>
  }

  return button
}
