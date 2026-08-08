## Context

`src/config/menu.json` and the homepage hero (`src/content/homepage/-index.md`) both already link to `/services`, but no route or content backs it — it 404s today. The real services/features content lives at `/features` (`src/pages/features.astro`), which is out of scope here (confirmed with the site owner — this change only needs a placeholder at `/services`, not a rework of `/features`).

The repo already has a generic content-page mechanism for exactly this shape of page: `src/pages/[regular].astro` is a catch-all that renders any entry in the `pages` content collection (`src/content/pages/`) through a shared `PageHeader` + `Content` layout, driven by a Zod schema with `title`, `description`, `meta_title`, `image`, `draft` (`src/content.config.ts`). `privacy-policy.md` and `term-and-condition.md` already use this pattern for plain informational pages.

## Goals / Non-Goals

**Goals:**
- Make `/services` return a real, on-brand page instead of 404ing.
- Give the placeholder a way for interested visitors to reach the site owner (link to `/contact`).
- Reuse existing routing/content/shortcode machinery — no new components, schema fields, or `.astro` routes.

**Non-Goals:**
- Building out real services content — that's a future change once the offering is finalized.
- Touching `/features`, `menu.json`, or the homepage CTA — they already point at `/services` correctly.
- Email capture / "notify me" functionality — out of scope per the minimal placeholder goal; the existing `/contact` page already covers inbound interest.

## Decisions

### 1. Content file in the `pages` collection, not a new `.astro` route
Add `src/content/pages/services.md`, rendered automatically by the existing `[regular].astro` catch-all. This matches project convention (CLAUDE.md: "Add a new generic content page by dropping a `.md`/`.mdx` file in `src/content/pages/`, not by adding a new `.astro` route") and needs zero new code.

*Alternative considered*: a dedicated `src/pages/services.astro` with bespoke "coming soon" layout (centered hero, no breadcrumb-style header). Rejected for now — the standard `PageHeader` + prose `Content` layout (already used for `privacy-policy.md`) is enough for a placeholder message, and a custom layout can replace this file later with no URL change when real services content is ready.

### 2. Contact CTA via the existing `Button` shortcode
Use the already-auto-imported `Button` MDX shortcode (`<Button label="Get in touch" link="/contact" style="solid" />`) inside the markdown body, same as documented in `src/content/pages/elements.mdx`. No new component needed.

## Risks / Trade-offs

- **Placeholder feels sparse** → acceptable for an interim state; the same file is straightforward to replace with real content later without any routing changes.
- **Visual style is the generic legal-page template (PageHeader + prose), not a bespoke "coming soon" hero** → acceptable trade-off for zero new code; can be revisited if the placeholder needs to live for a long time.
