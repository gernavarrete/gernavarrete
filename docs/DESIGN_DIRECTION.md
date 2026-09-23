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
| 5 | 1.5rem | 24 | Card padding (cards narrower than 20rem), field ↔ field, component stack |
| 6 | 2rem | 32 | Card padding (cards 20rem and wider), lead → content |
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
| Card padding | 24px when the card is narrower than 20rem, 32px when it is 20rem or wider (container query on the card, not the viewport) | 5 / 6 |
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
- **Container-based exception**: card padding changes 24 → 32 based on the
  card's own width (container query at 20rem), not the viewport. At 320px wide
  with 32px per side, 256px of content remain; below that width 24px preserves
  the interior better. See "Breakpoints and layout".

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
  space is distributed instead of piling up on the sides. Container widths are
  defined in "Breakpoints and layout".
- Section spacing is never doubled: it is a single layout value between
  sections, not one section's bottom padding plus the next one's top padding
  (which would reach 256px on desktop).
- Every section has a visual anchor (diagram, metrics, screenshot).

To avoid an overloaded look:
- At most **one high-density zone per viewport**.
- A group's internal gap is at least 2 steps smaller than the gap between
  groups (e.g. 16 vs 48).
- Density guideline, not a grid specification: card grids of up to 3 columns
  and metric rows of up to 3–4 items. The grid itself is defined in
  "Breakpoints and layout".
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
- **Card padding needs a container**: padding depends on a container query, so
  every card must be declared as a size container. A card that is not falls
  back to the default 24px padding.
- **Mobile diagrams**: a 4-node vertical pipeline is about 320px tall
  (4 × ~62px nodes + 3 × 24px connections). Six or more nodes need collapsing
  or internal scroll.

### Breakpoints and layout

Mobile-first. **The page responds to the viewport; components respond to their
container.** Page structure (navigation, hero, case study) changes with media
queries; reusable components (cards, diagrams, metric rows) adapt with container
queries.

#### Breakpoints

Two media queries, chosen by content behavior, not by device.

| Range | Name | What changes | Why there |
|---|---|---|---|
| < 48em (768px) | Mobile / base | Single-column flow: stacked hero, menu navigation | Below ~720px of content, two text columns lack a comfortable reading width |
| ≥ 48em (768px) | Tablet / narrow | Full navigation visible | ~722px of content fits the logo, 4 links and a CTA on one line |
| ≥ 64em (1024px) | Desktop | Split hero, case study with side panel, 12-column grid | ~969px of content lets a ~554px text column hold the Display next to a diagram |
| ≥ ~1264px | Wide | No media query: the layout container reaches its 1200px max | Natural cap; type and spacing also stop growing at 1280px |

Breakpoints are written in `em` as a choice of relative units, consistent with
a type and spacing system already in `rem`. Zoom and reflow do not depend on
that unit: when the page is zoomed, the CSS viewport shrinks and the layout
moves to the matching breakpoint. What guarantees reflow is a fluid layout,
safe grid minimums and no fixed widths.

#### Containers

| Container | Width | Use |
|---|---|---|
| Full-bleed | 100% of the viewport | Section backgrounds, dividers, structural lines, subtle background grid |
| Layout | **max-width 1200px (75rem)** plus the fluid page gutter (16 → 32px) | All content: grids, hero, diagrams, screenshots |
| Prose | **65ch** for body, **60ch** for body large and captions | Running text, always inside the layout container |

- The layout container caps at a ~1264px viewport, where type and spacing also
  stop growing (1280px): the whole system stops scaling at the same point.
- There is no extra "wide" container. Diagrams and screenshots use the full
  layout width (1200px), not the viewport.

#### Grid

- **12 columns from 64em**, used for asymmetric layouts. Below 64em, simple
  single-column flow plus intrinsic grids. Column gaps use the fluid layout
  grid gap (16 → 32px).
- **Card grids are intrinsic**: `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))`.
  With an 18rem minimum and the 1200px cap, the grid produces 1, 2 or 3 columns
  on its own and never 4 (four cards need 1248px). `min(100%, …)` prevents
  overflow at 320px.

| Pattern | < 48em | 48–64em | ≥ 64em |
|---|---|---|---|
| Hero | Stacked: eyebrow → thesis → statement → CTAs → proof | Stacked; diagram full width | 7 / 5 (text / system), guideline |
| Case study | Stacked; metadata as a summary block on top | Same | 8 / 4 (narrative / sticky side panel), guideline; diagrams and screenshots span 12 columns |
| Card grid | 1 column | 2 columns (from ~640px) | 3 columns |
| Metrics | By container | By container | Up to 4 in a row |
| Diagrams | Vertical | By container | Horizontal when it fits |

