// @vitest-environment node
import { existsSync, readdirSync, readFileSync } from "node:fs";
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

const css = readTokenCss("layout.css");
const { tokens, reducedMotion } = parseTokens(css);
const { map, duplicates } = buildRegistry(tokens);
const primitives = tokens.filter((t) => t.layer === "primitive");
const semantic = tokens.filter((t) => t.layer === "semantic");
const value = (name) => resolveToken(name, map);

const MOBILE = 360;
const DESKTOP = 1280;
const TOLERANCE_PX = 0.05;
const ROOT_PX = 16;

// Every token file and the entry point, for checks that span the whole system.
const stylesDir = new URL("../", import.meta.url);
const tokenFiles = readdirSync(new URL("tokens/", stylesDir)).filter((f) => f.endsWith(".css"));
const allTokenCss = [
  readFileSync(new URL("tokens.css", stylesDir), "utf8"),
  ...tokenFiles.map((file) => readTokenCss(file)),
];
const allTokens = tokenFiles.flatMap((file) => parseTokens(readTokenCss(file)).tokens);

const mustMatch = (text, pattern, what) => {
  const match = text.match(pattern);
  if (!match) throw new Error(`${what} not found in DESIGN_DIRECTION.md`);
  return match;
};

// --- Design direction (source of truth) ------------------------------------

const designDirection = readDesignDirection();
const layoutSection = markdownSection(designDirection, "### Breakpoints and layout");
const spacingSection = markdownSection(designDirection, "### Spacing");

const containers = Object.fromEntries(
  markdownTable(layoutSection, "#### Containers", ["Container", "Width"]).map((row) => [
    cellText(row.Container),
    cellText(row.Width),
  ])
);
const [, containerPx, containerRem] = mustMatch(
  containers.Layout ?? "",
  /max-width (\d+)px \(([\d.]+)rem\)/,
  'Layout container "max-width Npx (Nrem)"'
);
const [, proseCh, bodyLgCh] = mustMatch(
  containers.Prose ?? "",
  /(\d+)ch for body, (\d+)ch for body large and captions/,
  'Prose "Nch for body, Nch for body large and captions"'
);

const gridSection = markdownSection(layoutSection, "#### Grid");
const [, gridColumns, gridFromEm] = mustMatch(gridSection, /(\d+) columns from (\d+)em/, '"N columns from Nem"');
const [, cardMinRem] = mustMatch(gridSection, /minmax\(min\(100%, ([\d.]+)rem\), 1fr\)/, "card grid minmax()");
const [, fourCardsPx] = mustMatch(gridSection, /four cards need (\d+)px/, '"four cards need Npx"');
const [, displayCh] = mustMatch(layoutSection, /Display at most ~(\d+)ch/, '"Display at most ~Nch"');

// Fluid gutter and grid gap are documented in the Spacing "Layout (fluid)" table.
const fluid = Object.fromEntries(
  markdownTable(spacingSection, "#### Layout (fluid)", ["Context", "Mobile → Desktop", "clamp() reference"]).map(
    (row) => {
      const range = cellText(row["Mobile → Desktop"]).match(/^(\d+)\s*→\s*(\d+)px$/);
      return [
        cellText(row.Context),
        { clamp: cellText(row["clamp() reference"]), mobile: +range?.[1], desktop: +range?.[2] },
      ];
    }
  )
);
const FLUID_TOKENS = {
  "--layout-gutter": "Page gutter",
  "--layout-grid-gap": "Layout grid gap (cards, cases)",
};

// Viewport breakpoints and container-query thresholds (documentation only).
const breakpointRows = markdownTable(layoutSection, "#### Breakpoints", ["Range", "Name"]);
const documentedBreakpoints = [
  ...new Set(breakpointRows.flatMap((row) => [...cellText(row.Range).matchAll(/(\d+)em/g)].map(([, em]) => `${em}em`))),
];
const cqThresholds = Object.fromEntries(
  markdownTable(layoutSection, "#### Container queries (guidelines)", [
    "Component",
    "Threshold (container width)",
  ]).map((row) => [
    cellText(row.Component),
    [...cellText(row["Threshold (container width)"]).matchAll(/([\d.]+)rem/g)].map(([, rem]) => `${rem}rem`),
  ])
);
const cardPaddingThresholds = [
  ...new Set(
    markdownTable(layoutSection, "#### Card padding (container query)", ["Card width", "Padding"]).flatMap((row) =>
      [...cellText(row["Card width"]).matchAll(/([\d.]+)rem/g)].map(([, rem]) => `${rem}rem`)
    )
  ),
];

