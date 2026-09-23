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

#### Type scale

Mobile-first. Sizes are in `rem` (16px base) so they follow the user's font-size
setting. Fluid roles interpolate between 360px and 1280px viewports and stay at
their min/max outside that range. Only three weights are used: 400, 500 and 600.

| Role | Family | Mobile (360px) | Desktop (1280px) | Line height | Weight | Letter spacing | Behavior |
|---|---|---|---|---|---|---|---|
| Display | Geist | 40px | 72px | 1.05 | 600 | −0.035em | Fluid |
| H1 | Geist | 32px | 48px | 1.10 | 600 | −0.025em | Fluid |
| H2 | Geist | 26px | 36px | 1.15 | 600 | −0.02em | Fluid |
| H3 | Geist | 20px | 24px | 1.30 | 600 | −0.01em | Fluid (slight) |
| Body large | Geist | 18px | 18px | 1.60 | 400 | 0 | Fixed |
| Body | Geist | 16px | 16px | 1.65 | 400 | 0 | Fixed |
| Body small | Geist | 14px | 14px | 1.55 | 400 | 0 | Fixed |
| Label | Geist | 14px | 14px | 1.30 | 500 | 0 | Fixed |
| Caption | Geist | 13px | 13px | 1.45 | 400 | 0.005em | Fixed |
| Mono label | Geist Mono | 12px | 12px | 1.30 | 500 | +0.08em, uppercase | Fixed |
| Metric / data value | Geist Mono | 32px | 40px | 1.00 | 500 | −0.02em | Fluid |

Resulting ratios: about 1.2–1.25 between heading steps on mobile (compact) and
about 1.33–1.5 on desktop (strong headline presence).

#### Roles and usage

- **Display**: once per page, for the hero thesis only. Short text (up to ~8 words).
- **H1**: reserved for page titles and case study titles. One per page.
- **H2**: section titles (cases, services, about).
- **H3**: card titles, highlighted nodes, case study subsections.
- **Body large**: section leads, the hero positioning statement, case summaries.
  Max ~60ch.
- **Body**: running text for paragraphs and case descriptions. Max ~65ch.
- **Body small**: secondary text, longer metadata, footnotes.
- **Label**: buttons, navigation, form labels, tabs. Always sans, never mono.
- **Caption**: diagram captions, image captions, visible accessible descriptions.
  Never the only carrier of critical information.
- **Mono label**: eyebrows, node types (`AGENTE`, `INPUT`), states (`ACTIVO`),
  pipeline stages, metric units. 1–3 words only, never sentences.
- **Metric / data value**: impact figures (72%, 11 h). Geist Mono figures are
  tabular by design. The unit goes in mono label, or at ~0.55em in amber.

#### Fluid vs fixed

- **Fluid** (Display, H1, H2, H3, Metric): these roles carry presence, and the
  mobile/desktop difference is large (up to 1.8× for Display). Breakpoint jumps
  would look abrupt on tablets. H3 is only slightly fluid, to avoid a 1.8× gap
  between H2 and H3 on desktop.
- **Fixed** (Body large, Body, Body small, Label, Caption, Mono label):
  readability depends on absolute size, not viewport width. `clamp()` adds no
  value here.

#### clamp() reference (not tokens yet)

Preferred values combine `rem + vw`, never `vw` alone, so text keeps scaling
with the user's font settings and zoom (WCAG 1.4.4).

```
Display  clamp(2.5rem,   1.717rem + 3.478vw, 4.5rem)   40 → 72px
H1       clamp(2rem,     1.609rem + 1.739vw, 3rem)     32 → 48px
H2       clamp(1.625rem, 1.380rem + 1.087vw, 2.25rem)  26 → 36px
H3       clamp(1.25rem,  1.152rem + 0.435vw, 1.5rem)   20 → 24px
Metric   clamp(2rem,     1.804rem + 0.870vw, 2.5rem)   32 → 40px
```

The scale caps at 1280px on purpose: a larger Display on wide monitors pushes
content out of the first view without adding clarity.

#### Wrapping and density (Spanish)

- Spanish runs about 15–25% longer than English. Headings use
  `text-wrap: balance`; body text uses `text-wrap: pretty` to avoid one-word
  last lines. Line lengths are set in `ch`, so they adapt to the language.
- Long words at Display size on small phones: "automatización" (14 letters)
  takes about 310px of the 328px available on a 360px screen. Words of 18+
  letters overflow. Write Display theses without extreme words and use
  `overflow-wrap: break-word` as a safety net. No `hyphens: auto` on headings.
- Light text on dark grounds reads heavier (irradiation). Body keeps weight 400
  and uses a 1.65 line height instead of 1.5.
- Mono label is the minimum size (12px). It relies on uppercase, +0.08em
  tracking and muted color (6.04:1 on surface). Never go below 12px.
- Metric figures longer than 5 characters (e.g. "1.250.000") do not fit a
  three-column metric row on mobile: stack the row to one column on mobile or
  abbreviate ("1,2M").

#### Hero typography

