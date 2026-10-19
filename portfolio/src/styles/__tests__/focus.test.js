// @vitest-environment node
import { readFileSync } from "node:fs";

// §5 radius / §7 focus: one visible, instant, amber focus ring with a 2px
// offset for every interactive element.
const css = readFileSync(new URL("../../index.css", import.meta.url), "utf8");

describe("focus ring", () => {
  const rule = css.match(/([^{}]*:focus-visible[^{}]*)\{([^}]*)\}/);

  it("is defined globally for keyboard focus", () => {
    expect(rule).not.toBeNull();
    for (const target of ["a", "button", "summary"]) expect(rule[1]).toContain(target);
  });

  it("is a 2px amber outline with a 2px offset", () => {
    expect(rule[2]).toMatch(/outline:\s*2px solid var\(--color-focus-ring\)/);
    expect(rule[2]).toMatch(/outline-offset:\s*2px/);
  });

  it("is never animated", () => {
    expect(rule[2]).not.toMatch(/transition/);
  });
});
