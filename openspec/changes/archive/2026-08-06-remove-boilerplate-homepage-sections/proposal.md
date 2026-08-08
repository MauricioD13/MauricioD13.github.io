## Why

A repo-wide audit found several homepage-rendered content sections that are still unedited leftovers from the "Automark" GHL-reseller SaaS template: a sales-funnel section, a fake tool-price-comparison table, a fake-reviews carousel, and an FAQ full of GHL product boilerplate ("Missed Call Auto-Responder"). The site-wide CTA button links to a dead Themefisher affiliate URL, and the footer literally credits and links to "Themefisher" on every page. None of this fits a personal cloud/security consulting portfolio.

## What Changes

- **BREAKING**: Remove the Business Needs section (sales-funnel steps) and its `businessNeedsSection` collection, component, and card — rendered on `/` and `/features`.
- **BREAKING**: Remove the Comparison Row section (fake tool-price comparison table) and its `comparisonRowSection` collection and component — rendered on `/` and `/features`.
- **BREAKING**: Remove the shared Testimonial section (fake reviews from a roofer/dentist/HVAC contractor) and its `testimonialSection` collection, partial, and card — rendered on `/`, `/about`, and `/projects`.
- Disable (via existing `enable: false` flags, not delete) the homepage's embedded `testimonial_quote` and `single_testimonial` blocks — same fake-testimonial problem (placeholder name "Ronald Richards, Growing Tech Co."), but these are structural quote/stat slots built into the homepage schema, worth keeping for when real client quotes exist.
- **BREAKING**: Remove the FAQ section (GHL product boilerplate) and its `faqSection` collection and component — rendered on `/`, `/about`, `/contact`, `/features`, `/careers`, `/careers/[single]`, `/integrations`.
- Rewrite the site-wide Call-to-Action section (`sections/call-to-action.md`) copy for a consulting portfolio and point its button at `/contact` instead of the dead Themefisher affiliate link.
- Update the Brands section headline (`sections/brands.md`) — currently "Trusted by 10,000+ local businesses" despite the logos already being AWS/Docker/Terraform/etc.
- Replace the footer copyright line in `src/config/config.json` (`params.copyright`) — currently renders "Themefisher" with a live link to themefisher.com on every page.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
None — this is content/section removal and copy fixes with no capability spec in `openspec/specs/` covering homepage section behavior. `skip_specs: true` is set in `.openspec.yaml`.

## Impact

- `src/content.config.ts` — remove `businessNeedsSectionCollection`, `comparisonRowSectionCollection`, `testimonialSectionCollection`, `faqSectionCollection` schema definitions and their entries in the `collections` map.
- `src/types/index.ts` — remove `BusinessNeedsSection`, `ComparisonRowSection`, `TestimonialSection`, `FaqSection` type exports.
- `src/layouts/components/BusinessNeeds.astro`, `ComparisonRow.astro`, `StepCard.astro` (only consumer of StepCard), `Faq.astro` — delete.
- `src/layouts/partials/Testimonial.astro`, `src/layouts/components/TestimonialCard.astro` (only consumer) — delete.
- `src/content/sections/business-needs.md`, `comparison-row.md`, `testimonial.md`, `faq.md` — delete.
- `src/pages/index.astro` — remove `<BusinessNeeds />`, `<ComparisonRow />`, `<Testimonial />`, `<Faq />` usages and imports.
- `src/pages/about.astro`, `src/pages/projects/index.astro` — remove `<Testimonial />` usage and import.
- `src/pages/features.astro` — remove `<BusinessNeeds />`, `<ComparisonRow />`, `<Faq />` usage and imports.
- `src/pages/contact.astro`, `src/pages/careers/index.astro`, `src/pages/careers/[single].astro`, `src/pages/integrations.astro` — remove `<Faq />` usage and import.
- `src/content/homepage/-index.md` — set `testimonial_quote.enable: false`, `single_testimonial.enable: false`.
- `src/content/sections/call-to-action.md` — rewrite title/description/button copy, button link → `/contact`.
- `src/content/sections/brands.md` — rewrite title.
- `src/config/config.json` — rewrite `params.copyright`.
