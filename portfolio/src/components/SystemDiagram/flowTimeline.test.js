// @vitest-environment node
import { compileTimeline, nodeStatesAt } from "./flowTimeline.js";
import { heroFlow } from "../../content/heroFlow.js";

const timing = { step: 800, gap: 200 };
const ids = heroFlow.nodes.map((node) => node.id);
const timeline = compileTimeline(heroFlow.edges, heroFlow.stages, timing);
const statesAt = (t) => nodeStatesAt(timeline, ids, t);
const withState = (states, state) =>
  Object.keys(states).filter((id) => states[id] === state);

describe("compileTimeline", () => {
  it("gives each stage one flow step, split across its edges", () => {
    const stageOne = timeline.events.slice(0, 3);
    expect(stageOne.map((event) => event.duration)).toEqual([800 / 3, 800 / 3, 800 / 3]);
    expect(stageOne[2].end).toBe(800);
  });

  it("starts each stage after the previous step plus the state gap", () => {
    const starts = heroFlow.stages.map((stage) =>
      timeline.events.find((event) => event.edge === stage[0]).start
    );
    expect(starts).toEqual([0, 1000, 2000, 3000]);
  });

  it("keeps the hero sequence within 5 seconds including its start delay", () => {
    expect(timeline.total).toBe(3800);
    expect(timeline.total + 600).toBeLessThanOrEqual(5000);
  });

  it("covers every edge exactly once", () => {
    expect(timeline.events.map((event) => event.edge).sort()).toEqual(
      heroFlow.edges.map((edge) => edge.id).sort()
    );
  });

  it("rejects stages that reference unknown edges", () => {
    expect(() => compileTimeline(heroFlow.edges, [["missing"]], timing)).toThrow(/missing/);
  });
});

describe("nodeStatesAt", () => {
  it("leaves every node idle before the sequence starts", () => {
    expect(withState(statesAt(-1), "idle")).toEqual(ids);
  });

  it("activates the origin when the sequence starts", () => {
    const states = statesAt(0);
    expect(withState(states, "active")).toEqual(["client"]);
    expect(withState(states, "completed")).toEqual([]);
  });

  it("marks the node reached last as active and earlier ones as completed", () => {
    const states = statesAt(800);
    expect(withState(states, "active")).toEqual(["erp"]);
    expect(withState(states, "completed").sort()).toEqual(["client", "meta", "whatsapp"]);
    expect(states.agent).toBe("idle");
  });

  it("returns to the agent after the model responds", () => {
    const states = statesAt(1800);
    expect(states.agent).toBe("active");
    expect(states.model).toBe("completed");
  });

  it("rests with every node completed and the advisor active", () => {
    for (const t of [timeline.total, Number.POSITIVE_INFINITY]) {
      const states = statesAt(t);
      expect(withState(states, "active")).toEqual(["advisor"]);
      expect(withState(states, "completed")).toHaveLength(ids.length - 1);
    }
  });
});
