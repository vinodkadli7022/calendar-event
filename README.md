# Wall Calendar React Component

A polished wall-calendar experience built with Next.js, TypeScript, Tailwind CSS, CSS Modules, and Framer Motion.

## Overview

This project renders an interactive calendar with month navigation, range selection, notes, holiday markers, theme switching, and motion-driven UI polish. The layout is responsive and adapts from a split desktop view to a stacked mobile presentation.

## Features

- Physical wall-calendar inspired design with hero imagery and spiral-ring styling
- Month navigation with page-flip transitions and hero image cross-fades
- Date range selection with start, end, in-range, and hover preview states
- Monthly notes and selected-range notes saved in `localStorage`
- Autosave debounce to keep note updates lightweight
- Dynamic accent color extracted from the current hero image
- Holiday markers for Indian festivals and national holidays
- Keyboard navigation with arrow keys, Enter/Space selection, and Escape to clear
- Light and dark theme support with persistence
- Responsive layout for desktop and mobile
- Scroll-based entrance animations and subtle parallax effects

## Tech Stack

| Category | Tooling |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + CSS Modules |
| Animation | Framer Motion v11 |
| Persistence | `localStorage` |
| Package Manager | npm |

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
git clone <your-repo-url>
cd <repo-folder>
npm install
```

### Run Locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Create a production build
- `npm run start` - Start the production server
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

## Notes

- Holiday data is static, so lunar festival dates may not always be year-accurate.
- Range notes are stored by date-key in `localStorage`.
- The hero images are loaded from external URLs, so network access is required for the full visual experience.

## Future Improvements

- Add drag-to-select range support
- Add unit tests for reducers and date utilities
- Add locale-specific week start support
- Add richer metadata for notes and ranges
