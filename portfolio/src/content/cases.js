// Home case summaries (DESIGN_DIRECTION §8 and §14). Cases 1 and 2 stay
// anonymized; attribution wording is the approved one.

const domainMap = {
  caption: "Mapa de dominios",
  summary:
    "Mapa de seis dominios conectados sobre Odoo. Ventas y margen es el centro y se conecta con Dirección, Crédito y tesorería, CRM e Inventario y entregas.",
  legend: "Contribución principal",
  // Static: no stages. Dirección spans the first two columns so every
  // relation is a straight connector.
  nodes: [
    { id: "management", type: "Gestión", name: "Dirección", col: 0, row: 0, span: 2 },
    {
      id: "credit",
      type: "Finanzas",
      name: "Crédito y tesorería",
      mark: "crédito y tesorería",
      col: 0,
      row: 1,
    },
    {
      id: "sales",
      type: "Comercial",
      name: "Ventas y margen",
      mark: "control de margen",
      col: 1,
      row: 1,
    },
    { id: "crm", type: "Comercial", name: "CRM", col: 2, row: 1 },
    { id: "purchasing", type: "Abastecimiento", name: "Compras", col: 0, row: 2 },
    {
      id: "inventory",
      type: "Logística",
      name: "Inventario y entregas",
      mark: "entregas",
      col: 1,
      row: 2,
    },
  ],
  edges: [
    { id: "management-credit", from: "management", to: "credit", arrow: false },
    { id: "management-sales", from: "management", to: "sales", arrow: false },
    { id: "credit-sales", from: "credit", to: "sales", arrow: false },
    { id: "sales-crm", from: "sales", to: "crm", arrow: false },
    { id: "sales-inventory", from: "sales", to: "inventory", arrow: false },
    { id: "purchasing-inventory", from: "purchasing", to: "inventory", arrow: false },
  ],
  stages: [],
  steps: [
    "Dirección, conectada con Crédito y tesorería y con Ventas y margen.",
    "Crédito y tesorería (contribución principal), conectado con Dirección y Ventas y margen.",
    "Ventas y margen (contribución principal en control de margen), conectado con Dirección, Crédito y tesorería, CRM e Inventario y entregas.",
    "CRM, conectado con Ventas y margen.",
    "Inventario y entregas (contribución principal en entregas), conectado con Ventas y margen y Compras.",
    "Compras, conectado con Inventario y entregas.",
  ],
  // Below the wide threshold the hub does not fit; the map shows as text.
  narrow: "text",
  labels: { steps: "Ver dominios en texto" },
};

const topology = {
  caption: "Arquitectura",
  summary:
    "Arquitectura del producto: clientes Android, web y de administración consumen una API de backend que usa servicios cloud.",
  nodes: [
    { id: "android", type: "Cliente", name: "Android", col: 0, row: 0 },
    { id: "web", type: "Cliente", name: "Web", col: 1, row: 0 },
    { id: "admin", type: "Cliente", name: "Admin", col: 2, row: 0 },
    { id: "api", type: "Backend", name: "API", col: 0, row: 1, span: 3 },
    { id: "cloud", type: "Nube", name: "Servicios cloud", col: 1, row: 2 },
  ],
  edges: [
    { id: "android-api", from: "android", to: "api" },
    { id: "web-api", from: "web", to: "api" },
    { id: "admin-api", from: "admin", to: "api" },
    { id: "api-cloud", from: "api", to: "cloud" },
  ],
  stages: [],
  steps: [
    "Clientes Android, web y de administración.",
    "Los tres consumen una API de backend.",
    "La API usa servicios cloud.",
  ],
  // Below the wide threshold: one vertical pipeline.
  narrow: {
    nodes: [
      { id: "clients", type: "Clientes", name: "Android, Web, Admin", col: 0, row: 0 },
      { id: "api", type: "Backend", name: "API", col: 0, row: 1 },
      { id: "cloud", type: "Nube", name: "Servicios cloud", col: 0, row: 2 },
    ],
    edges: [
      { id: "clients-api", from: "clients", to: "api" },
      { id: "api-cloud", from: "api", to: "cloud" },
    ],
  },
  labels: { steps: "Ver arquitectura en texto" },
};

