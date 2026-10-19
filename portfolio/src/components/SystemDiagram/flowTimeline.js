// Pure timeline model for staged flow sequences (DESIGN_DIRECTION §7,
// "Diagrams and flows"): one pulse per stage travels its consecutive edges in
// `step` ms, then the stage's last node stays active for `gap` ms.

export function compileTimeline(edges, stages, { step, gap }) {
  const byId = new Map(edges.map((edge) => [edge.id, edge]));
  const events = stages.flatMap((stage, index) => {
    const start = index * (step + gap);
    const slice = step / stage.length;
    return stage.map((id, k) => {
      const edge = byId.get(id);
      if (!edge) throw new Error(`Unknown edge in stage ${index}: ${id}`);
      return {
        edge: id,
        from: edge.from,
        to: edge.to,
        start: start + k * slice,
        duration: slice,
        end: start + (k + 1) * slice,
      };
    });
  });
  return {
    events,
    origin: events.length ? events[0].from : null,
    total: events.length ? events[events.length - 1].end : 0,
  };
}

// Node states at time t: "idle" before the pulse reaches a node, "active" for
// the node reached last, "completed" for every node reached before it.
// t < 0 means the sequence has not started.
export function nodeStatesAt(timeline, nodeIds, t) {
  const states = Object.fromEntries(nodeIds.map((id) => [id, "idle"]));
  if (t < 0 || timeline.origin === null) return states;
  const reached = [
    timeline.origin,
    ...timeline.events.filter((event) => event.end <= t).map((event) => event.to),
  ];
  for (const id of reached) states[id] = "completed";
  states[reached[reached.length - 1]] = "active";
  return states;
}
