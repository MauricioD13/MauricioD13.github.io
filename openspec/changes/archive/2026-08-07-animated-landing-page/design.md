## Context

See proposal.md - Why. The hero currently renders `VideoShowcase.astro` (autoplay video + sound-toggle overlay), wrapped in `data-gsap-video-showcase` for a GSAP scroll-tilt effect defined in `public/scripts/animations.js`. That wrapper attribute has exactly one consumer in the whole codebase, so removing `VideoShowcase` also orphans the `heroVideo()` function.

The project already loads GSAP + ScrollTrigger + Lenis globally via CDN `<script>` tags in `Base.astro` for site-wide effects (particle "spore" canvas on every page header, hero tilt, cycling brand logos). This diagram's animation is homepage-only and doesn't need to run on every page, so it doesn't belong in that global bundle.

## Goals / Non-Goals

**Goals:**
- Replace the hero's video with a self-contained, homepage-only animated diagram.
- Keep the animation lightweight and scoped — no impact on other pages' bundle size or the existing GSAP/Lenis setup.

**Non-Goals:**
- Pixel-accurate AWS Architecture Icons (official AWS icon set has usage guidelines and adds an asset-management dependency for one diagram) — use simple labeled shapes instead.
- Interactivity (hover tooltips, click-to-expand) — purely a decorative/informational diagram for this change; can be layered on later.
- Touching the global GSAP/Lenis/particle-canvas setup used elsewhere on the site.

## Decisions

- **`animejs` as a real npm dependency, imported in a scoped component `<script>`** — not a global CDN `<script>` tag like GSAP. Rationale: this animation only runs on `/`, so bundling it via Vite (Astro compiles per-component scripts) means no other page pays for it, unlike the existing GSAP CDN tag which loads globally regardless of page. `pnpm add animejs`; ships its own types, no `@types/animejs` needed.
- **Hand-built SVG shapes instead of an AWS icon library.** Each service (Route 53, Internet Gateway, ALB, WAF, Auto Scaling, NLB, EC2, RDS, and the sidebar services) is a small colored rounded-square icon with a simple glyph plus a text label, not an imported icon set — avoids AWS icon licensing/attribution concerns and keeps the component dependency-free beyond `animejs` itself. Icon accent colors loosely follow AWS's own service-category color coding (networking, compute, database, security, storage) rather than the site's purple theme, since that convention is part of what makes the diagram immediately read as "AWS architecture."
- **Nested-boundary-box composition, matching AWS's own reference-diagram convention**: dashed/solid rectangles nest AWS Cloud → Region → VPC → two Availability Zones → Public/Web/App/DB subnets, rather than the free-form node-and-curved-arrow layout used in the first iteration of this component. This reads as more immediately recognizable as "an AWS architecture diagram" to anyone who has seen AWS's own documentation.
- **Animation scoped to a single central path, not every connection.** Only the Route 53 → Internet Gateway → ALB → Auto Scaling → NLB stack sits on one straight vertical line, so it animates as one continuous `<path>` with looping markers traveling top to bottom — a "request flowing down through the stack" motion. The subnet/AZ nesting and sidebar are static, matching the reference image (which shows only one drawn connector, from Route 53 down into the stack) and keeping the animation legible rather than turning the whole diagram into moving parts.
- **`prefers-reduced-motion` handled in the component's script**: check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before starting any `animate()` call; if true, skip animation setup entirely and leave the static SVG as-is.
- **Delete `VideoShowcase.astro`, `public/showcase.mp4`, and `heroVideo()` outright** rather than leaving them disabled — consistent with this session's established pattern for orphaned template leftovers, and `heroVideo()` has no other consumer once `VideoShowcase` is gone.

### Revision: visual redesign (post-implementation feedback)

The first implementation used a free-form layout (client → Route 53 → ALB → EKS cluster → pods → data stores, curved paths, 8 animated connections) that didn't read as visually "AWS" enough. Based on a reference image of a classic AWS 2-AZ web app architecture diagram, the component was rebuilt as `AwsArchitectureDiagram.astro`: EKS/Kubernetes content was dropped entirely in favor of the generic multi-tier pattern shown in the reference (Route 53 → IGW → ALB/WAF → Auto Scaling → NLB → EC2 in Web/App subnets → RDS in DB subnets, across 2 Availability Zones), and the number of animated connections was reduced from 8 to 1 (the central stack) in favor of the nested-boundary-box composition doing most of the "visually AWS" work. The dependency choice (`animejs`, scoped script, reduced-motion handling) carried over unchanged from the original design.

### Revision 2: detail refinements (closer match to reference)

