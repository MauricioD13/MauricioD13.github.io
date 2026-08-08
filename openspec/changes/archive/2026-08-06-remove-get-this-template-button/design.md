## Context

See proposal.md - Why. Both buttons render inline anchor markup local to their own file (`Header.astro`, `Faq.astro`) — neither goes through a shared CTA/button component, so removal is isolated to four files with no risk of affecting other sections.

## Goals / Non-Goals

**Goals:**
- Remove all header-nav and FAQ-section markup and config tied to the "Get This Template" affiliate link.

**Non-Goals:**
- Touching the homepage Call-to-Action section (`call-to-action.md` / `CallToAction.astro`) — different label, out of scope per proposal.
- Introducing a replacement button/CTA in either location.

## Decisions

- **Delete config keys and markup outright, rather than `enable: false`.** No plan to bring back an affiliate-template CTA on this portfolio site, so leaving dead config/conditional-render code around is pure clutter.
- **Header**: remove both the mobile (`.btn-outline`) and desktop (`.btn-primary`) render blocks in `Header.astro`, and the `navigation_button` destructure, and the `navigation_button` key in `config.json`.
- **FAQ**: remove the `button` field from `faq.md` frontmatter and its render block in `Faq.astro`. Leave the rest of the FAQ section (title, description, items) untouched.

## Risks / Trade-offs

- [Zod schema for the `faqSection` collection may still declare a required/optional `button` field in `src/content.config.ts`] → Check the schema during implementation; if `button` is typed there, either make it optional or remove it to match the frontmatter change, otherwise `astro check`/build will fail.
