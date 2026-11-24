import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { connectedMask, demoWallRegionAt, ncsHueAt } from "../src/lib/propertyVisualizer.js";
import { createStripeCheckoutSession, sendWhatsAppAppointmentMessage } from "../src/lib/integrations.js";

const read = path => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const [home, visualizer, services, integrations, validation, calculator, packageJson] = await Promise.all([
  read("src/components/home/HomeBeforeProjects.jsx"),
  read("src/components/home/PropertyVisualizer.jsx"),
  read("src/app/services/ServicesContent.jsx"),
  read("src/lib/integrations.js"),
  read("src/lib/validation.js"),
  read("src/components/offer-calculator/OfferCalculator.jsx"),
  read("package.json")
]);

assert.match(home, /<PropertyVisualizer \/>/, "Homepage must render the Phase 1 visualizer.");
for (const feature of ["image/jpeg,image/png,image/webp", 'type="range"', "textures.map", "Download preview"]) {
  assert.ok(visualizer.includes(feature), `Visualizer is missing ${feature}.`);
}
assert.doesNotMatch(visualizer, /Mark wall corners|Undo last point/, "Removed manual-corner workflow must stay removed.");
assert.match(visualizer, /setHue\(Number\(event\.target\.value\)\); setBefore\(false\)/, "Changing an NCS colour must update the wall preview.");
assert.doesNotMatch(services, /Property Care &amp; Maintenance|Discover Property Care/, "Property Care belongs under Werterhalt, not Services.");
assert.match(services, /href="\/schadensservice"/, "Damage Service must route to its dedicated page.");
assert.match(integrations, /api\.stripe\.com/, "Stripe integration hook is missing.");
assert.match(integrations, /graph\.facebook\.com/, "WhatsApp Business integration hook is missing.");
assert.match(calculator, /AMIGOS CRM/, "Quote workflow must create a CRM lead.");
assert.match(validation, /Visualizer enquiry/, "Visualizer enquiries must pass server validation.");
assert.match(packageJson, /"next":/, "The delivered application platform must remain declared.");

const pixels = new Uint8ClampedArray([
  220, 220, 220, 255, 218, 218, 218, 255, 20, 20, 20, 255,
  221, 221, 221, 255, 219, 219, 219, 255, 25, 25, 25, 255
]);
assert.deepEqual([...connectedMask(pixels, 3, 2, 0, 0)], [255, 255, 0, 255, 255, 0], "Wall selection must stop at a contrasting boundary.");
assert.throws(() => connectedMask(pixels, 3, 2, 3, 0), RangeError);
assert.equal(demoWallRegionAt(0.05, 0.5)?.id, "left");
assert.equal(demoWallRegionAt(0.5, 0.5)?.id, "centre");
assert.equal(demoWallRegionAt(0.95, 0.5)?.id, "right");
assert.equal(demoWallRegionAt(0.5, 0.92), undefined, "The floor must not be colourable in the demo.");
assert.equal(ncsHueAt(0).notation, "NCS S 2050-Y");
assert.equal(ncsHueAt(9).notation, "NCS S 2050-Y90R");
assert.equal(ncsHueAt(10).notation, "NCS S 2050-R");
assert.equal(ncsHueAt(20).notation, "NCS S 2050-B");
assert.equal(ncsHueAt(30).notation, "NCS S 2050-G");
assert.equal(ncsHueAt(39).notation, "NCS S 2050-G90Y");

const originalFetch = global.fetch;
const originalEnvironment = {
  stripe: process.env.STRIPE_SECRET_KEY,
  whatsapp: process.env.WHATSAPP_ACCESS_TOKEN,
  phoneId: process.env.WHATSAPP_PHONE_NUMBER_ID
};
const requests = [];
global.fetch = async (url, options) => {
  requests.push({ url: String(url), options });
  return { ok: true, json: async () => ({ url: "https://checkout.example/session", messages: [{ id: "wamid.test" }] }) };
};
process.env.STRIPE_SECRET_KEY = "sk_test_phase1";
process.env.WHATSAPP_ACCESS_TOKEN = "wa_test_phase1";
process.env.WHATSAPP_PHONE_NUMBER_ID = "123456";
try {
  const checkout = await createStripeCheckoutSession({ currency: "CHF", amountCents: 12900, service: "Interior painting" });
  assert.equal(checkout.url, "https://checkout.example/session");
  assert.match(requests[0].url, /api\.stripe\.com\/v1\/checkout\/sessions/);
  assert.equal(requests[0].options.body.get("line_items[0][price_data][unit_amount]"), "12900");
  const whatsapp = await sendWhatsAppAppointmentMessage({ phone: "41790000000", customerName: "Phase One", scheduledText: "Tomorrow 10:00" });
  assert.equal(whatsapp.ok, true);
  assert.match(requests[1].url, /graph\.facebook\.com\/v20\.0\/123456\/messages/);
  assert.match(requests[1].options.body, /appointment_scheduled/);
} finally {
  global.fetch = originalFetch;
  if (originalEnvironment.stripe === undefined) delete process.env.STRIPE_SECRET_KEY; else process.env.STRIPE_SECRET_KEY = originalEnvironment.stripe;
  if (originalEnvironment.whatsapp === undefined) delete process.env.WHATSAPP_ACCESS_TOKEN; else process.env.WHATSAPP_ACCESS_TOKEN = originalEnvironment.whatsapp;
  if (originalEnvironment.phoneId === undefined) delete process.env.WHATSAPP_PHONE_NUMBER_ID; else process.env.WHATSAPP_PHONE_NUMBER_ID = originalEnvironment.phoneId;
}

console.log("Phase 1 checks passed: homepage visualizer, wall masking, quote/CRM, mocked Stripe/WhatsApp requests, Services ownership and damage routing.");
