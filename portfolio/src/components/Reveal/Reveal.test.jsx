import { act, render, screen } from "@testing-library/react";
import Reveal from "./Reveal.jsx";

// §7 "Scroll reveal": supporting groups only, once, and progressive
// enhancement — hidden only with JS, without reduced motion, outside the
// viewport at mount, and never when reached through an anchor.
describe("Reveal", () => {
  let observer;
  const below = () =>
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({ top: 2000, bottom: 2300 });

  const renderGroup = () =>
    render(
      <section id="casos">
        <Reveal>
          <p>Grupo</p>
        </Reveal>
      </section>
    );
  const group = () => screen.getByText("Grupo").parentElement;

  beforeEach(() => {
    observer = undefined;
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback, options) {
          this.callback = callback;
          this.options = options;
          observer = this;
        }
        observe() {}
        unobserve() {}
        disconnect() {}
      }
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    window.history.replaceState(null, "", "/");
  });

  it("keeps content visible without IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    below();
    renderGroup();
    expect(group()).not.toHaveAttribute("data-reveal");
  });

  it("keeps content visible under reduced motion", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    below();
    renderGroup();
    expect(group()).not.toHaveAttribute("data-reveal");
  });

  it("keeps content visible when it is already in view", () => {
    vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({ top: 100, bottom: 300 });
    renderGroup();
    expect(group()).not.toHaveAttribute("data-reveal");
  });

  it("hides a group below the fold and reveals it once 15% is visible", () => {
    below();
    renderGroup();
    expect(group()).toHaveAttribute("data-reveal", "hidden");
    expect(observer.options.threshold).toBe(0.15);
    act(() => observer.callback([{ isIntersecting: true, target: group() }]));
    expect(group()).toHaveAttribute("data-reveal", "shown");
  });

  it("shows the group directly when its section is reached through an anchor", () => {
    below();
    renderGroup();
    act(() => {
      window.history.replaceState(null, "", "#casos");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(group()).not.toHaveAttribute("data-reveal");
  });

  it("never hides a group whose section is the initial anchor", () => {
    window.history.replaceState(null, "", "#casos");
    below();
    renderGroup();
    expect(group()).not.toHaveAttribute("data-reveal");
  });

  it("shows the group directly when keyboard focus enters it", () => {
    below();
    render(
      <Reveal>
        <a href="#x">Grupo</a>
      </Reveal>
    );
    const node = screen.getByText("Grupo").parentElement;
    expect(node).toHaveAttribute("data-reveal", "hidden");
    act(() => screen.getByText("Grupo").focus());
    expect(node).not.toHaveAttribute("data-reveal");
  });
});
