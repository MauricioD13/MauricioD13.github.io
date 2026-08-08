## Why

This site is being repositioned as a personal cloud/security consulting portfolio (see the earlier `portafolio-and-services` change), not a GHL-reseller SaaS product with self-serve subscription tiers. A fixed-plan pricing page with a Stripe subscription checkout no longer fits a consulting engagement model, so the `/pricing` page, its nav entries, and its embedded homepage section should be removed rather than left as unused template leftovers.

## What Changes

- **BREAKING**: Delete the `/pricing` route (`src/pages/pricing.astro`) and the `pricing` content collection (`src/content/pricing/`, `pricingCollection` in `src/content.config.ts`). Visiting `/pricing` directly now 404s — no redirect, since there's no equivalent page to send visitors to.
- Remove the "Pricing" entries from both the main nav and the footer "Primary" column in `src/config/menu.json`.
- Remove the pricing/plans section embedded on the homepage (`homepageData.pricing` block in `src/pages/index.astro`, and the `pricing` field from the `homepage` collection schema and `src/content/homepage/-index.md`). This also removes the only other place Stripe checkout buttons appeared on the site.
- Delete the now-unused `PricingSection.astro`, `PricingCard.astro`, and `PricingCheckout.tsx` components (each has zero remaining importers once the page and homepage section are gone) and the `Pricing` type export in `src/types/index.ts`.
- Fix the "Our Story" CTA button (`src/content/sections/our-story.md`), which currently links to `/pricing` — repoint it to `/contact` (matching the CTA pattern used elsewhere, e.g. the homepage lead-checklist button) instead of leaving a dead link.
- Fix the Stripe Checkout `cancel_url` in `src/pages/api/checkout.ts`, which currently redirects back to `/pricing` on a canceled checkout — repoint to `/` so the API route doesn't reference a deleted page (the checkout API itself, `/api/checkout`, and the webhook handler stay in place; only their now-unreachable UI entry points are removed).

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
(none — no pre-existing OpenSpec capabilities cover pricing/navigation in this project; this is a removal of template leftovers, not a change to a specified behavior)

## Impact

- **Code**: `src/pages/pricing.astro` (deleted), `src/pages/index.astro`, `src/content.config.ts`, `src/config/menu.json`, `src/layouts/components/PricingSection.astro` (deleted), `src/layouts/components/PricingCard.astro` (deleted), `src/layouts/components/PricingCheckout.tsx` (deleted), `src/types/index.ts`, `src/content/sections/our-story.md`, `src/pages/api/checkout.ts`.
- **Content**: `src/content/pricing/` directory deleted; `src/content/homepage/-index.md` loses its `pricing` frontmatter block.
- **No change to `/api/checkout` or `/api/webhooks/stripe` route logic** — they remain functional but currently have no UI entry point on the site after this change.
