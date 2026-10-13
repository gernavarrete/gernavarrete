// Closing sections of the home (DESIGN_DIRECTION §8): approach, context,
// contact and footer. The owner's company appears only in `context`, which
// sits after the approach so it is never next to the cases.

export const approach = {
  eyebrow: "04 · Enfoque",
  title: "Cómo construyo sistemas",
  steps: [
    {
      title: "Entender la operación",
      text: "Recorro el proceso con quienes lo ejecutan y marco dónde se decide, se espera o se corrige a mano.",
    },
    {
      title: "Modelar restricciones",
      text: "Escribo las reglas que no se pueden romper: límites de crédito, márgenes, aprobaciones.",
    },
    {
      title: "Diseñar el sistema",
      text: "Defino estados, responsables y puntos de control antes de elegir herramientas.",
    },
    {
      title: "Automatizar",
      text: "Automatizo lo repetible y dejo las excepciones a una persona con contexto.",
    },
    {
      title: "Instrumentar",
      text: "Registro las decisiones clave para poder auditarlas.",
    },
    {
      title: "Iterar",
      text: "Ajusto las reglas con datos reales de uso, en ciclos cortos.",
    },
  ],
};

// Owner-confirmed: co-founder, four partners, and the stack below.
export const context = {
  number: "05",
  title: "Contexto",
  role: "Cofundador · Hornero Digital",
  description: "Consultora Odoo, 4 socios.",
  stackLabel: "Dominios y stack",
  stack: ["Odoo", "Python", "React", "Integraciones", "IA aplicada", "AWS"],
};

export const contact = {
  eyebrow: "06 · Contacto",
  title: "¿Tenés una operación compleja que todavía depende de trabajo manual?",
};

export const footer = {
  owner: "German Dario Navarrete",
  signature: "Sistemas, no pantallas",
};
