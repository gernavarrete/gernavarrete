import "./Section1.css";
import cta from "../Cta/Cta.module.css";
import SystemDiagram from "../SystemDiagram/SystemDiagram.jsx";
import { heroFlow } from "../../content/heroFlow.js";
import { links } from "../../content/links.js";

const pillars = ["IA", "Automatización", "Software", "Sistemas de negocio"];

export default function Section1() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="hero-copy">
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
            <a className={`${cta.button} ${cta.primary}`} href="#casos">
              Ver casos
            </a>
            <a className={`${cta.button} ${cta.secondary}`} href={links.contact}>
              Hablemos
            </a>
            <a
              className={cta.tertiary}
              href={links.cv}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver CV
            </a>
          </div>
          <p className="hero-proof">
            En producción: flujos de crédito, margen, CRM, inventario y entregas
            sobre Odoo, y un agente de IA que canaliza consultas de WhatsApp
            hacia oportunidades comerciales en CRM.
          </p>
        </div>
        <SystemDiagram flow={heroFlow} id="fig-intake" startDelay={600} />
      </div>
    </section>
  );
}
