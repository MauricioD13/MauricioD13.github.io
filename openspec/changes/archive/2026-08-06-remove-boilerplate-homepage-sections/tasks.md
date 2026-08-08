## 1. Remove Business Needs section

- [x] 1.1 Delete `src/layouts/components/BusinessNeeds.astro` and `src/layouts/components/StepCard.astro`
- [x] 1.2 Delete `src/content/sections/business-needs.md`
- [x] 1.3 Remove `businessNeedsSectionCollection` from `src/content.config.ts` (schema definition + `collections` map entry)
- [x] 1.4 Remove `BusinessNeedsSection` type export from `src/types/index.ts`
- [x] 1.5 Remove `<BusinessNeeds />` usage + import from `src/pages/index.astro`
- [x] 1.6 Remove `<BusinessNeeds />` usage + import from `src/pages/features.astro`

## 2. Remove Comparison Row section

- [x] 2.1 Delete `src/layouts/components/ComparisonRow.astro`
- [x] 2.2 Delete `src/content/sections/comparison-row.md`
- [x] 2.3 Remove `comparisonRowSectionCollection` from `src/content.config.ts`
- [x] 2.4 Remove `ComparisonRowSection` type export from `src/types/index.ts`
- [x] 2.5 Remove `<ComparisonRow />` usage + import from `src/pages/index.astro`
- [x] 2.6 Remove `<ComparisonRow />` usage + import from `src/pages/features.astro`

## 3. Remove shared Testimonial section

- [x] 3.1 Delete `src/layouts/partials/Testimonial.astro` and `src/layouts/components/TestimonialCard.astro`
- [x] 3.2 Delete `src/content/sections/testimonial.md`
- [x] 3.3 Remove `testimonialSectionCollection` from `src/content.config.ts`
- [x] 3.4 Remove `TestimonialSection` type export from `src/types/index.ts`
- [x] 3.5 Remove `<Testimonial />` usage + import from `src/pages/index.astro`
- [x] 3.6 Remove `<Testimonial />` usage + import from `src/pages/about.astro`
- [x] 3.7 Remove `<Testimonial />` usage + import from `src/pages/projects/index.astro`

## 4. Disable homepage-embedded fake testimonials

- [x] 4.1 Set `testimonial_quote.enable: false` in `src/content/homepage/-index.md`
- [x] 4.2 Set `single_testimonial.enable: false` in `src/content/homepage/-index.md`

## 5. Remove FAQ section

- [x] 5.1 Delete `src/layouts/components/Faq.astro`
- [x] 5.2 Delete `src/content/sections/faq.md`
- [x] 5.3 Remove `faqSectionCollection` from `src/content.config.ts`
- [x] 5.4 Remove `FaqSection` type export from `src/types/index.ts`
- [x] 5.5 Remove `<Faq />` usage + import from `src/pages/index.astro`
- [x] 5.6 Remove `<Faq />` usage + import from `src/pages/about.astro`
- [x] 5.7 Remove `<Faq />` usage + import from `src/pages/contact.astro`
- [x] 5.8 Remove `<Faq />` usage + import from `src/pages/features.astro`
- [x] 5.9 Remove `<Faq />` usage + import from `src/pages/careers/index.astro`
- [x] 5.10 Remove `<Faq />` usage + import from `src/pages/careers/[single].astro`
- [x] 5.11 Remove `<Faq />` usage + import from `src/pages/integrations.astro`

## 6. Copy fixes

- [x] 6.1 Rewrite `src/content/sections/call-to-action.md` — title/description for a consulting portfolio, button label + link → `/contact`
- [x] 6.2 Rewrite `src/content/sections/brands.md` title — drop "10,000+ local businesses" claim
- [x] 6.3 Rewrite `params.copyright` in `src/config/config.json` — replace Themefisher attribution/link with TribuOps/Mauricio Cuello

## 7. Verification

- [x] 7.1 Grep `src/pages/` and `src/layouts/` for any remaining `BusinessNeeds`, `ComparisonRow`, `Testimonial`, `Faq` references to confirm no stragglers — confirmed clean, only harmless comment labels for the intentionally-kept homepage testimonial_quote/single_testimonial blocks remain
- [x] 7.2 Run `pnpm check` and confirm no new errors versus the pre-existing baseline (Stripe `apiVersion` mismatches) — confirmed, same 2 pre-existing errors only; file count dropped 76→70 matching the 6 deleted components
- [x] 7.3 Start the dev server and curl every affected route (`/`, `/about`, `/contact`, `/projects`, `/features`, `/careers`, `/integrations`) to confirm 200s — confirmed, all 200
- [x] 7.4 Visually confirm the homepage no longer shows Business Needs, Comparison Row, or fake testimonials, and the footer/CTA show the new copy — confirmed via rendered-HTML content checks: 0 occurrences of old boilerplate phrases, new CTA/brands/footer copy all present