#### Card padding (container query)

| Card width | Padding |
|---|---|
| < 20rem (320px) | 24px |
| ≥ 20rem (320px) | 32px |

Decided by the card's own width, not the viewport. At 320px with 32px per
side, 256px of content remain; below that width, 24px preserves the interior
better. This avoids the desktop case where a ~305px card in a 3-column grid
(1024px viewport) kept only ~241px of content with 32px padding; it now keeps
~257px. This replaces the earlier rule "24px on mobile, 32px from tablet up".

#### Container queries (guidelines)

| Component | Threshold (container width) | Behavior |
|---|---|---|
| Card with media | 36rem | Image and text side by side |
| Diagram / pipeline | 42rem (672px) | Horizontal at or above; vertical below (4 horizontal nodes need ~656px) |
| Metric row | 24rem / 36rem | 2 columns below 24rem; all in one row at 36rem or wider |

Not used for page layout (viewport-driven) or typography (already fluid).

#### Wide screens

- **Stays contained**: text, grids, diagrams, screenshots (1200px container).
- **Expands**: section backgrounds, dividers and a structural background grid
  (very low-contrast lines to the edges), so side margins read as part of the
  system instead of dead space (guideline).
- **Hero only**: the ambient system visual (one per viewport) may extend into
  the margins as background, behind the content (guideline).
- **Nothing else grows**: no larger type, spacing or column count past the caps.

#### Accessibility and responsiveness

- **Reflow (WCAG 1.4.10)**: everything works at **320px CSS width** with no
  horizontal page scroll (equivalent to 1280px at 400% zoom).
- **Text resize (WCAG 1.4.4)**: type and spacing in `rem` follow the user's font
  settings.
- **Risk at 320px**: Display has a 40px minimum and content is 288px wide;
  "automatización" (~310px) does not fit. `overflow-wrap: break-word` prevents
  scroll but breaks the word. Write theses without words of 13+ letters.
- **Horizontal scroll** is allowed only inside code blocks, wide tables and
  diagrams that cannot stack: in their own `overflow-x: auto` container, with
  `tabindex="0"` and an accessible label.

#### Trade-offs and risks

- Only two media queries: between 768 and 1023px the hero stays stacked even
  when there is room. Acceptable for portrait tablets.
- The 12-column grid exists only on desktop; what happens between 768 and 1023px
  is solved inside each component.
- A 1200px container leaves wide margins on large monitors. Intentional, and it
  relies on the structural background filling them.
- Two responsive axes (viewport and container) add precision but need care when
  debugging. Rule: page by viewport, components by container.
- Every card must be a size container for its padding rule to apply.
- A sticky case study side panel breaks if its content is taller than the
  viewport; keep its content short.

#### Definitive vs guideline

| Definitive | Guideline |
|---|---|
| Breakpoints 48em and 64em | Hero 7/5 |
| Layout container max-width 1200px | Case study 8/4 |
| Fluid page gutter 16 → 32px | Display at most ~18ch |
| Prose: 65ch body, 60ch body large and captions | Container queries: card with media 36rem, diagrams 42rem, metrics 24/36rem |
| 12-column grid from 64em, simple flow below | Hero ambient visual |
| Intrinsic card grids: `minmax(min(100%, 18rem), 1fr)` | Structural background grid |
| Card padding by container query: < 20rem → 24px, ≥ 20rem → 32px | |
| Page responds to the viewport, components to their container | |
| Reflow at 320px with no horizontal page scroll | |

### Radius

Geometric with a minimum of softness: precise and engineered, never bubbly.
Values are expressed in `rem`, consistent with the spacing and type systems.
The approved values are a reference; token names come later.

#### Base scale

| Step | rem | px | Use |
|---|---|---|---|
| 0 | 0 | 0 | Structure: sections, full-bleed surfaces, dividers, lines, background grid |
| 1 | 0.125rem | 2 | Small pieces: badges, chips, tags, inline code |
| 2 | 0.25rem | 4 | Controls and system blocks: buttons, inputs, nodes, tooltips |
| 3 | 0.5rem | 8 | Containers: cards, panels, popovers, dialog, media. **System maximum** |
| Round | 50% / 9999px | — | Intrinsically circular elements only |

