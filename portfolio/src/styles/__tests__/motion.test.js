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

const css = readTokenCss("motion.css");
const { tokens, reducedMotion } = parseTokens(css);
const primitives = tokens.filter((t) => t.layer === "primitive");
const semantic = tokens.filter((t) => t.layer === "semantic");

// Distances point to spacing primitives, so resolution also needs spacing.css.
const spacingTokens = parseTokens(readTokenCss("spacing.css")).tokens;
const { map: ownMap, duplicates } = buildRegistry(tokens);
const { map } = buildRegistry([...tokens, ...spacingTokens]);
const value = (name) => resolveToken(name, map);

// The same registry with the reduced-motion overrides applied.
const reducedMap = new Map(map);
for (const { name, value: raw } of reducedMotion) reducedMap.set(name, raw);
const reducedValue = (name) => resolveToken(name, reducedMap);

const ROOT_PX = 16;
const ms = (duration) => {
  const match = duration.match(/^(\d+)ms$/);
  if (!match) throw new Error(`Expected a duration in ms, found "${duration}"`);
  return +match[1];
};
const px = (length) => {
  if (length === "0") return 0;
  const match = length.match(/^([\d.]+)rem$/);
  if (!match) throw new Error(`Expected a rem length, found "${length}"`);
  return +match[1] * ROOT_PX;
};
const mustMatch = (text, pattern, what) => {
  const match = text.match(pattern);
  if (!match) throw new Error(`${what} not found in DESIGN_DIRECTION.md`);
  return match;
};

// --- Design direction (source of truth) ------------------------------------

const motionSection = markdownSection(readDesignDirection(), "## 7. Motion");

// Duration scale: name -> ms, in documented order.
const durationRows = markdownTable(motionSection, "### Duration scale", ["Duration", "Name"]).map((row) => ({
  name: cellText(row.Name),
  ms: ms(cellText(row.Duration)),
}));
const durationByName = Object.fromEntries(durationRows.map((row) => [row.name, row.ms]));
const previousStep = (duration) => {
  const index = durationRows.findIndex((row) => row.ms === duration);
  if (index < 1) throw new Error(`No previous step for ${duration}ms`);
  return durationRows[index - 1].ms;
};
mustMatch(motionSection, /\*\*Exits use the previous step\*\*/, '"Exits use the previous step"');

// Easing table: curve label -> { value, use }.
const easings = Object.fromEntries(
  markdownTable(motionSection, "### Easing", ["Curve", "Value", "Use"]).map((row) => [
    cellText(row.Curve),
    { value: cellText(row.Value), use: cellText(row.Use) },
  ])
);

// Documented translate distances.
const usage = Object.fromEntries(
  markdownTable(motionSection, "### Semantic usage", ["Category", "What animates"]).map((row) => [
    cellText(row.Category),
    cellText(row["What animates"]),
  ])
);
const scrollReveal = Object.fromEntries(
  markdownTable(motionSection, "### Scroll reveal", ["Rule", "Value"]).map((row) => [
    cellText(row.Rule),
    cellText(row.Value),
  ])
);
const translatePx = (text, what) => +mustMatch(text ?? "", /translateY\)?\s*[−-]?(\d+)px|(\d+)px \(translateY\)/, what).slice(1).find(Boolean);

// Reduced motion table: the documented rules each override relies on.
const reducedRows = markdownTable(motionSection, "### Reduced motion", ["Removed (shown in final state)", "Kept"]);
const removed = reducedRows.map((row) => cellText(row["Removed (shown in final state)"])).filter(Boolean);
const kept = reducedRows.map((row) => cellText(row.Kept)).filter(Boolean);
const [, instantMs] = mustMatch(kept.join("\n"), /color and border changes, instant \((\d+)ms\)/, '"instant (Nms)" color changes');
const [, crossfadeCapMs] = mustMatch(kept.join("\n"), /Opacity crossfades ≤ (\d+)ms/, '"Opacity crossfades ≤ Nms"');

// --- Approved mapping: token -> documented source ------------------------------

const PRIMITIVE_EASING = {
  "--ease-decelerate": "Standard (decelerate)",
  "--ease-accelerate": "Exit (accelerate)",
  "--ease-in-out": "Move (in-out)",
  "--ease-linear": "Linear",
};

