import { act, render, screen } from "@testing-library/react";
import SystemDiagram from "./SystemDiagram.jsx";
import { heroFlow } from "../../content/heroFlow.js";

// Drives the sequence with a controllable IntersectionObserver and a fake
// Web Animations API, so start, replay and cleanup run for real.
describe("useFlowSequence", () => {
  let observer;
  let animations;

  beforeEach(() => {
    vi.useFakeTimers();
    observer = undefined;
    animations = [];
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback, options) {
          this.callback = callback;
          this.options = options;
          this.connected = true;
          observer = this;
        }
        observe() {}
        disconnect() {
          this.connected = false;
        }
      }
    );
    Element.prototype.animate = function animate() {
      let resolve;
      const animation = {
        finished: new Promise((done) => {
          resolve = done;
        }),
        cancel: vi.fn(),
        finish: () => resolve(),
      };
      animations.push(animation);
      return animation;
    };
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    delete Element.prototype.animate;
  });

  const states = (container) =>
    [...container.querySelectorAll("[data-node]")].map((node) => node.dataset.state);
  const see = (entry) =>
    act(() => {
      observer.callback([{ isIntersecting: true, intersectionRect: { height: 0 }, ...entry }]);
      vi.runAllTimers();
    });

  it("starts after its delay once half of the diagram is visible", () => {
    render(<SystemDiagram flow={heroFlow} startDelay={600} />);
    act(() => {
      observer.callback([{ isIntersecting: true, intersectionRatio: 0.5, intersectionRect: { height: 0 } }]);
      vi.advanceTimersByTime(599);
    });
    expect(animations).toHaveLength(0);
    act(() => vi.advanceTimersByTime(1));
    expect(animations).toHaveLength(heroFlow.edges.length);
  });

  it("starts when a diagram taller than the viewport fills half of it", () => {
    render(<SystemDiagram flow={heroFlow} />);
    expect(observer.options.threshold).toContain(0);
    see({ intersectionRatio: 0.3, intersectionRect: { height: window.innerHeight * 0.5 } });
    expect(animations).toHaveLength(heroFlow.edges.length);
  });

  it("waits while only a sliver is visible", () => {
    render(<SystemDiagram flow={heroFlow} />);
    see({ intersectionRatio: 0.1, intersectionRect: { height: 40 } });
    expect(animations).toHaveLength(0);
  });

  it("advances node states as pulses arrive and rests in the final state", async () => {
    const { container } = render(<SystemDiagram flow={heroFlow} />);
    see({ intersectionRatio: 1 });
    expect(states(container).filter((state) => state === "active")).toHaveLength(1);
    await act(async () => {
      animations.forEach((animation) => animation.finish());
    });
    const final = states(container);
    expect(final.filter((state) => state === "completed")).toHaveLength(heroFlow.nodes.length - 1);
    expect(container.querySelector('[data-node="advisor"]')).toHaveAttribute("data-state", "active");
  });

  it("replays from the start and cancels the running pulses", () => {
    render(<SystemDiagram flow={heroFlow} />);
    see({ intersectionRatio: 1 });
    const first = [...animations];
    act(() => screen.getByRole("button").click());
    first.forEach((animation) => expect(animation.cancel).toHaveBeenCalled());
    expect(animations).toHaveLength(heroFlow.edges.length * 2);
  });

  it("does not restart on visibility after an early replay", () => {
    render(<SystemDiagram flow={heroFlow} />);
    act(() => screen.getByRole("button").click());
    expect(observer.connected).toBe(false);
  });

  it("cancels its pulses when unmounted mid-sequence", () => {
    const { unmount } = render(<SystemDiagram flow={heroFlow} />);
    see({ intersectionRatio: 1 });
    unmount();
    animations.forEach((animation) => expect(animation.cancel).toHaveBeenCalled());
  });
});
