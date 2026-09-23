# Design Direction

Source of truth for the visual identity, narrative and experience of this portfolio.
Every UI, content, motion and asset decision must be traceable to this document.

Status: v0.1 (Sprint 00B). Tokens, components and layout come later and must follow it.

---

## 1. Positioning

**I design and build systems where AI, automation and software create measurable
business outcomes.**

The portfolio sits at the intersection of four pillars, each with a distinct role:

| Pillar | Role | What it signals |
|---|---|---|
| **Artificial Intelligence** | Strategic pillar | Agents, LLM integrations and intelligent interfaces applied to real work |
| **Automation** | Strategic pillar | Pipelines and workflows that remove manual effort |
| **Software Engineering** | Foundation | Solid architecture, quality and delivery that make the rest reliable |
| **Business Systems** | Differentiator | Understanding operations, processes and the cost of problems |

AI and Automation lead the narrative and the visual identity. Software Engineering
is the credibility underneath them. Business Systems is what sets this portfolio
apart from a purely technical one.

It must NOT read as "a frontend developer's portfolio". The unit of value is the
**system and its impact**, not the screen or the tech stack.

## 2. Audiences

| Audience | What they need to find fast |
|---|---|
| Founders / CEOs | Business problems solved, outcomes, how to work together |
| CTOs / tech leads | Architecture decisions, trade-offs, engineering judgement |
| Companies / clients | Relevant cases, a clear offer, credibility, contact |
| Technical recruiters | Role fit, stack, experience, CV |

Design rule: a non-technical visitor understands the value in about 10 seconds; a
technical visitor finds depth in 1 or 2 clicks. Depth is layered, never forced.

## 3. Principles (in priority order when they conflict)

1. **Evidence over claims.** Every claim is backed by a case, a metric, a diagram
   or a link. No "passionate", "innovative" or "expert in" without proof.
   **The visual AI positioning must never outrun the real AI work shown.**
2. **Technology tied to business impact.** Each case follows
   problem → system → result. Tech stacks are supporting detail, not headlines.
3. **Clarity before spectacle.** High visual impact is allowed only when the
   content stays readable and scannable.
4. **Accessibility from day one.** WCAG 2.2 AA is an acceptance criterion.
5. **Performance is a design constraint.** Budgets (section 10) are hard limits.
6. **Mobile designed on purpose.** Not a shrunken desktop.
7. **Highest impact/cost ratio.** Choose the simplest solution that achieves the
   effect. No dependency or abstraction without clear, current need.

## 4. Visual concept: "Systems, not screens"

The site behaves like a **well-designed system diagram brought to life**: nodes,
connections, flows and orchestration. It is precise, calm and intentional, with
moments of controlled motion that show things *working*.

Core metaphors, used as structure, not decoration:

- **Nodes**: units of capability (a service, an agent, a skill, a project).
- **Edges / connections**: relationships and data paths between them.
- **Flows**: data or work moving through a pipeline: input → process → outcome.
- **Orchestration**: an agent or system coordinating other parts.
- **Architecture**: layered, modular, legible structure.

Personality: modern, premium, technological, disruptive, sophisticated,
dynamic, **experimental but controlled**.
"Controlled" means one signature experimental element per page at most, the
rest restrained. The system is the hero, not effects.

## 5. Visual language (direction, not tokens)

### Color
- Dark-first: deep neutral (graphite/ink) surfaces with layered elevation rather
  than pure black; high-contrast, off-white text.
- **One signal accent** means "active / flowing / important". It is an evolution
  of the current amber brand color, used sparingly (at most ~5–10% of the surface).
- At most one secondary hue, reserved for AI/agent states. Never decorative.
- Gradients only with a meaning (for example the direction of a flow), never as
  fills for their own sake. No rainbow or multi-hue gradients.
- Every text/background pair meets AA contrast (4.5:1 body, 3:1 large text/UI).

### Typography
- A precise, modern sans for headings and body (at most 1 family, variable font).
- A monospace used **only for data labels**: metrics, node names, pipeline
  stages. Never for paragraphs, and never as fake terminal output.
- Clear typographic scale with strong contrast between display and body sizes.
- Self-hosted, subset, at most 2 families total, `font-display: swap`.

### Layout and composition
- Grid-based, generous whitespace, strong alignment: an engineering-drawing feel.
- Thin lines, precise connectors and subtle grids as structural elements.
- Diagrams are first-class content, not illustrations.

### Iconography and imagery
- Simple, consistent line icons from a single set.
- Real artifacts: product screenshots, architecture and flow diagrams, metrics
  and before/after comparisons.
