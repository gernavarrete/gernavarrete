import { useEffect, useRef } from "react";
import s from "./ScrollProgress.module.css";

// Mobile position readout (§7, "Page navigation"): the bar's scale is written
// straight from the scroll position, once per frame, with no transition and
// no React render.
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const root = document.documentElement;
      const max = root.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={s.track} aria-hidden="true">
      <div ref={barRef} className={s.bar} style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
