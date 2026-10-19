import { render, screen, within } from "@testing-library/react";
import Cases from "./Cases.jsx";
import { cases } from "../../content/cases.js";

const article = (item) => screen.getByRole("article", { name: item.title });

describe("Cases", () => {
  it("is a section titled by its heading, after its eyebrow", () => {
    render(<Cases />);
    const section = screen.getByRole("region", { name: cases.title });
    expect(section).toHaveAttribute("id", "casos");
    expect(within(section).getByText(cases.eyebrow)).toBeInTheDocument();
  });

  it("renders each case as an article named by its level-3 title", () => {
    render(<Cases />);
    for (const item of cases.items) {
      const node = article(item);
      expect(within(node).getByRole("heading", { level: 3, name: item.title })).toBeInTheDocument();
      expect(within(node).getByText(item.label)).toBeInTheDocument();
    }
  });

  it("lists the pillars of each case", () => {
    render(<Cases />);
    for (const item of cases.items) {
      const pillars = within(article(item)).getByRole("list", { name: "Pilares" });
      expect(within(pillars).getAllByRole("listitem").map((li) => li.textContent)).toEqual(
        item.pillars
      );
    }
  });

  it("shows every fact as a term and its detail", () => {
    render(<Cases />);
    for (const item of cases.items) {
      const node = article(item);
      for (const { term, detail } of item.facts) {
        expect(within(node).getByText(term).tagName).toBe("DT");
        expect(within(node).getByText(detail).tagName).toBe("DD");
      }
    }
  });

  it("shows the attribution note where there is one", () => {
    render(<Cases />);
    for (const item of cases.items.filter((entry) => entry.note)) {
      expect(within(article(item)).getByText(item.note)).toBeInTheDocument();
    }
  });

  it("gives case B its guardrails and a link to the full flow", () => {
    render(<Cases />);
    const b = cases.items.find((item) => item.id === "caso-b");
    const node = article(b);
    for (const { label, text } of b.figure.items) {
      expect(within(node).getByText(label)).toBeInTheDocument();
      expect(within(node).getByText(text)).toBeInTheDocument();
    }
    expect(within(node).getByRole("link", { name: b.figure.reference.text })).toHaveAttribute(
      "href",
      b.figure.reference.href
    );
  });

  // Which layout is visible depends on a container query (not evaluated by
  // jsdom), and hidden elements get no computed name, so the label is read
  // directly.
  it("draws the diagrams of cases A and C", () => {
    render(<Cases />);
    for (const id of ["caso-a", "caso-c"]) {
      const item = cases.items.find((entry) => entry.id === id);
      const [diagram] = within(article(item)).getAllByRole("img", { hidden: true });
      expect(diagram).toHaveAttribute("aria-label", item.figure.flow.summary);
    }
  });
});
