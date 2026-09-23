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

Dark-first. A cool graphite neutral base, one amber signal accent, and muted
semantic colors. Values below are the approved palette; token names and CSS
files come later. Contrast ratios are computed with the WCAG 2.2 formula.

#### Neutrals

| Role | Hex | Use |
|---|---|---|
| Background | `#0B0D10` | Page background |
| Surface | `#12151A` | Sections, cards, panels |
| Surface elevated | `#1A1E24` | Popovers, highlighted nodes, mobile menu |
| Surface hover | `#232830` | Hover/selected state of interactive surfaces |
| Border subtle | `#262B33` | Decorative dividers only |
| Border | `#343B45` | Card and container outlines (decorative) |
| Border strong | `#667080` | Borders of controls (inputs, outline buttons); ≥ 3:1 on bg, surface and elevated |
| Text primary | `#EDEFF2` | Headings and main body |
| Text secondary | `#B6BEC8` | Supporting paragraphs, subtitles |
| Text muted | `#8C95A1` | Metadata, mono labels, captions |
| Text disabled | `#5E6773` | Disabled states only |

#### Amber (signal accent)

| Level | Hex | Use |
|---|---|---|
| 100 | `#FFE9BF` | High-emphasis text on amber-soft (rare) |
| 200 | `#FFD689` | Highlights on very dark grounds |
| 300 | `#FFC552` | Accent hover |
| **400** | **`#FFB11B`** | **Base accent**: primary CTA, active state, flows, focus ring |
| 500 | `#E69A00` | Accent active / pressed |
| 600 | `#B87A00` | Idle flow lines, dim amber borders |
| 700 | `#855800` | Decorative only (idle connectors) |
| 800 | `#553800` | Decorative only (track backgrounds) |
| Soft | amber at 12% alpha | Active node fill, highlight, badge background |

On dark grounds, hover moves lighter (300) and active/pressed moves darker (500).

#### Semantic

| Role | Hex | On background | On surface |
|---|---|---|---|
| Success | `#4ACB8E` | 9.47:1 | 8.91:1 |
| Warning | `#FF8F4D` | 8.61:1 | 8.09:1 |
| Error | `#F26B6B` | 6.57:1 | 6.18:1 |
| Info | `#6CB4FF` | 8.90:1 | 8.37:1 |

Each semantic color also has a soft variant (12% alpha) for backgrounds.

#### Secondary accent

None is active. AI does not get its own color by default.
`#9AA8FF` (desaturated periwinkle, 8.73:1 on background) is documented only as a
**reserve candidate**, for a future case where agents or states must be told
apart and shape + label are not enough. Adopting it requires updating this
document first.

#### Color rules

- **Amber means active / flowing / important.** It is not used for decoration or
  warnings, and it covers at most ~5–10% of the surface.
- **AI has no color of its own.** Agent nodes are distinguished by shape, icon and
  a mono label (e.g. `AGENTE`), not by hue.
- **Color is never the only signal of state** (WCAG 1.4.1). Every state also
  has an icon, a label or a change in shape.
- **Text on amber is `#0B0D10`, never white.** White on amber is 1.58:1 and fails AA.
- **Warning always carries an icon or label**, so it is never mistaken for the
  brand accent (warning vs amber is only 1.24:1 in luminance).
- Gradients only with a meaning (for example the direction of a flow), never as
  fills for their own sake. No rainbow or multi-hue gradients.
- Every text/background pair meets AA contrast (4.5:1 body, 3:1 large text and
  UI components).

#### Key contrast checks

| Pair | Ratio | Result |
|---|---|---|
| Text primary on background / surface / elevated | 16.89 / 15.88 / 14.52 | ✅ AA |
| Text secondary on background / surface / elevated | 10.37 / 9.75 / 8.91 | ✅ AA |
| Text muted on background / surface / elevated / hover | 6.42 / 6.04 / 5.52 / 4.89 | ✅ AA |
| Amber 400 on background / surface / elevated | 10.71 / 10.07 / 9.21 | ✅ AA |
| `#0B0D10` on amber 400 (primary button) | 10.71 | ✅ AA |
| Text primary on amber-soft | 12.71 | ✅ AA |
| Amber 400 on amber-soft | 8.06 | ✅ AA |
| Border strong on background / surface / elevated | 3.89 / 3.65 / 3.34 | ✅ 3:1 UI |

#### Do not use

| Pair | Ratio | Why |
|---|---|---|
| White / text primary on amber | 1.58 | Fails AA at any size |
| Text primary on amber 500 / 600 | 2.03 / 3.13 | Fails for normal text |
| Amber 700 / 800 as text | 3.14 / 1.81 | Decorative levels only |
| Border / border subtle on a control | 1.72 / 1.37 | Below the 3:1 UI minimum |
| Border strong on surface hover | 2.96 | Switch the control border to amber on hover |
| Text disabled for real information | 3.39 | Reserved for disabled states |
| Text muted on soft fills | ~4.8–5.2 | Passes, but thin margin; use primary or the state color |
| Warning next to amber, or error next to warning, with no icon or label | 1.24 / 1.31 | Tell apart by hue only |

### Typography
- **Geist Variable** is the primary typeface for headings, body and UI.
- **Geist Mono Variable** is used **only for system elements**: data labels,
  metrics, states, node names and pipeline stages. Never for paragraphs, and
  never as fake terminal output.
- Clear typographic scale with strong contrast between display and body sizes.
- Self-hosted, subset, at most 2 families total, `font-display: swap`.

Rationale:
- **Technical, not hacker.** Swiss-grotesk precision that reads as engineering
  without drifting into terminal or hacker aesthetics.
- **One coherent sans/mono family.** Geist and Geist Mono share the same
  skeleton, so text, labels and diagrams read as a single voice.
- **Strong fit with "Systems, not screens".** Nodes, metrics and flows labeled in
  Geist Mono sit naturally next to Geist headings.
- **Good performance.** Both are variable fonts: one file per family covers every
  weight (latin subset ≈ 29 KB for Geist and ≈ 23 KB for Geist Mono, woff2).
- **Good Spanish support.** The latin subset covers every character Spanish
  needs (á é í ó ú ñ ü ¿ ¡).
- Known trade-off: Geist is strongly associated with the Vercel/Next.js
  ecosystem, so the identity must come from composition, the amber accent and
  the system motifs, not from the typeface alone.

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
| Typography (Sprint 00C) | Geist Variable as the primary typeface; Geist Mono Variable for data labels, metrics, states, nodes and system elements. Chosen over Manrope and Inter after a side-by-side comparison with identical content. Rationale in section 5. |
| Color system (Sprint 00C) | Cool graphite neutrals, amber scale around `#FFB11B`, and muted semantic colors (success, warning, error, info). No secondary accent is active; `#9AA8FF` is kept as a reserve candidate only. Full palette, rules and contrast checks in section 5. |

### Content gap (context for the decisions above)

The current site does not yet show enough evidence of AI and Automation work: its
published projects are general web applications. This is a **content gap of the
current site**, not a conclusion about the owner's professional experience. Closing
it means selecting and documenting real cases (following section 8) so that the
visual positioning is backed by evidence, as principle 1 requires.

### Still open

- None at the moment.
