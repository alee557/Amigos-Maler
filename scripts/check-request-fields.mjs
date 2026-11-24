import assert from "node:assert/strict";
import { requestDetails } from "../src/lib/requestFields.js";
import { validWorkDate } from "../src/lib/workDates.js";
import { validateConsultationInput } from "../src/lib/validation.js";

const partner = new URLSearchParams({company: "Example", trade: "Painting", region: "Olten", address: "Example 12", consent: "on"});
assert.equal(requestDetails("Partner application", partner).length, 5);
partner.delete("trade");
assert.equal(requestDetails("Partner application", partner), null);
const damage = new URLSearchParams({damage:"Water damage", urgency:"Active damage", address:"Example 12", inspection:"Please review my report first"});
assert.equal(requestDetails("Damage report",damage).length, 4);
damage.set("urgency","Unknown");
assert.equal(requestDetails("Damage report",damage),null);
assert.equal(validWorkDate("2020-01-01"),false);
assert.equal(validWorkDate("2099-02-29"),false);
assert.equal(validWorkDate("2099-03-01"),true);
for (const projectType of ["Damage report","Property listing","Property enquiry","Partner application","Visualizer enquiry","Property Preservation"]) {
  assert.equal(validateConsultationInput({name:"Test User",email:"test@example.com",message:"Test request details",projectType}).valid,true);
}
console.log("Request fields, project categories and execution date checks passed.");
