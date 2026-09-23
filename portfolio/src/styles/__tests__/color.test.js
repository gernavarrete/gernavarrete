// @vitest-environment node
import { readFileSync } from "node:fs";
import {
  buildRegistry,
  missingReferences,
  nonTokenCss,
  parseTokens,
  readTokenCss,
  resolveToken,
} from "./parse-tokens.js";

const css = readTokenCss("color.css");
const { tokens, reducedMotion } = parseTokens(css);
const { map, duplicates } = buildRegistry(tokens);
const primitives = tokens.filter((t) => t.layer === "primitive");
const semantic = tokens.filter((t) => t.layer === "semantic");
const value = (name) => resolveToken(name, map);

// --- Design direction (source of truth) ------------------------------------

const designDirection = readFileSync(
  new URL("../../../../docs/DESIGN_DIRECTION.md", import.meta.url),
  "utf8"
);
const colorSection = designDirection.slice(
  designDirection.indexOf("### Color"),
  designDirection.indexOf("### Typography")
);
// Table rows whose second column is a hex value: "| Label | `#RRGGBB` | ...".
const documentedHex = Object.fromEntries(
  [...colorSection.matchAll(/^\|\s*\**([^|*]+?)\**\s*\|\s*\**`(#[0-9A-Fa-f]{6})`/gm)].map(
    ([, label, hex]) => [label.trim(), hex.toLowerCase()]
  )
);

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

const solid = (name) => toRgba(value(name));
// Soft fills are measured over the surface, as documented.
const softOnSurface = (name) => over(value(name), value("--color-surface"));

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

describe("color tokens: contrast computed from the real tokens", () => {
  // "Key contrast checks" plus the semantic state ratios, as documented.
  const APPROVED = [
    ["--color-text", "--color-bg", "16.89", 4.5],
    ["--color-text", "--color-surface", "15.88", 4.5],
    ["--color-text", "--color-surface-elevated", "14.52", 4.5],
    ["--color-text-secondary", "--color-bg", "10.37", 4.5],
    ["--color-text-secondary", "--color-surface", "9.75", 4.5],
    ["--color-text-secondary", "--color-surface-elevated", "8.91", 4.5],
    ["--color-text-muted", "--color-bg", "6.42", 4.5],
    ["--color-text-muted", "--color-surface", "6.04", 4.5],
    ["--color-text-muted", "--color-surface-elevated", "5.52", 4.5],
    ["--color-text-muted", "--color-surface-hover", "4.89", 4.5],
    ["--color-accent", "--color-bg", "10.71", 4.5],
    ["--color-accent", "--color-surface", "10.07", 4.5],
    ["--color-accent", "--color-surface-elevated", "9.21", 4.5],
    ["--color-on-accent", "--color-accent", "10.71", 4.5],
    ["--color-border-strong", "--color-bg", "3.89", 3],
    ["--color-border-strong", "--color-surface", "3.65", 3],
    ["--color-border-strong", "--color-surface-elevated", "3.34", 3],
    ["--color-success", "--color-bg", "9.47", 4.5],
    ["--color-success", "--color-surface", "8.91", 4.5],
    ["--color-warning", "--color-bg", "8.61", 4.5],
    ["--color-warning", "--color-surface", "8.09", 4.5],
    ["--color-error", "--color-bg", "6.57", 4.5],
    ["--color-error", "--color-surface", "6.18", 4.5],
    ["--color-info", "--color-bg", "8.90", 4.5],
    ["--color-info", "--color-surface", "8.37", 4.5],
  ];

  it.each(APPROVED)("%s on %s is %s:1 (>= %s)", (fg, bg, documented, min) => {
    const ratio = contrast(solid(fg), solid(bg));
    expect(ratio.toFixed(2)).toBe(documented);
    expect(ratio).toBeGreaterThanOrEqual(min);
  });

  it("text on amber-soft is 12.71:1 and amber on amber-soft is 8.06:1", () => {
    const soft = softOnSurface("--color-accent-soft");
    expect(contrast(solid("--color-text"), soft).toFixed(2)).toBe("12.71");
    expect(contrast(solid("--color-accent"), soft).toFixed(2)).toBe("8.06");
  });
});

describe("color tokens: 'Do not use' pairs stay below their threshold", () => {
  const DO_NOT_USE = [
    ["text primary on amber", "--color-text", "--color-accent", "1.58", 4.5],
    ["text primary on amber 500", "--color-text", "--color-accent-active", "2.03", 4.5],
    ["text primary on amber 600", "--color-text", "--color-flow-idle", "3.13", 4.5],
    ["amber 700 as text", "--color-connector-idle", "--color-bg", "3.14", 4.5],
    ["amber 800 as text", "--color-track", "--color-bg", "1.81", 4.5],
    ["border on a control", "--color-border", "--color-bg", "1.72", 3],
    ["border subtle on a control", "--color-border-subtle", "--color-bg", "1.37", 3],
    ["border strong on surface hover", "--color-border-strong", "--color-surface-hover", "2.96", 3],
    ["text disabled", "--color-text-disabled", "--color-bg", "3.39", 4.5],
    ["warning next to amber", "--color-warning", "--color-accent", "1.24", 3],
    ["error next to warning", "--color-error", "--color-warning", "1.31", 3],
  ];

  it.each(DO_NOT_USE)("%s: %s vs %s is %s:1 (< %s)", (_, a, b, documented, max) => {
    const ratio = contrast(solid(a), solid(b));
    expect(ratio.toFixed(2)).toBe(documented);
    expect(ratio).toBeLessThan(max);
  });

  // DESIGN_DIRECTION.md groups "White / text primary on amber" at 1.58:1; that
  // ratio is text primary. Pure white is 1.82:1. Both fail AA at any size.
  it("pure white on amber also fails (1.82:1)", () => {
    const white = { r: 255, g: 255, b: 255, a: 1 };
    const ratio = contrast(white, solid("--color-accent"));
    expect(ratio.toFixed(2)).toBe("1.82");
    expect(ratio).toBeLessThan(3);
  });
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
});
