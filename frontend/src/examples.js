// Example prompts to seed LocalStorage on first run
// Structure kept simple for early UI wiring

const examplePrompts = [
  {
    id: "ex-translate-de-en",
    title: "Übersetze Deutsch → Englisch",
    text:
      "Übersetze den folgenden deutschen Text präzise ins Englische. Bewahre den Ton und die Bedeutung.\n\nText:\n{{text}}",
    model: "gpt-4o-mini",
    tags: ["translation", "de→en"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ex-summarize",
    title: "Fasse Text prägnant zusammen",
    text:
      "Lies den Text und erstelle eine prägnante Zusammenfassung in 3-5 Bulletpoints.\n\nText:\n{{text}}",
    model: "gpt-4o-mini",
    tags: ["summarization"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ex-bug-report",
    title: "Verbessere Bug-Report",
    text:
      "Formatiere die folgenden Notizen zu einem klaren Bug-Report mit Abschnitten: \nTitel, Umgebung, Schritte, Erwartet, Tatsächlich, Logs.\n\nNotizen:\n{{notes}}",
    model: "gpt-4o-mini",
    tags: ["software", "template"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ex-email-rewrite",
    title: "E-Mail umformulieren: freundlicher Ton",
    text:
      "Formuliere die folgende E-Mail in einem freundlichen, professionellen Ton um.\n\nE-Mail:\n{{email}}",
    model: "gpt-4o-mini",
    tags: ["writing", "email"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default examplePrompts;


