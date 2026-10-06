import { Link } from "react-router-dom";
import "./Section1.css";

const CV_URL =
  "https://drive.google.com/file/d/1AmhmiGbEJAhj0lvf-eybKjjAQItS29-6/view?usp=drive_link";
const CONTACT_URL =
  "mailto:contacto@germannavarrete.tech?Subject=Necesito%20comunicarme%20con%20usted!";
const pillars = ["IA", "Automatización", "Software", "Sistemas de negocio"];

export default function Section1() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <p className="hero-eyebrow">
          {pillars.map((pillar, i) => (
            <span className="hero-pillar" key={pillar}>
              {pillar}
              {i < pillars.length - 1 && (
                <span className="hero-pillar-separator" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </p>
        <h1 className="hero-thesis" id="hero-title">
          Sistemas, no pantallas.
        </h1>
        <p className="hero-statement">
          Diseño y construyo sistemas donde la IA, la automatización y el
          software sostienen operaciones reales de negocio.
        </p>
        <div className="hero-actions">
          <Link className="hero-cta hero-cta-primary" to="/proyectos">
            Ver proyectos
          </Link>
          <a className="hero-cta hero-cta-secondary" href={CONTACT_URL}>
            Hablemos
          </a>
          <a
            className="hero-cta-tertiary"
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver CV
          </a>
        </div>
        <p className="hero-proof">
          En producción: flujos de crédito, margen, CRM, inventario y entregas
          sobre Odoo, y un agente de IA que canaliza consultas de WhatsApp hacia
          oportunidades comerciales en CRM.
        </p>
      </div>
    </section>
  );
}