// Semantic duration -> documented scale name, or the step before another token.
const SEMANTIC_DURATION = {
  "--duration-feedback": { name: "Feedback" },
  "--duration-state": { name: "Micro" },
  "--duration-crossfade": { name: "Micro" },
  "--duration-crossfade-exit": { exitOf: "--duration-crossfade" },
  "--duration-component": { name: "Component" },
  "--duration-component-exit": { exitOf: "--duration-component" },
  "--duration-reveal": { name: "Reveal" },
  "--duration-flow": { name: "Flow step" },
};

const SEMANTIC_EASING = {
  "--ease-standard": "--ease-decelerate",
  "--ease-exit": "--ease-accelerate",
  "--ease-move": "--ease-in-out",
  "--ease-progress": "--ease-linear",
};

// Distance -> documented translate.
const DISTANCES = {
  "--motion-reveal-distance": translatePx(scrollReveal["Maximum translate"], "Scroll reveal maximum translate"),
  "--motion-menu-distance": translatePx(usage["Mobile menu"], "Mobile menu translate"),
  "--motion-modal-distance": translatePx(usage["Modal / dialog"], "Modal / dialog translate"),
  "--motion-popover-distance": translatePx(usage.Popovers, "Popovers translate"),
};

// Reduced motion: every override, the documented rule behind it, and its target.
// "removed" -> 0; "instant" -> the documented instant value; "crossfade" -> the
// documented crossfade cap.
const REDUCED_MOTION = {
  "--duration-feedback": { rule: kept, phrase: "color and border changes, instant", to: "instant" },
  "--duration-state": { rule: removed, phrase: "All translate and rotate", to: "removed" },
  "--duration-crossfade": { rule: kept, phrase: "Opacity crossfades", to: "crossfade" },
  "--duration-component": { rule: kept, phrase: "Menu, modal and popover open/close, without translate", to: "crossfade" },
  "--duration-component-exit": { rule: kept, phrase: "Menu, modal and popover open/close, without translate", to: "crossfade" },
  "--duration-reveal": { rule: removed, phrase: "Scroll reveals", to: "removed" },
  "--duration-flow": { rule: removed, phrase: "Edge pulses and diagram sequences", to: "removed" },
  "--motion-reveal-distance": { rule: removed, phrase: "All translate and rotate", to: "removed" },
  "--motion-menu-distance": { rule: removed, phrase: "All translate and rotate", to: "removed" },
  "--motion-modal-distance": { rule: removed, phrase: "All translate and rotate", to: "removed" },
  "--motion-popover-distance": { rule: removed, phrase: "All translate and rotate", to: "removed" },
};
const targetMs = { removed: 0, instant: +instantMs, crossfade: +crossfadeCapMs };

// --- Tests ---------------------------------------------------------------------

describe("motion tokens: structure", () => {
  it("declares exactly 10 primitives, 16 semantic tokens and 11 reduced-motion overrides", () => {
    expect(primitives).toHaveLength(10);
    expect(semantic).toHaveLength(16);
    expect(reducedMotion).toHaveLength(11);
  });

  it("defines exactly the approved semantic tokens (no --duration-instant, no extras)", () => {
    expect(semantic.map((t) => t.name).sort()).toEqual(
      [...Object.keys(SEMANTIC_DURATION), ...Object.keys(SEMANTIC_EASING), ...Object.keys(DISTANCES)].sort()
    );
    expect(ownMap.has("--duration-instant")).toBe(false);
  });

  it("has no duplicated custom properties", () => {
    expect(duplicates).toEqual([]);
  });

  it("has no var() pointing to a missing token", () => {
    expect(missingReferences(map)).toEqual([]);
    expect(missingReferences(reducedMap)).toEqual([]);
  });

  it("resolves every token without cycles, with and without reduced motion", () => {
    for (const { name } of tokens) {
      expect(() => value(name)).not.toThrow();
      expect(() => reducedValue(name)).not.toThrow();
    }
  });

  it("uses var() for every semantic token and every override, never a literal", () => {
    for (const { name, value: raw } of [...semantic, ...reducedMotion]) {
      expect(raw, name).toMatch(/^var\(--[\w-]+\)$/);
    }
  });

  it("declares nothing but custom properties (no utilities, classes or global styles)", () => {
    expect(nonTokenCss(css)).toBe("");
  });

  it("has no breakpoint token", () => {
    for (const { name } of tokens) expect(name).not.toMatch(/breakpoint|\bbp\b|-bp-|media|threshold/);
  });
});

