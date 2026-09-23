// @vitest-environment node
import {
  buildRegistry,
  cellText,
  clampAt,
  markdownSection,
  markdownTable,
  missingReferences,
  nonTokenCss,
  parseTokens,
  readDesignDirection,
  readTokenCss,
  resolveToken,
} from "./parse-tokens.js";

const css = readTokenCss("spacing.css");
const { tokens, reducedMotion } = parseTokens(css);
const { map, duplicates } = buildRegistry(tokens);
const primitives = tokens.filter((t) => t.layer === "primitive");
const semantic = tokens.filter((t) => t.layer === "semantic");
const value = (name) => resolveToken(name, map);

const MOBILE = 360;
const DESKTOP = 1280;
const TOLERANCE_PX = 0.05;
const ROOT_PX = 16;

const remToPx = (rem) => {
  if (rem === "0") return 0;
  const match = rem.match(/^([\d.]+)rem$/);
  if (!match) throw new Error(`Expected a rem value, found "${rem}"`);
  return +match[1] * ROOT_PX;
};

// --- Design direction (source of truth) ------------------------------------

const spacingSection = markdownSection(readDesignDirection(), "### Spacing");

// Base scale: step -> { rem, px }.
const scale = Object.fromEntries(
  markdownTable(spacingSection, "#### Base scale", ["Step", "rem", "px"]).map((row) => [
    cellText(row.Step),
    { rem: cellText(row.rem), px: +cellText(row.px) },
  ])
);
const stepForPx = (px) => {
  const step = Object.keys(scale).find((s) => scale[s].px === px);
  if (step === undefined) throw new Error(`${px}px is not on the spacing scale`);
  return step;
};

// Fixed tables: documented row label -> semantic token(s), in the order the row
// lists its values. A row may point to a token defined by another row.
const FIXED_TABLES = {
  "#### Components (fixed)": {
    key: "Context",
    rows: {
      "Inline gap (chips, tags, social icons)": ["--space-inline"],
      "Icon ↔ text (buttons, links, labels)": ["--space-icon-gap"],
      "Icon ↔ text in badges and mono labels": ["--space-icon-gap-tight"],
      "Standard button": ["--space-control-y", "--space-control-x"],
      "Large CTA button": ["--space-cta-y", "--space-cta-x"],
      "Gap between buttons": ["--space-button-gap"],
      "Card padding": ["--space-card-padding", "--space-card-padding-wide"],
      "Card: title → text": ["--space-card-title-text"],
      "Card: text → action or metadata": ["--space-card-text-action"],
      "Form: label → input": ["--space-form-label"],
      "Form: input padding": ["--space-input-y", "--space-input-x"],
      "Form: field ↔ field": ["--space-field-gap"],
      "Form: group ↔ group": ["--space-field-group-gap"],
    },
  },
  "#### Content within a section (fixed)": {
    key: "Transition",
    rows: {
      "Mono label (eyebrow) → H2": ["--space-eyebrow-heading"],
      "H2 → lead (Body large)": ["--space-heading-lead"],
      "Lead → content (grid, diagram, text)": ["--space-lead-content"],
      "Paragraph ↔ paragraph (Body)": ["--space-paragraph"],
      "Body → embedded component": ["--space-body-component"],
      "Related group ↔ related group": ["--space-group"],
    },
  },
  "#### Hero (fixed inside, fluid outside)": {
    key: "Transition",
    rows: {
      "Eyebrow (mono label) → Display": ["--space-hero-eyebrow"],
      "Display (thesis) → Body large (statement)": ["--space-hero-thesis"],
      "Statement → CTAs": ["--space-hero-statement"],
      "Gap between CTAs": ["--space-button-gap"],
      "CTAs → proof (metrics or system)": ["--space-hero-proof"],
    },
  },
  "#### Diagrams and nodes": {
    key: "Context",
    rows: {
      "Node padding": ["--space-node-y", "--space-node-x"],
      "Node mono label → name": ["--space-node-label"],
      "Status dot ↔ text": ["--space-status-dot"],
      "Minimum connection length (space between nodes)": [
        "--space-connector-min",
        "--space-connector-min-horizontal",
      ],
      "Diagram → caption": ["--space-diagram-caption"],
      "Cluster ↔ cluster inside a diagram": ["--space-cluster-gap"],
    },
  },
  "#### Metrics": {
    key: "Context",
    rows: {
      "Cell padding": ["--space-metric-cell"],
      "Value → label": ["--space-metric-label"],
      "Gap between metrics": ["--space-metric-gap"],
    },
  },
};