- No stock photos, and no AI-generated "futuristic" imagery.

## 6. Motif rules (nodes, edges, flows)

- A diagram must represent a **real system** from a case, or explain a real
  process. No random decorative networks.
- One decorative/ambient system visual per viewport, at most.
- Motion along an edge shows **causality or data flow**: something enters,
  gets processed, and produces a result.
- Every diagram has a text equivalent (caption or an accessible description).
- On mobile, horizontal pipelines become **vertical flows**; they are never just
  scaled down.

## 7. Motion

- Purpose over ornament: motion explains state, causality or hierarchy.
- Animate `transform` and `opacity` only. No layout-thrashing animations and no
  scroll-jacking.
- Short durations (roughly 150–400 ms for UI, longer only for narrative flows);
  a shared easing set.
- `prefers-reduced-motion` gets a fully static, equally clear experience.
- No autoplay loops that compete with reading. Ambient motion pauses when
  offscreen.
- Start with CSS; add a motion library only when CSS clearly can't do the job
  (with a justification, per CLAUDE.md).

## 8. Narrative and content

- Hero: positioning plus proof (a key outcome or a live system), not a job title.
- Case studies follow **Context → Problem → System (diagram) → Decisions and
  trade-offs → Impact (metrics) → Stack**.
- Numbers when real; honest qualitative impact when not. Never invented metrics.
- Clear calls to action per audience: hire / consult / view CV / contact.
- Tone: direct, confident and concrete. Show judgement, not adjectives.

## 9. Anti-patterns (do not use)

- Humanoid robots, brains made of circuits, glowing "AI" orbs.
- Hacker aesthetic, Matrix rain, green-on-black.
- Fake terminals or typing effects as decoration.
- Excessive neon and glow.
- Indiscriminate glassmorphism (blur/transparency only when it signals layering).
- Arbitrary gradients.
- Generic developer-portfolio patterns: skill bars and percentages, logo walls
  as the main content, "Hi, I'm X, a passionate developer".
- Carousels as the main way to show work.
- Heavy 3D/WebGL without a clear narrative purpose and a static fallback.

## 10. Performance budgets (hard limits, measured on mobile)

| Metric | Budget |
|---|---|
| LCP | < 2.5 s |
| CLS | < 0.1 |
| INP | < 200 ms |
| Initial JS (gzip) | ≤ 100 KB |
| Hero image / media | ≤ 200 KB, AVIF/WebP with responsive `srcset` |
| Fonts | ≤ 2 families, subset, preloaded where critical |

A feature that breaks a budget has to justify its impact or be cut.

## 11. Accessibility baseline

- WCAG 2.2 AA: contrast, visible focus, full keyboard operability, logical
  heading order, semantic landmarks.
- Touch targets ≥ 44×44 px.
- Diagrams and visual systems have text alternatives.
- Reduced-motion and zoom (up to 200%) are supported without loss of content.
- Interactive elements are real `button`/`a` elements, never clickable `div`/`svg`.

## 12. Mobile

- Designed first for 360–430 px, then expanded.
- Narrative order is re-thought for mobile; it isn't a scaled-down desktop layout.
- Diagrams reflow vertically; interactive systems degrade to a clear static
  version when needed.

## 13. Decision filter

Before adding any visual element, effect or dependency, it must answer YES to:

1. Does it communicate AI + Automation + Software + Business, or support evidence?
2. Is it clear to a non-technical visitor?
3. Does it respect the performance budget and accessibility baseline?
4. Is it the simplest way to get this effect?
5. Does it avoid every anti-pattern in section 9?

## 14. Decisions

### Resolved (Sprint 00B)

| Topic | Decision |
|---|---|
| Accent color | Keep amber `#FFB11B` as the starting point of the identity. Tokens may refine tints, shades and contrast-safe variants, but the identity starts from it. |
| Theme | Dark-first. No light theme for now. |
| Language | Spanish is the initial language. The architecture must be ready for future internationalization: no user-facing copy hardcoded deep inside components, content kept separate from presentation, and `lang` set correctly. No i18n library until a second language is actually needed. |
| AI/Automation cases | The real AI and Automation cases will be defined **before** the landing redesign starts. The redesign does not begin without them. |

### Content gap (context for the decisions above)

The current site does not yet show enough evidence of AI and Automation work: its
published projects are general web applications. This is a **content gap of the
current site**, not a conclusion about the owner's professional experience. Closing
it means selecting and documenting real cases (following section 8) so that the
visual positioning is backed by evidence, as principle 1 requires.

### Still open

- Typography families (candidates to be evaluated for performance and character).
