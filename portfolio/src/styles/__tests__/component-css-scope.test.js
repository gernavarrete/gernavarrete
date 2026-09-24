// @vitest-environment node
import { extractRules, findViolations, readComponentCss } from "./css-scope.js";

const selectorsOf = (css) => findViolations(css).map((violation) => violation.selector);
const passes = (selector) => findViolations(`${selector} { color: red; }`).length === 0;

describe("component CSS scope guard", () => {
  it("has no unscoped element selectors in src/components/**/*.css", () => {
    const files = readComponentCss();
    expect(files.length).toBeGreaterThan(0);
    const report = files.flatMap(({ file, css }) =>
      findViolations(css).map(({ line, selector, reason }) => `${file}:${line}  "${selector}"  (${reason})`),
    );
    expect(
      report,
      `Unscoped selectors in component CSS:\n  ${report.join("\n  ")}\n` +
        'Scope each selector with a component class, e.g. ":where(.main-div-sobremi) p".',
    ).toEqual([]);
  });
});

describe("allowed selectors", () => {
  it.each([
    ".NavBarContainer p",
    ".div-text-section1 h1",
    ":where(.main-div-sobremi) p",
    ".foo > p",
    ".foo + p",
    ".foo ~ li",
    ".foo h3:hover",
    ".foo::before",
    ".foo p::after",
    ".foo[data-x] a",
    "input.field",
    ".foo *",
    "p .foo",
    ":is(.a, .b) p",
    "#app-shell p",
  ])("%s", (selector) => {
    expect(passes(selector)).toBe(true);
  });
});

describe("rejected selectors", () => {
  it.each([
    "p",
    "h3:hover",
    "a",
    "button",
    "img",
    "ul li",
    "div > p",
    "p::before",
    "::selection",
    "*",
    "* + *",
    '[type="button"]',
    "input[type=text]",
    "p:not(.x)",
    "div:has(.x) p",
    ":is(.a, p) span",
    ":where(p) span",
    ":first-child p",
    ":hover",
    "p:nth-child(2)",
    "html",
    "body",
    ":root",
    "html .foo",
    "body p",
    ":global(p)",
    ":global(.foo) p",
  ])("%s", (selector) => {
    expect(passes(selector)).toBe(false);
  });
});

describe("regressions: selectors that leaked before Sprint 01B", () => {
  it.each(["p", "h3", "h3:hover"])("%s", (selector) => {
    expect(passes(selector)).toBe(false);
  });
});

describe("tokenizer edge cases", () => {
  it("checks each branch of a selector list", () => {
    expect(selectorsOf(".foo p, p { color: red; }")).toEqual(["p"]);
  });

  it("ignores comments and strings", () => {
    const css = '/* p { color: red; } */\n.foo::before { content: "p { }"; }';
    expect(findViolations(css)).toEqual([]);
  });

  it("reads selectors split across lines and reports their first line", () => {
    const css = ".foo {\n  color: red;\n}\n\n.NavBarContainer\n    p {\n  color: red;\n}\n\nh3\n  :hover { color: red; }";
    expect(extractRules(css).map(({ selector, line }) => [selector, line])).toEqual([
      [".foo", 1],
      [".NavBarContainer p", 5],
      ["h3 :hover", 10],
    ]);
  });

  it("checks rules inside @media, @supports, @container and @layer", () => {
    const css =
      "@media (max-width: 48em) { .foo p { } p { } }" +
      "@supports (display: grid) { h1 { } }" +
      "@container (min-width: 30em) { li { } }" +
      "@layer legacy { a { } }";
    expect(selectorsOf(css)).toEqual(["p", "h1", "li", "a"]);
  });

  it("ignores @keyframes, @font-face, @page and @property blocks", () => {
    const css =
      "@keyframes fade { from { opacity: 0; } 50% { opacity: 0.5; } to { opacity: 1; } }" +
      '@font-face { font-family: "X"; src: url("x{y}.woff2"); }' +
      "@page { margin: 1cm; }" +
      "@property --angle { syntax: '<angle>'; inherits: false; initial-value: 0deg; }";
    expect(findViolations(css)).toEqual([]);
  });

  it("lets nested rules inherit scope from their parent rule", () => {
    const css = ".card { color: red; p { color: red; } & > h3 { color: red; } } p { .x { color: red; } }";
    expect(selectorsOf(css)).toEqual(["p"]);
  });

  it("still rejects :global() and root elements inside a scoped parent", () => {
    const css = ".card { :global(.x) { } body { } }";
    expect(selectorsOf(css)).toEqual([":global(.x)", "body"]);
  });
});
