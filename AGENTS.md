# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**Automark** — an Astro 7 + Tailwind CSS 4 marketing site template for GoHighLevel (GHL) SaaS resellers, with a Stripe subscription checkout flow. Content is authored as Markdown/MDX and managed via the Sitepins git-based CMS. Deployed as a Vercel serverless app (adapter is required — several API routes are server-rendered, not static).

## Commands

Package manager is **pnpm** (see `packageManager` in package.json).

```bash
pnpm dev              # concurrently runs themeGenerator.js --watch + astro dev
pnpm build             # themeGenerator.js (one-shot) + astro build
pnpm preview            # astro preview
pnpm check              # astro check (TypeScript/template diagnostics)
pnpm format             # prettier -w ./src
pnpm deploy:cf-workers   # build + wrangler deploy (Cloudflare Workers target)
pnpm preview:cf-workers  # build + wrangler dev
```

When starting the dev server, use background mode so it doesn't block the session:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, `astro dev logs`.

There is no test suite in this repo. `astro check` is the primary correctness gate; run it before considering a task done.

## Architecture

### Theme system — generated CSS, never hand-edit

`src/config/theme.json` (colors, fonts) is compiled by `scripts/themeGenerator.js` into `src/styles/generated-theme.css`, which defines a Tailwind v4 `@theme` block (`--color-primary`, `--font-primary`, etc.). This file has a `DO NOT EDIT` header — change `theme.json` and re-run the generator (or let `pnpm dev`'s watcher do it) instead of editing the CSS directly. `astro.config.mjs` also reads `theme.json` directly to build the Astro Fonts API config (Google Fonts, parsed from strings like `"Inter+Tight:wght@400;500;600"`).

### Config files (`src/config/`)

- `config.json` — site title, base URL, GHL/Stripe-adjacent form action placeholders, footer/metadata.
- `menu.json`, `social.json` — nav and social links.
- `theme.json` — source of truth for the generated theme CSS (see above).

`astro.config.mjs` reads `config.json` for `site`/`base`/`trailingSlash`.

### Content collections (`src/content.config.ts`)

Astro Content Layer with the `glob()` loader, one collection per content type (blog, pages, about, contact, homepage, features, pricing, caseStudy, careers, integrations, plus singleton "section" collections: ctaSection, faqSection, brandsSection, ourStorySection, testimonialSection, comparisonRowSection, businessNeedsSection). Each has a hand-written Zod schema — extend the schema in this one file when adding frontmatter fields, not per-page.

Naming convention: collection index/singleton files are prefixed with a leading dash (`-index.md`) rather than `_index`, because `_index` collides with Astro loader conventions. Collections that are single-entry (homepage, features, pricing, integrations, section collections) glob on `**/-*.{md,mdx}` specifically to pick up only that dash-prefixed file.

`src/lib/contentParser.astro` provides the two helpers used everywhere to read collections:
- `getSinglePage(collection)` — returns all *non-draft, non-index* entries (filters out `draft: true` and any id starting with `-`). Use for listing regular content items (blog posts, case studies, career postings).
- `getListPage(collection, "-index")` — fetches the singleton index/page-level entry (hero copy, section toggles, etc.) for a collection.

`src/lib/taxonomyParser.astro` handles category/tag taxonomy pages.

### Path aliases (tsconfig.json)

```
@/*            -> src/*
@/components/* -> src/layouts/components/*
@/shortcodes/* -> src/layouts/shortcodes/*
@/helpers/*    -> src/layouts/helpers/*
@/partials/*   -> src/layouts/partials/*
```

Note `@/*` maps to `src/*`, not `src/layouts/*` — but most reusable UI actually lives under `src/layouts/` (components, partials, shortcodes, helpers), which is why the more specific aliases exist. `src/components` does not exist in this project; don't create page-level UI there.

### Layout structure

- `src/layouts/Base.astro` — root HTML shell (head/meta, header, footer) every page wraps in.
- `src/layouts/partials/` — large page sections composed onto `Base` (Header, Footer, Features, Testimonial, CallToAction, GHLMeeting).
- `src/layouts/components/` — smaller reusable pieces (cards, badges, forms). Mix of `.astro` (static) and `.tsx` (interactive React islands, e.g. `PricingCheckout.tsx`, `DynamicIcon.tsx`).
- `src/layouts/shortcodes/` — MDX-only components (`Button`, `Accordion`, `Notice`, `Video`, `Youtube`, `Tabs`, `Tab`), auto-imported via `astro-auto-import` in `astro.config.mjs`. **Do not add `import` statements for these in `.mdx` files** — they're already global. Note: `Youtube` is commented out of the `AutoImport` list, so it needs a manual import if used.
- `src/pages/[regular].astro` — catch-all dynamic route rendering any entry in the `pages` collection (legal pages, elements showcase) through a shared PageHeader + Content layout. Add a new generic content page by dropping a `.md`/`.mdx` file in `src/content/pages/`, not by adding a new `.astro` route.
- `src/content/pages/elements.mdx` (served at **`/elements`** — there is no `/resources` route in this repo) is a live showcase/reference of every available shortcode (`Button`, `Notice`, `Tabs`/`Tab`, `Accordion`, `Video`) plus plain Markdown constructs (headings, lists, code blocks, tables, quotes, images). Check this page first when unsure what MDX components exist or how to invoke them.

### GoHighLevel + Stripe integration (`src/pages/api/`)

Three server-rendered API routes (`export const prerender = false`) integrate GHL CRM and Stripe billing; all require an SSR adapter (Vercel is configured in `astro.config.mjs`):

- **`/api/lead`** — captures a lead, tags GHL contact `website-lead-generation`.
- **`/api/contact`** — upserts a GHL contact, tags `website-contact-form`, and pushes the message into both the GHL Conversations tab and a contact Note.
- **`/api/checkout`** — upserts a GHL contact tagged `checkout-initiated`, then creates a Stripe subscription Checkout Session (monthly/yearly).
- **`/api/webhooks/stripe`** — verifies the Stripe signature, and on `checkout.session.completed` upserts the GHL contact with tag `paid-customer` and a custom field `price` (the GHL custom field's **Unique Key** must literally be `price` — see comment in `stripe.ts`).

All three call the GHL REST API directly via `fetch` (no SDK) with `Version: 2021-07-28`; GHL failures are logged but intentionally don't fail the surrounding request (e.g. checkout still proceeds if GHL is down). Required env vars: `GHL_API_KEY`, `GHL_LOCATION_ID`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (see `.env.example`).

### Agent skills (`.agents/skills/`)

This repo ships its own skill docs for GoHighLevel, Stripe, and Astro conventions — consult them before making non-trivial changes in those areas:
- `.agents/skills/astro/SKILL.md`
- `.agents/skills/gohighlevel/SKILL.md`
- `.agents/skills/stripe-best-practices/SKILL.md` (+ `references/` for billing, connect, payments, security, treasury)
- `.agents/skills/stripe-projects/SKILL.md`

### Additional component in scroll

Add under the frontend/animation section of CLAUDE.md, or create '## Frontend Animation Constraints' if none exists.\n\n## Frontend Animation Constraints
- This site uses Lenis smooth-scroll globally. Any new scroll-driven component (GSAP ScrollTrigger, Observer, sliders) must integrate with the existing Lenis instance (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker`) rather than attaching its own wheel/scroll listeners.

## Documentation

Full documentation: https://docs.astro.build

An `astro-docs` MCP server is available (`mcp__astro-docs__search_astro_docs`) — prefer it over guessing or web-searching for Astro API/behavior questions.

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