// Expected token -> documented value.
const EXPECTED = {
  "--container-max": `${containerRem}rem`,
  "--layout-gutter": fluid["Page gutter"]?.clamp,
  "--layout-grid-gap": fluid["Layout grid gap (cards, cases)"]?.clamp,
  "--layout-columns": gridColumns,
  "--layout-card-min": `${cardMinRem}rem`,
  "--measure-body": `${proseCh}ch`,
  "--measure-body-lg": `${bodyLgCh}ch`,
  "--measure-caption": `${bodyLgCh}ch`,
  "--measure-display": `${displayCh}ch`,
};

const remToPx = (rem) => +rem.replace("rem", "") * ROOT_PX;

// --- Tests ---------------------------------------------------------------------

describe("layout tokens: structure", () => {
  it("declares 0 primitives and exactly 9 semantic tokens", () => {
    expect(primitives).toHaveLength(0);
    expect(semantic).toHaveLength(9);
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

  it("declares nothing but :root custom properties (no global styles or utilities)", () => {
    expect(nonTokenCss(css)).toBe("");
  });
});

describe("layout tokens: values match DESIGN_DIRECTION.md", () => {
  it("defines exactly the documented tokens", () => {
    expect(semantic.map((t) => t.name).sort()).toEqual(Object.keys(EXPECTED).sort());
  });

  it.each(Object.entries(EXPECTED))("%s is %s", (name, expected) => {
    expect(expected, `documented value for ${name}`).toBeDefined();
    expect(map.get(name)).toBe(expected);
  });

  it("container max in px matches the documented max-width", () => {
    expect(remToPx(map.get("--container-max"))).toBe(+containerPx);
  });

  it("starts the column grid at a documented viewport breakpoint", () => {
    expect(documentedBreakpoints).toContain(`${gridFromEm}em`);
  });

  it("never fits four cards in the container, as documented", () => {
    const card = remToPx(map.get("--layout-card-min"));
    const gap = clampAt(map.get("--layout-grid-gap"), DESKTOP);
    const container = remToPx(map.get("--container-max"));
    expect(4 * card + 3 * gap).toBe(+fourCardsPx);
    expect(4 * card + 3 * gap).toBeGreaterThan(container);
    expect(3 * card + 2 * gap).toBeLessThanOrEqual(container);
  });

  it("uses the same measure for body large and captions, as documented", () => {
    expect(map.get("--measure-caption")).toBe(map.get("--measure-body-lg"));
  });
});

describe("layout tokens: fluid gutter and grid gap", () => {
  it("share exactly the same clamp()", () => {
    expect(map.get("--layout-gutter")).toBe(map.get("--layout-grid-gap"));
  });

  it.each(Object.entries(FLUID_TOKENS))(
    "%s resolves to its documented range at 360px and 1280px (±0.05px)",
    (name, row) => {
      const { mobile, desktop } = fluid[row];
      expect(Math.abs(clampAt(map.get(name), MOBILE) - mobile)).toBeLessThanOrEqual(TOLERANCE_PX);
      expect(Math.abs(clampAt(map.get(name), DESKTOP) - desktop)).toBeLessThanOrEqual(TOLERANCE_PX);
    }
  );
});

describe("layout: breakpoints and container queries stay literal (documentation only)", () => {
  it("documents 48em and 64em as the only viewport breakpoints", () => {
    expect(documentedBreakpoints).toEqual(["48em", "64em"]);
  });

  it("documents the container query guideline thresholds", () => {
    expect(cqThresholds).toEqual({
      "Card with media": ["36rem"],
      "Diagram / pipeline": ["42rem"],
      "Metric row": ["24rem", "36rem"],
    });
    expect(cardPaddingThresholds).toEqual(["20rem"]);
  });

  it("has no breakpoint or container-query token in any token file", () => {
    const literals = new Set([
      ...documentedBreakpoints,
      ...Object.values(cqThresholds).flat(),
      ...cardPaddingThresholds,
    ]);
    for (const { name, value: raw } of allTokens) {
      expect(name, "token name").not.toMatch(/breakpoint|\bbp\b|-bp-|media|container-query|-cq-|threshold/);
      expect(literals.has(raw.trim()), `${name}: ${raw}`).toBe(false);
    }
  });

  it("uses no custom media queries and no PostCSS setup", () => {
    for (const source of allTokenCss) expect(source).not.toMatch(/@custom-media/);
    const portfolio = new URL("../../../", import.meta.url);
    for (const config of ["postcss.config.js", "postcss.config.cjs", "postcss.config.mjs", ".postcssrc", ".postcssrc.json"]) {
      expect(existsSync(new URL(config, portfolio)), config).toBe(false);
    }
    const pkg = JSON.parse(readFileSync(new URL("package.json", portfolio), "utf8"));
    const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
    expect(deps.filter((dep) => /postcss/.test(dep))).toEqual([]);
  });
});
