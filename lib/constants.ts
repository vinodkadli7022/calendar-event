import type { CalendarDirection } from '../types/calendar'

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export const WEEKDAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const

export const HERO_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&auto=format',
  'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=900&auto=format',
  'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=900&auto=format',
  'https://images.unsplash.com/photo-1491466424936-e304919aada7?w=900&auto=format',
  'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=900&auto=format',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format',
  'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=900&auto=format',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&auto=format',
  'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=900&auto=format',
  'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=900&auto=format',
  'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=900&auto=format',
]

export const HOLIDAYS: Record<string, string> = {
  '01-01': 'New Year Day',
  '01-14': 'Makar Sankranti',
  '01-26': 'Republic Day',
  '03-14': 'Maha Shivratri',
  '03-25': 'Holi',
  '04-10': 'Ram Navami',
  '04-14': 'Ambedkar Jayanti',
  '05-23': 'Buddha Purnima',
  '08-15': 'Independence Day',
  '08-19': 'Raksha Bandhan',
  '08-26': 'Janmashtami',
  '10-02': 'Gandhi Jayanti',
  '10-12': 'Dussehra',
  '11-01': 'Diwali',
  '11-15': 'Guru Nanak Jayanti',
  '12-25': 'Christmas',
}

export const ACCENT_FALLBACK = '#1a8fe3'

export const NOTES_DEBOUNCE_MS = 400
export const DESKTOP_BREAKPOINT = 768
export const HERO_HEIGHT_PX = 240
export const DAY_CELL_MIN_SIZE = 44

export const pageFlipVariants = {
  enter: (direction: CalendarDirection) => ({
    rotateX: direction > 0 ? 64 : -64,
    translateY: direction > 0 ? 24 : -24,
    scale: 0.985,
    opacity: 0,
  }),
  center: { rotateX: 0, translateY: 0, scale: 1, opacity: 1 },
  exit: (direction: CalendarDirection) => ({
    rotateX: direction > 0 ? -64 : 64,
    translateY: direction > 0 ? -24 : 24,
    scale: 0.985,
    opacity: 0,
  }),
}

export const pageFlipTransition = {
  duration: 0.48,
  ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
}

export const dayCellVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  tap: { scale: 0.88 },
}

export const dayCellTransition = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 22,
}

export const rangeEndpointVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  },
}

export const gridContainerVariants = {
  animate: { transition: { staggerChildren: 0.012 } },
}
