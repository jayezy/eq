# CLAUDE.md — EQMind Project Intelligence

## Workflow Orchestration

### 1. Plan Node Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One tack per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

----

## Project Overview

- **What**: A landing page for an emotional intelligence assessment and training platform (EQMind)
- **Stack**: Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS v4 + Framer Motion
- **Deployment**: Vercel
- **Type**: Pure frontend — no backend, no database, no API calls

---

## Architecture

### App Router (Next.js)

Two client-side pages:
- `/` — Main landing page with hero, EQ assessment quiz, book recommendations, features, and CTA
- `/eibook` — Detailed breakdown of Goleman's "Emotional Intelligence" book

Both pages are `"use client"` components with embedded data (no CMS or API).

### State Management

- `useState` only — no Context, no Redux
- Quiz state: `currentQuestion`, `answers`, `showResults`, `quizStarted`
- Result calculated by counting most-selected emotional type from 10 questions

### Animation Strategy

- Framer Motion handles all animations
- `whileInView` for scroll-triggered reveals
- `staggerChildren` for sequential element animations
- `AnimatePresence` for quiz state transitions
- Durations: 0.3–0.8s

---

## File Structure

```
src/
└── app/
    ├── page.tsx           # Main landing page (~1040 lines)
    ├── layout.tsx         # Root layout (Geist fonts, metadata)
    ├── globals.css        # Tailwind v4 imports + CSS custom properties
    ├── favicon.ico
    └── eibook/
        └── page.tsx       # "The Book" detail page
```

No reusable component library — all UI is inline in page files.

---

## Styling

### Tailwind CSS v4 Setup

Uses `@tailwindcss/postcss` plugin (not the Vite plugin). Config in `postcss.config.mjs`.

### Theme

- **Background**: Dark (`#0a0a0b`) with semi-transparent gradient blobs
- **Primary**: Indigo/purple gradients (`from-indigo-500 to-purple-500`)
- **Accents**: Pink, blue, emerald, amber, rose, cyan per section
- **Text**: White/gray with opacity variants
- **Fonts**: Geist Sans + Geist Mono (Google Fonts)
- **Effects**: Glass morphism (`backdrop-filter: blur`), ambient blobs

### Dark Mode

CSS custom properties in `globals.css` with `prefers-color-scheme: dark` media query.

---

## Data Model

All data is embedded as constants in `page.tsx`:

- **10 quiz questions** — 4 options each, mapped to 5 emotional types
- **5 emotional types**: `self_aware`, `empathic`, `regulated`, `motivated`, `social`
- **10 book recommendations** — title, author, year, description, gradient color
- **4 quotes** from Daniel Goleman
- **6 EI competency features** with SVG icons

---

## Common Commands

```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm start            # Start production server
npm run lint         # ESLint
```

---

## Testing

- **Playwright** (^1.58.2) and **Puppeteer** (^24.37.5) are installed as dev dependencies
- No test files exist yet — testing infrastructure is not configured

---

## Known Patterns

1. **Adding a new quiz question**: Add to the `questions` array in `page.tsx`, ensure the `type` field maps to one of the 5 emotional types
2. **Adding a new emotional type**: Add to the `emotionalTypes` object and update result calculation logic
3. **Adding a new page**: Create a new directory under `src/app/` with a `page.tsx` (Next.js App Router convention)
4. **Changing colors/gradients**: Most are Tailwind utility classes inline — search for `from-` and `to-` gradient classes

---

## Potential Improvements

- Extract quiz data, books, and quotes into separate data files
- Break large page components into smaller reusable components
- Add actual test files for Playwright/Puppeteer
- Add API routes if backend features are needed (e.g., saving quiz results)
