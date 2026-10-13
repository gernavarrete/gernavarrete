import { useLayoutEffect, useRef } from "react";
import s from "./Reveal.module.css";

function reachedByAnchor(element) {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const target = id && document.getElementById(id);
  return Boolean(target && target.contains(element));
}

// Scroll reveal for a supporting group (§7, "Scroll reveal"): it starts hidden
// only when JS runs, motion is allowed, IntersectionObserver exists, the group
// is below the fold and its section was not reached through an anchor. It
// shows once, at 15% visible; an anchor to its section or keyboard focus
// inside it shows it directly.
export default function Reveal({ children }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const element = ref.current;
    const canHide =
      typeof window.IntersectionObserver === "function" &&
      !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches &&
      element.getBoundingClientRect().top >= window.innerHeight &&
      !reachedByAnchor(element);
    if (!canHide) return undefined;

    element.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        element.dataset.reveal = "shown";
        observer.disconnect();
      },
      { threshold: 0.15 }
    );
    const showNow = () => {
      delete element.dataset.reveal;
      observer.disconnect();
    };
    const onHashChange = () => {
      if (reachedByAnchor(element)) showNow();
    };
    observer.observe(element);
    window.addEventListener("hashchange", onHashChange);
    element.addEventListener("focusin", showNow);
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
      element.removeEventListener("focusin", showNow);
    };
  }, []);

  return (
    <div ref={ref} className={s.reveal}>
      {children}
    </div>
  );
}
