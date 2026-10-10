import s from "./SystemDiagram.module.css";
import { useFlowSequence } from "./useFlowSequence.js";

// Grid tracks: column A, connector gap, column B. Node rows alternate with
// connector rows, so node (col, row) sits at track (col * 2 + 1, row * 2 + 1).
const nodeColumn = (node) => (node.span ? "1 / -1" : String(node.col * 2 + 1));

function edgePlacement(from, to) {
  if (from.row === to.row) {
    return {
      dir: to.col > from.col ? "right" : "left",
      style: { gridColumn: "2", gridRow: String(from.row * 2 + 1) },
    };
  }
  const anchor = from.span ? to : from;
  return {
    dir: to.row > from.row ? "down" : "up",
    style: {
      gridColumn: String(anchor.col * 2 + 1),
      gridRow: String(Math.min(from.row, to.row) * 2 + 2),
    },
  };
}

function StateMarker({ state }) {
  if (state === "idle") return null;
  return (
    <svg className={s.marker} viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      {state === "active" ? (
        <rect x="3" y="3" width="6" height="6" rx="1" />
      ) : (
        <path d="M2.5 6.5 5 9l4.5-6" />
      )}
    </svg>
  );
}

export default function SystemDiagram({ flow, startDelay = 0 }) {
  const { rootRef, animated, replay, states } = useFlowSequence(flow, { startDelay });
  const byId = new Map(flow.nodes.map((node) => [node.id, node]));
  const rows = Math.max(...flow.nodes.map((node) => node.row)) + 1;
  const gridTemplateRows = Array(rows).fill("auto").join(" var(--space-connector-min) ");

  return (
    <figure className={s.figure}>
      <span className={s.corners} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <figcaption className={s.caption}>
        <span>{flow.caption}</span>
        <span className={s.kind} aria-hidden="true">
          {flow.kind}
        </span>
      </figcaption>

      <div
        ref={rootRef}
        className={s.diagram}
        style={{ gridTemplateRows }}
        role="img"
        aria-label={flow.summary}
      >
        {flow.edges.map((edge) => {
          const { dir, style } = edgePlacement(byId.get(edge.from), byId.get(edge.to));
          return (
            <span
              key={edge.id}
              className={s.edge}
              style={style}
              data-edge={edge.id}
              data-dir={dir}
              data-lane={edge.lane}
            >
              <span className={s.pulse} data-pulse="" />
            </span>
          );
        })}
        {flow.nodes.map((node) => (
          <div
            key={node.id}
            className={s.node}
            style={{ gridColumn: nodeColumn(node), gridRow: String(node.row * 2 + 1) }}
            data-node={node.id}
            data-state={states[node.id]}
          >
            <span className={s.type}>{node.type}</span>
            <span className={s.name}>{node.name}</span>
            {node.detail && <span className={s.detail}>{node.detail}</span>}
            <StateMarker state={states[node.id]} />
          </div>
        ))}
        {flow.notes?.map((note) => (
          <p
            key={note.label}
            className={s.note}
            style={{ gridColumn: String(note.col * 2 + 1), gridRow: String(note.row * 2 + 1) }}
          >
            <span className={s.type}>{note.label}</span>
            <span>{note.text}</span>
          </p>
        ))}
      </div>

      <div className={s.footer}>
        <p className={s.status}>
          <span className={s.dot} aria-hidden="true" />
          <span className={s.statusLabel}>{flow.status.label}</span>
          <span>· {flow.status.text}</span>
        </p>
        {animated && (
          <button
            type="button"
            className={s.replay}
            onClick={replay}
            aria-label={flow.labels.replayName}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            {flow.labels.replay}
          </button>
        )}
      </div>

      <details className={s.steps}>
        <summary>{flow.labels.steps}</summary>
        <ol>
          {flow.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </details>
    </figure>
  );
}
