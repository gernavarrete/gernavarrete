import { useCallback, useEffect, useRef, useState } from "react";
import { compileTimeline, nodeStatesAt } from "./flowTimeline.js";

const NOT_STARTED = -1;
const FINAL = Number.POSITIVE_INFINITY;
// Fallbacks only; the running sequence reads --duration-flow and --duration-state.
const DEFAULT_TIMING = { step: 800, gap: 200 };

// The sequence runs only when motion is allowed and the browser can observe
// visibility and animate; otherwise the diagram shows its final state.
function canAnimate() {
  return (
    typeof window.IntersectionObserver === "function" &&
    typeof Element.prototype.animate === "function" &&
    !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

function readMs(style, name, fallback) {
  const value = style.getPropertyValue(name).trim();
  const number = parseFloat(value);
  if (!Number.isFinite(number)) return fallback;
  return value.endsWith("ms") ? number : value.endsWith("s") ? number * 1000 : number;
}

const isForward = (dir) => dir === "right" || dir === "down";
const isVertical = (dir) => dir === "down" || dir === "up";

// Runs a staged flow once when the diagram is at least half visible.
// Pulses move with the Web Animations API (transform only); React state only
// changes when a pulse reaches a node.
export function useFlowSequence(flow, { startDelay = 0 } = {}) {
  const rootRef = useRef(null);
  const run = useRef({ token: 0, timer: 0, animations: [] });
  const [animated] = useState(canAnimate);
  const [timeline, setTimeline] = useState(() =>
    compileTimeline(flow.edges, flow.stages, DEFAULT_TIMING)
  );
  const [elapsed, setElapsed] = useState(animated ? NOT_STARTED : FINAL);

  const stop = useCallback(() => {
    const current = run.current;
    current.token += 1;
    clearTimeout(current.timer);
    current.animations.forEach((animation) => animation.cancel());
    current.animations = [];
  }, []);

  const play = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;
    stop();
    const token = run.current.token;
    const style = getComputedStyle(root);
    const next = compileTimeline(flow.edges, flow.stages, {
      step: readMs(style, "--duration-flow", DEFAULT_TIMING.step),
      gap: readMs(style, "--duration-state", DEFAULT_TIMING.gap),
    });
    const easing = style.getPropertyValue("--ease-move").trim() || "ease-in-out";
    setTimeline(next);
    setElapsed(0);

    for (const event of next.events) {
      const edge = root.querySelector(`[data-edge="${event.edge}"]`);
      const pulse = edge?.querySelector("[data-pulse]");
      if (!pulse) continue;
      const { dir } = edge.dataset;
      const axis = isVertical(dir) ? "Y" : "X";
      const span = isVertical(dir)
        ? edge.clientHeight - pulse.offsetHeight
        : edge.clientWidth - pulse.offsetWidth;
      const [from, to] = isForward(dir) ? [0, span] : [span, 0];
      const animation = pulse.animate(
        [
          { opacity: 1, transform: `translate${axis}(${from}px)` },
          { opacity: 1, transform: `translate${axis}(${to}px)` },
        ],
        { delay: event.start, duration: event.duration, easing }
      );
      run.current.animations.push(animation);
      animation.finished.then(
        () => {
          if (run.current.token === token) {
            setElapsed((value) => Math.max(value, event.end));
          }
        },
        () => {}
      );
    }
  }, [flow, stop]);

  useEffect(() => {
    if (!animated) return undefined;
    const current = run.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        current.timer = setTimeout(play, startDelay);
      },
      { threshold: 0.5 }
    );
    observer.observe(rootRef.current);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [animated, play, startDelay, stop]);

  const nodeIds = flow.nodes.map((node) => node.id);
  return {
    rootRef,
    animated,
    replay: play,
    states: nodeStatesAt(timeline, nodeIds, elapsed),
  };
}
