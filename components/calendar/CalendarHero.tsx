'use client'

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { MONTHS, pageFlipTransition } from '../../lib/constants'
import styles from '../../styles/calendar.module.css'
import { ThemeToggle } from './ThemeToggle'
import type { Theme } from '../../types/calendar'

export interface CalendarHeroProps {
  year: number
  month: number
  heroImage: string
  theme: Theme
  onToggleTheme: () => void
  onPrev: () => void
  onNext: () => void
}

export function CalendarHero({
  year,
  month,
  heroImage,
  theme,
  onToggleTheme,
  onPrev,
  onNext,
}: CalendarHeroProps): JSX.Element {
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const ringsY = useTransform(scrollY, [0, 600], [0, prefersReducedMotion ? 0 : 18])

  return (
    <header className={styles.hero}>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />

      <motion.div className={styles.spiral} style={{ y: ringsY }} aria-hidden="true">
        {Array.from({ length: 16 }).map((_, index) => (
          <span className={styles.ring} key={index} />
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${month}`}
          className={styles.heroImage}
          style={{ backgroundImage: `url(${heroImage})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
        />
      </AnimatePresence>

      <div className={styles.heroOverlay} />

      <div className={styles.monthCaption}>
        <span className={styles.yearText}>{year}</span>
        <span className={styles.monthText}>{MONTHS[month]}</span>
      </div>

      <div className={styles.navRow} style={{ position: 'absolute', left: '1rem', top: '1rem', zIndex: 7 }}>
        <motion.button
          type="button"
          aria-label="Previous month"
          className={styles.navButton}
          onClick={onPrev}
          whileTap={{ scale: 0.88 }}
          whileHover={prefersReducedMotion ? undefined : { rotate: -10 }}
          transition={pageFlipTransition}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>

        <motion.button
          type="button"
          aria-label="Next month"
          className={styles.navButton}
          onClick={onNext}
          whileTap={{ scale: 0.88 }}
          whileHover={prefersReducedMotion ? undefined : { rotate: 10 }}
          transition={pageFlipTransition}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>

      </div>
    </header>
  )
}
