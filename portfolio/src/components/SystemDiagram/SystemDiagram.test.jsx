import { render, screen, within } from "@testing-library/react";
import SystemDiagram from "./SystemDiagram.jsx";
import { heroFlow } from "../../content/heroFlow.js";

const finalStates = (container) =>
  [...container.querySelectorAll("[data-node]")].map((node) => [
    node.dataset.node,
    node.dataset.state,
  ]);

describe("SystemDiagram", () => {
  it("exposes the diagram as one image with a text summary", () => {
    render(<SystemDiagram flow={heroFlow} />);
    expect(screen.getByRole("img", { name: heroFlow.summary })).toBeInTheDocument();
  });

  it("renders every node with its type and name", () => {
    const { container } = render(<SystemDiagram flow={heroFlow} />);
    for (const node of heroFlow.nodes) {
      const element = container.querySelector(`[data-node="${node.id}"]`);
      expect(element).toHaveTextContent(node.type);
      expect(element).toHaveTextContent(node.name);
    }
  });

  it("offers the flow as text steps", () => {
    render(<SystemDiagram flow={heroFlow} />);
    const steps = screen.getByText(heroFlow.labels.steps).closest("details");
    expect(within(steps).getAllByRole("listitem")).toHaveLength(heroFlow.steps.length);
  });

  it("shows the final state without a replay control when motion is unavailable", () => {
    const { container } = render(<SystemDiagram flow={heroFlow} />);
    const states = Object.fromEntries(finalStates(container));
    expect(states.advisor).toBe("active");
    expect(Object.values(states).filter((state) => state === "completed")).toHaveLength(
      heroFlow.nodes.length - 1
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  describe("when motion is allowed", () => {
    beforeEach(() => {
      vi.stubGlobal(
        "IntersectionObserver",
        class {
          observe() {}
          disconnect() {}
        }
      );
      vi.stubGlobal("matchMedia", () => ({ matches: false }));
      Element.prototype.animate = vi.fn();
    });

    afterEach(() => {
      vi.unstubAllGlobals();
      delete Element.prototype.animate;
    });

    it("waits idle for the diagram to become visible and offers a replay button", () => {
      const { container } = render(<SystemDiagram flow={heroFlow} />);
      expect(finalStates(container).every(([, state]) => state === "idle")).toBe(true);
      expect(
        screen.getByRole("button", { name: heroFlow.labels.replayName })
      ).toHaveTextContent(heroFlow.labels.replay);
    });

    it("stays in its final state under reduced motion", () => {
      vi.stubGlobal("matchMedia", () => ({ matches: true }));
      const { container } = render(<SystemDiagram flow={heroFlow} />);
      expect(Object.fromEntries(finalStates(container)).advisor).toBe("active");
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
  });
});
