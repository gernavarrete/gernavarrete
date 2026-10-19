import s from "./Cases.module.css";
import SystemDiagram from "../SystemDiagram/SystemDiagram.jsx";

function Guardrails({ figure }) {
  return (
    <figure className={s.guardrails}>
      <figcaption className={s.label}>{figure.caption}</figcaption>
      <ul className={s.guardrailList}>
        {figure.items.map(({ label, text }) => (
          <li key={label}>
            <span className={s.label}>{label}</span>
            <span className={s.guardrailText}>{text}</span>
          </li>
        ))}
      </ul>
      <a className={s.reference} href={figure.reference.href}>
        {figure.reference.text}
      </a>
    </figure>
  );
}

export default function CaseStudy({ item }) {
  const titleId = `${item.id}-title`;
  return (
    <article className={s.case} aria-labelledby={titleId}>
      <div className={s.body}>
        <header className={s.header}>
          <span className={s.label}>{item.label}</span>
          <h3 className={s.caseTitle} id={titleId}>
            {item.title}
          </h3>
          <ul className={s.pillars} aria-label="Pilares">
            {item.pillars.map((pillar) => (
              <li key={pillar}>{pillar}</li>
            ))}
          </ul>
        </header>
        <div className={s.content}>
          {item.figure.type === "diagram" ? (
            <SystemDiagram flow={item.figure.flow} />
          ) : (
            <Guardrails figure={item.figure} />
          )}
          <div className={s.facts}>
            <dl className={s.factList}>
              {item.facts.map(({ term, detail }) => (
                <div key={term}>
                  <dt className={s.label}>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
            {item.note && <p className={s.note}>{item.note}</p>}
          </div>
        </div>
      </div>
    </article>
  );
}
