import s from "./SectionRail.module.css";
import { sections } from "../../content/sections.js";

const number = (i) => String(i + 1).padStart(2, "0");

// Fixed column of section links in the side margin; shown only where it fits
// without overlapping the layout container (§7, "Page navigation").
export default function SectionRail({ active }) {
  return (
    <nav className={s.rail} aria-label="Progreso por secciones">
      <ol className={s.list}>
        {sections.map(({ id, label }, i) => (
          <li key={id}>
            <a
              className={s.link}
              href={`#${id}`}
              aria-label={`${number(i)} ${label}`}
              aria-current={active === id ? "location" : undefined}
            >
              <span className={s.port} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
