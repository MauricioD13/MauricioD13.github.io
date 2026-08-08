## 1. Remove the pricing page and content collection

- [x] 1.1 Delete `src/pages/pricing.astro`.
- [x] 1.2 Delete the `src/content/pricing/` directory.
- [x] 1.3 Remove `pricingCollection` (definition + `pricing: pricingCollection` registration) from `src/content.config.ts`.
- [x] 1.4 Remove the `export type Pricing = ...` line from `src/types/index.ts`.

## 2. Remove the unused component chain

- [x] 2.1 Delete `src/layouts/components/PricingSection.astro`.
- [x] 2.2 Delete `src/layouts/components/PricingCard.astro`.
- [x] 2.3 Delete `src/layouts/components/PricingCheckout.tsx`.

## 3. Remove the homepage pricing embed

- [x] 3.1 Remove the `PricingSection` import and the `homepageData.pricing.enable && (...)` block from `src/pages/index.astro`.
- [x] 3.2 Remove the `pricing: z.object({...})` field from the `homepage` collection schema in `src/content.config.ts`.
- [x] 3.3 Remove the `pricing:` frontmatter block from `src/content/homepage/-index.md`.

## 4. Fix nav, footer, and dead links

- [x] 4.1 Remove the `{ "name": "Pricing", "url": "/pricing" }` entry from `main` in `src/config/menu.json`.
- [x] 4.2 Remove the `{ "name": "Pricing", "url": "/pricing" }` entry from `footer_primary` in `src/config/menu.json`.
- [x] 4.3 In `src/content/sections/our-story.md`, change the `button.link` from `/pricing` to `/contact` and `button.label` from `"Start Your 14-Day Free Trial"` to `"Get in Touch"`.
- [x] 4.4 In `src/pages/api/checkout.ts`, change `cancel_url` from `` `${url.origin}/pricing?canceled=true` `` to `` `${url.origin}/?canceled=true` ``.

## 5. Verification

- [x] 5.1 Run `pnpm check` and confirm no diagnostics reference the deleted pricing files/fields. (Only the 2 pre-existing, unrelated Stripe `apiVersion` typing errors remain.)
- [x] 5.2 Run `pnpm dev --background` (or reuse the running dev server) and confirm `/pricing` returns 404. (Confirmed via curl: `404`.)
- [x] 5.3 Confirm the main nav and footer no longer show a "Pricing" link, and the homepage no longer renders a pricing/plans section. (Confirmed: no "Pricing" text, no `id="pricing"`, no `/pricing` href anywhere in the homepage HTML.)
- [x] 5.4 Confirm the "Our Story" section's CTA now links to `/contact` with the updated label. (Confirmed: renders as `<a href="/contact" class="btn btn-primary py-4">Get in Touch</a>`.)
