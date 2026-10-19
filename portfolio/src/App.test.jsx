import { render, screen } from "@testing-library/react";
import App from "./App";

function renderAt(path) {
  window.history.pushState({}, "", path);
  render(<App />);
}

test("renders the hero at /", async () => {
  renderAt("/");
  expect(
    await screen.findByRole("heading", {
      name: "Sistemas, no pantallas.",
      level: 1,
    })
  ).toBeInTheDocument();
});

test.each(["/sobremi", "/proyectos", "/inicio"])(
  "redirects %s to the home",
  async (path) => {
    renderAt(path);
    expect(
      await screen.findByRole("heading", {
        name: "Sistemas, no pantallas.",
        level: 1,
      })
    ).toBeInTheDocument();
    expect(window.location.pathname).toBe("/");
  }
);
