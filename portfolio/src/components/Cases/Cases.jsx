import s from "./Cases.module.css";
import CaseStudy from "./CaseStudy.jsx";
import { cases } from "../../content/cases.js";

export default function Cases() {
  return (
    <section className={s.section} id="casos" aria-labelledby="casos-title">
      <div className={s.inner}>
        <p className={s.eyebrow}>{cases.eyebrow}</p>
        <h2 className={s.title} id="casos-title">
          {cases.title}
        </h2>
        <div className={s.grid}>
          {cases.items.map((item) => (
            <CaseStudy key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
