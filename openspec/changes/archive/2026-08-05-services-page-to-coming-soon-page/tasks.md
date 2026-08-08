## 1. Content page

- [x] 1.1 Create `src/content/pages/services.mdx` with frontmatter (`title`, `description`, `meta_title`) matching the `pages` collection schema in `src/content.config.ts`, `draft: false`. (Used `.mdx`, not `.md`, since the body needs the `Button` shortcode — plain `.md` doesn't support MDX component syntax.)
- [x] 1.2 Write a "Coming Soon" body: heading/intro copy stating the services page is on its way.
- [x] 1.3 Add a `<Button label="Get in touch" link="/contact" style="solid" />` shortcode as the contact CTA.

## 2. Verification

- [x] 2.1 Run `pnpm dev --background` and load `/services` in the browser; confirm it renders (200, not 404) with the PageHeader title/subtitle and the contact CTA. (Used the already-running dev server; `curl` confirmed 200 with the coming-soon copy and CTA present.)
- [x] 2.2 Click the "Services" nav link and the homepage "Explore Our Services" CTA; confirm both land on the new `/services` page. (Confirmed both already point to `href="/services"` in the rendered homepage HTML, which now resolves.)
- [x] 2.3 Click the contact CTA on `/services`; confirm it navigates to `/contact`. (Confirmed `<Button>` renders as `href="/contact"`.)
- [x] 2.4 Run `pnpm check` to confirm no TypeScript/template diagnostics were introduced. (2 pre-existing Stripe API-version type errors unrelated to this change; nothing new from `services.mdx`.)
