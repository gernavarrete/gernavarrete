import { act, render } from "@testing-library/react";
import PointerAccent from "./PointerAccent.jsx";

// §7 "Pointer accent": fine pointer only, never under reduced motion,
// transform only, idle while the pointer is still.
function stubMedia({ fine, reduced }) {
  vi.stubGlobal("matchMedia", (query) => ({
    matches: query.includes("pointer: fine") ? fine : query.includes("reduce") ? reduced : false,
  }));
}

function move(x, y, pointerType = "mouse") {
  act(() => {
    window.dispatchEvent(Object.assign(new Event("pointermove"), { clientX: x, clientY: y, pointerType }));
  });
}

describe("PointerAccent", () => {
  let frames;

  beforeEach(() => {
    frames = [];
    vi.stubGlobal("requestAnimationFrame", (callback) => frames.push(callback));
    vi.stubGlobal("cancelAnimationFrame", () => {});
  });

  afterEach(() => vi.unstubAllGlobals());

  const runFrames = (limit = 500) => {
    let count = 0;
    while (frames.length && count < limit) {
      const callback = frames.shift();
      act(() => callback(count * 16));
      count += 1;
    }
    return count;
  };

  it("renders nothing without a fine pointer", () => {
    stubMedia({ fine: false, reduced: false });
    const { container } = render(<PointerAccent />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing under reduced motion", () => {
    stubMedia({ fine: true, reduced: true });
    const { container } = render(<PointerAccent />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a hidden, non-interactive layer with a ring and four trail points", () => {
    stubMedia({ fine: true, reduced: false });
    const { container } = render(<PointerAccent />);
    const layer = container.firstChild;
    expect(layer).toHaveAttribute("aria-hidden", "true");
    expect(layer.querySelectorAll("[data-ring]")).toHaveLength(1);
    expect(layer.querySelectorAll("[data-trail]")).toHaveLength(4);
  });

  it("stays idle until the mouse moves", () => {
    stubMedia({ fine: true, reduced: false });
    render(<PointerAccent />);
    expect(frames).toHaveLength(0);
    move(100, 100);
    expect(frames).toHaveLength(1);
  });

  it("ignores touch and pen input", () => {
    stubMedia({ fine: true, reduced: false });
    render(<PointerAccent />);
    move(100, 100, "touch");
    move(100, 100, "pen");
    expect(frames).toHaveLength(0);
  });

  it("moves with transforms and stops once the trail settles", () => {
    stubMedia({ fine: true, reduced: false });
    const { container } = render(<PointerAccent />);
    move(120, 80);
    const count = runFrames();
    expect(count).toBeLessThan(500);
    expect(frames).toHaveLength(0);
    const ring = container.querySelector("[data-ring]");
    expect(ring.style.transform).toMatch(/translate\(120(\.0+)?px, 80(\.0+)?px\)/);
  });
});
