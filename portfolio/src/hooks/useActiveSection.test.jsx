import { act, render, screen } from "@testing-library/react";
import { useActiveSection } from "./useActiveSection.js";

const IDS = ["inicio", "sistemas", "casos"];

function Probe() {
  const active = useActiveSection(IDS);
  return (
    <>
      {IDS.map((id) => (
        <section key={id} id={id} />
      ))}
      <output>{active}</output>
    </>
  );
}

describe("useActiveSection", () => {
  let observers;
  // The reading-line observer has a root margin; the end observer a full threshold.
  const lineObserver = () => observers.find((entry) => entry.options.rootMargin);
  const endObserver = () => observers.find((entry) => entry.options.threshold === 1);

  beforeEach(() => {
    observers = [];
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback, options) {
          this.callback = callback;
          this.options = options;
          this.targets = [];
          observers.push(this);
        }
        observe(target) {
          this.targets.push(target);
        }
        disconnect() {
          this.targets = [];
        }
      }
    );
  });

  afterEach(() => vi.unstubAllGlobals());

  const fire = (observer, id, isIntersecting) =>
    act(() => observer.callback([{ target: document.getElementById(id), isIntersecting }]));
  const cross = (id, isIntersecting = true) => fire(lineObserver(), id, isIntersecting);

  it("starts on the first section and observes every section", () => {
    render(<Probe />);
    expect(screen.getByRole("status")).toHaveTextContent("inicio");
    expect(lineObserver().targets.map((target) => target.id)).toEqual(IDS);
  });

  it("follows the section crossing the reading line", () => {
    render(<Probe />);
    cross("casos");
    expect(screen.getByRole("status")).toHaveTextContent("casos");
    cross("sistemas");
    expect(screen.getByRole("status")).toHaveTextContent("sistemas");
  });

  it("ignores sections leaving the reading line", () => {
    render(<Probe />);
    cross("casos");
    cross("sistemas", false);
    expect(screen.getByRole("status")).toHaveTextContent("casos");
  });

  it("stays on the first section without IntersectionObserver", () => {
    vi.unstubAllGlobals();
    vi.stubGlobal("IntersectionObserver", undefined);
    render(<Probe />);
    expect(screen.getByRole("status")).toHaveTextContent("inicio");
  });

  it("activates the last section once it is fully in view, even above the line", () => {
    render(<Probe />);
    expect(endObserver().targets.map((target) => target.id)).toEqual(["casos"]);
    cross("sistemas");
    fire(endObserver(), "casos", true);
    expect(screen.getByRole("status")).toHaveTextContent("casos");
  });

  it("returns to the section on the line when the last one leaves full view", () => {
    render(<Probe />);
    cross("sistemas");
    fire(endObserver(), "casos", true);
    fire(endObserver(), "casos", false);
    expect(screen.getByRole("status")).toHaveTextContent("sistemas");
  });
});
