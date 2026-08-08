## Context

See `proposal.md` for motivation. Scope was confirmed with the site owner: delete `/pricing` entirely (no redirect), remove the homepage-embedded pricing/plans section along with it, and fix every link that currently points at `/pricing` rather than leave dead links.

Everything pricing-related fans out from one content collection (`pricingCollection` in `src/content.config.ts`, backed by `src/content/pricing/-index.md`) consumed by two entry points — `src/pages/pricing.astro` and the homepage's embedded block in `src/pages/index.astro` — both rendered through the shared `PricingSection.astro` → `PricingCard.astro` → `PricingCheckout.tsx` component chain. Removing both entry points leaves that whole chain with zero importers.

## Goals / Non-Goals

**Goals:**
- Remove `/pricing`, its nav/footer links, and its homepage embed with no dead links left behind (nav, footer, Our Story CTA, Stripe cancel URL).
- Delete the component chain and content collection that become fully unused as a result, rather than leaving orphaned files.
- Keep the change purely additive-free — no new components, no redesign of surrounding sections.

**Non-Goals:**
- Removing or modifying the `/api/checkout` or `/api/webhooks/stripe` routes, or the Stripe/GHL env var wiring — the backend integration stays intact for potential future re-use, even though no UI currently triggers it after this change.
- Rewriting the rest of `src/content/sections/our-story.md` (it still has other leftover SaaS-template copy — fictional CEO, "Automark" branding — untouched here). Only its CTA `link` (and the trial-specific `label`, since "Start Your 14-Day Free Trial" no longer makes sense pointing at a contact form) is fixed to stop it dead-linking.
- Adding a `/pricing` → somewhere redirect. The chosen approach is a clean 404, since there's no equivalent replacement page (unlike the earlier `/case-study` → `/projects` rename, which redirected because the content moved rather than disappeared).

## Decisions

### 1. Delete the whole pricing component chain, not just the page
`PricingSection.astro`, `PricingCard.astro`, and `PricingCheckout.tsx` are each single-purpose to the pricing feature (grep confirms no other importers). Once `pricing.astro` and the homepage block are gone, all three have zero remaining references. Per project convention (delete code confirmed unused rather than leaving it as a backwards-compat shim), delete them together with the page.

*Alternative considered*: keep the components in case pricing comes back later. Rejected — dead code with no importer is exactly what the project guidelines say to remove; if pricing returns, it'll likely need a redesigned plan structure anyway given the consulting-portfolio repositioning.

### 2. `skip_specs: true` for this change
No existing OpenSpec capability spec describes pricing/navigation behavior (nothing has been archived yet in `openspec/specs/`), and this change only removes template leftovers rather than introducing new product behavior worth formally specifying. Declared `skip_specs: true` in `.openspec.yaml` instead of inventing a capability spec purely to satisfy validation.

### 3. Stripe `cancel_url` repointed to `/`, not deleted
`src/pages/api/checkout.ts`'s `cancel_url: ${url.origin}/pricing?canceled=true` would reference a now-deleted page. Since the checkout API itself is being kept (Non-Goals above), fix the dangling reference rather than leave it — point it at `/` (mirroring the existing `success_url`, which already redirects to the site root with query params) instead of inventing a new page for this one case.

### 4. Our Story CTA repointed to `/contact`
`src/content/sections/our-story.md`'s `button.link: /pricing` is replaced with `/contact`, matching the CTA pattern already used elsewhere on the site (e.g. the homepage lead-checklist button). The label "Start Your 14-Day Free Trial" is changed to "Get in Touch" since a free-trial CTA no longer has anywhere accurate to point.

## Risks / Trade-offs

- **`/pricing` 404s for anyone with the URL bookmarked or indexed** → accepted trade-off per explicit decision; no replacement content exists to redirect to.
- **`/api/checkout` becomes unreachable from the UI** → acceptable per Non-Goals; route stays functional for future re-wiring, just currently orphaned.
