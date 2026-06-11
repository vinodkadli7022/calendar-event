# Wall Calendar Assignment

Interactive wall calendar built with Next.js, TypeScript, Tailwind CSS, CSS Modules, and Framer Motion.

## Overview

This project is a responsive calendar application with month navigation, range selection, notes, holiday markers, keyboard support, and theme switching. It uses motion and image-driven styling to give the interface a physical wall-calendar feel.

## Features

- Month navigation with 3D page-flip transitions
- Date range selection with hover preview states
- Monthly notes and selected-range notes stored in `localStorage`
- Autosave debounce for note updates
- Dynamic accent color derived from the active hero image
- Holiday markers for Indian festivals and national holidays
- Keyboard navigation with arrow keys, Enter, Space, and Escape
- Light and dark theme support with persistence
- Responsive desktop and mobile layouts
- Scroll-triggered entrance animations and subtle parallax

## Tech Stack

| Area | Stack |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3, CSS Modules |
| Animation | Framer Motion v11 |
| Storage | `localStorage` |
| Package Manager | npm |

## Installation

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
git clone <your-repo-url>
cd <repo-folder>
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Run the production server
- `npm run lint` - Run ESLint

## Project Structure

```text
app/
  page.tsx
  layout.tsx
  globals.css
components/calendar/
  WallCalendar.tsx
  CalendarHero.tsx
  CalendarGrid.tsx
  DayCell.tsx
  NotesPanel.tsx
  RangePill.tsx
  ThemeToggle.tsx
  Tooltip.tsx
hooks/
  useCalendar.ts
  useDateRange.ts
  useNotes.ts
  useAccentColor.ts
  useKeyboardNav.ts
  useTheme.ts
lib/
  constants.ts
  dateUtils.ts
  colorUtils.ts
  storageUtils.ts
styles/
  calendar.module.css
types/
  calendar.ts
```

## Behavior Notes

- Holiday dates are static and may not always match lunar festival calendars.
- Notes are keyed by date or range in `localStorage`.
- Hero imagery comes from external URLs, so network access is required for the full experience.

## Future Improvements

- Add drag-to-select range support
- Add unit tests for reducers and date utilities
- Add locale-specific week-start settings
- Add richer metadata for notes and ranges