- The hero uses a **short thesis in Display** (ideally up to ~8 words).
- The **full positioning statement goes below it in Body large**.
- The full positioning statement is never set in Display (at 72px it would
  take 4–5 lines on desktop and about 8 on mobile).
- H1 is not used in the hero; it is reserved for page and case study titles.

### Layout and composition
- Grid-based, generous whitespace, strong alignment: an engineering-drawing feel.
- Thin lines, precise connectors and subtle grids as structural elements.
- Diagrams are first-class content, not illustrations.

### Spacing

Mobile-first, on a **4px grid**, expressed in `rem` (16px base). Components use
fixed steps; only layout-level spacing is fluid (360px → 1280px, same range as
the type scale). Values are the approved reference; token names come later.

#### Base scale

| Step | rem | px | Typical use |
|---|---|---|---|
| 0 | 0 | 0 | Reset |
| 1 | 0.25rem | 4 | Fine adjustments: node mono label → name, icon in badge |
| 2 | 0.5rem | 8 | Icon ↔ text, inline gaps, label ↔ input |
| 3 | 0.75rem | 12 | Control vertical padding, gap between buttons |
| 4 | 1rem | 16 | Paragraph ↔ paragraph, heading → lead, mobile gutter |
| 5 | 1.5rem | 24 | Card padding (mobile), field ↔ field, component stack |
| 6 | 2rem | 32 | Card padding (tablet and up), lead → content |
| 7 | 3rem | 48 | Between groups, hero → proof |
| 8 | 4rem | 64 | Narrative blocks (desktop), sections (mobile) |
| 9 | 6rem | 96 | Hero padding (desktop) |
| 10 | 8rem | 128 | Sections (desktop) |

Above 16px the scale jumps in large steps (×1.33–×1.5) so there are no
"almost equal" values. 20, 40, 56 and 80 are intentionally not in the scale;
snap to the nearest step.

#### Components (fixed)

| Context | Value | Step |
|---|---|---|
| Inline gap (chips, tags, social icons) | 8px | 2 |
| Icon ↔ text (buttons, links, labels) | 8px | 2 |
| Icon ↔ text in badges and mono labels | 4px | 1 |
| Standard button | 12px / 24px padding, **min-height 44px** | 3 / 5 |
| Large CTA button | 16px / 24px padding (≈ 50px tall) | 4 / 5 |
| Gap between buttons | 12px | 3 |
| Card padding | 24px on mobile, 32px from tablet up (stepped, not fluid) | 5 / 6 |
| Card: title → text | 8px | 2 |
| Card: text → action or metadata | 16px | 4 |
| Form: label → input | 8px | 2 |
| Form: input padding | 12px / 16px, **min-height 48px** | 3 / 4 |
| Form: field ↔ field | 24px | 5 |
| Form: group ↔ group | 32px | 6 |

#### Content within a section (fixed)

| Transition | Value | Step |
|---|---|---|
| Mono label (eyebrow) → H2 | 12px | 3 |
| H2 → lead (Body large) | 16px | 4 |
| Lead → content (grid, diagram, text) | 32px | 6 |
| Paragraph ↔ paragraph (Body) | 16px | 4 |
| Body → embedded component | 24px | 5 |
| Related group ↔ related group | 48px | 7 |

#### Layout (fluid)

| Context | Mobile → Desktop | clamp() reference |
|---|---|---|
| Between sections | 64 → 128px | `clamp(4rem, 2.435rem + 6.957vw, 8rem)` |
| Between narrative blocks | 32 → 64px | `clamp(2rem, 1.217rem + 3.478vw, 4rem)` |
| Hero padding-block | 48 → 96px | `clamp(3rem, 1.826rem + 5.217vw, 6rem)` |
| Page gutter | 16 → 32px | `clamp(1rem, 0.609rem + 1.739vw, 2rem)` |
| Layout grid gap (cards, cases) | 16 → 32px | `clamp(1rem, 0.609rem + 1.739vw, 2rem)` |

Both ends of every clamp land on a scale step; only intermediate values are
continuous (e.g. sections: 92px at 768px, 110px at 1024px).

#### Hero (fixed inside, fluid outside)

| Transition | Value |
|---|---|
| Eyebrow (mono label) → Display | 16px (4) |
| Display (thesis) → Body large (statement) | 24px (5) |
| Statement → CTAs | 32px (6) |
| Gap between CTAs | 12px (3) |
| CTAs → proof (metrics or system) | 48px (7) |

#### Diagrams and nodes

| Context | Value |
|---|---|
| Node padding | 12px / 16px (3 / 4) |
| Node mono label → name | 4px (1) |
| Status dot ↔ text | 12px (3) |
| Minimum connection length (space between nodes) | 24px vertical on mobile, 32px horizontal on desktop (5 / 6) |
| Diagram → caption | 16px (4) |
| Cluster ↔ cluster inside a diagram | 48px (7) |

#### Metrics

| Context | Value |
|---|---|
| Cell padding | 16px (4) |
| Value → label | 8px (2) |
| Gap between metrics | 16px, or a 1px divider over a shared background |

