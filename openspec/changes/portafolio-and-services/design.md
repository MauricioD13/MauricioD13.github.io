## Context

The site (Astro 7 + Tailwind 4, Vercel adapter, content managed via Astro Content Collections + Sitepins) started as a generic GHL-reseller SaaS template ("Automark") and is being repurposed into a personal cloud/security consulting portfolio. Homepage (`src/content/homepage/-index.md`) and the services page (`src/content/features/-index.md`, routed at `/services`) have already been rewritten with the new positioning. Three things are still template leftovers:

1. `src/config/menu.json` main nav already links to `/projects`, but no such route exists — only `/case-study`, backed by the `caseStudy` collection (`src/content/case-study/`), with two fictional entries (`kyber-security.md`, `technova.md`).
2. There is no page that presents the site owner's actual tool/technology knowledge in a structured way — only a generic homepage `integrations` logo strip.
3. `src/content/about/-index.md` still describes a fictional 4-person founding team and inflated SaaS-era stats ("10,000+ Local Businesses Served").

The `caseStudy` schema (`src/content.config.ts:323-`) is rich — `page_header`, `thumbnail`, `logo`, `company`, `badge`, `stats`, `client_info`, `overview`, `challenges`, `solution`, `results` — built for polished B2B case studies. The owner has two kinds of material to show: real, engagement-style client work (Fintech AWS admin, WAF/Security Groups, Data Pipeline, ECS+CI/CD) and more informal personal/lab projects (homelab, study cases) that don't need the full case-study narrative structure.

## Goals / Non-Goals

