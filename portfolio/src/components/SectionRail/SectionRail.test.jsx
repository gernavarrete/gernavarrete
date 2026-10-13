import { render, within } from "@testing-library/react";
import SectionRail from "./SectionRail.jsx";
import { sections } from "../../content/sections.js";

// The rail is shown by a media query from 82em, which jsdom never matches,
// so it is queried regardless of visibility and its labels are read directly.
const rail = () => document.querySelector('nav[aria-label="Progreso por secciones"]');

describe("SectionRail", () => {
  it("links every section with a numbered name", () => {
    render(<SectionRail active="inicio" />);
    const links = within(rail()).getAllByRole("link", { hidden: true });
    expect(links).toHaveLength(sections.length);
    sections.forEach((section, i) => {
      expect(links[i]).toHaveAttribute(
        "aria-label",
        `${String(i + 1).padStart(2, "0")} ${section.label}`
      );
      expect(links[i]).toHaveAttribute("href", `#${section.id}`);
    });
  });

  it("marks the active section", () => {
    render(<SectionRail active="enfoque" />);
    const current = within(rail())
      .getAllByRole("link", { hidden: true })
      .filter((link) => link.hasAttribute("aria-current"));
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute("href", "#enfoque");
  });
});