#### Fixed vs fluid

- **Fluid (5 layout roles only)**: sections, narrative blocks, hero padding,
  page gutter and grid gap. They set how much air the page has, and must grow
  on desktop for a premium feel.
- **Fixed (everything else)**: components look the same at any viewport. A
  button with fluid padding would change size when a phone rotates.
- **Stepped exception**: card padding changes 24 → 32 at a breakpoint because it
  depends on card width, not viewport width. Long term this is a case for
  container queries.

#### Vertical rhythm

- **Proximity**: space **above** a heading is always larger than space
  **below** it, by at least 2 steps, so the heading belongs to what follows.
- **Standard section chain**: eyebrow → 12 → H2 → 16 → lead → 32 → content. The
  same chain in every section, independent of font size.
- **No `em`-based spacing**: `1em` under a fluid H2 would produce 26–36px,
  off-scale and different at every viewport. Each transition uses a fixed step.
- **No strict baseline grid**: line heights (e.g. 16 × 1.65 = 26.4px) are not
  multiples of 4. Spacing follows the 4px grid; line heights stay optimized for
  reading on dark grounds.

#### Density

Core rule: **dense inside, generous outside.** A dense zone (diagram, metrics,
card grid) sits on its own surface with compact internal spacing (4–16px) and
is surrounded by generous space (48px or more).

To avoid an empty look:
- Content has a controlled max-width, and text stays limited to 60–65ch, so
  space is distributed instead of piling up on the sides. The exact container
  value is defined in the layout/breakpoints sprint.
- Section spacing is never doubled: it is a single layout value between
  sections, not one section's bottom padding plus the next one's top padding
  (which would reach 256px on desktop).
- Every section has a visual anchor (diagram, metrics, screenshot).

To avoid an overloaded look:
- At most **one high-density zone per viewport**.
- A group's internal gap is at least 2 steps smaller than the gap between
  groups (e.g. 16 vs 48).
- Density guideline, not a grid specification: card grids of up to 3 columns
  and metric rows of up to 3–4 items. The definitive grid is defined in the
  layout/breakpoints sprint.
- Node connections are at least 24px; shorter ones stop reading as a flow.

#### Accessibility and touch

- Every interactive control has a **minimum 44×44px target** (beyond the
  WCAG 2.2 AA minimum of 24×24, criterion 2.5.8; meets AAA 2.5.5).
- A standard button with a 14px label and 12px padding is only 42.2px tall, so
  buttons declare `min-height: 44px` instead of relying on padding.
- Inputs are at least 48px tall with 16px text, which also avoids iOS
  auto-zoom on focus.
- Adjacent targets are at least 8px apart (step 2).
- Compacting never shrinks a target: in dense zones visual spacing can shrink,
  but interactive areas stay at 44px (with transparent padding if needed).

#### Trade-offs

- The 4px grid jumps in large steps above 16px: sometimes the "ideal" value
  falls between steps. Consistency wins over fine-tuning.
- Only 5 fluid values: less organic than fluid everything, but predictable,
  and components behave the same everywhere.
- No strict baseline grid: line-by-line alignment across columns is lost (rarely
  noticed in a portfolio) in exchange for line heights tuned for dark reading.
- 128px between sections on desktop is generous. It reads as premium but needs
  sections with real content; generous space amplifies whatever is there,
  strong or thin.

#### Risks

- **Doubled section spacing** (padding + padding): prevented by defining section
  spacing as a single layout value.
- **Off-scale values** slipping in during component work (the classic
  `margin: 20px`): mitigated by tokens and, if needed later, a CSS lint rule.
- **Stepped card padding inside fluid grids**: on tablets a narrow card may
  already use 32px padding. The right fix is container queries, not more
  breakpoints.
- **Mobile diagrams**: a 4-node vertical pipeline is about 320px tall
  (4 × ~62px nodes + 3 × 24px connections). Six or more nodes need collapsing
  or internal scroll.

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
| Typography scale (Sprint 00C) | Mobile-first scale with 11 roles on Geist and Geist Mono, 3 weights (400/500/600). Display, H1, H2, H3 and Metric are fluid (360–1280px); body, label, caption and mono label are fixed. Hero: short thesis in Display, full positioning statement in Body large; H1 reserved for page and case study titles. Details in section 5. |
| Spacing system (Sprint 00C) | 4px-grid scale of 11 steps (0–128px) in rem. Components use fixed steps; only 5 layout roles are fluid (sections, narrative blocks, hero padding, page gutter, grid gap). Includes semantic usage, vertical rhythm, density rules and 44×44px touch targets. The container max-width is deferred to the layout/breakpoints sprint. Details in section 5. |

### Content gap (context for the decisions above)

The current site does not yet show enough evidence of AI and Automation work: its
published projects are general web applications. This is a **content gap of the
current site**, not a conclusion about the owner's professional experience. Closing
it means selecting and documenting real cases (following section 8) so that the
visual positioning is backed by evidence, as principle 1 requires.

### Still open

- Container max-width and breakpoints (to be defined in the layout/breakpoints
  sprint).
