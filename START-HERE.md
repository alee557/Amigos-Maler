# Amigos Maler website delivery

This folder contains the updated website source and assets. The existing preview at localhost:3000 uses the project in Downloads. The companion Amigos-Maler-Website-Updates.patch contains the cumulative changes against that project. Use either the delivered copy or the patch.

## Start the delivered copy

Open a terminal in this folder and run npm ci. Configure .env.local using the supplied .env.example and your existing authorized development settings. Point DATABASE_URL at a staging PostgreSQL database. Run npm run db:push there, then npm run dev -- --port 3100. Open http://localhost:3100. Keep private settings outside source control.

Migration `022_property_details.sql` adds the approved public detail fields used by property pages, filters, galleries and public documents. Apply migrations before publishing or editing catalogue entries.

## Apply to the original project

From the Downloads project, run git apply --check followed by the full path to the patch in quotes. Once the check passes, run git apply followed by the same quoted path. The patch includes the earlier care and contact changes. Use the cumulative patch once. Install dependencies and apply migrations to staging before restarting the preview.

## What to review

- Open the main menu on desktop and mobile. Follow Werterhalt to Home Care and Business Care. Open Amigos Immo directly, then use its dropdown to reach Switzerland, Punta Cana and the owner form.
- On Projects, use the owner form to submit a test property. Staff can prepare its public description and region, approve a photo for display, publish and withdraw the listing. Check the buyer enquiry identifies the published property. Production inventory requires approved listings.
- Confirm search by location, property type and maximum CHF price, open each published detail page, and submit a viewing preference. Demo inventory is disabled unless `NEXT_PUBLIC_DEMO_INVENTORY=true` is deliberately set.
- On the homepage, confirm the hero consultation button opens the care plans. In the Phase 1 property visualizer, test the sample room and a JPEG/PNG/WebP upload, select a wall, move the colour slider, try the wallpaper/texture options, compare the original, download the preview and submit the finished design.
- On Schaden & Service, submit an incident report with a test image. On Partner werden, submit a separate contractor application. Check the correct enquiry and attachments in the staff area. Approve a test partner, activate access and confirm that assigned work is visible only to that partner.
- On the staff appointments page, set daily availability before testing a single execution day or range from the contact and care forms. Unavailable and unpublished days cannot be requested. Staff confirm the appointment.
- Compare the six quick package estimates with approved prices and test the detailed calculator separately. The homepage includes the Phase 1 real-photo visualizer; enhanced AI masking/rendering remains Phase 2.
- Test staff and visitor receipt with a staging inbox. Staff can retry pending notifications. Optional routing overrides include DAMAGE_NOTIFICATION_EMAIL, PARTNER_NOTIFICATION_EMAIL and IMMO_NOTIFICATION_EMAIL. WhatsApp uses +41 62 212 90 12. The homepage reviews carousel uses the existing testimonials dataset. Social destinations are pending.
- The client selected the van hero for /about and the former projects hero video for the regional introduction after Melanie. Confirm Melanie's final photo, About statistics, prices and approved property inventory before publication.

## Verification and open items

The clean production build, 19 public routes, Phase 1 scope check, calculator catalogue checks, pricing validation, request-field checks, consultation date/time validation and invalid-request rejection pass locally. Run `npm run check:phase1` after future changes. The production dependency audit previously reported zero known vulnerabilities; a fresh lookup could not reach the npm registry in the restricted audit environment.

This delivery has not been deployed. Database persistence, real Stripe/Resend/WhatsApp delivery and final responsive browser acceptance still require a configured staging environment. The supplied proposal says WordPress, while the delivered application is Next.js; obtain written platform acceptance before calling Phase 1 contractually complete. Confirm whether the built-in Amigos Operations CRM is the selected Phase 1 CRM or provide the authorized external CRM and field mapping. Business approval is also outstanding for rates and care terms, listing publication policy and final artwork. Bexio sync requires agreed fields, direction and authorized test access. No Bexio connection or live valuation calculation is delivered.
