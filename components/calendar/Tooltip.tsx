'use client'

import type { PropsWithChildren } from 'react'
import styles from '../../styles/calendar.module.css'

export interface TooltipProps extends PropsWithChildren {
  label: string
}

export function Tooltip({ label, children }: TooltipProps): JSX.Element {
  return (
    <span className={styles.tooltipWrap} tabIndex={0}>
      {children}
      <span role="tooltip" className={styles.tooltip}>
        {label}
      </span>
    </span>
  )
}
