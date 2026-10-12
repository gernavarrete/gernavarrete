import s from "./SystemsBand.module.css";
import { systems } from "../../content/systems.js";

export default function SystemsBand() {
  return (
    <section className={s.band} id="sistemas" aria-labelledby="sistemas-title">
      <div className={s.inner}>
        <h2 className={s.title} id="sistemas-title">
          {systems.title}
        </h2>
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
      </div>
    </section>
  );
}
