export function normalizePricingUpdates(updates, allowedSettings) {
  if (!Array.isArray(updates)) throw new TypeError("Pricing updates must be an array.");

  return updates.map(({ key, value }) => {
    const number = Number(value);
    if (!Object.hasOwn(allowedSettings, key)) throw new TypeError(`Unknown pricing key: ${key}`);
    if (!Number.isFinite(number) || number < 0 || number > 100_000_000) throw new TypeError(`Invalid value for ${key}`);
    return { key, value: number };
  });
}
