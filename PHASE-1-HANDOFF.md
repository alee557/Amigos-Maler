# Amigos Maler / Amigos Immo — Phase 1 handoff

Date: 23 November 2026

## Scope interpretation

The original proposal places the frontend foundation, homepage, inner pages, CRM, Stripe, WhatsApp Business, responsive interactions and core integrations in Phase 1. It mentions the AI Vision Studio and AI quote experience in both the original brief and the Phase 2 card. This delivery treats a working real-photo visualizer and quote workflow as Phase 1, while automated AI detection, enhanced masking/rendering, portal intelligence and analytics remain Phase 2.

## Delivered in Phase 1

- Premium responsive homepage and full public inner-page structure.
- Working quote calculator and lead capture into the Amigos Operations CRM.
- Homepage property visualizer with sample room and own-photo upload.
- Automatic connected-wall selection without the rejected manual-corner workflow.
- Paint-colour slider, wallpapers/textures, original/finish comparison and preview download.
- Visualizer design enquiry with generated preview attachment.
- Stripe Checkout and WhatsApp Business Cloud API integration hooks.
- Dedicated Services, Schaden & Service, Werterhalt and Amigos Immo journeys.
- Property Care removed from Services and retained under Werterhalt.
- Validation and safe attachment handling for public enquiries.

## Verification completed

- Clean Next.js production build: 56 generated/static/dynamic routes.
- All 19 declared public routes returned HTTP 200.
- `npm run check:phase1` passed wall masking, feature wiring and mocked Stripe/WhatsApp payloads.
- Calculator catalogue, pricing, request-field and client-fix checks passed.
- Invalid empty consultation request was rejected with HTTP 400.
- Focused lint passed with no errors; existing image/link optimization warnings remain.

## Release acceptance still required

1. The proposal names WordPress, while the delivered application is Next.js. Obtain written approval of the delivered platform or separately scope a WordPress port.
2. Confirm that the built-in Amigos Operations CRM is the chosen CRM. An external CRM requires its name, credentials and approved field mapping.
3. Configure a staging database and run all migrations.
4. Test real Stripe, WhatsApp Business and Resend delivery with authorized staging credentials.
5. Complete a human responsive acceptance pass on real desktop, tablet and mobile browsers.
6. Approve final imagery, rates, care-package terms and publishable property inventory.

Phase 2 should start after these release gates are signed off; otherwise Phase 1 can be technically complete in source while remaining unaccepted in production.
