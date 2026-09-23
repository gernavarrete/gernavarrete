import { readFileSync } from "node:fs";

// Reads a file from src/styles/tokens/.
export const readTokenCss = (fileName) =>
  readFileSync(new URL(`../tokens/${fileName}`, import.meta.url), "utf8");

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