export const cases = {
  eyebrow: "03 · Casos",
  title: "Sistemas en operación, no capturas de pantalla.",
  items: [
    {
      id: "caso-a",
      label: "Caso A",
      title: "Sistema operativo para una empresa de materiales de construcción",
      pillars: ["Sistemas de negocio", "Automatización", "Ingeniería de software"],
      figure: { type: "diagram", flow: domainMap },
      facts: [
        {
          term: "Contexto",
          detail: "Empresa de materiales de construcción con varias empresas y sucursales.",
        },
        {
          term: "Problema",
          detail:
            "Crédito, márgenes, stock y despachos necesitaban controles consistentes entre empresas y sucursales.",
        },
        {
          term: "Sistema",
          detail: "Seis dominios conectados sobre Odoo, con reglas y aprobaciones donde se cruzan.",
        },
        {
          term: "Contribución",
          detail:
            "Contribuidor principal en los flujos de crédito, tesorería, control de margen y entregas.",
        },
        {
          term: "Evidencia",
          detail:
            "En producción: riesgo de crédito con cheques diferidos, margen contra precio vigente, ajustes de stock con aprobación y entregas con respaldo comercial.",
        },
      ],
      note: "Implementación en equipo.",
    },
    {
      id: "caso-b",
      label: "Caso B",
      title: "Intake comercial asistido por IA en WhatsApp",
      pillars: ["IA", "Automatización", "Sistemas de negocio"],
      // The full flow is the hero figure; this case shows what keeps it safe.
      figure: {
        type: "guardrails",
        caption: "Guardrails",
        items: [
          {
            label: "Solo lectura",
            text: "Las herramientas del agente sobre el ERP solo consultan catálogo, precio y cliente.",
          },
          {
            label: "Oportunidad en CRM",
            text: "Cada consulta llega al CRM como oportunidad con seguimiento.",
          },
          { label: "Handoff humano", text: "Un asesor toma la oportunidad." },
          {
            label: "Revisión humana",
            text: "El follow-up lo redacta la IA y lo revisa el asesor.",
          },
        ],
        reference: { href: "#fig-intake", text: "Ver el flujo completo (Fig. 01)" },
      },
      facts: [
        { term: "Contexto", detail: "Consultas comerciales que llegan por WhatsApp." },
        {
          term: "Problema",
          detail:
            "Cada consulta tenía que llegar al CRM como oportunidad, con datos correctos y seguimiento.",
        },
        {
          term: "Sistema",
          detail:
            "Agente de IA sobre el ERP, con herramientas de solo lectura y handoff a un asesor.",
        },
        {
          term: "Contribución",
          detail:
            "Diseño y puesta en producción: comportamiento del agente, reglas de negocio, integración de mensajería, configuración del modelo, herramientas en el ERP, handoff al CRM y guardrails de producción.",
        },
        { term: "Evidencia", detail: "En producción." },
      ],
      note: "Trabajo en equipo. El runtime del agente y el conector de WhatsApp son de terceros.",
    },
    {
      id: "caso-c",
      label: "Caso C",
      title: "Producto multiplataforma privado",
      pillars: ["Ingeniería de software", "Arquitectura"],
      figure: { type: "diagram", flow: topology },
      facts: [
        {
          term: "Contexto",
          detail: "Producto privado con clientes Android, web y de administración.",
        },
        { term: "Sistema", detail: "Tres clientes sobre una API de backend y servicios cloud." },
        {
          term: "Evidencia",
          detail:
            "Producto bajo confidencialidad. Las decisiones de arquitectura, los trade-offs y la deuda técnica gestionada se pueden revisar en una conversación.",
        },
      ],
    },
  ],
};
