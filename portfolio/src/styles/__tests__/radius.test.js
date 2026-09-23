// @vitest-environment node
import {
  buildRegistry,
  cellText,
  markdownSection,
  markdownTable,
  missingReferences,
  nonTokenCss,
  parseTokens,
  readDesignDirection,
  readTokenCss,
  resolveToken,
} from "./parse-tokens.js";

const css = readTokenCss("radius.css");
const { tokens, reducedMotion } = parseTokens(css);
const { map, duplicates } = buildRegistry(tokens);
const primitives = tokens.filter((t) => t.layer === "primitive");
const semantic = tokens.filter((t) => t.layer === "semantic");
const value = (name) => resolveToken(name, map);

const ROOT_PX = 16;
const ROUND = "--radius-round";

const toPx = (length) => {
  if (length === "0") return 0;
  const rem = length.match(/^([\d.]+)rem$/);
  if (rem) return +rem[1] * ROOT_PX;
  const px = length.match(/^([\d.]+)px$/);
  if (px) return +px[1];
  throw new Error(`Unsupported length: "${length}"`);
};

// --- Design direction (source of truth) ------------------------------------

const radiusSection = markdownSection(readDesignDirection(), "### Radius");

// Base scale rows: step -> { rem, px }. The "Round" row documents "50% / 9999px".
const scaleRows = markdownTable(radiusSection, "#### Base scale", ["Step", "rem", "px"]).map((row) => ({
  step: cellText(row.Step),
  rem: cellText(row.rem),
  px: cellText(row.px),
}));
const steps = scaleRows.filter((row) => row.step !== "Round");
const roundRow = scaleRows.find((row) => row.step === "Round");

const maximum = radiusSection.match(/(\d+)px is the maximum anywhere in the system/);
if (!maximum) throw new Error('"Npx is the maximum anywhere in the system" not found under "### Radius"');
const MAX_PX = +maximum[1];

const exclusions = radiusSection.match(
  /(\d+)px and (\d+)px are intentionally\s+excluded[\s\S]*?and (\d+)px is excluded/
);
if (!exclusions) throw new Error('Excluded radius values sentence not found under "### Radius"');
const EXCLUDED_PX = exclusions.slice(1).map(Number).sort((a, b) => a - b);

// Semantic usage: documented element -> the token it uses, or null when the row
// is a rule rather than a value (media touching a container edge).
const USAGE = {
  "Sections, full-bleed surfaces, dividers, tables inside a card": "--radius-structure",
  "Badges, chips, tags, inline code, chips inside a node": "--radius-badge",
  "Buttons (including the CTA)": "--radius-control",
  "Inputs, selects, textarea": "--radius-control",
  "Nodes and system blocks": "--radius-node",
  Tooltips: "--radius-control",
  Cards: "--radius-container",
  "Elevated surfaces (popover, mobile menu)": "--radius-container",
  "Standalone screenshots and media": "--radius-container",
  "Media touching a container edge": null,
  "Modal / dialog": "--radius-container",
  "Connection ports, status dots, avatar, toggle": ROUND,
};

const usageRows = markdownTable(radiusSection, "#### Semantic usage", [
  "Element",
  "Radius",
  "Shares exactly with",
]).map((row) => {
  const element = cellText(row.Element);
  if (!(element in USAGE)) throw new Error(`Unmapped row in "Semantic usage": "${element}"`);
  return {
    element,
    token: USAGE[element],
    radius: cellText(row.Radius),
    sharesWith: cellText(row["Shares exactly with"]),
  };
});
const valueRows = usageRows.filter((row) => row.token);

// --- Tests ---------------------------------------------------------------------

describe("radius tokens: structure", () => {
  it("declares exactly 5 primitives and 5 semantic tokens", () => {
    expect(primitives).toHaveLength(5);
    expect(semantic).toHaveLength(5);
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
    for (const { name, value: raw } of semantic) expect(raw, name).toMatch(/^var\(--radius-[\w-]+\)$/);
  });

  it("declares nothing but :root custom properties (no global styles)", () => {
    expect(nonTokenCss(css)).toBe("");
  });

  it("has no semantic alias for round", () => {
    for (const { value: raw } of semantic) expect(raw).not.toBe(`var(${ROUND})`);
  });
});

describe("radius tokens: base scale matches DESIGN_DIRECTION.md", () => {
  it("has one primitive per documented step, plus round", () => {
    expect(primitives.map((t) => t.name).sort()).toEqual(
      [...steps.map((row) => `--radius-${row.step}`), ROUND].sort()
    );
  });

  it.each(steps.map((row) => [row.step, row]))("--radius-%s matches its row", (_, { step, rem, px }) => {
    expect(map.get(`--radius-${step}`)).toBe(rem);
    expect(toPx(rem)).toBe(+px);
  });

  it("--radius-round is 9999px, as documented in the Round row", () => {
    expect(roundRow, 'row "Round" in the radius base scale').toBeDefined();
    expect(roundRow.rem.split("/").map((part) => part.trim())).toContain(map.get(ROUND));
    expect(map.get(ROUND)).toBe("9999px");
  });

  it(`never exceeds the documented maximum outside round`, () => {
    expect(MAX_PX).toBe(8);
    const nonRound = primitives.filter((t) => t.name !== ROUND).map((t) => toPx(t.value));
    expect(Math.max(...nonRound)).toBe(MAX_PX);
    for (const { name } of semantic) expect(toPx(value(name)), name).toBeLessThanOrEqual(MAX_PX);
  });

  it("has no excluded radius (6, 12 or 16px) anywhere", () => {
    expect(EXCLUDED_PX).toEqual([6, 12, 16]);
    for (const { name } of tokens) {
      if (name === ROUND) continue;
      expect(EXCLUDED_PX, name).not.toContain(toPx(value(name)));
    }
  });
});

describe("radius tokens: semantic mapping matches DESIGN_DIRECTION.md", () => {
  it("maps every row of the semantic usage table", () => {
    expect(usageRows.map((row) => row.element).sort()).toEqual(Object.keys(USAGE).sort());
  });

  it("defines a semantic token for every non-round documented use", () => {
    const documentedTokens = new Set(valueRows.map((row) => row.token).filter((t) => t !== ROUND));
    expect([...documentedTokens].sort()).toEqual(semantic.map((t) => t.name).sort());
  });

  it.each(valueRows.map((row) => [row.element, row.radius, row]))(
    "%s uses %s",
    (_element, _radius, { token, radius }) => {
      if (radius === "Round") {
        expect(token).toBe(ROUND);
        return;
      }
      expect(toPx(value(token))).toBe(toPx(radius));
    }
  );

  it("documents the media edge rule as a rule, not a value", () => {
    const media = usageRows.find((row) => row.token === null);
    expect(media.element).toBe("Media touching a container edge");
    expect(media.radius).toMatch(/Inherits the container radius/);
  });
});

describe("radius tokens: shared radii", () => {
  it("--radius-node shares exactly with --radius-control", () => {
    const nodes = usageRows.find((row) => row.token === "--radius-node");
    expect(nodes.sharesWith).toBe("Controls");
    expect(map.get("--radius-node")).toBe("var(--radius-control)");
    expect(value("--radius-node")).toBe(value("--radius-control"));
  });

  it("rows that document the same radius resolve to the same value", () => {
    const byRadius = Object.groupBy(valueRows, (row) => row.radius);
    for (const [radius, rows] of Object.entries(byRadius)) {
      const resolved = new Set(rows.map((row) => (row.token === ROUND ? ROUND : value(row.token))));
      expect(resolved.size, `rows documented at ${radius}`).toBe(1);
    }
  });
});
