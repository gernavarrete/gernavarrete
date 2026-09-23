// @vitest-environment node
import { readFileSync } from "node:fs";
import {
  buildRegistry,
  cellText,
  clampAt,
  markdownCodeBlock,
  markdownSection,
  markdownTable,
  missingReferences,
  nonTokenCss,
  parseTokens,
  readDesignDirection,
  readTokenCss,
  resolveToken,
} from "./parse-tokens.js";

const css = readTokenCss("typography.css");
const { tokens, reducedMotion } = parseTokens(css);
const { map, duplicates } = buildRegistry(tokens);
const primitives = tokens.filter((t) => t.layer === "primitive");
const semantic = tokens.filter((t) => t.layer === "semantic");
const value = (name) => resolveToken(name, map);

// Viewports of the fluid range and tolerance for resolved clamp() values.
const MOBILE = 360;
const DESKTOP = 1280;
const TOLERANCE_PX = 0.05;
const ROOT_PX = 16;

// --- Design direction (source of truth) ------------------------------------

const typographySection = markdownSection(readDesignDirection(), "### Typography");

const TYPE_SCALE_COLUMNS = [
  "Role",
  "Family",
  "Mobile (360px)",
  "Desktop (1280px)",
  "Line height",
  "Weight",
  "Letter spacing",
  "Behavior",
];
const scaleRows = markdownTable(typographySection, "#### Type scale", TYPE_SCALE_COLUMNS);

// Documented clamp() lines: "Display  clamp(...)   40 → 72px".
const documentedClamps = Object.fromEntries(
  markdownCodeBlock(typographySection, "#### clamp() reference (not tokens yet)").map((line) => {
    const match = line.match(/^(\S+)\s+(clamp\(.*\))\s+(\d+)\s*→\s*(\d+)px$/);
    if (!match) throw new Error(`Unexpected clamp() reference line: "${line}"`);
    return [match[1], { clamp: match[2].replace(/\s+/g, " "), mobile: +match[3], desktop: +match[4] }];
  })
);

// Documented role -> token role, and the label used in the clamp() reference.
const ROLE = {
  Display: { token: "display", clampLabel: "Display" },
  H1: { token: "h1", clampLabel: "H1" },
  H2: { token: "h2", clampLabel: "H2" },
  H3: { token: "h3", clampLabel: "H3" },
  "Body large": { token: "body-lg" },
  Body: { token: "body" },
  "Body small": { token: "body-sm" },
  Label: { token: "label" },
  Caption: { token: "caption" },
  "Mono label": { token: "mono-label" },
  "Metric / data value": { token: "metric", clampLabel: "Metric" },
};

// Documented family name -> family primitive.
const FAMILY = { Geist: "--font-family-sans", "Geist Mono": "--font-family-mono" };

// Documented weight -> weight primitive.
const WEIGHT = { 400: "--font-weight-regular", 500: "--font-weight-medium", 600: "--font-weight-semibold" };

const px = (cell) => {
  const match = cellText(cell).match(/^(\d+)px$/);
  if (!match) throw new Error(`Expected a px size, found "${cell}"`);
  return +match[1];
};

// "−0.035em" -> "-0.035em"; "+0.08em, uppercase" -> "0.08em"; "0" -> "0".
const tracking = (cell) => cellText(cell).split(",")[0].replace("−", "-").replace(/^\+/, "").trim();

const roles = scaleRows.map((row) => {
  const label = cellText(row.Role);
  const role = ROLE[label];
  if (!role) throw new Error(`Unmapped role in "Type scale": "${label}"`);
  return {
    label,
    ...role,
    prefix: `--text-${role.token}`,
    family: cellText(row.Family),
    mobile: px(row["Mobile (360px)"]),
    desktop: px(row["Desktop (1280px)"]),
    lineHeight: cellText(row["Line height"]),
    weight: cellText(row.Weight),
    tracking: tracking(row["Letter spacing"]),
    letterSpacingCell: cellText(row["Letter spacing"]),
    fluid: cellText(row.Behavior).startsWith("Fluid"),
  };
});

