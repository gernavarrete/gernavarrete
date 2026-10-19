// Hero system visual: the AI-assisted sales intake (case 2 in
// DESIGN_DIRECTION §14). Nodes sit on a two-column grid (col 0/1, row n);
// `span` makes a node take both columns.
export const heroFlow = {
  caption: "Fig. 01 · Intake comercial con IA",
  kind: "Arquitectura",
  summary:
    "Flujo del intake comercial: un mensaje de WhatsApp llega al ERP, el agente de IA consulta al modelo y a herramientas de solo lectura, crea una oportunidad en CRM y un asesor la toma.",
  nodes: [
    { id: "client", type: "Origen", name: "Cliente", col: 0, row: 0 },
    { id: "whatsapp", type: "Canal", name: "WhatsApp", col: 1, row: 0 },
    { id: "erp", type: "ERP", name: "Odoo", col: 0, row: 1 },
    { id: "meta", type: "Webhook", name: "Meta", col: 1, row: 1 },
    { id: "agent", type: "Agente", name: "Agente IA", col: 0, row: 2 },
    { id: "model", type: "Modelo", name: "LLM (Gemini)", col: 1, row: 2 },
    {
      id: "tools",
      type: "Herramientas",
      name: "Solo lectura",
      detail: "catálogo · precio · cliente",
      col: 0,
      row: 3,
      span: true,
    },
    { id: "crm", type: "CRM", name: "Oportunidad", col: 0, row: 4 },
    { id: "advisor", type: "Humano", name: "Asesor", col: 0, row: 5 },
  ],
  edges: [
    { id: "client-whatsapp", from: "client", to: "whatsapp" },
    { id: "whatsapp-meta", from: "whatsapp", to: "meta" },
    { id: "meta-erp", from: "meta", to: "erp" },
    { id: "erp-agent", from: "erp", to: "agent" },
    { id: "agent-model", from: "agent", to: "model", lane: "start" },
    { id: "model-agent", from: "model", to: "agent", lane: "end" },
    { id: "agent-tools", from: "agent", to: "tools" },
    { id: "tools-crm", from: "tools", to: "crm" },
    { id: "crm-advisor", from: "crm", to: "advisor" },
  ],
  // Input, reasoning, action, human: four stages keep the sequence under 5s.
  stages: [
    ["client-whatsapp", "whatsapp-meta", "meta-erp"],
    ["erp-agent", "agent-model", "model-agent"],
    ["agent-tools", "tools-crm"],
    ["crm-advisor"],
  ],
  notes: [
    {
      col: 1,
      row: 5,
      label: "Handoff humano",
      text: "Follow-up redactado por IA, revisado por el asesor.",
    },
  ],
  status: { label: "En producción", text: "Intake comercial" },
  steps: [
    "El cliente escribe por WhatsApp.",
    "Meta entrega el mensaje por webhook al ERP Odoo.",
    "El agente de IA procesa la consulta y consulta al modelo (Gemini).",
    "El agente usa herramientas de solo lectura: catálogo, precio y cliente.",
    "Se crea una oportunidad en CRM.",
    "Handoff humano: un asesor toma la oportunidad. El follow-up lo redacta la IA y lo revisa el asesor.",
  ],
  labels: {
    replay: "Repetir",
    replayName: "Repetir animación del diagrama",
    steps: "Ver pasos en texto",
  },
};
