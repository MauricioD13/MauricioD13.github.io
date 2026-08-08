## 1. Header nav button

- [x] 1.1 Remove the `navigation_button` block from `src/config/config.json`
- [x] 1.2 Remove the `navigation_button` destructure and both render blocks (mobile `.btn-outline`, desktop `.btn-primary`) in `src/layouts/partials/Header.astro`

## 2. FAQ section button

- [x] 2.1 Remove the `button` frontmatter field from `src/content/sections/faq.md`
- [x] 2.2 Remove the `faqData.button` render block in `src/layouts/components/Faq.astro`
- [x] 2.3 Check `src/content.config.ts` for a `button` field on the `faqSection` schema; if present and required, remove or relax it to match the frontmatter change — was present and required, removed to match

## 3. Verification

- [x] 3.1 Run `pnpm check` and confirm no new errors versus the pre-existing baseline (Stripe `apiVersion` mismatches) — confirmed, only the 2 pre-existing Stripe errors remain
- [x] 3.2 Start the dev server and visually confirm the header no longer shows a "Get This Template" button (mobile + desktop) and the FAQ section no longer shows its CTA button — confirmed via curl, 0 occurrences of "Get This Template" on homepage
- [x] 3.3 Confirm the homepage Call-to-Action section's "Start Your 14-Days Free Trial" button is untouched — confirmed present
