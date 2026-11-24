import assert from "node:assert/strict";
import { normalizePricingUpdates } from "../src/lib/offerCalculator/pricingValidation.js";

const settings = { house_base_price: 6500 };

assert.deepEqual(normalizePricingUpdates([{ key: "house_base_price", value: "7200" }], settings), [
  { key: "house_base_price", value: 7200 }
]);
assert.throws(() => normalizePricingUpdates([{ key: "not_a_price", value: 1 }], settings), /Unknown pricing key/);
assert.throws(() => normalizePricingUpdates([{ key: "house_base_price", value: -1 }], settings), /Invalid value/);
assert.throws(() => normalizePricingUpdates([{ key: "house_base_price", value: Infinity }], settings), /Invalid value/);

console.log("Pricing update validation passed.");
