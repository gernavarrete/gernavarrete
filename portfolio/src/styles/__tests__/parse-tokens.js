import { readFileSync } from "node:fs";

// Reads a file from src/styles/tokens/.
export const readTokenCss = (fileName) =>
  readFileSync(new URL(`../tokens/${fileName}`, import.meta.url), "utf8");

// Reads docs/DESIGN_DIRECTION.md, the source of truth for every token value.
export const readDesignDirection = () =>
  readFileSync(new URL("../../../../docs/DESIGN_DIRECTION.md", import.meta.url), "utf8");

// --- Markdown tables (only what the token tests need) -------------------------

const headingLevel = (line) => line.match(/^(#{1,6})\s/)?.[1].length ?? 0;

// Returns the lines under `heading` up to the next heading of the same or a
// higher level. `heading` is the full heading line, e.g. "### Color".
export function markdownSection(markdown, heading) {
  const lines = markdown.split("\n");
  const start = lines.findIndex((line) => line.trim() === heading);
  if (start === -1) throw new Error(`Heading not found: "${heading}"`);
  const level = headingLevel(heading);
  const end = lines.findIndex((line, i) => i > start && headingLevel(line) > 0 && headingLevel(line) <= level);
  return lines.slice(start, end === -1 ? undefined : end).join("\n");
}

// Parses the first table under `heading` into row objects keyed by header text.
// Throws with a clear message if the heading, the table or a column is missing.
export function markdownTable(markdown, heading, expectedColumns) {
  const tableLines = markdownSection(markdown, heading)
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("|"));
  if (tableLines.length < 3) throw new Error(`No table found under "${heading}"`);
  const cellsOf = (line) => line.slice(1, -1).split("|").map((cell) => cell.trim());
  const header = cellsOf(tableLines[0]);
  const missing = expectedColumns.filter((column) => !header.includes(column));
  if (missing.length) {
    throw new Error(`Table under "${heading}" is missing ${missing.join(", ")}; found ${header.join(", ")}`);
  }
  return tableLines
    .slice(2)
    .map((line) => Object.fromEntries(cellsOf(line).map((cell, i) => [header[i], cell])));
}

// Plain text of a table cell, without Markdown emphasis or code marks.
export const cellText = (cell) => cell.replace(/[*`]/g, "").trim();

// Lines of the first fenced code block under `heading`.
export function markdownCodeBlock(markdown, heading) {
  const lines = markdownSection(markdown, heading).split("\n");
  const open = lines.findIndex((line) => line.trim().startsWith("```"));
  const close = lines.findIndex((line, i) => i > open && line.trim().startsWith("```"));
  if (open === -1 || close === -1) throw new Error(`No code block found under "${heading}"`);
  return lines.slice(open + 1, close).filter((line) => line.trim());
}

// Evaluates a fluid "clamp(Arem, Brem + Cvw, Drem)" value, in px, at a viewport width.
export function clampAt(value, viewportPx, rootPx = 16) {
  const match = value.match(
    /^clamp\(\s*([\d.]+)rem\s*,\s*([\d.]+)rem\s*\+\s*([\d.]+)vw\s*,\s*([\d.]+)rem\s*\)$/
  );
  if (!match) throw new Error(`Unsupported clamp(): ${value}`);
  const [min, base, slope, max] = match.slice(1).map(Number);
  const preferred = base * rootPx + (slope * viewportPx) / 100;
  return Math.min(max * rootPx, Math.max(min * rootPx, preferred));
}

// Values of a grouped cell: "16.89 / 15.88 / 14.52" -> ["16.89", "15.88", "14.52"].
// A trailing ":1" is dropped, so "9.47:1" -> ["9.47"].
export const cellValues = (cell) =>
  cellText(cell)
    .split("/")
    .map((part) => part.trim().replace(/:1$/, ""));

const REDUCED_MOTION = /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*\{/;
// A :root block, optionally preceded by a single comment used as its layer label.
const ROOT_BLOCK = /(?:\/\*((?:(?!\*\/)[\s\S])*)\*\/\s*)?:root\s*\{([^}]*)\}/g;
const DECLARATION = /(--[\w-]+)\s*:\s*([^;]+);/g;
const VAR_REF = /var\(\s*(--[\w-]+)\s*\)/g;

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");

const declarationsOf = (body, layer) =>
  [...stripComments(body).matchAll(DECLARATION)].map(([, name, value]) => ({
    name,
    value: value.trim(),
    layer,
  }));

// Removes every reduced-motion @media block (brace-matched) and returns its bodies.
function splitReducedMotion(css) {
  let rest = css;
  const blocks = [];
  let match;
  while ((match = REDUCED_MOTION.exec(rest))) {
    const start = match.index + match[0].length;
    let depth = 1;
    let i = start;
    while (depth > 0 && i < rest.length) {
      if (rest[i] === "{") depth++;
      if (rest[i] === "}") depth--;
      i++;
    }
    blocks.push(rest.slice(start, i - 1));
    rest = rest.slice(0, match.index) + rest.slice(i);
  }
  return { rest, blocks };
}

/*
 * Parses token declarations from a token CSS file.
 * Every top-level :root block must be labeled with a "Primitives" or "Semantic"
 * comment. Declarations inside a prefers-reduced-motion block are returned
 * separately, since they override tokens instead of defining them.
 */
export function parseTokens(css) {
  const { rest, blocks } = splitReducedMotion(css);
  const tokens = [];
  for (const [, comment = "", body] of rest.matchAll(ROOT_BLOCK)) {
    const label = comment.trim().split(/\s+/)[0].toLowerCase();
    if (label !== "primitives" && label !== "semantic") {
      throw new Error('Each :root block needs a "Primitives" or "Semantic" comment');
    }
    tokens.push(...declarationsOf(body, label === "primitives" ? "primitive" : "semantic"));
  }
  const reducedMotion = blocks.flatMap((block) =>
    [...block.matchAll(/:root\s*\{([^}]*)\}/g)].flatMap(([, body]) =>
      declarationsOf(body, "reduced-motion")
    )
  );
  return { tokens, reducedMotion };
}

// Returns the CSS left after removing comments and every :root / reduced-motion
// block, so tests can assert a token file declares nothing else.
export function nonTokenCss(css) {
  const { rest } = splitReducedMotion(stripComments(css));
  return rest.replace(/:root\s*\{[^}]*\}/g, "").trim();
}

// Builds a name -> value map and reports names declared more than once.
export function buildRegistry(tokens) {
  const map = new Map();
  const duplicates = [];
  for (const { name, value } of tokens) {
    if (map.has(name)) duplicates.push(name);
    else map.set(name, value);
  }
  return { map, duplicates };
}

export const referencesOf = (value) => [...value.matchAll(VAR_REF)].map(([, ref]) => ref);

// Names referenced through var() that are not defined in the registry.
export const missingReferences = (map) =>
  [...map.values()].flatMap(referencesOf).filter((ref) => !map.has(ref));

// Resolves a token to its final value, following var() recursively.
// Throws on unknown references and on cycles.
export function resolveToken(name, map, chain = []) {
  if (chain.includes(name)) throw new Error(`Cycle: ${[...chain, name].join(" -> ")}`);
  if (!map.has(name)) throw new Error(`Unknown token: ${name}`);
  return map
    .get(name)
    .replace(VAR_REF, (_, ref) => resolveToken(ref, map, [...chain, name]));
}
