import { render, screen, within } from "@testing-library/react";
import Context from "./Context.jsx";
import { context } from "../../content/closing.js";

describe("Context", () => {
  it("is a section titled by its heading, without the section number", () => {
    render(<Context />);
    const section = screen.getByRole("region", { name: context.title });
    expect(section).toHaveAttribute("id", "contexto");
    expect(section).toHaveTextContent(`${context.number} ·`);
  });

  it("states the role and the company", () => {
    render(<Context />);
    expect(screen.getByText(context.role)).toBeInTheDocument();
    expect(screen.getByText(context.description)).toBeInTheDocument();
  });

  it("lists the stack", () => {
    render(<Context />);
    const list = screen.getByRole("list", { name: context.stackLabel });
    expect(within(list).getAllByRole("listitem").map((li) => li.textContent)).toEqual(context.stack);
  });
});
