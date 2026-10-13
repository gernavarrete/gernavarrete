import { render, screen } from "@testing-library/react";
import Contact from "./Contact.jsx";
import { contact } from "../../content/closing.js";
import { links } from "../../content/links.js";

describe("Contact", () => {
  it("is a section titled by its question", () => {
    render(<Contact />);
    expect(screen.getByRole("region", { name: contact.title })).toHaveAttribute("id", "contacto");
    expect(screen.getByRole("heading", { level: 2, name: contact.title })).toBeInTheDocument();
  });

  it("offers email contact and the CV", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: "Hablemos" })).toHaveAttribute("href", links.contact);
    const cv = screen.getByRole("link", { name: "Ver CV" });
    expect(cv).toHaveAttribute("href", links.cv);
    expect(cv).toHaveAttribute("rel", "noopener noreferrer");
  });
});
