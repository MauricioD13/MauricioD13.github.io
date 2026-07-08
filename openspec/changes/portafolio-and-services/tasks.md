## 1. Schema changes

- [x] 1.1 In `src/content.config.ts`, rename `caseStudyCollection` → `projectsCollection`, update its `loader` `base` path to `src/content/projects`, and update the collections export key `caseStudy` → `projects`
- [x] 1.2 Add `category: z.enum(["client", "personal"]).default("client")` to the projects schema
- [x] 1.3 Add a guard-friendly shape check: confirm `client_info`, `challenges`, `solution`, `results` remain `.optional()` (no change needed if already optional — verify)
- [x] 1.4 Extend the `about` collection schema with a `skills` field: `z.array(z.object({ category: z.string(), items: z.array(z.object({ name: z.string(), icon: z.string() })) })).optional()`

## 2. Content migration

- [x] 2.1 `git mv src/content/case-study src/content/projects`
- [x] 2.2 Delete `src/content/projects/kyber-security.md` and `src/content/projects/technova.md`
- [x] 2.3 Update `src/content/projects/-index.md` page-level copy (title/meta/page_header) to describe a projects/portfolio page instead of "Case Studies"
- [x] 2.4 Add client project entry: Fintech — AWS infrastructure administration, containerization & CI/CD (`category: client`)
- [x] 2.5 Add client project entry: AWS Security — WAF & Security Groups (`category: client`)
- [x] 2.6 Add client project entry: Data Pipeline — Lambda + S3 + Athena + Metabase (`category: client`)
- [x] 2.7 Add client project entry: ECS deployment & CI/CD (`category: client`)
- [x] 2.8 Add at least one placeholder personal project entry (e.g. homelab) with `category: personal`, omitting `client_info`/`challenges`/`solution`/`results`

## 3. Routing

- [x] 3.1 `git mv src/pages/case-study src/pages/projects`
- [x] 3.2 In `src/pages/projects/index.astro`, change `getListPage("caseStudy", ...)` / `getSinglePage("caseStudy")` calls to `"projects"`
- [x] 3.3 In `src/pages/projects/index.astro`, partition fetched entries into `clientProjects`/`personalProjects` by `category` and render two labeled sections ("Client Work", "Personal Projects & Labs"), each only rendered when non-empty
- [x] 3.4 Update card `href` in `src/pages/projects/index.astro` from `` `/case-study/${study.id}` `` to `` `/projects/${study.id}` ``
- [x] 3.5 In `src/pages/projects/[single].astro`, change `getSinglePage("caseStudy")` to `getSinglePage("projects")`
- [x] 3.6 In `src/pages/projects/[single].astro`, wrap the "Client Info Cards" section (and, since real entries may also omit them, the Challenges/Solution/Results sections) in guards so none render when their data is absent
- [x] 3.7 Update the "Back to Case Studies" link in `src/pages/projects/[single].astro` to point to `/projects` with updated label text
- [x] 3.8 Update `src/types` (or wherever `CaseStudy` type is defined/imported) to match the renamed collection if it's hand-maintained rather than inferred

## 4. Redirects and navigation

- [x] 4.1 Add a `redirects` block to `astro.config.mjs` mapping `/case-study` → `/projects` and `/case-study/[single]` → `/projects/[single]`
- [x] 4.2 Update `src/config/menu.json` `footer_resource` entry from `{ "name": "Case Studies", "url": "/case-study" }` to point at `/projects`

## 5. Skills showcase

- [x] 5.1 Create `src/layouts/partials/SkillsShowcase.astro` that accepts the `skills` array and renders categorized groups with icon + name per item
- [x] 5.2 Wire `SkillsShowcase` into `src/pages/about.astro` (or the About layout it composes), passing `skills` from the about entry's data
- [x] 5.3 Populate `skills` frontmatter in `src/content/about/-index.md` with real categories/tools (e.g. Cloud & Infrastructure: AWS, Terraform; Security: WAF, IAM; CI/CD & Automation: GitHub Actions, Docker; Observability: Grafana)

## 6. About page bio rewrite

- [x] 6.1 Rewrite `page_header` in `src/content/about/-index.md` to describe a single consultant/engineer, not a company
- [x] 6.2 Replace or remove the `our_team.members` array (fictional team) — either drop the section or replace with a single-person profile matching the site owner
- [x] 6.3 Replace `stats.items` values with real or honestly-scoped figures (or remove the stats block if no real numbers apply yet)
- [x] 6.4 Review `core_values` copy for remaining GHL-reseller language and update to match the consulting positioning already used on homepage/services

## 7. Verification

- [ ] 7.1 Run `pnpm check` and fix any TypeScript/schema diagnostics
- [ ] 7.2 Run `pnpm dev --background`, visit `/projects` and confirm both "Client Work" and "Personal Projects & Labs" sections render with correct entries
- [ ] 7.3 Visit each `/projects/<slug>` detail page for a client entry and a personal entry; confirm optional sections render/omit correctly
- [ ] 7.4 Visit `/case-study` and `/case-study/<old-slug>` and confirm they redirect to the new `/projects` URLs
- [ ] 7.5 Visit `/about` and confirm the skills section renders and the fictional team/stats content is gone
- [ ] 7.6 Click the "Projects" main nav link and the footer "Case Studies"→"Projects" link end-to-end to confirm both resolve correctly
