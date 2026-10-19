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

test("orders the home sections, keeping the context apart from the cases", async () => {
  renderAt("/");
  await screen.findByRole("heading", { name: "Sistemas, no pantallas.", level: 1 });
  const ids = [...document.querySelectorAll("main > section")].map((section) => section.id);
  expect(ids).toEqual(["inicio", "sistemas", "casos", "enfoque", "contexto", "contacto"]);
  expect(document.getElementById("fig-intake")).not.toBeNull();
});

test("closes the page with a footer outside the main content", async () => {
  renderAt("/");
  await screen.findByRole("heading", { name: "Sistemas, no pantallas.", level: 1 });
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});
