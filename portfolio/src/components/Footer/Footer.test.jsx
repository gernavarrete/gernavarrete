import { render, screen, within } from "@testing-library/react";
import Footer from "./Footer.jsx";
import { footer } from "../../content/closing.js";
import { links } from "../../content/links.js";

describe("Footer", () => {
  it("is the page footer with the owner and the signature", () => {
    render(<Footer />);
    const node = screen.getByRole("contentinfo");
    expect(node).toHaveTextContent(footer.owner);
    expect(node).toHaveTextContent(footer.signature);
  });

  it("links every social profile by name", () => {
    render(<Footer />);
    const node = screen.getByRole("contentinfo");
    for (const { label, href } of links.social) {
      expect(within(node).getByRole("link", { name: label })).toHaveAttribute("href", href);
    }
  });
});
