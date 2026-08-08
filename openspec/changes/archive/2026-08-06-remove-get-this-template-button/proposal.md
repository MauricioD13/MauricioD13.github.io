## Why

The site is being repositioned from the "Automark" GHL-reseller template into a personal cloud/security consulting portfolio (TribuOps). The header nav button and the FAQ section's CTA button both still say "Get This Template" and link to the themefisher.com affiliate page for the original Astro template product — content that has nothing to do with the site's new purpose and would confuse or mislead visitors.

## What Changes

- **BREAKING**: Remove the `navigation_button` block from `src/config/config.json` and its rendering in `src/layouts/partials/Header.astro` (both the mobile and desktop button markup).
- **BREAKING**: Remove the `button` field from `src/content/sections/faq.md` frontmatter and its rendering in `src/layouts/components/Faq.astro`.
- The homepage Call-to-Action section (`src/content/sections/call-to-action.md`, rendered via `CallToAction.astro`) is explicitly out of scope — it has a distinct label ("Start Your 14-Days Free Trial") and is left untouched.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
None — no existing capability spec in `openspec/specs/` covers header navigation or FAQ section behavior; this is a UI removal with no documented spec-level contract to update. `skip_specs: true` is set in `.openspec.yaml`.

## Impact

- `src/config/config.json` — drop `navigation_button` key.
- `src/layouts/partials/Header.astro` — remove destructuring of `navigation_button` and both button render blocks.
- `src/content/sections/faq.md` — drop `button` frontmatter field.
- `src/layouts/components/Faq.astro` — remove the button render block tied to `faqData.button`.
- No other partials/components reference these fields (confirmed no shared button component is involved).
