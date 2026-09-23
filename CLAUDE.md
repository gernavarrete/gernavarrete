# CLAUDE.md

Personal portfolio of German Dario Navarrete, positioned at the intersection of
AI, Automation, Software Engineering and Business Systems.

## Source of truth

- **Visual and narrative direction: [`docs/DESIGN_DIRECTION.md`](docs/DESIGN_DIRECTION.md).**
  Read it before any UI, content, styling, motion or asset work. If a request
  conflicts with it, flag the conflict instead of silently picking a side.
- Changes to the direction itself are made in that document first, then applied.
- **Design tokens implement that document; token tests verify the match.** When
  a design decision changes, update `DESIGN_DIRECTION.md` first, then the tokens
  and tests. Never change a token value in isolation to "fix" one screen.

## Project

- App lives in `portfolio/` (the repo root only holds docs and the profile README).
- Stack: React 18, Vite 8, React Router 6, plain JavaScript (no TypeScript yet).
- Styling today: plain CSS + CSS Modules. Design tokens exist as CSS custom
  properties but legacy components do not use them yet (see "Design tokens").
- Tests: Vitest + Testing Library + jsdom. Lint: ESLint 9 flat config.
- Hosting: Vercel project `my-portfolio` (root `portfolio`, output `build/`,
  SPA fallback in `portfolio/vercel.json`).

## Design tokens

### Architecture

- Entry point: `portfolio/src/styles/tokens.css`, imported once in `main.jsx`
  after `fonts.css` and before `index.css`.
- One file per domain in `portfolio/src/styles/tokens/`: `color.css`,
  `typography.css`, `spacing.css`, `radius.css`, `layout.css`, `motion.css`.
- CSS custom properties are the only source of token values. Do not create
  parallel JS constants for visual values already expressed in CSS.
- Fonts: Geist Variable and Geist Mono Variable are self-hosted through
  `@fontsource-variable` and declared in `portfolio/src/styles/fonts.css`.

### Layers

- **Primitives**: raw scale values (`--amber-400`, `--space-4`, `--duration-200`).
- **Semantics**: roles that point to primitives (`--color-accent`,
  `--space-section`, `--duration-feedback`).
- Components consume **semantic tokens only**. Using a primitive directly needs
  an explicit, written justification.
- Each `:root` block is labeled `/* Primitives */` or `/* Semantic */`. Fixed
  semantics are `var()` references; role-specific values with no scale (fluid
  `clamp()`, measures, container width) are semantic-only literals.

Current counts (verified by the token tests):

| Domain | Primitives | Semantic |
|---|---|---|
| Color | 28 | 30 |
| Typography | 10 | 56 |
| Spacing | 11 | 44 |
| Radius | 5 | 5 |
| Layout | 0 | 9 |
| Motion | 10 | 16 |
| **Total** | **64** | **160** |

Plus 11 reduced-motion overrides in `motion.css`.

### Domain rules

- **Color**: amber is the only accent. `#9AA8FF` is a reserve candidate and has
  no token. Text on amber uses `--color-on-accent` (`#0B0D10`), never white.
  State is never communicated by color alone.
- **Typography**: Geist Variable is the primary face; Geist Mono Variable is for
  system and data labels only. Neither is applied to the UI yet: do not set
  fonts globally without a sprint for it.
- **Spacing**: 4px grid. Never introduce 20, 40, 56 or 80px steps. Fixed
  semantics reference primitives; fluid semantics may hold a `clamp()` directly.
- **Radius**: 8px is the normal maximum. `--radius-round` is only for
  intrinsically circular geometry; no arbitrary pills. Radius never signals state.
- **Layout**: `--container-max`, `--layout-gutter`, `--layout-grid-gap`,
  `--layout-columns`, `--layout-card-min`, `--measure-body`, `--measure-body-lg`,
  `--measure-caption`, `--measure-display`. Breakpoints (48em, 64em) and
  container-query thresholds are **not** custom properties (`var()` does not work
  in `@media`/`@container`): write them as literals. No `@custom-media` or PostCSS.
- **Motion**: primitive durations and easings plus semantic roles; distances are
  `--motion-reveal-distance`, `--motion-menu-distance`, `--motion-modal-distance`
  and `--motion-popover-distance`. There is no `--duration-instant`: focus and
  route changes are simply not animated. Reduced motion reassigns exactly 11
  semantic tokens and never a primitive; `--duration-crossfade-exit` is not
  reassigned (it already meets the 100ms cap). No motion library without a
  demonstrated need.

### Adoption status

- Sprint 01A created the foundation only. **Legacy components do not consume
  these tokens yet.** Defining a token does not mean it is applied.
- Do not migrate components opportunistically; visual migration happens in
  later sprints with their own scope.
- Geist is declared but not used, so no Geist file is downloaded. Keep it that
  way until a sprint applies it. Mulish remains in the legacy UI until then.

### Changing tokens

- Check `DESIGN_DIRECTION.md` first. If a need is not defined there, decide and
  document it before implementing.
- Reuse an existing semantic token when it expresses the same role. Avoid
  unnecessary aliases and tokens created "just in case".
- Name tokens by semantic responsibility, not after the component that first
  needs them.

### Token tests

- Live in `portfolio/src/styles/__tests__/`, one file per domain. Shared helpers
  (token parsing, `var()` resolution, Markdown tables and code blocks,
  `clamp()` evaluation) are in `parse-tokens.js`.
- Depending on the domain they verify counts, values against
  `DESIGN_DIRECTION.md`, primitive → semantic mappings, `var()` references,
  duplicates and cycles, `clamp()` endpoints at 360px and 1280px, contrast
  ratios, architectural rules and reduced-motion overrides.
- Expected values are read from `DESIGN_DIRECTION.md` wherever it can provide
  them robustly; tests hold mappings (document row → token) and validation
  criteria (WCAG thresholds, tolerances). Do not add design-system values to
  tests when they can be derived from the document. A few explicit guards pin
  approved decisions on purpose: breakpoints and container-query thresholds,
  excluded spacing and radius values, the 8px radius maximum and the 12% alpha
  of soft fills.

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
