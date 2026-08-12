<h1 align="center">Mauricio Cuello — Portfolio</h1>
<p align="center">Personal site for TribuOps — cloud & DevOps case studies, blog, and contact.</p>

<p align="center">
  <a href="https://mauriciod13.github.io/" target="_blank" rel="nofollow">🌐 Live Site</a>
</p>

## About

This repository is the source for my personal portfolio site, built to showcase cloud infrastructure and automation work (AWS, Terraform, Kubernetes, and related tooling) through project case studies and blog posts. It started from the [Automark](https://github.com/themefisher/automark-astro) Astro template and has since been stripped down to a fully static site — no backend, no SaaS integrations, just content.

## Tech Stack

- [Astro 7](https://astro.build/) with static output (no SSR adapter)
- [Tailwind CSS 4](https://tailwindcss.com/), theme generated from `src/config/theme.json`
- Markdown/MDX content collections (`src/content/`) — projects, blog, about, contact, integrations, homepage
- GSAP + Lenis for scroll-driven animations
- Deployed to GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

## Local Development

Package manager is **pnpm**.

```bash
pnpm install
pnpm dev       # starts the dev server (theme watcher + astro dev)
```

Copy `.env.example` to `.env` and set `PUBLIC_CONTACT_API_URL` if you need the contact form to submit somewhere — the form POSTs client-side to that URL, which isn't part of this deployment.

```bash
cp .env.example .env
```

## Other Commands

```bash
pnpm build    # production build (outputs to dist/)
pnpm preview  # preview the production build locally
pnpm check    # astro check — type/template diagnostics
pnpm format   # prettier -w ./src
```

## Content

Pages, projects, and blog posts are authored as Markdown/MDX under `src/content/`, following the schemas defined in `src/content.config.ts`. Adding a new project or blog post is just a matter of dropping a new `.md`/`.mdx` file in the relevant collection folder.

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that builds the site with pnpm and publishes it to GitHub Pages.

## License

Code is released under the [MIT license](LICENSE), inherited from the original Automark template this project was built on. Content, images, and branding are personal to this portfolio and not covered by that license.
