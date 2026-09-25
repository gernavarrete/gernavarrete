import { readFileSync, readdirSync } from "node:fs";

// Guard against unscoped element selectors in component CSS. Plain CSS files and
// element selectors inside CSS Modules are global: a bare `p { ... }` in one
// component styles every paragraph of the app. This is a minimal tokenizer, not a
// full CSS parser: it only extracts rule selectors and checks their scope.

const COMPONENTS_DIR = new URL("../../components/", import.meta.url);

// Reads every .css file under src/components/, keyed by its path relative to it.
export function readComponentCss() {
  return readdirSync(COMPONENTS_DIR, { recursive: true })
    .filter((file) => file.endsWith(".css"))
    .sort()
    .map((file) => ({ file, css: readFileSync(new URL(file, COMPONENTS_DIR), "utf8") }));
}

// At-rules whose blocks hold no selectors (keyframe steps, descriptors).
const OPAQUE_AT_RULE = /^@(-[a-z]+-)?(keyframes|font-face|page|property)\b/i;

// Returns every rule as { selector, line, parents }. `parents` holds the selectors
// of enclosing rules (CSS nesting); at-rules such as @media, @supports,
// @container and @layer are transparent. Comments are blanked out and strings
// are skipped, so neither can produce a rule.
export function extractRules(css) {
  const src = css.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, " "));
  const rules = [];
  const stack = [];
  let start = 0;
  for (let i = 0; i < src.length; i++) {
    const char = src[i];
    if (char === '"' || char === "'") {
      i = stringEnd(src, i);
    } else if (char === ";") {
      start = i + 1;
    } else if (char === "}") {
      stack.pop();
      start = i + 1;
    } else if (char === "{") {
      const raw = src.slice(start, i);
      const prelude = raw.trim();
      const opaque = stack.some((block) => block.opaque);
      if (prelude.startsWith("@")) {
        stack.push({ rule: false, opaque: opaque || OPAQUE_AT_RULE.test(prelude) });
      } else {
        const selector = prelude.replace(/\s+/g, " ");
        if (!opaque) {
          const leading = raw.length - raw.trimStart().length;
          const line = src.slice(0, start + leading).split("\n").length;
          const parents = stack.filter((block) => block.rule).map((block) => block.selector);
          rules.push({ selector, line, parents });
        }
        stack.push({ rule: true, opaque, selector });
      }
      start = i + 1;
    }
  }
  return rules;
}

// Returns the index of the quote that closes the string opened at `start`,
// honoring backslash escapes, or the last index if the string never closes.
function stringEnd(text, start) {
  const quote = text[start];
  for (let i = start + 1; i < text.length; i++) {
    if (text[i] === "\\") i++;
    else if (text[i] === quote) return i;
  }
  return text.length - 1;
}

// Splits a selector list on top-level commas (ignoring commas inside (), [] and
// strings). Brackets inside strings do not change the depth.
export function splitSelectorList(list) {
  const parts = [];
  let depth = 0;
  let current = "";
  for (let i = 0; i < list.length; i++) {
    const char = list[i];
    if (char === '"' || char === "'") {
      const end = stringEnd(list, i);
      current += list.slice(i, end + 1);
      i = end;
      continue;
    }
    if (char === "(" || char === "[") depth++;
    if (char === ")" || char === "]") depth--;
    if (char === "," && depth === 0) {
      parts.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  parts.push(current);
  return parts.map((part) => part.trim()).filter(Boolean);
}

const stripStringsAndAttributes = (selector) =>
  selector.replace(/"[^"]*"|'[^']*'/g, '""').replace(/\[[^\]]*\]/g, "");

// A complex selector is scoped when it contains a class or an id. Content of
// :not(), :has() and any other functional pseudo-class never counts; :is() and
// :where() count only when every branch is scoped.
export function isScoped(selector) {
  let rest = stripStringsAndAttributes(selector);
  const functional = /:([a-z-]+)\(/i;
  let match;
  while ((match = functional.exec(rest))) {
    const open = match.index + match[0].length;
    let depth = 1;
    let close = open;
    while (close < rest.length && depth > 0) {
      if (rest[close] === "(") depth++;
      if (rest[close] === ")") depth--;
      close++;
    }
    const name = match[1].toLowerCase();
    const inner = rest.slice(open, close - 1);
    const passThrough = name === "is" || name === "where";
    const counts = passThrough && splitSelectorList(inner).every(isScoped);
    rest = rest.slice(0, match.index) + (counts ? ".scoped" : "") + rest.slice(close);
  }
  return /[.#]-?[_a-zA-Z\\]/.test(rest);
}

const ROOT_ELEMENT = /(^|[\s>+~,(])(html|body|:root)(?![\w-])/i;
const GLOBAL = /:global\b/i;

// Returns the reason a single complex selector is rejected, or null.
export function selectorViolation(selector) {
  if (GLOBAL.test(selector)) return ":global() is not allowed in component CSS";
  if (ROOT_ELEMENT.test(stripStringsAndAttributes(selector))) return "html, body and :root belong to the base layer";
  if (!isScoped(selector)) return "no class or id scopes this selector";
  return null;
}

// Returns every violation in a stylesheet as { line, selector, reason }. Nested
// rules inherit scope from their parent rule when every parent branch is scoped.
export function findViolations(css) {
  const violations = [];
  for (const { selector, line, parents } of extractRules(css)) {
    const parent = parents.at(-1);
    const inheritsScope = parent !== undefined && splitSelectorList(parent).every(isScoped);
    for (const branch of splitSelectorList(selector)) {
      let reason = selectorViolation(branch);
      if (reason === "no class or id scopes this selector" && inheritsScope) reason = null;
      if (reason) violations.push({ line, selector: branch, reason });
    }
  }
  return violations;
}