// Fluid layout table: row -> token, or null when the token lives in layout.css.
const FLUID_ROWS = {
  "Between sections": "--space-section",
  "Between narrative blocks": "--space-narrative",
  "Hero padding-block": "--space-hero-block",
  "Page gutter": null,
  "Layout grid gap (cards, cases)": null,
};

// Documented steps for a row: the Step column, or a trailing "(3 / 4)" in the
// value, or (when neither exists) the step of each documented px value.
function fixedCases(heading, { key, rows }) {
  return markdownTable(spacingSection, heading, [key, "Value"]).flatMap((row) => {
    const label = cellText(row[key]);
    const targets = rows[label];
    if (!targets) throw new Error(`Unmapped row in "${heading}": "${label}"`);
    const valueCell = cellText(row.Value);
    const pxs = [...valueCell.matchAll(/(\d+)px/g)].map(([, px]) => +px).slice(0, targets.length);
    const stepCell = row.Step ? cellText(row.Step) : valueCell.match(/\(([\d\s/]+)\)\s*$/)?.[1];
    const steps = stepCell ? stepCell.split("/").map((s) => s.trim()) : pxs.map(stepForPx);
    if (steps.length !== targets.length || pxs.length !== targets.length) {
      throw new Error(`"${label}" documents ${steps.length} steps and ${pxs.length} px values for ${targets.length} tokens`);
    }
    return targets.map((token, i) => ({ table: heading, label, token, step: steps[i], px: pxs[i] }));
  });
}

const fixedRows = Object.entries(FIXED_TABLES).flatMap(([heading, spec]) => fixedCases(heading, spec));
const fixedTokens = [...new Set(fixedRows.map((c) => c.token))];

const fluidRows = markdownTable(spacingSection, "#### Layout (fluid)", [
  "Context",
  "Mobile → Desktop",
  "clamp() reference",
]).map((row) => {
  const label = cellText(row.Context);
  if (!(label in FLUID_ROWS)) throw new Error(`Unmapped row in "Layout (fluid)": "${label}"`);
  const range = cellText(row["Mobile → Desktop"]).match(/^(\d+)\s*→\s*(\d+)px$/);
  if (!range) throw new Error(`Unexpected range for "${label}": "${row["Mobile → Desktop"]}"`);
  return {
    label,
    token: FLUID_ROWS[label],
    clamp: cellText(row["clamp() reference"]),
    mobile: +range[1],
    desktop: +range[2],
  };
});
const fluidCases = fluidRows.filter((row) => row.token);

// Minimum sizes, read from the Components table and the accessibility rules.
const componentsRows = Object.fromEntries(
  markdownTable(spacingSection, "#### Components (fixed)", ["Context", "Value"]).map((row) => [
    cellText(row.Context),
    cellText(row.Value),
  ])
);
const minHeightOf = (label) => {
  const match = componentsRows[label]?.match(/min-height (\d+)px/);
  if (!match) throw new Error(`No "min-height" documented for "${label}"`);
  return +match[1];
};
const touchTarget = spacingSection.match(/minimum (\d+)×\1px target/);
if (!touchTarget) throw new Error('No "minimum N×Npx target" rule found under "### Spacing"');

const SIZES = {
  "--size-touch-target": +touchTarget[1],
  "--size-control-min": minHeightOf("Standard button"),
  "--size-input-min": minHeightOf("Form: input padding"),
};

// Values the scale intentionally excludes, as documented.
const excluded = spacingSection.match(/(\d+), (\d+), (\d+) and (\d+) are intentionally not in the scale/);
if (!excluded) throw new Error("Excluded spacing values sentence not found under \"### Spacing\"");
const EXCLUDED_PX = excluded.slice(1).map(Number);

// --- Tests ---------------------------------------------------------------------

