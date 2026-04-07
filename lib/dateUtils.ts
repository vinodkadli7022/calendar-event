import type { DatePoint } from '../types/calendar'

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfWeek(year: number, month: number): number {
  const sundayFirst = new Date(year, month, 1).getDay()
  return (sundayFirst + 6) % 7
}

export function compareDates(a: DatePoint, b: DatePoint): number {
  if (a.year !== b.year) return a.year - b.year
  if (a.month !== b.month) return a.month - b.month
  return a.day - b.day
}

export function isSameDay(a: DatePoint | null, b: DatePoint | null): boolean {
  if (!a || !b) return false
  return a.year === b.year && a.month === b.month && a.day === b.day
}

export function isInRange(target: DatePoint, start: DatePoint | null, end: DatePoint | null): boolean {
  if (!start || !end) return false
  return compareDates(target, start) >= 0 && compareDates(target, end) <= 0
}

export function formatDate(point: DatePoint): string {
  const month = String(point.month + 1).padStart(2, '0')
  const day = String(point.day).padStart(2, '0')
  return `${point.year}-${month}-${day}`
}

export function formatDateLabel(point: DatePoint): string {
  const date = new Date(point.year, point.month, point.day)
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function toMonthDayKey(month: number, day: number): string {
  return `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function getTodayPoint(): DatePoint {
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() }
}
