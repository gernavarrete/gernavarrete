import { render, screen, within } from "@testing-library/react";
import SystemDiagram from "./SystemDiagram.jsx";
import { heroFlow } from "../../content/heroFlow.js";
import { cases } from "../../content/cases.js";

const flowOf = (id) => cases.items.find((item) => item.id === id).figure.flow;
const domainMap = flowOf("caso-a");
const topology = flowOf("caso-c");

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

  it("takes an id so other content can link to the figure", () => {
    const { container } = render(<SystemDiagram flow={heroFlow} id="fig-intake" />);
    expect(container.querySelector("figure")).toHaveAttribute("id", "fig-intake");
  });

  describe("static diagrams", () => {
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

    it("never sequences or offers replay without stages", () => {
      const { container } = render(<SystemDiagram flow={domainMap} />);
      expect(finalStates(container).every(([, state]) => state === "idle")).toBe(true);
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("lays out as many columns as the nodes use", () => {
      const { container } = render(<SystemDiagram flow={domainMap} />);
      const grid = container.querySelector('[data-variant="wide"]');
      expect(grid.style.gridTemplateColumns.match(/minmax/g)).toHaveLength(3);
    });

    it("draws undirected relations without arrowheads", () => {
      const { container } = render(<SystemDiagram flow={domainMap} />);
      const edges = container.querySelectorAll("[data-edge]");
      expect(edges).toHaveLength(domainMap.edges.length);
      edges.forEach((edge) => expect(edge).toHaveAttribute("data-arrow", "none"));
    });

    it("labels marked nodes with their exact flow and a legend", () => {
      const { container } = render(<SystemDiagram flow={domainMap} />);
      const marked = domainMap.nodes.filter((node) => node.mark);
      for (const node of marked) {
        expect(container.querySelector(`[data-node="${node.id}"] [data-mark]`)).toHaveTextContent(
          node.mark
        );
      }
      expect(screen.getByText(domainMap.legend)).toBeInTheDocument();
    });
  });

  describe("narrow variants", () => {
    it("shows the text form when the narrow variant is text", () => {
      const { container } = render(<SystemDiagram flow={domainMap} />);
      const narrow = container.querySelector('[data-variant="narrow"]');
      expect(within(narrow).getAllByRole("listitem")).toHaveLength(domainMap.steps.length);
    });

    it("renders an alternative layout when the narrow variant is a flow", () => {
      const { container } = render(<SystemDiagram flow={topology} />);
      const narrow = container.querySelector('[data-variant="narrow"]');
      expect(narrow.querySelectorAll("[data-node]")).toHaveLength(topology.narrow.nodes.length);
      expect(container.querySelector('[data-variant="wide"]').querySelectorAll("[data-node]"))
        .toHaveLength(topology.nodes.length);
    });

    it("renders a single layout when there is no narrow variant", () => {
      const { container } = render(<SystemDiagram flow={heroFlow} />);
      expect(container.querySelector('[data-variant="narrow"]')).toBeNull();
    });
  });
});
