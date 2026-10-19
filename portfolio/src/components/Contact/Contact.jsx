import s from "./Contact.module.css";
import cta from "../Cta/Cta.module.css";
import { contact } from "../../content/closing.js";
import { links } from "../../content/links.js";

export default function Contact() {
  return (
    <section className={s.section} id="contacto" aria-labelledby="contacto-title">
      <div className={s.inner}>
        <p className={s.eyebrow}>{contact.eyebrow}</p>
        <h2 className={s.title} id="contacto-title">
          {contact.title}
        </h2>
        <div className={s.actions}>
          <a className={`${cta.button} ${cta.primary}`} href={links.contact}>
            Hablemos
          </a>
          <a className={cta.tertiary} href={links.cv} target="_blank" rel="noopener noreferrer">
            Ver CV
          </a>
        </div>
      </div>
    </section>
  );
}
