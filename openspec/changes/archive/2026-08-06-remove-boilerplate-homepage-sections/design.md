## Context

See proposal.md - Why. Four of the five sections in scope (Business Needs, Comparison Row, Testimonial, FAQ) are shared components consumed via `getListPage()` from single-entry content collections and imported directly into multiple page files — removing them means deleting the collection, component, and every page-level `<Component />` usage + import, not just one file. The fifth (CTA) and the Brands headline stay structurally in place; only their copy changes.

## Goals / Non-Goals

**Goals:**
- Remove every page's reference to the four deleted sections so no page throws on a missing import or renders an empty gap where the section used to be.
- Leave `pnpm check` and every affected route's HTTP 200 status unchanged after removal.

**Non-Goals:**
- Rewriting the FAQ/testimonials with real content — out of scope per the user's "remove for now" decision; can be re-added later as a fresh change once real content exists.
- Touching `/careers`, `/elements`, `/features` vs `/services`, or any other route-level cleanup flagged in the audit — separate change.
- Fixing `params.footer_tagline`, `params.meta_description`, or `site.base_url` in config.json — flagged in the audit but not part of what was approved this round.

## Decisions

- **Hard delete over `enable: false` for the four standalone sections.** Consistent with the earlier "Get This Template" button removal: these collections' entire content is generic-template boilerplate with no salvageable structure, so there's nothing worth preserving behind a flag. Re-adding any of them later means writing new content anyway.
- **Soft-disable (`enable: false`) for `testimonial_quote` / `single_testimonial` instead of deleting.** Unlike the standalone sections, these are homepage-schema-native quote/stat slots with already-adapted TribuOps copy (only the placeholder name is fake) — the schema already has an `enable` flag built for exactly this "not ready yet" case, so use it instead of restructuring the homepage schema.
- **CTA rewrite copy**: title/description shift from "Local Business Growth... Autopilot" sales language to a direct security/cloud-engagement pitch; button label changes from "Start Your 14-Days Free Trial" (nothing to trial) to a "Get in Touch" style CTA pointing at `/contact`, matching the same fix already applied to the Our Story section's button in an earlier change.
- **Brands headline**: drop the "10,000+ local businesses" claim (false for a solo portfolio) in favor of language describing the tools/platforms shown.
- **Footer copyright**: replace with TribuOps/Mauricio Cuello attribution; keep the same `markdownify()`-rendered HTML-string shape so `Footer.astro` needs no code change, only the config value.

## Risks / Trade-offs

- [Deleting `businessNeedsSection`/`comparisonRowSection`/`testimonialSection`/`faqSection` from `content.config.ts` will make `pnpm check`/`astro sync` fail loudly if any leftover file still references the old collection names] → Grep for each collection name after deletion, before running `pnpm check`, to catch stragglers.
- [`Faq.astro` is imported on 7 different page files — easy to miss one] → Task list enumerates every consuming file explicitly; verification step re-greps for `Faq`/`Testimonial`/`BusinessNeeds`/`ComparisonRow` imports across `src/pages/` after edits.
