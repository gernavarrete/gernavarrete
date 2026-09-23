// @vitest-environment node
import {
  buildRegistry,
  cellText,
  cellValues,
  markdownSection,
  markdownTable,
  missingReferences,
  nonTokenCss,
  parseTokens,
  readDesignDirection,
  readTokenCss,
  resolveToken,
} from "./parse-tokens.js";

const css = readTokenCss("color.css");
const { tokens, reducedMotion } = parseTokens(css);
const { map, duplicates } = buildRegistry(tokens);
const primitives = tokens.filter((t) => t.layer === "primitive");
const semantic = tokens.filter((t) => t.layer === "semantic");
const value = (name) => resolveToken(name, map);

// WCAG 2.2 AA thresholds: validation criteria, not design-system data.
const AA_TEXT = 4.5;
const AA_LARGE_OR_UI = 3;

// --- Design direction (source of truth) ------------------------------------

const colorSection = markdownSection(readDesignDirection(), "### Color");

// Hex values documented in the Neutrals, Amber and Semantic tables.
const hexRows = (heading, keyColumn) =>
  markdownTable(colorSection, heading, [keyColumn, "Hex"])
    .map((row) => [cellText(row[keyColumn]), cellText(row.Hex).toLowerCase()])
    .filter(([, hex]) => /^#[0-9a-f]{6}$/.test(hex));

const documentedHex = Object.fromEntries([
  ...hexRows("#### Neutrals", "Role"),
  ...hexRows("#### Amber (signal accent)", "Level"),
  ...hexRows("#### Semantic", "Role"),
]);

// Primitive token -> label of its row in DESIGN_DIRECTION.md.
const PRIMITIVE_DOC_LABEL = {
  "--gray-950": "Background",
  "--gray-900": "Surface",
  "--gray-850": "Surface elevated",
  "--gray-800": "Surface hover",
  "--gray-750": "Border subtle",
  "--gray-700": "Border",
  "--gray-600": "Text disabled",
  "--gray-500": "Border strong",
  "--gray-400": "Text muted",
  "--gray-200": "Text secondary",
  "--gray-50": "Text primary",
  "--amber-100": "100",
  "--amber-200": "200",
  "--amber-300": "300",
  "--amber-400": "400",
  "--amber-500": "500",
  "--amber-600": "600",
  "--amber-700": "700",
  "--amber-800": "800",
  "--green-400": "Success",
  "--orange-400": "Warning",
  "--red-400": "Error",
  "--blue-400": "Info",
};

const ALPHA_PRIMITIVES = {
  "--amber-400-a12": "--amber-400",
  "--green-400-a12": "--green-400",
  "--orange-400-a12": "--orange-400",
  "--red-400-a12": "--red-400",
  "--blue-400-a12": "--blue-400",
};

// Semantic token -> the primitive it must point to (approved mapping).
const SEMANTIC_MAPPING = {
  "--color-bg": "--gray-950",
  "--color-surface": "--gray-900",
  "--color-surface-elevated": "--gray-850",
  "--color-surface-hover": "--gray-800",
  "--color-border-subtle": "--gray-750",
  "--color-border": "--gray-700",
  "--color-border-strong": "--gray-500",
  "--color-text": "--gray-50",
  "--color-text-secondary": "--gray-200",
  "--color-text-muted": "--gray-400",
  "--color-text-disabled": "--gray-600",
  "--color-accent": "--amber-400",
  "--color-accent-hover": "--amber-300",
  "--color-accent-active": "--amber-500",
  "--color-accent-soft": "--amber-400-a12",
  "--color-accent-highlight": "--amber-200",
  "--color-on-accent": "--gray-950",
  "--color-focus-ring": "--amber-400",
  "--color-flow-active": "--amber-400",
  "--color-flow-idle": "--amber-600",
  "--color-connector-idle": "--amber-700",
  "--color-track": "--amber-800",
  "--color-success": "--green-400",
  "--color-success-soft": "--green-400-a12",
  "--color-warning": "--orange-400",
  "--color-warning-soft": "--orange-400-a12",
  "--color-error": "--red-400",
  "--color-error-soft": "--red-400-a12",
  "--color-info": "--blue-400",
  "--color-info-soft": "--blue-400-a12",
};

// --- Color math (WCAG 2.x) ---------------------------------------------------

function toRgba(color) {
  const hex = color.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 };
  }
  const rgb = color.match(/^rgb\(\s*(\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\d.]+)\s*\)$/);
  if (rgb) return { r: +rgb[1], g: +rgb[2], b: +rgb[3], a: +rgb[4] };
  throw new Error(`Unsupported color: ${color}`);
}

// Composites a translucent color over an opaque one, rounding to 8-bit channels.
function over(top, bottom) {
  const t = toRgba(top);
  const b = toRgba(bottom);
  const mix = (c) => Math.round(t[c] * t.a + b[c] * (1 - t.a));
  return { r: mix("r"), g: mix("g"), b: mix("b"), a: 1 };
}