describe("spacing tokens: structure", () => {
  it("declares exactly 11 primitives and 44 semantic tokens", () => {
    expect(primitives).toHaveLength(11);
    expect(semantic).toHaveLength(44);
    expect(reducedMotion).toHaveLength(0);
  });

  it("splits the semantic tokens into 38 fixed, 3 fluid and 3 sizes", () => {
    expect(fixedTokens).toHaveLength(38);
    expect(fluidCases).toHaveLength(3);
    expect(Object.keys(SIZES)).toHaveLength(3);
    expect(semantic.map((t) => t.name).sort()).toEqual(
      [...fixedTokens, ...fluidCases.map((c) => c.token), ...Object.keys(SIZES)].sort()
    );
  });

  it("has no duplicated custom properties", () => {
    expect(duplicates).toEqual([]);
  });

  it("has no var() pointing to a missing token", () => {
    expect(missingReferences(map)).toEqual([]);
  });

  it("resolves every token without cycles", () => {
    for (const { name } of tokens) expect(() => value(name)).not.toThrow();
  });

  it("declares nothing but :root custom properties (no global styles)", () => {
    expect(nonTokenCss(css)).toBe("");
  });
});

describe("spacing tokens: base scale matches DESIGN_DIRECTION.md", () => {
  it("has one primitive per documented step", () => {
    expect(primitives.map((t) => t.name).sort()).toEqual(
      Object.keys(scale).map((step) => `--space-${step}`).sort()
    );
  });

  it.each(Object.entries(scale))("--space-%s is %o", (step, { rem, px }) => {
    expect(map.get(`--space-${step}`)).toBe(rem);
    expect(remToPx(rem)).toBe(px);
  });

  it("stays on the 4px grid", () => {
    for (const { px } of Object.values(scale)) expect(px % 4).toBe(0);
  });
});

describe("spacing tokens: fixed semantic mapping matches DESIGN_DIRECTION.md", () => {
  it.each(fixedTokens)("%s points to a primitive", (token) => {
    expect(map.get(token)).toMatch(/^var\(--space-\d+\)$/);
  });

  it.each(fixedRows.map((c) => [c.table.replace("#### ", ""), c.label, c.token, c]))(
    "%s · %s → %s",
    (_table, _label, _token, { token, step, px }) => {
      expect(scale[step], `step ${step} on the base scale`).toBeDefined();
      expect(map.get(token)).toBe(`var(--space-${step})`);
      expect(remToPx(value(token))).toBe(px);
    }
  );
});

describe("spacing tokens: fluid layout spacing matches DESIGN_DIRECTION.md", () => {
  it("leaves page gutter and grid gap to layout.css", () => {
    expect(fluidRows.filter((row) => !row.token).map((row) => row.label)).toEqual([
      "Page gutter",
      "Layout grid gap (cards, cases)",
    ]);
  });

  it.each(fluidCases.map((c) => [c.token, c]))("%s matches its documented clamp()", (_, { token, clamp }) => {
    expect(map.get(token)).toBe(clamp);
  });

  it.each(fluidCases.map((c) => [c.token, c]))(
    "%s resolves to its mobile value at 360px and desktop value at 1280px (±0.05px)",
    (_, { token, mobile, desktop }) => {
      expect(Math.abs(clampAt(map.get(token), MOBILE) - mobile)).toBeLessThanOrEqual(TOLERANCE_PX);
      expect(Math.abs(clampAt(map.get(token), DESKTOP) - desktop)).toBeLessThanOrEqual(TOLERANCE_PX);
    }
  );

  it.each(fluidCases.map((c) => [c.token, c]))(
    "%s starts and ends on scale steps",
    (_, { mobile, desktop }) => {
      expect(() => stepForPx(mobile)).not.toThrow();
      expect(() => stepForPx(desktop)).not.toThrow();
    }
  );
});

describe("spacing tokens: minimum sizes match DESIGN_DIRECTION.md", () => {
  it.each(Object.entries(SIZES))("%s is %spx", (token, px) => {
    expect(remToPx(map.get(token))).toBe(px);
  });
});

describe("spacing tokens: no off-scale values", () => {
  it("documents 20, 40, 56 and 80px as excluded, and none is on the scale", () => {
    expect(EXCLUDED_PX).toEqual([20, 40, 56, 80]);
    for (const px of EXCLUDED_PX) {
      expect(Object.values(scale).map((s) => s.px)).not.toContain(px);
    }
  });

  it("resolves no fixed token to an excluded value", () => {
    for (const token of [...primitives.map((t) => t.name), ...fixedTokens]) {
      expect(EXCLUDED_PX, token).not.toContain(remToPx(value(token)));
    }
  });

  it("keeps fluid spacing off the excluded values at both ends", () => {
    for (const { token } of fluidCases) {
      for (const viewport of [MOBILE, DESKTOP]) {
        expect(EXCLUDED_PX, token).not.toContain(Math.round(clampAt(map.get(token), viewport)));
      }
    }
  });
});
