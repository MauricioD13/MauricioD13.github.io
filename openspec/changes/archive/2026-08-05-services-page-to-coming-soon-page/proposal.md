## Why

The main nav (`src/config/menu.json`) and the homepage hero CTA ("Explore Our Services") both link to `/services`, but no route or content file backs that URL — it currently 404s. The site's actual services/features content lives at `/features` instead. Rather than build out the full services content now, the dead link should be replaced with a lightweight "Coming Soon" placeholder so visitors get a real page (with a way to reach out) instead of a 404.

## What Changes

- Add a new content page at `/services` (via the existing `pages` collection + `[regular].astro` catch-all) showing a "Coming Soon" message.
- Placeholder page includes a short explanatory message and a CTA button linking to `/contact` so interested visitors aren't dead-ended.
- No changes to `/features`, `menu.json`, or any other existing route — `/services` already appears in nav/homepage links and simply needs a real page behind it.

## Capabilities

### New Capabilities
- `services-coming-soon-page`: a `/services` route that renders a "Coming Soon" placeholder (title, message, contact CTA) instead of 404ing.

### Modified Capabilities
(none)

## Impact

- **Code**: none — no `.astro` route changes needed, reuses `src/pages/[regular].astro`.
- **Content**: new file `src/content/pages/services.md`.
- **No API/Stripe/GHL impact.**
