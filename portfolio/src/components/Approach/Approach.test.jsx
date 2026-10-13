import { render, screen, within } from "@testing-library/react";
import Approach from "./Approach.jsx";
import { approach } from "../../content/closing.js";

describe("Approach", () => {
  it("is a section titled by its heading", () => {
    render(<Approach />);
    expect(screen.getByRole("region", { name: approach.title })).toHaveAttribute("id", "enfoque");
    expect(screen.getByText(approach.eyebrow)).toBeInTheDocument();
  });

  it("lists the steps in order with their numbers", () => {
    render(<Approach />);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(approach.steps.length);
    approach.steps.forEach((step, i) => {
      expect(items[i]).toHaveTextContent(String(i + 1).padStart(2, "0"));
      expect(within(items[i]).getByRole("heading", { level: 3, name: step.title })).toBeInTheDocument();
      expect(items[i]).toHaveTextContent(step.text);
    });
  });
});
