import { useEffect, useRef, useState } from "react";
import s from "./PointerAccent.module.css";

const TRAIL = 4;
const INTERACTIVE = "a, button, summary, [role='button']";
const EPSILON = 0.1;

// The owner-approved decorative exception in §7 ("Pointer accent"): an amber
// ring with a short trail over the native cursor. Mouse only, never under
// reduced motion; it moves with transforms and its frame loop stops as soon
// as the trail settles.
function canRun() {
  return (
    Boolean(window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const translate = (x, y) => `translate(${x}px, ${y}px)`;

export default function PointerAccent() {
  const [enabled] = useState(canRun);
  const layerRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const layer = layerRef.current;
    const ring = layer.querySelector("[data-ring]");
    const dots = [...layer.querySelectorAll("[data-trail]")];
    const state = { tx: 0, ty: 0, x: 0, y: 0, scale: 1, targetScale: 1, frame: 0, shown: false };
    const trail = Array.from({ length: TRAIL }, () => ({ x: 0, y: 0 }));

    const paint = () => {
      ring.style.transform = `${translate(state.x, state.y)} scale(${state.scale})`;
      trail.forEach((point, i) => {
        dots[i].style.transform = translate(point.x, point.y);
      });
    };

    const step = () => {
      state.x += (state.tx - state.x) * 0.35;
      state.y += (state.ty - state.y) * 0.35;
      state.scale += (state.targetScale - state.scale) * 0.2;
      let settled =
        Math.abs(state.tx - state.x) < EPSILON &&
        Math.abs(state.ty - state.y) < EPSILON &&
        Math.abs(state.targetScale - state.scale) < EPSILON / 10;
      let lead = state;
      for (const point of trail) {
        point.x += (lead.x - point.x) * 0.45;
        point.y += (lead.y - point.y) * 0.45;
        if (Math.abs(lead.x - point.x) >= EPSILON || Math.abs(lead.y - point.y) >= EPSILON) {
          settled = false;
        }
        lead = point;
      }
      if (settled) {
        state.x = state.tx;
        state.y = state.ty;
        state.scale = state.targetScale;
        for (const point of trail) Object.assign(point, { x: state.tx, y: state.ty });
        state.frame = 0;
      } else {
        state.frame = requestAnimationFrame(step);
      }
      paint();
    };

    const wake = () => {
      if (!state.frame) state.frame = requestAnimationFrame(step);
    };

    const show = (visible) => {
      state.shown = visible;
      layer.style.opacity = visible ? "1" : "0";
    };

    const onMove = (event) => {
      if (event.pointerType !== "mouse") return;
      state.tx = event.clientX;
      state.ty = event.clientY;
      state.targetScale = event.target?.closest?.(INTERACTIVE) ? 1.625 : 1;
      if (!state.shown) {
        // Appear at the pointer instead of flying in from the last position.
        Object.assign(state, { x: state.tx, y: state.ty });
        for (const point of trail) Object.assign(point, { x: state.tx, y: state.ty });
        show(true);
      }
      wake();
    };

    const hide = () => {
      show(false);
      cancelAnimationFrame(state.frame);
      state.frame = 0;
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") hide();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(state.frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", hide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={layerRef} className={s.layer} aria-hidden="true">
      {Array.from({ length: TRAIL }, (_, i) => (
        <span key={i} className={s.dot} data-trail="" />
      ))}
      <span className={s.ring} data-ring="" />
    </div>
  );
}
