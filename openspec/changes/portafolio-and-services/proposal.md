## Why

The homepage and services page have already been repositioned as a personal cloud security/administration consulting portfolio (TribuOps-style copy), but the rest of the site still carries over generic template content: the main nav links to `/projects`, which doesn't exist (only a `/case-study` route with two placeholder, fictional case studies survives from the original GHL template); there's no page that shows the actual tools/technologies the site owner works with beyond a generic homepage logo strip; and the About page still describes a fictional multi-person team and "10,000+ Local Businesses Served" stats left over from the SaaS-reseller template. The site needs to actually work as a portfolio — showing real client engagements, real personal/lab projects, a real skills breakdown, and a real bio — instead of placeholder marketing copy.

## What Changes

- **BREAKING**: Rename the `case-study` content collection to `projects` (directory `src/content/case-study/` → `src/content/projects/`, collection key in `src/content.config.ts`), served at `/projects` instead of `/case-study`; add a permanent redirect from `/case-study` and `/case-study/[slug]` to the new `/projects` URLs.
- Add a `category: "client" | "personal"` field (plus optional `tags`/`stack` field for tech stack badges) to the `projects` collection schema so client engagements and personal/lab projects live in one collection but can be grouped and filtered on the index page.
- Replace the two placeholder case studies (`kyber-security.md`, `technova.md`) with real project entries for the four client engagements provided: (1) Fintech — AWS infrastructure administration, containerization & CI/CD; (2) AWS Security — WAF & Security Groups hardening; (3) Data Pipeline — Lambda + S3 + Athena + Metabase; (4) ECS deployment & CI/CD.
- Add placeholder/example entries for personal projects (e.g. homelab, study cases) in the same collection under `category: "personal"`, ready for the site owner to fill in with real details.
- Update `/projects` index page to render two grouped sections — "Client Work" and "Personal Projects & Labs" — instead of a flat list.
- Update `src/config/menu.json` footer "Case Studies" link to point at `/projects` (currently points at `/case-study`).
- Add a dedicated Skills/Stack section to the About page, grouping tools/technologies by category (e.g. Cloud & Infrastructure, Security, CI/CD & Automation, Observability) rather than the existing flat homepage logo strip.
- Rewrite `src/content/about/-index.md` as a solo-consultant bio: replace the fictional multi-person team block and inflated SaaS-era stats with content reflecting a single engineer/consultant, and integrate the new skills section into the page.

## Capabilities

### New Capabilities
- `portfolio-projects`: content collection, routing, and grouped rendering for client and personal portfolio projects at `/projects`.
- `skills-showcase`: dedicated, categorized display of tools/technologies/knowledge on the About page.

### Modified Capabilities
(none — no pre-existing OpenSpec capabilities in this project; the About page rewrite is covered under `skills-showcase` since it's the page the section lives on)

## Impact

- **Code**: `src/content.config.ts` (rename/extend `caseStudyCollection` schema), `src/pages/case-study/*.astro` → `src/pages/projects/*.astro` (or renamed in place), redirect handling for old `/case-study` URLs, `src/config/menu.json`, `src/content/about/-index.md`, a new About-page skills section component under `src/layouts/`.
- **Content**: `src/content/case-study/` directory renamed to `src/content/projects/`; `kyber-security.md` and `technova.md` removed/replaced with real + placeholder project entries.
- **No API/Stripe/GHL impact** — this is a content and routing change only.