8px is the maximum anywhere in the system. 12px and 16px are intentionally
excluded (the generic "pillowy" SaaS look), and 6px is excluded because it sits
off the 4px grid and is barely distinguishable from 4 or 8.

#### Semantic usage

| Element | Radius | Shares exactly with |
|---|---|---|
| Sections, full-bleed surfaces, dividers, tables inside a card | 0 | — |
| Badges, chips, tags, inline code, chips inside a node | 2px | — |
| Buttons (including the CTA) | 4px | Inputs, selects, tooltips, nodes |
| Inputs, selects, textarea | 4px | Buttons |
| Nodes and system blocks | 4px | Controls |
| Tooltips | 4px | Controls |
| Cards | 8px | Panels, popovers, dialog, media, code blocks, diagram canvas |
| Elevated surfaces (popover, mobile menu) | 8px | Cards |
| Standalone screenshots and media | 8px | Cards |
| Media touching a container edge | Inherits the container radius on the corners that coincide with its edge; 0 on corners facing the interior | — |
| Modal / dialog | 8px | Cards |
| Connection ports, status dots, avatar, toggle | Round | — |

#### Shape language

- **Generic SaaS look avoided**: CTAs at 4px (never pill), cards at 8px (never
  12–16px), badges at 2px with a mono label (never rounded).
- **"Systems, not screens"**: the same vocabulary as a real architecture
  diagram: rectangles with minimal corners, straight connectors and circular
  ports.
- Technical elements use near-square corners (nodes 4px, chips 2px). A full 0
  is reserved for structure; on interactive elements it reads as harsh.

#### Hierarchy and nesting

- Radius grows with component size, up to a cap: small pieces 2, controls and
  nodes 4, containers 8, structure 0. Nothing exceeds 8, however large.
- **Radius is never a semantic signal.** An agent node is told apart by border,
  icon and label, not by its corners.
- **Internal components keep their normal semantic radius**: card 8px → button
  4px; node 4px → chip 2px.
- **An inner element never exceeds the radius of its outer container.**
- **When media or another surface touches the outer edge of a container**, the
  corners that coincide with that edge inherit the outer radius, and the corners
  facing the interior stay at 0. Example: card 8px with media flush at the top →
  `8px 8px 0 0`.

#### Pills and circles

- **Round (`50%` / `9999px`) only for intrinsically circular or track-shaped
  elements**: connection ports, status dots, avatar, toggle (track and thumb).
- **Never pill**: CTAs and buttons, badges, tags and states (use 2px chips with
  a mono label), cards and surfaces.
- Pill exceptions (for example a toggle-style filter) are evaluated case by case
  and documented (guideline).

#### Diagrams and nodes

| Element | Radius |
|---|---|
| Diagram canvas / container | 8px |
| Node | 4px |
| Chip or state inside a node | 2px |
| Connection port | Round |
| Status dot | Round |
| Connector | No radius at the ends; curves only where the path needs them (guideline) |

Descending hierarchy: canvas 8 → node 4 → chip 2 → round dot. An agent node
keeps 4px and is distinguished by an amber border with soft fill, an icon and the
`AGENTE` label.

#### Accessibility and usability

- Radius never reduces the touch area: the interactive area is the full box. A
  circular icon button with a 24px visible circle still has a 44×44px target.
- Focus outlines follow the radius. An amber outline with a 2px offset reads
  visually as radius + 2px.
- **No `overflow: hidden` on containers with focusable content just to clip
  media**: it also clips focus rings. Apply the radius to the media itself,
  with inherited corners per the nesting rule.
- With radii up to 8px and 24–32px padding, content never touches a curve.

#### Trade-offs and risks

- An 8px cap on large surfaces can feel dry; warmth must come from type, the
  amber accent and generous space.
- 2px is barely visible on low-density screens. It softens but communicates
  nothing, which is intended.
- Without pill CTAs, buttons look less "friendly" than average. That is the
  identity bet.
- Inherited corners add one implementation rule; forgetting it leaves sharp
  corners at the media/card junction.
- Drift: with only 4 values, "a 6 for this case" will be tempting. Snap to the
  nearest step.

#### Correct vs incorrect