**Goals:**
- Make `/projects` a working route showing real client work and personal/lab projects, replacing the dead `/case-study` link and its fictional content.
- Preserve the existing case-study visual design/schema for client engagements (it's already built and matches the new brand's `hasHighlight` hero, stats cards, overview/challenges/solution/results sections) rather than building a second, parallel content type.
- Let personal projects use the same collection without being forced to fill in every "client case study" field (challenges/solution/results are enterprise-sales framing that doesn't fit a homelab writeup).
- Add a categorized Skills/Stack section to the About page.
- Rewrite the About page as a single-person bio.
- Keep old `/case-study` URLs from 404ing (redirect to `/projects`).

**Non-Goals:**
- Building a tagging/filter UI with client-side JS (category grouping is server-rendered, two static sections).
- Changing the Stripe/GHL API routes, pricing page, or checkout flow — unrelated to this change.
- A full design-system overhaul of the case-study visual template; personal-project entries reuse the existing template with some sections conditionally omitted.
- Adding blog-style pagination/search to `/projects` — the current project count (single digits) doesn't need it.

## Decisions

### 1. Rename `caseStudy` → `projects` as one collection, not two
Keep a single Content Collection (rename directory `src/content/case-study/` → `src/content/projects/`, collection key `caseStudy` → `projects` in `src/content.config.ts`, routes `src/pages/case-study/` → `src/pages/projects/`). Add `category: z.enum(["client", "personal"]).default("client")` to the schema.

*Alternative considered*: a second `personal-projects` collection reusing a lighter schema. Rejected — it would duplicate the `getSinglePage`/`getListPage` wiring, the `[single].astro` template, and the index page for no real benefit at this content volume (6-10 entries total), and two routes (`/projects` and `/labs`) fragments the portfolio nav for no user benefit.

### 2. Client-vs-personal fields stay optional, not schema-forked
`challenges`, `solution`, `results`, `client_info` remain `.optional()` (already are). Personal-project markdown files simply omit those blocks; `overview` (image/title/content) becomes the one required narrative block for every entry regardless of category, since every project — client or personal — benefits from a plain "what this is / what I did" writeup. The `[single].astro` template already guards each section with `studyData?.section?.field` optional chaining, so omitted sections simply don't render — no template branching needed beyond skipping the "Client Info Cards" grid when `client_info` is absent (add an `{studyData.client_info?.length ? (...) : null}` guard, matching the existing optional-chaining style).

### 3. Index page groups by category server-side
`src/pages/projects/index.astro` fetches all entries via `getSinglePage("projects")`, partitions into `clientProjects = data.filter(p => p.data.category === "client")` and `personalProjects = data.filter(p => p.data.category === "personal")`, and renders two `<section>` blocks ("Client Work", "Personal Projects & Labs") each reusing the existing `CaseStudyCard` component. No new component needed for the grouping itself — just two mapped grids instead of one.

### 4. Redirect old URLs via Astro's static `redirects` config
Add to `astro.config.mjs`:
```js
redirects: {
  "/case-study": "/projects",
  "/case-study/[single]": "/projects/[single]",
}
```
This is Astro's built-in redirect mechanism (generates redirect pages at build time, works with the Vercel adapter without extra server logic) — no middleware needed.

*Alternative considered*: `vercel.json` redirects. Rejected — Astro's own `redirects` config is adapter-agnostic and colocated with the rest of the routing config; no reason to reach for platform-specific config for a same-app route rename.

### 5. Skills/Stack section lives on the About page as a new Astro partial
Add `src/layouts/partials/SkillsShowcase.astro` (or a section block within the About page template), driven by a new `skills` field in `src/content/about/-index.md`'s frontmatter: an array of `{ category: string, items: { name: string, icon: string }[] }`. Rendered as categorized icon+label groups (reusing `DynamicIcon.astro`/`ImageMod.astro` patterns already used elsewhere, e.g. `integrations` on the homepage). This keeps skills content-driven and editable via Sitepins like everything else, rather than hardcoded in the component.

*Alternative considered*: extend the homepage `integrations` block instead. Rejected per user decision — a dedicated, categorized section on the About page (where a visitor evaluating the person would look) communicates depth better than a flat logo strip meant for "trusted platforms" framing.

### 6. About page schema addition
Extend the `about` collection schema in `src/content.config.ts` with the `skills` field described above, and remove nothing from the schema (the fictional `our_team`/`stats` blocks stay schema-valid — only the frontmatter content in `-index.md` changes to reflect one person and real numbers/omit fabricated stats).

## Risks / Trade-offs

- **[Risk]** Renaming the collection/route is a breaking URL change for any existing inbound links or search-engine index entries pointing at `/case-study/*`. → **Mitigation**: permanent redirects (decision 4) cover both the index and individual slugs.
- **[Risk]** Reusing the case-study schema for personal projects means the template still shows enterprise-y section headers ("Challenges", "Solution", "Results") that may read oddly for a homelab writeup even when populated. → **Mitigation**: out of scope to redesign the template in this change; if it reads poorly once real personal-project content is drafted, section labels can be made data-driven (`challenges.title` already is) as a fast follow.
- **[Risk]** `client_info` grid currently renders unconditionally in `[single].astro`; personal projects without it would show an empty grid. → **Mitigation**: add the guard described in Decision 2 as part of implementation.
- **[Trade-off]** Single collection with an enum instead of two collections means one Zod schema change is shared by both categories — acceptable given the low content volume, but would need revisiting if the portfolio grows to dozens of entries with diverging shapes.

## Migration Plan

1. Extend `src/content.config.ts`: add `category` and `skills`-adjacent fields.
2. `git mv src/content/case-study src/content/projects`; remove `kyber-security.md`/`technova.md`; add real client entries + placeholder personal entries.
3. `git mv src/pages/case-study src/pages/projects`; update internal hrefs (`/case-study/${study.id}` → `/projects/${study.id}`, "Back to Case Studies" link) and collection key references (`"caseStudy"` → `"projects"`).
4. Add `redirects` block to `astro.config.mjs`.
5. Update `src/config/menu.json` footer link.
6. Rewrite `src/content/about/-index.md` (bio + skills data) and add the `SkillsShowcase` partial, wired into `src/pages/about.astro`.
7. Run `pnpm check` and manually verify `/projects`, `/projects/<slug>` for both categories, `/case-study` redirect, and `/about`.

No data migration or rollback complexity beyond reverting the commit — this is a static-content/routing change with no database or runtime state.

## Open Questions

- Exact real-world details (metrics/outcomes, anonymization level) for the 4 client projects — to be filled in during content authoring (tasks phase), not blocking the structural implementation.
- How many personal/lab projects to seed at launch vs. leave as a single placeholder — left to content authoring.
