// @vitest-environment node
import { createHash } from "node:crypto";
// Guards the evidence rules in DESIGN_DIRECTION §14: anonymity, precise
// attribution, no metrics and no placeholder content.
import { cases } from "./cases.js";
import { systems } from "./systems.js";
import { heroFlow } from "./heroFlow.js";

// Every user-facing string in a content block, joined.
const strings = (value) =>
  typeof value === "string"
    ? [value]
    : value && typeof value === "object"
      ? Object.values(value).flatMap(strings)
      : [];
const text = (value) => strings(value).join("\n");
const byId = Object.fromEntries(cases.items.map((item) => [item.id, item]));
const fact = (item, term) => item.facts.find((entry) => entry.term === term)?.detail;

// The client may not be named until written permission (§14). The guard
// compares hashes so the repository never contains the name itself: SHA-256
// of the name lowercased and without accents.
const CLIENT_HASH = "393a766c14e4ab00b25d4ec1e216caf3b915216a44e347441b834c696e562072";
const normalize = (word) =>
  word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const hash = (word) => createHash("sha256").update(normalize(word)).digest("hex");
const words = (value) => text(value).split(/[^\p{L}]+/u).filter(Boolean);

// Exact approved attribution for case A; marks may only name these flows.
const APPROVED_FLOWS = ["crédito y tesorería", "control de margen", "entregas"];

describe("evidence content", () => {
  const all = [cases, systems.items, heroFlow];

  it.each([
    ["the owner's company", /hornero/i],
    ["placeholders", /\[[^\]]*\]/],
    ["percentages", /\d\s*%/],
  ])("never names %s", (_, pattern) => {
    for (const block of all) expect(text(block)).not.toMatch(pattern);
  });

  it("never names the client", () => {
    for (const block of all) {
      expect(words(block).filter((word) => hash(word) === CLIENT_HASH)).toEqual([]);
    }
  });

  it("states no figures in cases or systems beyond figure references", () => {
    const stripped = text([cases.items, systems.items]).replace(/Fig\. \d+/g, "");
    expect(stripped).not.toMatch(/\d/);
  });

  it("presents three cases in order", () => {
    expect(cases.items.map((item) => item.label)).toEqual(["Caso A", "Caso B", "Caso C"]);
  });

  it("keeps case A attribution exact and team work explicit", () => {
    const a = byId["caso-a"];
    expect(fact(a, "Contribución")).toBe(
      "Contribuidor principal en los flujos de crédito, tesorería, control de margen y entregas."
    );
    expect(a.note).toBe("Implementación en equipo.");
  });

  it("marks only the approved case A flows", () => {
    const marks = byId["caso-a"].figure.flow.nodes.filter((node) => node.mark);
    expect(marks.map((node) => node.mark).sort()).toEqual([...APPROVED_FLOWS].sort());
  });

  it("never claims the third-party parts of case B", () => {
    const b = byId["caso-b"];
    expect(b.note).toMatch(/runtime del agente/i);
    expect(b.note).toMatch(/conector de WhatsApp/i);
    expect(b.note).toMatch(/terceros/i);
    expect(fact(b, "Contribución")).not.toMatch(/WhatsApp|Meta/);
  });

  it("publishes case C as confidential, with no impact claim", () => {
    const c = byId["caso-c"];
    expect(fact(c, "Evidencia")).toMatch(/confidencialidad/);
    expect(fact(c, "Contribución")).toBeUndefined();
  });

  it("shows six systems in production", () => {
    expect(systems.items).toHaveLength(6);
  });
});
