import s from "./Context.module.css";
import { context } from "../../content/closing.js";

export default function Context() {
  return (
    <section className={s.section} id="contexto" aria-labelledby="contexto-title">
      <div className={s.inner}>
        <div className={s.about}>
          <h2 className={s.label} id="contexto-title">
            <span aria-hidden="true">{context.number} · </span>
            {context.title}
          </h2>
          <p className={s.role}>{context.role}</p>
          <p className={s.description}>{context.description}</p>
        </div>
        <div className={s.stack}>
          <p className={s.label} id="contexto-stack">
            {context.stackLabel}
          </p>
          <ul className={s.tags} aria-labelledby="contexto-stack">
            {context.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
