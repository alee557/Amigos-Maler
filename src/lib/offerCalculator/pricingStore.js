import fs from "node:fs/promises";
import path from "node:path";
import { sql } from "@/lib/db";
import { DEFAULT_PRICING_SETTINGS } from "./pricingSettings";
import { normalizePricingUpdates } from "./pricingValidation";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "pricing-settings.json");

/**
 * In-memory cached settings to prevent unnecessary disk/db reads on every high-frequency calculation.
 */
let memoryCache = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 2000; // 2 seconds

/**
 * Reads settings from the JSON fallback file.
 */
async function readFromFile() {
  try {
    const raw = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PRICING_SETTINGS, ...parsed };
  } catch (err) {
    console.warn("Could not read pricing-settings.json, using defaults:", err.message);
    return { ...DEFAULT_PRICING_SETTINGS };
  }
}

/**
 * Writes settings to the JSON fallback file.
 */
async function writeToFile(settings) {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(settings, null, 2), "utf-8");
}

/**
 * Loads dynamic pricing settings.
 * First tries to load from PostgreSQL pricing_settings table.
 * Local development can fall back to JSON; production fails closed when PostgreSQL is unavailable.
 */
export async function loadPricingSettings() {
  const now = Date.now();
  if (memoryCache && now - cacheTimestamp < CACHE_TTL_MS) {
    return memoryCache;
  }

  let dbSettings = null;
  try {
    const rows = await sql`select key, value from pricing_settings`;
    if (rows && rows.length > 0) {
      dbSettings = {};
      for (const row of rows) {
        const num = Number(row.value);
        if (!Number.isNaN(num)) {
          dbSettings[row.key] = num;
        }
      }
    }
  } catch (error) {
    if (process.env.NODE_ENV === "production") throw error;
  }

  const fileSettings = await readFromFile();
  const merged = {
    ...DEFAULT_PRICING_SETTINGS,
    ...fileSettings,
    ...(dbSettings || {})
  };

  memoryCache = merged;
  cacheTimestamp = now;
  return merged;
}

/**
 * Saves pricing updates.
 * Persists atomically to PostgreSQL in production and mirrors to JSON only in development.
 * @param {Array<{ key: string, value: number|string }>} updates
 */
export async function savePricingSettings(updates) {
  if (!Array.isArray(updates) || updates.length === 0) {
    return loadPricingSettings();
  }

  const normalizedUpdates = normalizePricingUpdates(updates, DEFAULT_PRICING_SETTINGS);

  // Load current settings
  const current = await loadPricingSettings();
  const updated = { ...current };

  for (const item of normalizedUpdates) {
    updated[item.key] = item.value;
  }

  try {
    await sql.begin(async (transaction) => {
      for (const item of normalizedUpdates) {
        await transaction`
          insert into pricing_settings (key, value, updated_at)
          values (${item.key}, ${String(item.value)}, now())
          on conflict (key) do update set
            value = ${String(item.value)},
            updated_at = now()
        `;
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV === "production") throw error;
  }

  if (process.env.NODE_ENV !== "production") await writeToFile(updated);
  memoryCache = updated;
  cacheTimestamp = Date.now();

  return updated;
}

/**
 * Resets all pricing settings back to the recommended Swiss painter average defaults.
 */
export async function resetToAverageDefaults() {
  const defaults = { ...DEFAULT_PRICING_SETTINGS };

  try {
    await sql.begin(async (transaction) => {
      for (const [key, value] of Object.entries(defaults)) {
        await transaction`
        insert into pricing_settings (key, value, updated_at)
        values (${key}, ${String(value)}, now())
        on conflict (key) do update set
          value = ${String(value)},
          updated_at = now()
      `;
      }
    });
  } catch (error) {
    if (process.env.NODE_ENV === "production") throw error;
  }

  if (process.env.NODE_ENV !== "production") await writeToFile(defaults);
  memoryCache = defaults;
  cacheTimestamp = Date.now();

  return defaults;
}