| Correct | Incorrect | Why |
|---|---|---|
| Card 8px → button 4px | Card 8px → button 12px | Inner never exceeds outer |
| Node 4px → chip 2px + round ports | Node 4px → chip 8px | Inverts the hierarchy |
| Card 8px with media flush at the top: `8px 8px 0 0` | Media flush at the top with 8px on all four corners | Interior corners must be 0 |
| Card 8px with media flush at the top: `8px 8px 0 0` | Media flush at the top with 0 on all four corners | Edge corners poke out of the card's curve |
| Card 8px with a 4px button inside (not touching the edge) | Card 8px with an 8px button "to match" | Controls keep their semantic radius |
| Amber CTA at 4px | Amber CTA as a pill | Generic SaaS look |
| 2px status badge with mono label + icon | Pill status badge with color only | Forbidden shape, and color as the only signal |
| Radius applied to the image | `overflow: hidden` on a card with links and buttons | Clips focus rings |
| Agent node at 4px with amber border and `AGENTE` label | Agent node at 12px to set it apart | Radius is not a semantic signal |
| Full-bleed section at 0 | Full-bleed section at 8px | Structure is square |

#### Definitive vs guideline

| Definitive | Guideline |
|---|---|
| Scale 0 / 2 / 4 / 8px (in rem) + round | Applying asymmetric radii in less obvious cases (media on a side, media touching two sides, media grids inside a card) |
| Maximum 8px | Connector curves |
| Structure: 0 | Pill exceptions, evaluated case by case |
| Badges, chips and tags: 2px | |
| Controls and nodes: 4px | |
| Cards, panels, popovers, dialog and media: 8px | |
| Round only for intrinsically circular elements | |
| CTAs and badges never use pill | |
| Radius is never a semantic signal | |
| Internal components keep their semantic radius | |
| An inner element never exceeds its outer container | |
| Surfaces touching the container edge inherit the coinciding corners | |
| Corners facing the interior stay at 0 | |
| No `overflow: hidden` on containers with focusable content just to clip media | |

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

Single source of truth for motion in this portfolio. Values are the approved
reference; token names come later.

### Principles

Motion is used for:
- **Causality**: showing that something produces something else (data enters,
  a node processes it, a result comes out). This is the central use.
- **State**: confirming that something changed (hover, active, open, completed).
- **Continuity**: explaining where an element comes from or goes to (a menu
  opening, a tab indicator moving).
- **Temporal hierarchy**: drawing attention to one thing at a time.

Motion is not used for:
- Decoration, or delaying content: text never waits for an animation to become
  readable.
- Animating screens: route changes are instant.
- Counters, typing effects, parallax, floating blobs, shifting gradients,
  particles, orbits or decorative loops.

**"Systems, not screens": the interface stays still; data moves through the
system.** Nodes, cards and layout do not move. What travels is information: a
pulse along an edge, a state change on a node.

### Duration scale

| Duration | Name | Use |
|---|---|---|
| 0ms | Instant | Focus ring, route changes, reduced motion |
| 100ms | Feedback | Hover, press, color changes on controls |
| 200ms | Micro | Tooltips, tab indicator, node state changes |
| 300ms | Component | Mobile menu, popovers, modal, accordion |
| 400ms | Reveal | Scroll reveal of supporting visual groups |
| 800ms | Flow step | One pulse traveling along one diagram edge |

- **Exits use the previous step** of the scale (enter 300 → exit 200).
- A full flow sequence lasts **≤ 5 seconds**.

### Easing

| Curve | Value | Use |
|---|---|---|
| Standard (decelerate) | `cubic-bezier(0.2, 0, 0, 1)` | The primary curve: entrances and state changes |
| Exit (accelerate) | `cubic-bezier(0.3, 0, 1, 1)` | Exits |
| Move (in-out) | `cubic-bezier(0.65, 0, 0.35, 1)` | Something traveling between two known points: edge pulse, tab indicator |
| Linear | `linear` | Continuous progress only (progress bar, steady flow on an active edge) |

No curve leaves the 0–1 range: no overshoot, bounce or elastic effects.

### Semantic usage

