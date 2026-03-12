# Test Coverage Analysis — EQMind

## Current State

**Coverage: 0%** — No test files, no test configuration, no test scripts exist.

Playwright (`^1.58.2`) and Puppeteer (`^24.37.5`) are installed as dev dependencies but are completely unconfigured. There is no `npm test` script, no test config files, and no CI pipeline.

---

## Recommended Test Strategy

Given this is a pure-frontend Next.js app with no backend, the testing priorities should be:

### Priority 1 — Critical: EQ Quiz Logic (Unit Tests)

**Why:** The quiz is the core interactive feature. A bug in scoring silently gives users wrong results.

| Area | What to Test | Risk if Untested |
|------|-------------|-----------------|
| Answer tracking | Each answer maps to the correct emotion type | Wrong personality result |
| Score calculation | Most-selected type wins; ties handled correctly | Incorrect or undefined result |
| Result mapping | Each of the 5 emotion types renders correct title, description, and color | Broken results page |
| Edge cases | What happens with 0 answers? All same type? Even split across types? | Runtime crash or blank screen |

**Files involved:** `src/app/page.tsx` — the `questions` array, `emotionTypes` object, and the result-calculation logic inside the component.

**Recommendation:** Extract quiz logic (score tallying, winner selection) into a pure function in a separate file (e.g., `src/lib/quiz.ts`). This makes it trivially unit-testable with Vitest without needing a browser.

---

### Priority 2 — High: Page Rendering & Navigation (E2E Tests)

**Why:** Three pages with client-side rendering — if any page crashes, users see nothing.

| Test | Description |
|------|-------------|
| `/` loads | Main page renders hero section, nav, and key sections |
| `/eibook` loads | EI Book page renders all 5 competency sections |
| `/bookshelf` loads | Bookshelf page renders all 19 book cards |
| Navigation works | Links between pages function correctly |
| No console errors | Pages render without runtime JS errors |

**Tool:** Playwright — already installed, just needs configuration.

---

### Priority 3 — High: Quiz User Flow (E2E Tests)

**Why:** Multi-step interactive flow with state transitions — the most breakable user journey.

| Test | Description |
|------|-------------|
| Start quiz | "Take the Quiz" button scrolls to quiz and shows first question |
| Answer all 10 questions | Selecting an option advances to the next question |
| View results | After question 10, results screen appears with a valid emotion type |
| Retake quiz | "Retake Quiz" button resets state to question 1 |
| Progress indicator | Progress bar and question counter update correctly |

---

### Priority 4 — Medium: Responsive Layout & Visual Regression

**Why:** The site is heavily styled with gradients, glass morphism, and animations. Layout breaks are invisible without testing.

| Test | Description |
|------|-------------|
| Mobile viewport (375px) | All sections stack properly, text is readable |
| Tablet viewport (768px) | Grid layouts shift to 2-column correctly |
| Desktop viewport (1280px) | Full layout renders as designed |
| No horizontal overflow | No content causes horizontal scroll at any breakpoint |

**Tool:** Playwright with viewport settings, optionally with visual snapshot comparison.

---

### Priority 5 — Medium: Accessibility

**Why:** Currently no ARIA labels, limited semantic HTML. Accessibility gaps are a liability.

| Test | Description |
|------|-------------|
| Heading hierarchy | Each page has a logical h1 > h2 > h3 structure |
| Color contrast | Text meets WCAG AA contrast ratios against dark background |
| Keyboard navigation | Quiz can be completed via keyboard only |
| Screen reader labels | Interactive elements have accessible names |

**Tool:** Playwright with `@axe-core/playwright` for automated a11y audits.

---

### Priority 6 — Lower: Data Integrity

**Why:** All content is hardcoded. A typo in the data structure causes silent failures.

| Test | Description |
|------|-------------|
| All 10 questions have 4 options | No missing/extra options |
| All options map to valid emotion types | No typos like `"self_awre"` |
| All 5 emotion types have complete metadata | Title, description, color all defined |
| All 19 books have required fields | No undefined titles, authors, or empty arrays |
| All 4 quotes are non-empty | Quote text and attribution both present |

**Tool:** Vitest — simple assertions against the data arrays.

---

## Proposed Test Infrastructure

### Recommended Setup

```
Tool           Purpose                     Why
─────────────  ──────────────────────────  ─────────────────────────────
Vitest         Unit tests for logic/data   Fast, native ESM, works with Next.js
Playwright     E2E browser tests           Already installed, excellent DX
@axe-core      Accessibility audits        Integrates with Playwright
```

### Proposed File Structure

```
src/
├── lib/
│   └── quiz.ts              # Extracted quiz logic (pure functions)
tests/
├── unit/
│   ├── quiz-logic.test.ts   # Score calculation, type mapping
│   └── data-integrity.test.ts # Validate embedded data structures
├── e2e/
│   ├── homepage.spec.ts     # Landing page loads and renders
│   ├── quiz-flow.spec.ts    # Full quiz interaction flow
│   ├── eibook.spec.ts       # EI Book page rendering
│   ├── bookshelf.spec.ts    # Bookshelf page rendering
│   └── navigation.spec.ts   # Cross-page navigation
└── a11y/
    └── accessibility.spec.ts # Axe-core audits on all pages
```

### Package.json Scripts to Add

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "test:a11y": "playwright test tests/a11y/"
}
```

---

## Summary of Gaps by Severity

| Severity | Gap | Impact |
|----------|-----|--------|
| **Critical** | Quiz scoring logic is untested | Users may get wrong personality results |
| **Critical** | No smoke tests — pages could crash undetected | Broken deploys go live |
| **High** | Quiz multi-step flow is untested | Any state bug breaks the core feature |
| **High** | No CI pipeline to run tests | Tests only help if they run automatically |
| **Medium** | No responsive layout testing | Mobile users may see broken layouts |
| **Medium** | No accessibility testing | Legal/usability risk |
| **Low** | No visual regression testing | Subtle style changes go unnoticed |
| **Low** | Embedded data not validated | Typos in data cause silent failures |