A second pass compared the rebuilt diagram against the reference image more closely and closed several authenticity gaps:
- **Icon badge shape**: `AwsDiagramIcon.astro`'s flat rounded-square badge was replaced with a path that rounds three corners and cuts a diagonal "folded flag" notch on the top-right — the signature silhouette of AWS's own Architecture Icons — plus a subtle black-at-18%-opacity triangle over the notch to suggest a folded corner. This is the single biggest visual-authenticity lever since every service icon in the diagram uses it.
- **Boundary-box color consistency**: the Availability Zone boxes were switched from a neutral gray dashed stroke to the same blue (`#4B96E6`) and dash pattern as the Region box, matching the reference where Region and AZ nesting reads as one consistent "blue dashed" visual language. The AWS Cloud outer box switched from dashed gray to a thin solid `var(--color-text)` stroke, closer to the reference's subtle solid outline.
- **Subnet lock badges**: each of the four subnet labels (Public/Web/App/DB) now has a small padlock glyph before its text, matching the reference's convention of marking VPC-scoped resources.
- **Region/VPC label icons**: added a small flag glyph before the region label and a small cloud glyph before the VPC label, matching the reference's icon-before-text pattern used throughout.
- **Subnet-embedded icon spacing**: nudged the EC2 (Web/App) and RDS (DB) icon+label vertical positions down slightly within their subnet boxes so the icon and its label both stay inside the box bounds now that the lock+label header line takes up the top of each box.

### Revision 3: official AWS icons + layout fixes

Direct user feedback requested five specific changes. The most consequential: switching from hand-drawn abstract icons to AWS's actual official icon artwork.

- **Official icons via `aws-react-icons`** (MIT-licensed npm package, `pnpm add aws-react-icons`, 3.3.0): this package ships React components generated directly from AWS's published Architecture Icons SVG set — confirmed by inspecting the compiled output, each icon's `<title>` element literally reads e.g. `Icon-Architecture/48/Arch_Amazon-Route-53_48`, AWS's own internal icon naming convention. This resolves the "official icons" ask without hand-building an AWS-icon-asset pipeline: `AwsDiagramIcon.astro` (the hand-drawn badge+glyph component from Revisions 1–2) is deleted entirely, replaced by direct icon-component imports plus a small `AwsIconLabel.astro` helper that only renders the multi-line text label below each icon (the icons themselves already come with AWS's official background color and artwork baked in, no wrapper badge needed). The package also ships `ArchitectureGroup*` icons (AWS Cloud, Region, VPC, Public/Private subnet) used for the small corner badges on each boundary box, replacing the hand-drawn flag/cloud/lock glyphs from Revision 2.
- **WAF repositioned**: moved from a side-badge next to the ALB into the central stack, between Route 53 and the Internet Gateway (`stack` array order: Route 53 → WAF → Internet Gateway → ALB → Auto Scaling → NLB).
- **EC2 count reduced to 2**: the separate Web Subnet and App Subnet tiers (each with their own EC2 icon, 4 total across 2 AZs) were merged into a single "Web/App Subnet" tier per AZ with one EC2 icon each — 2 total, one per Availability Zone, per the user's explicit ask.
- **Route 53 moved inside the AWS Cloud boundary**: previously sat above/outside the AWS Cloud box entirely. Route 53 and WAF now sit inside the AWS Cloud box's top area but outside the Region box — this is actually consistent with how AWS itself treats these as global/edge services not scoped to a region, while satisfying the user's explicit "must be inside AWS Cloud" requirement.
- **More breathing room**: viewBox grew from `1500 850` to `1600 1000`; icon sizes increased (most stack/sidebar icons 52–60px, up from 32–44px); font sizes bumped from 11–12px to 12–14px; merging Web+App subnets freed up vertical space reinvested as larger gaps between tiers so multi-word labels ("Application Load Balancer", "AWS CloudFormation") have room to lay out on their own lines without crowding neighboring elements.

## Risks / Trade-offs

- [A from-scratch SVG diagram with ~15 nodes/icons and deeply nested boundary boxes is a nontrivial amount of hand-authored markup and coordinate math] → Keep to the reference image's structure closely rather than improvising layout, and verify visually in the browser after implementation.
- [`animejs`'s path-following API differs by major version (v3 vs v4 changed import/usage patterns)] → Pinned to `animejs@4.5.0`; confirmed `svg.createMotionPath()` API during the first implementation pass, still valid for the single central path in the redesign.
- [Removing the hero video changes the homepage's first-impression content significantly] → Already explicitly approved by the user (chosen over adding the diagram as a separate new section).
- [Using AWS category-color conventions (orange/blue/purple/red/green) introduces colors outside the site's own theme palette] → Scoped entirely to this one component; doesn't affect the site's theme system or other pages.
