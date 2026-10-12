import s from "./SystemDiagram.module.css";
import { useFlowSequence } from "./useFlowSequence.js";

// Grid tracks alternate node columns and connector gaps, and node rows and
// connector rows, so node (col, row) sits at track (col * 2 + 1, row * 2 + 1).
// `span: n` covers n node columns; `span: true` covers all of them.
const spanOf = (node) => (typeof node.span === "number" ? node.span : 1);

function nodeColumn(node) {
  if (node.span === true) return "1 / -1";
  const start = node.col * 2 + 1;
  return spanOf(node) > 1 ? `${start} / span ${spanOf(node) * 2 - 1}` : String(start);
}

function edgePlacement(from, to) {
  if (from.row === to.row) {
    return {
      dir: to.col > from.col ? "right" : "left",
      style: {
        gridColumn: String(Math.min(from.col, to.col) * 2 + 2),
        gridRow: String(from.row * 2 + 1),
      },
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

function gridTemplate(nodes) {
  const columns = Math.max(...nodes.map((node) => node.col + spanOf(node)));
  const rows = Math.max(...nodes.map((node) => node.row)) + 1;
  return {
    gridTemplateColumns: Array(columns).fill("minmax(0, 1fr)").join(" var(--diagram-gap) "),
    gridTemplateRows: Array(rows).fill("auto").join(" var(--space-connector-min) "),
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

function MarkIcon() {
  return (
    <svg className={s.markIcon} viewBox="0 0 8 8" aria-hidden="true" focusable="false">
      <path d="M4 0.5 7.5 4 4 7.5 0.5 4z" />
    </svg>
  );
}

function DiagramGrid({ nodes, edges, notes, states, summary, variant, className, gridRef }) {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return (
    <div
      ref={gridRef}
      className={className}
      style={gridTemplate(nodes)}
      role="img"
      aria-label={summary}
      data-variant={variant}
    >
      {edges.map((edge) => {
        const { dir, style } = edgePlacement(byId.get(edge.from), byId.get(edge.to));
        return (
          <span
            key={edge.id}
            className={s.edge}
            style={style}
            data-edge={edge.id}
            data-dir={dir}
            data-lane={edge.lane}
            data-arrow={edge.arrow === false ? "none" : undefined}
          >
            <span className={s.pulse} data-pulse="" />
          </span>
        );
      })}
      {nodes.map((node) => (
        <div
          key={node.id}
          className={s.node}
          style={{ gridColumn: nodeColumn(node), gridRow: String(node.row * 2 + 1) }}
          data-node={node.id}
          data-state={states?.[node.id] ?? "idle"}
        >
          <span className={s.type}>{node.type}</span>
          <span className={s.name}>{node.name}</span>
          {node.detail && <span className={s.detail}>{node.detail}</span>}
          {node.mark && (
            <span className={s.mark} data-mark="">
              <MarkIcon />
              {node.mark}
            </span>
          )}
          <StateMarker state={states?.[node.id] ?? "idle"} />
        </div>
      ))}
      {notes?.map((note) => (
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
  );
}

// A system diagram figure. Flows with stages run once (see useFlowSequence);
// flows without stages are static. `flow.narrow` swaps the layout below the
// wide threshold: another set of nodes and edges, or "text" for the text form.
export default function SystemDiagram({ flow, id, startDelay = 0 }) {
  const { rootRef, animated, replay, states } = useFlowSequence(flow, { startDelay });
  const narrow = flow.narrow;
  const textNarrow = narrow === "text";

  return (
    <figure className={s.figure} id={id}>
      <span className={s.corners} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <figcaption className={s.caption}>
        <span>{flow.caption}</span>
        {flow.kind && (
          <span className={s.kind} aria-hidden="true">
            {flow.kind}
          </span>
        )}
      </figcaption>

      <DiagramGrid
        nodes={flow.nodes}
        edges={flow.edges}
        notes={flow.notes}
        states={states}
        summary={flow.summary}
        variant="wide"
        className={narrow ? `${s.diagram} ${s.wideOnly}` : s.diagram}
        gridRef={rootRef}
      />
      {narrow && !textNarrow && (
        <DiagramGrid
          nodes={narrow.nodes}
          edges={narrow.edges}
          summary={flow.summary}
          variant="narrow"
          className={`${s.diagram} ${s.narrowOnly}`}
        />
      )}
      {textNarrow && (
        <ol className={`${s.textForm} ${s.narrowOnly}`} data-variant="narrow">
          {flow.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      )}

      {(flow.status || flow.legend || animated) && (
        <div className={s.footer}>
          {flow.status && (
            <p className={s.status}>
              <span className={s.dot} aria-hidden="true" />
              <span className={s.statusLabel}>{flow.status.label}</span>
              <span>· {flow.status.text}</span>
            </p>
          )}
          {flow.legend && (
            <p className={s.status}>
              <MarkIcon />
              <span>{flow.legend}</span>
            </p>
          )}
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
      )}

      <details className={`${s.steps} ${textNarrow ? s.wideOnlyBlock : ""}`}>
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
