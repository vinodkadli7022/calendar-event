'use client'

import { motion } from 'framer-motion'
import type { Theme } from '../../types/calendar'
import styles from '../../styles/calendar.module.css'

export interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps): JSX.Element {
  return (
    <motion.button
      type="button"
      aria-label="Toggle light and dark mode"
      className={styles.themeToggle}
      onClick={onToggle}
      whileTap={{ scale: 0.9 }}
    >
      {theme === 'light' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 4V2M12 22v-2M4 12H2m20 0h-2M5.6 5.6 4.2 4.2m15.6 15.6-1.4-1.4M5.6 18.4l-1.4 1.4m15.6-15.6-1.4 1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 14.2A8.5 8.5 0 1 1 9.8 3a7 7 0 1 0 11.2 11.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        </svg>
      )}
    </motion.button>
  )
}