| Category | What animates | Duration | Curve | Notes |
|---|---|---|---|---|
| Hover | Color, background, border | 100ms | Standard | Never moves or scales the element |
| Focus | Focus ring | 0ms | — | Always instant |
| Buttons and controls | Background and border (hover amber 300, press amber 500) | 100ms | Standard | No scale on press |
| Cards | Border only on hover (to border strong or amber 600) | 100ms | Standard | No lift, no translateY, no growing shadow |
| Nav | Link color; the active-section indicator slides | 100ms / 200ms | Standard / Move | — |
| Mobile menu | Opacity + translateY −8px → 0 | 300ms in / 200ms out | Standard / Exit | Focus trap; body scroll locked |
| Tooltips | Opacity | 200ms in / 100ms out | Standard / Exit | 400ms hover delay (guideline); on focus, appears immediately |
| Popovers | Opacity + translateY 4px | 200ms / 100ms | Standard / Exit | — |
| Modal / dialog | Backdrop opacity; dialog opacity + translateY 8px | 200ms backdrop / 300ms dialog; 200ms out | Standard / Exit | No backdrop blur |
| Accordions | Chevron rotates 180°; content opacity | 200ms | Standard | Height is not animated; content expands instantly |
| Tabs | Indicator slides; panel crossfade | 200ms | Move / Standard | — |
| Filters | Opacity of items entering and leaving | 200ms | Standard | No grid re-layout animation |
| Metrics | Appear with their group | (reveal) | — | No counters; the real value is visible from the first frame |
| Diagrams | Node states; pulses along edges | 200ms / 800ms per edge | Standard / Move | See "Diagrams and flows" |
| Hero system visual | One flow sequence | ≤ 5s total, once | Move | See "Hero" |
| Route / page change | Nothing | 0ms | — | New content visible immediately; focus moves to the new view's H1; no slide, fade or global page transition |
| Scroll reveal | Opacity + translateY | 400ms | Standard | Supporting groups only; see "Scroll reveal" |

### Diagrams and flows

Nodes never move: their position and size are fixed. Only their **state**
changes.

| State | Visual | Transition |
|---|---|---|
| Idle | Surface + border + muted mono label | — |
| Active | Amber 400 border + soft fill + amber label | 200ms, standard |
| Completed | Border strong + success check icon + label | 200ms, standard |
| Error | Error icon + label + error color | 200ms; no shaking |

Every state carries an icon or label; never color or motion alone.

Edges:
- **Idle**: a static line in the border color.
- **A pulse travels only when it represents real movement** of data or work
  along that path: a short amber segment runs from source to target in 800ms
  with the move curve.
- **Continuous flow** (linear) only on an edge that is active at that moment
  in a demonstration; never on every edge at once, never as decoration.

Sequences are **sequential, not simultaneous**, so motion explains causality:
node A active (200) → pulse along A→B (800) → node B active (200) → …
A 4-node pipeline takes about 3–4 seconds and then **rests in its final state**
(completed), static.

When it runs:
- **Once**, when the diagram enters the viewport (guideline: ≥ 50% visible).
- **Replay** only through an explicit control ("Ver flujo" / "Repetir"), a
  real, keyboard-operable button.
- **Never an infinite loop.** Any future loop requires a pause control
  (WCAG 2.2.2) and pauses when offscreen.

### Scroll reveal

Allowed only for **supporting visual and content groups**:
- card groups
- diagrams
- screenshots
- proof / metrics groups
- secondary visual blocks

| Rule | Value |
|---|---|
| Maximum translate | 16px (translateY) |
| Opacity | 0 → 1 |
| Duration and curve | 400ms, standard |
| Repetition | Once; no re-animation when scrolling back up |
| Stagger | 60ms between items in a group (guideline) |
| Maximum items animated together | 4; larger groups enter as one unit |
| Trigger threshold | ≥ 15% of the group visible (guideline) |

**Never use an opacity-0 reveal on**:
- section headings
- narrative / prose text
- forms
- navigation
- long lists
- tables
- anything visible on initial load (above the fold)

Primary text content is visible as soon as it enters the viewport.

**Progressive enhancement**: the hidden starting state is applied only when
JavaScript is running, the user has not requested reduced motion, and the group
is outside the viewport. Content reached through an anchor (`#section`) or
keyboard navigation is shown directly. If the script fails, everything is
visible.

### Hero

- **Always stable**: the thesis (Display), the positioning statement, the CTAs
  and the navigation are visible and still from the first frame. No text
  reveals or typing.
- **Can move**: only the system visual. It runs one flow sequence (nodes
  activating, pulses along edges), starting about 600ms after load (guideline),
  for **≤ 5 seconds in total**, then rests in its final state. It can be
  replayed with a control.
- **Ambient motion**: none by default. A very subtle ambient flow (for example,
  a slow flow on a single edge) may be considered in the future (guideline),
  only with a pause control, pausing offscreen and when the tab is hidden, and
  **never on mobile**.
