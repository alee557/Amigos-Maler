export const requestFields = {
  "Damage report": [
    { name: "damage", label: "Damage type", options: ["Water damage", "Mould", "Moisture", "Hail or storm", "Other"] },
    { name: "incidentDate", label: "Date of incident", type:"date", optional:true },
    { name: "insurance", label: "Insurer or claim reference (optional)", optional:true },
    { name: "urgency", label: "Urgency", options: ["Active damage", "Inspection requested", "Planning repairs"] },
    { name: "address", label: "Property address" },
    { name: "inspection", label: "Inspection preference", options: ["Contact me to arrange a visit", "Please review my report first"] }
  ],
  "Partner application": [
    { name: "company", label: "Company" },
    { name: "trade", label: "Trade or specialism" },
    { name: "region", label: "Service region" },
    { name: "address", label: "Business address" },
    { name: "website", label: "Website (optional)", type: "url", optional: true },
    { name: "references", label: "References (optional)", optional: true },
    { name: "consent", label: "I agree to the processing of my application as described in the privacy policy.", type: "checkbox" }
  ]
};

export function requestDetails(projectType, data) {
  const fields = requestFields[projectType];
  if (!Array.isArray(fields)) return [];
  const lines = [];
  for (const field of fields) {
    const value = data.get(field.name);
    if (field.optional && !value) continue;
    if (typeof value !== "string" || !value.trim() || value.length > 150 || (field.options && !field.options.includes(value))) return null;
    if (field.type === "checkbox" && value !== "on") return null;
    if (field.type === "url" && !/^https?:\/\//i.test(value)) return null;
    lines.push(field.label + ": " + value.trim());
  }
  return lines;
}
