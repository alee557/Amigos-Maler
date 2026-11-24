export const propertyTypes = ["House", "Apartment", "Commercial property", "Land"];

export function validatePropertyDetails(data) {
  const extra = {};
  for (const [key, max] of [["description",6000],["status",120],["development",300]]) {
    const value = data[key] ?? "";
    if (typeof value !== "string" || value.length > max) return null;
    extra[key] = value.trim();
  }
  extra.propertyType = data.propertyType || "";
  if (extra.propertyType && !propertyTypes.includes(extra.propertyType)) return null;
  extra.currency = data.currency || "CHF";
  if (!["CHF","USD","EUR"].includes(extra.currency)) return null;
  for (const key of ["amount","rooms","area"]) {
    const value = data[key];
    if (value === "" || value == null) { extra[key] = null; continue; }
    const number = Number(value);
    if ((typeof value !== "string" && typeof value !== "number") || !Number.isFinite(number) || number <= 0 || number > 1e12) return null;
    extra[key] = number;
  }
  for (const key of ["gallery","documents"]) {
    const value = data[key] ?? "";
    if (typeof value !== "string" || value.length > 10000) return null;
    const urls = value.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    if (urls.length > 12) return null;
    for (const url of urls) {
      try { const parsed = new URL(url); if (parsed.protocol !== "https:" || parsed.username || parsed.password) return null; }
      catch { return null; }
    }
    extra[key] = urls;
  }
  return extra;
}

export function filterProperties(rows, {offer="all", location="", propertyType="", maxPrice=""} = {}) {
  return rows.filter(row => (offer === "all" || row.type === offer)
    && (!location || row.location.toLowerCase().includes(location.trim().toLowerCase()))
    && (!propertyType || row.extra?.propertyType === propertyType)
    && (!maxPrice || (row.extra?.currency === "CHF" && row.extra?.amount != null && row.extra.amount <= Number(maxPrice))));
}