- Instead of blobs, parallax, animated gradients, particles or typing text, the
  hero shows **a real system working once**: evidence, not decoration.

### Reduced motion

With `prefers-reduced-motion: reduce`:

| Removed (shown in final state) | Kept |
|---|---|
| All translate and rotate | Hover/active color and border changes, instant (0ms) |
| Scroll reveals (everything visible from the start) | Opacity crossfades ≤ 100ms where they help explain a change (tabs, modal) |
| Edge pulses and diagram sequences | Focus ring (already instant) |
| Accordion chevron rotation | Menu, modal and popover open/close, without translate |
| `scroll-behavior: smooth` (becomes an instant jump) | |

Meaning is preserved without motion:
- Diagrams show their final state with every node labeled and a text
  description of the flow.
- The "Ver flujo" control becomes **step by step** (guideline): each activation
  advances one node, with state shown by label and icon.
- No state depends on motion.

### Performance

- **UI geometry motion uses `transform` and `opacity`.**
- **Short state transitions** may animate color, background and border,
  ≤ 200ms.
- **Small SVG flow indicators** may animate `stroke-dashoffset`, as a
  documented exception.
- **Never animate** layout properties (`width`, `height`, `top`, `left`,
  `margin`, `padding`, `grid-template-*`), `filter`, `blur`, `backdrop-filter`
  or `box-shadow`.
- **Animated edges at once**: at most 2 on desktop, 1 on mobile. They pause
  when offscreen and when the tab is hidden.
- **`will-change`** only right before a known animation, removed afterwards.
  Never global, never on more than a few elements.
- **No motion libraries**: CSS transitions and keyframes, IntersectionObserver
  for reveals, and the native Web Animations API to sequence diagrams.
- **Mobile**: no ambient motion, sequences run once, no scroll-linked
  animations.

### Accessibility

- **Vestibular safety**: no parallax, screen zoom, rotation of large elements,
  scroll-jacking, or translate beyond 16px.
- **Autoplay**: anything that moves on its own lasts ≤ 5 seconds or has a
  pause/stop control (WCAG 2.2.2). Nothing flashes more than 3 times per
  second (2.3.1).
- **State never depends on motion**: there is always a label, icon or border
  change.
- **Focus and keyboard**: focus is instant and never moved by an animation.
  Opening a modal or the mobile menu moves focus inside and traps it; closing
  returns focus to the control that opened it. Animations never block
  interaction: nothing is disabled while a transition runs. The replay control
  is a real `button`.

### Trade-offs and risks

- A hero that runs once and rests has less impact than a loop. Intentional
  (evidence, not spectacle), but the sequence must be very well designed: it
  is the only chance.
- No metric counters: a common device is lost, in exchange for numbers that
  read instantly and are announced correctly by screen readers.
- Accordions without height animation look less smooth than average, but avoid
  layout recalculation.
- Instant route changes feel less "app-like", but content appears immediately
  and focus lands in the right place.
- Stagger capped at 4: larger grids enter as one block.
- **Drift**: the temptation of "one more animation". Every animation must pass
  the decision filter (section 13) and the performance budget.
- **Invisible content**: hiding with CSS without depending on JS leaves
  sections at opacity 0 if a script fails. The progressive enhancement rule
  prevents it.

### Correct vs incorrect

| Correct | Incorrect | Why |
|---|---|---|
| Card hover: border to amber 600 in 100ms | Card hover: lifts 4px and the shadow grows | Generic SaaS hover; animates shadow |
| One amber pulse along edge A→B, 800ms, once | "Marching ants" on every edge in a loop | Decorative, distracting, explains nothing |
| Node turns active (amber border + label) in 200ms | Node pulsing (scale 1 → 1.05) in a loop | Nodes don't move; the pulse is ornamental |
| Metric "72%" visible from the first frame | Counter from 0 to 72% | Exhibitionist and less trustworthy |
| Hero text still; system visual runs once | Headline typed letter by letter | Delays the main content (LCP); a cliché |
| Reveal of a card group: 16px, 400ms, once | Reveal of each paragraph with 60px translate | Primary text must not be hidden; vestibular risk |
| Route change: new view instantly, focus on H1 | Route change with a slide or fade | Screens are not animated |
| Modal: backdrop opacity + dialog rises 8px | Modal with animated `backdrop-filter: blur()` | Glassmorphism; expensive |
| Accordion: chevron rotates + content opacity | Accordion animating `height` | Recalculates layout every frame |
| Focus ring instant | Focus ring fading in over 200ms | Focus is never delayed |
| Reduced motion: static diagram with labels + step-by-step control | Reduced motion: diagram with no flow information | Meaning lost, not just motion |
| Tooltip on focus: appears immediately | Tooltip on focus: waits 400ms | The delay is for hover only |

