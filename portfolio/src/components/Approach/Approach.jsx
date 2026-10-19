import s from "./Approach.module.css";
import { approach } from "../../content/closing.js";

const number = (i) => String(i + 1).padStart(2, "0");

export default function Approach() {
  return (
    <section className={s.section} id="enfoque" aria-labelledby="enfoque-title">
      <div className={s.inner}>
        <p className={s.eyebrow}>{approach.eyebrow}</p>
        <h2 className={s.title} id="enfoque-title">
          {approach.title}
        </h2>
        <ol className={s.steps}>
          {approach.steps.map((step, i) => (
            <li key={step.title} className={s.step}>
              <span className={s.number} aria-hidden="true">
                {number(i)}
              </span>
              <h3 className={s.stepTitle}>{step.title}</h3>
              <p className={s.text}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
