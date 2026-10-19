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

test("orders the home sections and links the hero figure", async () => {
  renderAt("/");
  await screen.findByRole("heading", { name: "Sistemas, no pantallas.", level: 1 });
  const ids = [...document.querySelectorAll("main > section")].map((section) => section.id);
  expect(ids).toEqual(["inicio", "sistemas", "casos"]);
  expect(document.getElementById("fig-intake")).not.toBeNull();
});
