import s from "./SystemsBand.module.css";
import { systems } from "../../content/systems.js";
import Reveal from "../Reveal/Reveal.jsx";

export default function SystemsBand() {
  return (
    <section className={s.band} id="sistemas" aria-labelledby="sistemas-title">
      <div className={s.inner}>
        <h2 className={s.title} id="sistemas-title">
          <span aria-hidden="true">{systems.number} · </span>
          {systems.title}
        </h2>
        <Reveal>
          <ul className={s.list}>
            {systems.items.map(({ label, text }) => (
              <li key={label} className={s.item}>
                <span className={s.label}>
                  <span className={s.square} aria-hidden="true" />
                  {label}
                </span>
                <span className={s.text}>{text}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
