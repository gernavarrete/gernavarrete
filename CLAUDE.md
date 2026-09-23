# CLAUDE.md

Personal portfolio of German Dario Navarrete, positioned at the intersection of
AI, Automation, Software Engineering and Business Systems.

## Source of truth

- **Visual and narrative direction: [`docs/DESIGN_DIRECTION.md`](docs/DESIGN_DIRECTION.md).**
  Read it before any UI, content, styling, motion or asset work. If a request
  conflicts with it, flag the conflict instead of silently picking a side.
- Changes to the direction itself are made in that document first, then applied.

## Project

- App lives in `portfolio/` (the repo root only holds docs and the profile README).
- Stack: React 18, Vite 8, React Router 6, plain JavaScript (no TypeScript yet).
- Styling today: plain CSS + CSS Modules. No design tokens yet.
- Tests: Vitest + Testing Library + jsdom. Lint: ESLint 9 flat config.
- Hosting: Vercel project `my-portfolio` (root `portfolio`, output `build/`,
  SPA fallback in `portfolio/vercel.json`).

## Commands (run from `portfolio/`)

| Task | Command |
|---|---|
| Dev server (port 3000) | `npm run dev` |
| Lint | `npm run lint` |
| Tests | `npm test -- --run` |
| Production build | `npm run build` |
| Preview build | `npm run preview` |

## Quality gates

Before every commit: `npm run lint`, `npm test -- --run` and `npm run build` must pass.
UI changes are also checked in a browser at mobile (375px) and desktop widths.

## Working rules

- Work in sprints with an explicit scope. Do not implement work from a later
  sprint (tokens, components, layout, routing, motion) unless it is in scope.
- Plan first, then implement after approval. Report risks and decisions that
  need the owner instead of improvising them.
- Atomic commits using Conventional Commits. No AI attribution trailers.
- New dependencies need a written justification (what it replaces, its bundle
  cost, and why a few lines of our own code are not enough).
- Prefer the solution with the highest impact/cost ratio. Avoid overengineering.
- Accessibility (WCAG 2.2 AA) and performance budgets are acceptance criteria,
  not polish. See `docs/DESIGN_DIRECTION.md`.

## Known debt (tracked, do not fix opportunistically)

- `Home.jsx` switches views with setState inside an effect (eslint-disable
  marked); routing refactor is its own task.
- `react-router-dom` 6.10 has high-severity advisories; needs a bump.
- Carousel arrows are not keyboard/screen-reader operable.
- Meta description is still the CRA default; FoodApi, screenshot1 and
  fullstore PNGs are unoptimized.