const fluidRoles = roles.filter((r) => r.fluid);
const fixedRoles = roles.filter((r) => !r.fluid);
const fixedSizes = [...new Set(fixedRoles.map((r) => r.mobile))].sort((a, b) => a - b);
const documentedWeights = [...new Set(roles.map((r) => r.weight))].sort();

// Font family names declared by the installed Fontsource packages.
const fontsourceFamilies = (pkg) =>
  new Set(
    [
      ...readFileSync(
        new URL(`../../../node_modules/@fontsource-variable/${pkg}/index.css`, import.meta.url),
        "utf8"
      ).matchAll(/font-family:\s*'([^']+)'/g),
    ].map(([, family]) => family)
  );

const firstFamily = (stack) => stack.split(",")[0].trim().replace(/^"|"$/g, "");

// --- Tests ---------------------------------------------------------------------

describe("typography tokens: structure", () => {
  it("declares exactly 10 primitives and 56 semantic tokens", () => {
    expect(primitives).toHaveLength(10);
    expect(semantic).toHaveLength(56);
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

  it("declares nothing but :root custom properties (no global styles)", () => {
    expect(nonTokenCss(css)).toBe("");
  });

  it("maps every documented role, and defines exactly 5 properties per role plus the mono label transform", () => {
    expect(roles).toHaveLength(Object.keys(ROLE).length);
    const expected = roles
      .flatMap((r) => ["family", "size", "line-height", "weight", "tracking"].map((p) => `${r.prefix}-${p}`))
      .concat("--text-mono-label-transform")
      .sort();
    expect(semantic.map((t) => t.name).sort()).toEqual(expected);
  });
});

describe("typography tokens: primitives match DESIGN_DIRECTION.md", () => {
  it("uses only the documented weights (400 / 500 / 600)", () => {
    expect(documentedWeights).toEqual(["400", "500", "600"]);
    const weightPrimitives = primitives.filter((t) => t.name.startsWith("--font-weight-"));
    expect(weightPrimitives.map((t) => t.value).sort()).toEqual(documentedWeights);
    for (const weight of documentedWeights) expect(map.get(WEIGHT[weight])).toBe(weight);
  });

  it("has one size primitive per documented fixed size, in rem", () => {
    const sizePrimitives = primitives.filter((t) => t.name.startsWith("--font-size-"));
    expect(sizePrimitives.map((t) => t.name).sort()).toEqual(
      fixedSizes.map((size) => `--font-size-${size}`).sort()
    );
    for (const size of fixedSizes) {
      expect(map.get(`--font-size-${size}`)).toBe(`${size / ROOT_PX}rem`);
    }
  });

  it("uses Geist Variable and Geist Mono Variable as the first family of each stack", () => {
    expect(firstFamily(map.get(FAMILY.Geist))).toBe("Geist Variable");
    expect(firstFamily(map.get(FAMILY["Geist Mono"]))).toBe("Geist Mono Variable");
    expect(typographySection).toContain("**Geist Variable**");
    expect(typographySection).toContain("**Geist Mono Variable**");
  });

  it("matches the family names declared by the Fontsource packages", () => {
    expect(fontsourceFamilies("geist")).toEqual(new Set([firstFamily(map.get(FAMILY.Geist))]));
    expect(fontsourceFamilies("geist-mono")).toEqual(
      new Set([firstFamily(map.get(FAMILY["Geist Mono"]))])
    );
  });

  it("ends each family stack with a generic fallback", () => {
    expect(map.get(FAMILY.Geist).trim()).toMatch(/sans-serif$/);
    expect(map.get(FAMILY["Geist Mono"]).trim()).toMatch(/monospace$/);
  });
});

describe("typography tokens: roles match the documented type scale", () => {
  it.each(roles.map((r) => [r.label, r]))("%s: family", (_, role) => {
    expect(FAMILY[role.family], `family "${role.family}"`).toBeDefined();
    expect(map.get(`${role.prefix}-family`)).toBe(`var(${FAMILY[role.family]})`);
  });

  it.each(roles.map((r) => [r.label, r]))("%s: line height", (_, role) => {
    expect(Number(map.get(`${role.prefix}-line-height`))).toBe(Number(role.lineHeight));
  });

  it.each(roles.map((r) => [r.label, r]))("%s: weight", (_, role) => {
    expect(map.get(`${role.prefix}-weight`)).toBe(`var(${WEIGHT[role.weight]})`);
  });

  it.each(roles.map((r) => [r.label, r]))("%s: tracking", (_, role) => {
    expect(map.get(`${role.prefix}-tracking`)).toBe(role.tracking);
  });

  it("mono label is uppercase, as documented", () => {
    const monoLabel = roles.find((r) => r.token === "mono-label");
    expect(monoLabel.letterSpacingCell).toMatch(/uppercase/);
    expect(map.get("--text-mono-label-transform")).toBe("uppercase");
  });
});

describe("typography tokens: fixed roles stay fixed", () => {
  it.each(fixedRoles.map((r) => [r.label, r]))("%s is a fixed size primitive", (_, role) => {
    expect(role.mobile).toBe(role.desktop);
    expect(map.get(`${role.prefix}-size`)).toBe(`var(--font-size-${role.mobile})`);
    expect(value(`${role.prefix}-size`)).not.toMatch(/clamp|vw/);
  });
});

describe("typography tokens: fluid sizes resolve to the documented range", () => {
  it("documents a clamp() reference for every fluid role", () => {
    expect(fluidRoles.map((r) => r.clampLabel).sort()).toEqual(Object.keys(documentedClamps).sort());
  });

  it.each(fluidRoles.map((r) => [r.label, r]))("%s matches its clamp() reference", (_, role) => {
    const documented = documentedClamps[role.clampLabel];
    expect(map.get(`${role.prefix}-size`)).toBe(documented.clamp);
    expect([documented.mobile, documented.desktop]).toEqual([role.mobile, role.desktop]);
  });

  it.each(fluidRoles.map((r) => [r.label, r]))(
    "%s resolves to its mobile size at 360px and desktop size at 1280px (±0.05px)",
    (_, role) => {
      const size = map.get(`${role.prefix}-size`);
      expect(Math.abs(clampAt(size, MOBILE) - role.mobile)).toBeLessThanOrEqual(TOLERANCE_PX);
      expect(Math.abs(clampAt(size, DESKTOP) - role.desktop)).toBeLessThanOrEqual(TOLERANCE_PX);
    }
  );

  it.each(fluidRoles.map((r) => [r.label, r]))(
    "%s stays at its min below 360px and at its max above 1280px",
    (_, role) => {
      const size = map.get(`${role.prefix}-size`);
      expect(clampAt(size, 320)).toBe(role.mobile);
      expect(clampAt(size, 1920)).toBe(role.desktop);
    }
  );
});

describe("parse-tokens helper: code blocks and clamp()", () => {
  it("reads fenced code blocks and evaluates clamp() values", () => {
    const doc = "#### Ref\n\n```\nA  clamp(1rem, 0.5rem + 1vw, 2rem)\n```\n";
    expect(markdownCodeBlock(doc, "#### Ref")).toEqual(["A  clamp(1rem, 0.5rem + 1vw, 2rem)"]);
    expect(clampAt("clamp(1rem, 0.5rem + 1vw, 2rem)", 1000)).toBe(18);
    expect(clampAt("clamp(1rem, 0.5rem + 1vw, 2rem)", 100)).toBe(16);
    expect(clampAt("clamp(1rem, 0.5rem + 1vw, 2rem)", 5000)).toBe(32);
    expect(() => clampAt("clamp(1px, 2vw, 3px)", 100)).toThrow(/Unsupported clamp/);
  });
});