describe("motion tokens: primitives match DESIGN_DIRECTION.md", () => {
  it("has one duration primitive per documented duration", () => {
    const durationPrimitives = primitives.filter((t) => t.name.startsWith("--duration-"));
    expect(durationPrimitives.map((t) => t.name).sort()).toEqual(
      durationRows.map((row) => `--duration-${row.ms}`).sort()
    );
    for (const row of durationRows) expect(ownMap.get(`--duration-${row.ms}`)).toBe(`${row.ms}ms`);
  });

  it.each(Object.entries(PRIMITIVE_EASING))("%s is the documented %s curve", (name, curve) => {
    expect(easings[curve], `easing row "${curve}"`).toBeDefined();
    expect(ownMap.get(name)).toBe(easings[curve].value);
  });

  it("uses no overshoot, bounce or elastic curve (every control point stays in 0–1)", () => {
    for (const { name, value: raw } of primitives.filter((t) => t.name.startsWith("--ease-"))) {
      const points = raw.match(/^cubic-bezier\((.*)\)$/)?.[1].split(",").map(Number) ?? [];
      for (const point of points) {
        expect(point, name).toBeGreaterThanOrEqual(0);
        expect(point, name).toBeLessThanOrEqual(1);
      }
    }
  });
});

describe("motion tokens: semantic mapping matches DESIGN_DIRECTION.md", () => {
  it.each(Object.entries(SEMANTIC_DURATION))("%s", (name, source) => {
    const expected = source.name ? durationByName[source.name] : previousStep(ms(value(source.exitOf)));
    expect(expected, `documented duration for ${name}`).toBeDefined();
    expect(ownMap.get(name)).toBe(`var(--duration-${expected})`);
  });

  it.each(Object.entries(SEMANTIC_EASING))("%s points to %s", (name, primitive) => {
    expect(ownMap.get(name)).toBe(`var(${primitive})`);
  });

  it("uses linear only for continuous progress", () => {
    expect(easings.Linear.use).toMatch(/^Continuous progress only/);
    const linearUsers = semantic.filter((t) => t.value === "var(--ease-linear)").map((t) => t.name);
    expect(linearUsers).toEqual(["--ease-progress"]);
  });

  it.each(Object.entries(DISTANCES))("%s resolves to the documented %spx", (name, documentedPx) => {
    expect(ownMap.get(name)).toMatch(/^var\(--space-\d+\)$/);
    expect(px(value(name))).toBe(documentedPx);
  });
});

describe("motion tokens: reduced motion", () => {
  const overridden = reducedMotion.map((t) => t.name);

  it("overrides exactly the approved semantic tokens, and no primitive", () => {
    expect([...overridden].sort()).toEqual(Object.keys(REDUCED_MOTION).sort());
    for (const name of overridden) {
      expect(primitives.map((t) => t.name), name).not.toContain(name);
      expect(semantic.map((t) => t.name), name).toContain(name);
    }
  });

  it("leaves --duration-crossfade-exit out: it already meets the documented crossfade cap", () => {
    expect(overridden).not.toContain("--duration-crossfade-exit");
    expect(ms(value("--duration-crossfade-exit"))).toBeLessThanOrEqual(+crossfadeCapMs);
    expect(reducedValue("--duration-crossfade-exit")).toBe(value("--duration-crossfade-exit"));
  });

  it.each(Object.entries(REDUCED_MOTION))("%s follows its documented rule", (name, { rule, phrase, to }) => {
    expect(rule.some((cell) => cell.includes(phrase)), `reduced-motion rule "${phrase}"`).toBe(true);
    const resolved = reducedValue(name);
    const actual = name.startsWith("--duration-") ? ms(resolved) : px(resolved);
    expect(actual).toBe(targetMs[to]);
  });

  it("never changes a primitive under reduced motion", () => {
    for (const { name } of primitives) expect(reducedValue(name)).toBe(value(name));
  });
});