function luminance({ r, g, b }) {
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// A color reference in the mappings below: a token name, a soft fill measured
// over the surface (as documented), or a literal CSS color.
const soft = (token) => ({ soft: token });
const WHITE = { literal: "#ffffff" };

function colorOf(ref) {
  if (typeof ref === "string") return toRgba(value(ref));
  if (ref.soft) return over(value(ref.soft), value("--color-surface"));
  return toRgba(ref.literal);
}

const refName = (ref) =>
  typeof ref === "string" ? ref : ref.soft ? `${ref.soft} over surface` : ref.literal;

// --- Documented contrast tables -> real token pairs ----------------------------

// "Key contrast checks": row label -> foreground and one background per ratio.
const KEY_CONTRAST = {
  "Text primary on background / surface / elevated": {
    fg: "--color-text",
    on: ["--color-bg", "--color-surface", "--color-surface-elevated"],
    min: AA_TEXT,
  },
  "Text secondary on background / surface / elevated": {
    fg: "--color-text-secondary",
    on: ["--color-bg", "--color-surface", "--color-surface-elevated"],
    min: AA_TEXT,
  },
  "Text muted on background / surface / elevated / hover": {
    fg: "--color-text-muted",
    on: ["--color-bg", "--color-surface", "--color-surface-elevated", "--color-surface-hover"],
    min: AA_TEXT,
  },
  "Amber 400 on background / surface / elevated": {
    fg: "--color-accent",
    on: ["--color-bg", "--color-surface", "--color-surface-elevated"],
    min: AA_TEXT,
  },
  "#0B0D10 on amber 400 (primary button)": {
    fg: "--color-on-accent",
    on: ["--color-accent"],
    min: AA_TEXT,
  },
  "Text primary on amber-soft": {
    fg: "--color-text",
    on: [soft("--color-accent-soft")],
    min: AA_TEXT,
  },
  "Amber 400 on amber-soft": {
    fg: "--color-accent",
    on: [soft("--color-accent-soft")],
    min: AA_TEXT,
  },
  "Border strong on background / surface / elevated": {
    fg: "--color-border-strong",
    on: ["--color-bg", "--color-surface", "--color-surface-elevated"],
    min: AA_LARGE_OR_UI,
  },
};

// "Semantic": role -> token; ratio columns -> background token.
const STATE_TOKENS = {
  Success: "--color-success",
  Warning: "--color-warning",
  Error: "--color-error",
  Info: "--color-info",
};
const STATE_COLUMNS = { "On background": "--color-bg", "On surface": "--color-surface" };

// "Do not use": row label -> one [foreground, background] pair per ratio.
const DO_NOT_USE = {
  "White on amber": { pairs: [[WHITE, "--color-accent"]], max: AA_LARGE_OR_UI },
  "Text primary on amber": { pairs: [["--color-text", "--color-accent"]], max: AA_LARGE_OR_UI },
  "Text primary on amber 500 / 600": {
    pairs: [
      ["--color-text", "--color-accent-active"],
      ["--color-text", "--color-flow-idle"],
    ],
    max: AA_TEXT,
  },
  "Amber 700 / 800 as text": {
    pairs: [
      ["--color-connector-idle", "--color-bg"],
      ["--color-track", "--color-bg"],
    ],
    max: AA_TEXT,
  },
  "Border / border subtle on a control": {
    pairs: [
      ["--color-border", "--color-bg"],
      ["--color-border-subtle", "--color-bg"],
    ],
    max: AA_LARGE_OR_UI,
  },
  "Border strong on surface hover": {
    pairs: [["--color-border-strong", "--color-surface-hover"]],
    max: AA_LARGE_OR_UI,
  },
  "Text disabled for real information": {
    pairs: [["--color-text-disabled", "--color-bg"]],
    max: AA_TEXT,
  },
  "Warning next to amber, or error next to warning, with no icon or label": {
    pairs: [
      ["--color-warning", "--color-accent"],
      ["--color-error", "--color-warning"],
    ],
    max: AA_LARGE_OR_UI,
  },
};

// "Do not use" row documented as an approximate range rather than a failure:
// muted text passes on every soft fill, with a thin margin.
const RANGE_ROWS = {
  "Text muted on soft fills": {
    fg: "--color-text-muted",
    on: [
      soft("--color-accent-soft"),
      soft("--color-success-soft"),
      soft("--color-warning-soft"),
      soft("--color-error-soft"),
      soft("--color-info-soft"),
    ],
    min: AA_TEXT,
  },
};

// Resolves a documented table into test cases, failing on any unmapped row or
// on a mismatch between the number of documented ratios and mapped pairs.
function casesFrom(tableName, rows, mapping, toPairs) {
  return rows.flatMap((row) => {
    const label = cellText(row.Pair);
    const spec = mapping[label];
    if (!spec) throw new Error(`Unmapped row in "${tableName}": "${label}"`);
    const ratios = cellValues(row.Ratio);
    const pairs = toPairs(spec);
    if (ratios.length !== pairs.length) {
      throw new Error(`"${label}" documents ${ratios.length} ratios but ${pairs.length} pairs are mapped`);
    }
    return pairs.map(([fg, bg], i) => ({ label, fg, bg, documented: ratios[i], spec }));
  });
}

const keyRows = markdownTable(colorSection, "#### Key contrast checks", ["Pair", "Ratio", "Result"]);
const keyCases = casesFrom("Key contrast checks", keyRows, KEY_CONTRAST, (spec) =>
  spec.on.map((bg) => [spec.fg, bg])
);

const stateCases = markdownTable(colorSection, "#### Semantic", [
  "Role",
  ...Object.keys(STATE_COLUMNS),
]).flatMap((row) => {
  const role = cellText(row.Role);
  if (!STATE_TOKENS[role]) throw new Error(`Unmapped row in "Semantic": "${role}"`);
  return Object.entries(STATE_COLUMNS).map(([column, bg]) => ({
    label: `${role} ${column.toLowerCase()}`,
    fg: STATE_TOKENS[role],
    bg,
    documented: cellValues(row[column])[0],
  }));
});

const doNotUseRows = markdownTable(colorSection, "#### Do not use", ["Pair", "Ratio", "Why"]);
const rangeRows = doNotUseRows.filter((row) => cellText(row.Pair) in RANGE_ROWS);
const doNotUseCases = casesFrom(
  "Do not use",
  doNotUseRows.filter((row) => !rangeRows.includes(row)),
  DO_NOT_USE,
  (spec) => spec.pairs
);

// "~4.8–5.2" -> { min: 4.8, max: 5.2 }
function documentedRange(cell) {
  const match = cellText(cell).match(/^~?([\d.]+)\s*[–-]\s*([\d.]+)$/);
  if (!match) throw new Error(`Expected a range like "~4.8–5.2", found "${cell}"`);
  return { min: +match[1], max: +match[2] };
}

const ratioOf = (fg, bg) => contrast(colorOf(fg), colorOf(bg));

// --- Tests ---------------------------------------------------------------------

describe("color tokens: structure", () => {
  it("declares exactly 28 primitives and 30 semantic tokens", () => {
    expect(primitives).toHaveLength(28);
    expect(semantic).toHaveLength(30);
    expect(reducedMotion).toHaveLength(0);
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

  it("uses var() for every semantic token, never a literal", () => {
    for (const { name, value: raw } of semantic) {
      expect(raw, name).toMatch(/^var\(--[\w-]+\)$/);
    }
  });

  it("declares nothing but :root custom properties (no global styles)", () => {
    expect(nonTokenCss(css)).toBe("");
    expect(css).not.toMatch(/color-scheme/);
  });

  it("does not tokenize the reserve candidate #9AA8FF", () => {
    for (const { value: raw } of tokens) expect(raw.toLowerCase()).not.toContain("9aa8ff");
  });
});

describe("color tokens: values match DESIGN_DIRECTION.md", () => {
  it("finds every documented hex row", () => {
    expect(Object.keys(documentedHex)).toHaveLength(23);
  });

  it.each(Object.entries(PRIMITIVE_DOC_LABEL))("%s matches row %s", (name, label) => {
    expect(documentedHex[label], `row "${label}" in DESIGN_DIRECTION.md`).toBeDefined();
    expect(map.get(name)).toBe(documentedHex[label]);
  });

  it.each(Object.entries(ALPHA_PRIMITIVES))("%s is %s at 12% alpha", (name, base) => {
    const { r, g, b } = toRgba(map.get(base));
    expect(map.get(name)).toBe(`rgb(${r} ${g} ${b} / 0.12)`);
  });

  it.each(Object.entries(SEMANTIC_MAPPING))("%s points to %s", (name, primitive) => {
    expect(map.get(name)).toBe(`var(${primitive})`);
  });

  it("covers every primitive and semantic token in the mappings", () => {
    const mappedPrimitives = [
      ...Object.keys(PRIMITIVE_DOC_LABEL),
      ...Object.keys(ALPHA_PRIMITIVES),
    ].sort();
    expect(primitives.map((t) => t.name).sort()).toEqual(mappedPrimitives);
    expect(semantic.map((t) => t.name).sort()).toEqual(Object.keys(SEMANTIC_MAPPING).sort());
  });
});

describe("color tokens: documented contrast tables are fully covered", () => {
  it("maps every row of every contrast table, and nothing else", () => {
    const labels = (rows) => rows.map((row) => cellText(row.Pair)).sort();
    expect(labels(keyRows)).toEqual(Object.keys(KEY_CONTRAST).sort());
    expect(labels(doNotUseRows)).toEqual(
      [...Object.keys(DO_NOT_USE), ...Object.keys(RANGE_ROWS)].sort()
    );
    expect(stateCases.map((c) => c.fg).sort()).toEqual(
      Object.values(STATE_TOKENS).flatMap((t) => [t, t]).sort()
    );
  });

  it("checks 39 documented ratios plus the muted-on-soft range", () => {
    expect(keyCases.length + stateCases.length + doNotUseCases.length).toBe(39);
    expect(rangeRows).toHaveLength(1);
  });
});

describe("color tokens: contrast computed from the real tokens", () => {
  it.each(keyCases.map((c) => [c.label, refName(c.fg), refName(c.bg), c]))(
    "Key contrast checks · %s · %s on %s",
    (_label, _fg, _bg, { fg, bg, documented, spec }) => {
      const ratio = ratioOf(fg, bg);
      expect(ratio.toFixed(2)).toBe(documented);
      expect(ratio).toBeGreaterThanOrEqual(spec.min);
    }
  );

  it.each(stateCases.map((c) => [c.label, c]))(
    "Semantic · %s",
    (_label, { fg, bg, documented }) => {
      const ratio = ratioOf(fg, bg);
      expect(ratio.toFixed(2)).toBe(documented);
      expect(ratio).toBeGreaterThanOrEqual(AA_TEXT);
    }
  );
});

describe("color tokens: 'Do not use' pairs stay below their threshold", () => {
  it.each(doNotUseCases.map((c) => [c.label, refName(c.fg), refName(c.bg), c]))(
    "Do not use · %s · %s vs %s",
    (_label, _fg, _bg, { fg, bg, documented, spec }) => {
      const ratio = ratioOf(fg, bg);
      expect(ratio.toFixed(2)).toBe(documented);
      expect(ratio).toBeLessThan(spec.max);
    }
  );

  it.each(rangeRows.map((row) => [cellText(row.Pair), row]))(
    "Do not use · %s stays within the documented range and passes AA",
    (label, row) => {
      const { min, max } = documentedRange(row.Ratio);
      const spec = RANGE_ROWS[label];
      for (const bg of spec.on) {
        const ratio = ratioOf(spec.fg, bg);
        expect(+ratio.toFixed(1), refName(bg)).toBeGreaterThanOrEqual(min);
        expect(+ratio.toFixed(1), refName(bg)).toBeLessThanOrEqual(max);
        expect(ratio, refName(bg)).toBeGreaterThanOrEqual(spec.min);
      }
    }
  );
});

describe("parse-tokens helper", () => {
  it("detects duplicates, missing references and cycles", () => {
    const sample = parseTokens(`
      /* Primitives */ :root { --a: #000000; --a: #111111; }
      /* Semantic */ :root { --b: var(--c); --x: var(--y); --y: var(--x); }
    `);
    const { map: m, duplicates: d } = buildRegistry(sample.tokens);
    expect(d).toEqual(["--a"]);
    expect(missingReferences(m)).toEqual(["--c"]);
    expect(() => resolveToken("--x", m)).toThrow(/Cycle/);
    expect(() => resolveToken("--b", m)).toThrow(/Unknown token/);
  });

  it("separates reduced-motion overrides and rejects unlabeled :root blocks", () => {
    const sample = parseTokens(`
      /* Semantic */ :root { --d: 1s; }
      @media (prefers-reduced-motion: reduce) { :root { --d: 0s; } }
    `);
    expect(sample.tokens).toEqual([{ name: "--d", value: "1s", layer: "semantic" }]);
    expect(sample.reducedMotion).toEqual([{ name: "--d", value: "0s", layer: "reduced-motion" }]);
    expect(() => parseTokens(":root { --e: 1px; }")).toThrow(/Primitives|Semantic/);
  });

  it("reads Markdown tables and grouped cells, failing clearly on structure changes", () => {
    const doc = "## A\n\n#### Table\n\n| Pair | Ratio |\n|---|---|\n| `x` on y | 1.5 / 2.25:1 |\n\n## B\n";
    const rows = markdownTable(doc, "#### Table", ["Pair", "Ratio"]);
    expect(rows).toEqual([{ Pair: "`x` on y", Ratio: "1.5 / 2.25:1" }]);
    expect(cellText(rows[0].Pair)).toBe("x on y");
    expect(cellValues(rows[0].Ratio)).toEqual(["1.5", "2.25"]);
    expect(() => markdownTable(doc, "#### Missing", [])).toThrow(/Heading not found/);
    expect(() => markdownTable(doc, "#### Table", ["Why"])).toThrow(/missing Why/);
  });
});
