import { useEffect, useState } from "react";

// The active section is the one crossing a reading line at 35% of the
// viewport height, except when the last section is fully in view: a short
// final section never reaches the line, so it takes over at the end of the
// page. State changes only when the section changes.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(" ");

  useEffect(() => {
    if (typeof window.IntersectionObserver !== "function") return undefined;
    const sectionIds = key.split(" ");
    const last = sectionIds[sectionIds.length - 1];
    let onLine = sectionIds[0];
    let atEnd = false;
    const sync = () => setActive(atEnd ? last : onLine);

    const lineObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onLine = entry.target.id;
        }
        sync();
      },
      { rootMargin: "-35% 0px -65% 0px" }
    );
    const endObserver = new IntersectionObserver(
      ([entry]) => {
        atEnd = entry.isIntersecting;
        sync();
      },
      { threshold: 1 }
    );

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (element) lineObserver.observe(element);
    }
    const lastElement = document.getElementById(last);
    if (lastElement) endObserver.observe(lastElement);

    return () => {
      lineObserver.disconnect();
      endObserver.disconnect();
    };
  }, [key]);

  return active;
}
