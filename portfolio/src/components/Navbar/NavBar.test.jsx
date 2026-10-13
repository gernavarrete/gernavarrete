import { render, screen, within } from "@testing-library/react";
import NavBar from "./NavBar.jsx";
import { sections } from "../../content/sections.js";

const navSections = sections.filter((section) => section.nav);

describe("NavBar", () => {
  it("offers a skip link to the main content first", () => {
    render(<NavBar active="inicio" />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("Saltar al contenido");
    expect(links[0]).toHaveAttribute("href", "#main");
  });

  it("links the owner's name to the top of the page", () => {
    render(<NavBar active="inicio" />);
    expect(screen.getByRole("link", { name: "German Dario Navarrete" })).toHaveAttribute(
      "href",
      "#inicio"
    );
  });

  it("links every navigable section by anchor", () => {
    render(<NavBar active="inicio" />);
    const nav = screen.getByRole("navigation", { name: "Navegación principal" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => [link.textContent, link.getAttribute("href")])).toEqual(
      navSections.map((section) => [section.label, `#${section.id}`])
    );
  });

  it("marks only the active section", () => {
    render(<NavBar active="casos" />);
    const nav = screen.getByRole("navigation", { name: "Navegación principal" });
    const current = within(nav)
      .getAllByRole("link")
      .filter((link) => link.hasAttribute("aria-current"));
    expect(current.map((link) => link.textContent)).toEqual(["Casos"]);
    expect(current[0]).toHaveAttribute("aria-current", "location");
  });
});
