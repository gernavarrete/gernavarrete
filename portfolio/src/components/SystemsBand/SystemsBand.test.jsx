import { render, screen, within } from "@testing-library/react";
import SystemsBand from "./SystemsBand.jsx";
import { systems } from "../../content/systems.js";

describe("SystemsBand", () => {
  it("is a section titled by its heading, without the section number", () => {
    render(<SystemsBand />);
    const section = screen.getByRole("region", { name: systems.title });
    expect(section).toHaveAttribute("id", "sistemas");
    expect(screen.getByRole("heading", { level: 2, name: systems.title })).toBeInTheDocument();
    expect(section).toHaveTextContent(`${systems.number} ·`);
  });

  it("lists every system with its rule", () => {
    render(<SystemsBand />);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(systems.items.length);
    systems.items.forEach((system, i) => {
      expect(items[i]).toHaveTextContent(system.label);
      expect(items[i]).toHaveTextContent(system.text);
    });
  });
});
