export function swissToday() {
  return new Intl.DateTimeFormat("sv-SE", {timeZone:"Europe/Zurich",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());
}
export function validWorkDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value + "T12:00:00Z");
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === value && value >= swissToday();
}

export function validConsultationPreference(day, time) {
  if (!day && !time) return true;
  if (!validWorkDate(day) || typeof time !== "string" || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) return false;
  const now = new Intl.DateTimeFormat("sv-SE", {timeZone:"Europe/Zurich",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).format(new Date());
  return day > swissToday() || time > now;
}