### Definitive vs guideline

| Definitive | Guideline |
|---|---|
| Durations 0 / 100 / 200 / 300 / 400ms + 800ms flow step | 400ms hover delay on tooltips |
| Easings: standard `(0.2, 0, 0, 1)`, exit `(0.3, 0, 1, 1)`, move `(0.65, 0, 0.35, 1)`, linear for continuous progress only | Scroll reveal threshold at 15% visible |
| No overshoot, bounce or elastic effects | Stagger of 60ms |
| Exits use the previous duration step | Hero sequence starting about 600ms after load |
| UI geometry motion: transform and opacity | Diagram sequence trigger at 50% visible |
| State transitions: color, background, border ≤ 200ms | Future subtle ambient motion in the hero (with pause control, never on mobile) |
| Small SVG flow indicators: `stroke-dashoffset` as a documented exception | Step-by-step flow control under reduced motion |
| Never animate layout properties, filter, blur, backdrop-filter or box-shadow | |
| Nodes and layout never move; data moves | |
| Flows are sequential, run once, last ≤ 5s, with a replay control | |
| Nothing moves automatically for more than 5s without a pause control | |
| No counters, typing effects, parallax, scroll-jacking or decorative loops | |
| Route changes are instant: no slide, fade or global page transition; focus to the new H1 | |
| Hero text is stable from the first frame | |
| Scroll reveal only for supporting groups (cards, diagrams, screenshots, proof/metrics, secondary visuals): ≤ 16px, 400ms, standard, once, at most 4 items together, progressive enhancement | |
| No opacity-0 reveal on headings, prose, forms, nav, long lists, tables or above-the-fold content | |
| Full reduced motion behavior: no translate or sequences; final states with meaning preserved | |
| Focus is instant; animations never block interaction | |
| At most 2 animated edges on desktop, 1 on mobile | |
| No ambient motion on mobile | |
| No motion libraries (CSS + Web Animations API) | |

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
| Layout system (Sprint 00C) | Breakpoints at 48em and 64em; layout container max-width 1200px with the fluid 16 → 32px gutter; prose at 65ch (body) and 60ch (body large, captions); 12-column grid from 64em with simple flow below; intrinsic card grids. Page responds to the viewport, components to their container. Card padding moves to a container query (< 20rem → 24px, ≥ 20rem → 32px), replacing the earlier "24px mobile / 32px from tablet" rule. Resolves the container max-width deferred by the spacing system. Details in section 5. |
| Radius system (Sprint 00C) | Scale 0 / 2 / 4 / 8px (in rem) plus round, with 8px as the maximum. Structure 0; badges, chips and tags 2px; controls and nodes 4px; cards, panels, popovers, dialog and media 8px; round only for intrinsically circular elements. CTAs and badges never use pill, and radius is never a semantic signal. Nesting: internal components keep their semantic radius and never exceed the outer container; surfaces touching the container edge inherit the coinciding corners, with interior corners at 0. Details in section 5. |
| Motion system (Sprint 00C) | Section 7 becomes the single source of truth for motion. Durations 0/100/200/300/400ms plus an 800ms flow step; standard, exit and move easings plus linear, with no overshoot or bounce. Interface and nodes stay still while data moves; flows are sequential, run once and last ≤ 5s. Route changes are instant with focus on the new H1. Geometry motion uses transform/opacity; state transitions may animate color, background and border ≤ 200ms; small SVG flow indicators may animate stroke-dashoffset; layout properties, filter, blur, backdrop-filter and box-shadow are never animated. Scroll reveal only for supporting groups. Full reduced motion support. |

### Content gap (context for the decisions above)

The current site does not yet show enough evidence of AI and Automation work: its
published projects are general web applications. This is a **content gap of the
current site**, not a conclusion about the owner's professional experience. Closing
it means selecting and documenting real cases (following section 8) so that the
visual positioning is backed by evidence, as principle 1 requires.

### Still open

- None at the moment.
