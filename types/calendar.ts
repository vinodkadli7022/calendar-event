export type DatePoint = {
  year: number
  month: number
  day: number
}

export type RangeState = {
  start: DatePoint | null
  end: DatePoint | null
  hovering: DatePoint | null
  selecting: boolean
}

export type NoteMap = Record<string, string>

export type Theme = 'light' | 'dark'

export type CalendarDirection = -1 | 1
