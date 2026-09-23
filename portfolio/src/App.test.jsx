import { render, screen } from "@testing-library/react";
import App from "./App";

function renderAt(path) {
  window.history.pushState({}, "", path);
  render(<App />);
}

test("renders the hero text at /", async () => {
  renderAt("/");
  expect(await screen.findByText("Desarrollador Fullstack")).toBeInTheDocument();
});

test("renders the about section at /sobremi", async () => {
  renderAt("/sobremi");
  expect(await screen.findByText("Mi Background")).toBeInTheDocument();
});

test("renders the projects section at /proyectos", async () => {
  renderAt("/proyectos");
  expect(
    await screen.findByRole("heading", { name: "Proyectos", level: 1 })
  ).toBeInTheDocument();
  expect(await screen.findByText("Mangiar-e")).toBeInTheDocument();
});
