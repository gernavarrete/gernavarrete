import { render } from "@testing-library/react";
import ScrollProgress from "./ScrollProgress.jsx";

describe("ScrollProgress", () => {
  it("is hidden from assistive technology", () => {
    const { container } = render(<ScrollProgress />);
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });

  it("starts empty", () => {
    const { container } = render(<ScrollProgress />);
    expect(container.firstChild.firstChild.style.transform).toBe("scaleX(0)");
  });
});
