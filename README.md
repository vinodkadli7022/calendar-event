# Wall Calendar React Component
A polished, interactive wall calendar built with Next.js 14, TypeScript, Tailwind CSS, CSS Modules, and Framer Motion.

![Live Demo](https://img.shields.io/badge/Live%20Demo-Coming%20Soon-0ea5e9?style=for-the-badge)
![GitHub](https://img.shields.io/badge/GitHub-Repository-111827?style=for-the-badge&logo=github)

## Features
- Physical wall-calendar inspired visual design with hero image and spiral rings
- Date range selector with start/end/in-range/hover preview states
- Monthly and selected-range notes with localStorage persistence and 400ms autosave debounce
- Dynamic accent color extracted from month hero image using canvas k-means clustering
- Holiday markers (Indian festivals + national holidays) with CSS-only tooltips
- Full keyboard navigation: arrows, Enter/Space selection, Escape clear
- Light/Dark theme toggle with persistence
- Page-flip transitions, image cross-fades, and micro-interactions
- Fully responsive layout (desktop split panel, mobile stacked)
- Scroll-based animations for card entrance, notes reveal, and ring parallax

## Tech Stack
| Category | Tooling |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 + CSS Modules |
| Animation | Framer Motion v11 |
| State | React useState + useReducer |
| Persistence | localStorage |
| Package Manager | npm |

## Getting Started
1. Clone repository
2. Install dependencies
3. Run development server

```bash
git clone <your-repo-url>
cd tuf-assign
npm install
npm run dev
```

Open http://localhost:3000

## Component Architecture
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

## Animation Details
- Page flip on month change with 3D perspective container
- Hero image cross-fade on month switch
- Staggered day cell entrance
- Range endpoint spring entrance
- Hover/tap micro-interactions on day cells and nav arrows
- Scroll-triggered fade-in for card and notes panel
- Spiral rings subtle parallax tied to page scroll

## Design Decisions
- Framer Motion chosen for expressive, composable interaction choreography and scroll APIs
- useReducer used for date-range state machine to keep selection transitions deterministic
- Canvas + k-means used for dynamic accent extraction so visual theme responds to each hero photo
- CSS Modules used for animation-heavy visual states and bespoke calendar styling
- Utility functions kept pure in lib/dateUtils.ts for predictability and testability

## Known Limitations / Future Improvements
- Holiday set is static and not year-accurate for lunar festivals
- Range notes are key-based in localStorage; future work could include richer note metadata
- Drag-to-select date range can be added for faster selection
- Could add unit tests for reducers and date utilities
- Could support locale-specific week start and regional holiday packs
