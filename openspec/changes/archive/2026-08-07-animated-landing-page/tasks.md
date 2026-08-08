## 1. Dependency setup

- [x] 1.1 `pnpm add animejs` (add `@types/animejs` as a dev dependency if the package has no bundled types) — installed animejs@4.5.0; ships its own `.d.ts` files, no `@types/animejs` needed
- [x] 1.2 Confirm the installed anime.js version's import/API shape (v3 vs v4) and note it for the component script — v4 API: `import { animate, svg } from "animejs"`, `svg.createMotionPath(path)` returns `{translateX, translateY, rotate}`, `animate()` params use `ease` (not `easing`) and `loop: true`

## 2. Diagram markup (superseded by section 7)

- [x] 2.1 Create `src/layouts/components/EksArchitectureDiagram.astro` with inline SVG: Route 53, ALB, VPC boundary (public/private subnet sub-boundaries), EKS cluster boundary containing 2 node groups with 2 pods each, ECR, CloudWatch, S3, RDS, and an IAM badge on the cluster — all as labeled shapes styled with `--color-primary`/`--color-secondary`
- [x] 2.2 Add SVG `<path>` connections: solid request-flow chain (client → Route 53 → ALB → EKS cluster → node group → pod → S3/RDS) and dashed supporting flows (ECR → node group, EKS cluster → CloudWatch)
- [x] 2.3 Add 1–2 small `<circle>` marker elements per connection path, ready for path-following animation

## 3. Animation

- [x] 3.1 Add a scoped `<script>` in the component that imports `animejs` and animates each path's markers along it in an infinite loop, with staggered per-path start delays
- [x] 3.2 Give dashed/supporting-flow paths a visually slower or less frequent marker animation than the main request-flow chain — main flow: 2200ms duration; supporting flow: 4200ms duration, later delay offset
- [x] 3.3 Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before starting any animation; skip animation setup entirely if true

## 4. Hero integration (superseded by section 7)

- [x] 4.1 Replace `<VideoShowcase />` with `<EksArchitectureDiagram />` (and update the import) in `src/pages/index.astro` — also dropped the now-meaningless `perspective-near xl:perspective-dramatic` wrapper classes (were specific to the removed GSAP tilt effect)

## 5. Remove orphaned video showcase

- [x] 5.1 Delete `src/layouts/components/VideoShowcase.astro`
- [x] 5.2 Delete `public/showcase.mp4`
- [x] 5.3 Remove the `heroVideo()` function and its call in `init()` from `public/scripts/animations.js`
- [x] 5.4 Grep the repo for any remaining `VideoShowcase`, `showcase.mp4`, or `data-gsap-video-showcase` references to confirm no stragglers — found and removed a dead sound-toggle block in `public/scripts/main.js` that referenced `data-gsap-video-showcase`; confirmed clean afterward. (Also noticed, but left untouched as out of scope: two unrelated dead blocks in `main.js` — `data-comparison-row-images-path` and `data-testimonial-video` — orphaned by the previous `remove-boilerplate-homepage-sections` change, which only grepped `src/`, not `public/scripts/`.)

## 6. Verification (first iteration)

- [x] 6.1 Run `pnpm check` and confirm no new errors versus the pre-existing baseline (Stripe `apiVersion` mismatches) — confirmed, same 2 pre-existing errors only
- [x] 6.2 Start the dev server, load `/`, and visually confirm the diagram renders in place of the old video with markers animating along the connection paths — confirmed the diagram renders (SVG labels present in served HTML, old video references gone) and all 8 path/marker id pairs match correctly; did NOT visually confirm the animation motion itself in a real browser (no browser available in this environment) — recommend a quick manual check
- [x] 6.3 Emulate `prefers-reduced-motion: reduce` (browser devtools) and confirm the diagram renders with no marker animation — verified by code review (the `if (!reduceMotion)` gate wraps all `animate()` calls; when the media query matches, the block is skipped entirely and the static SVG renders unmodified), not by an actual browser emulation pass
- [x] 6.4 Confirm no console errors from the anime.js script on page load — the component's scoped script was fetched from the dev server and compiles/resolves cleanly (Vite pre-bundled `animejs` without error); no browser console available to double-check at runtime

## 7. Visual redesign (revision after user feedback)

Reference: classic AWS 2-AZ web app reference architecture diagram (nested AWS Cloud → Region → VPC → Availability Zone boxes; Route 53 → IGW → ALB/WAF → Auto Scaling → NLB central stack; EC2 in Web/App subnets, RDS in DB subnets; sidebar of supporting services). See design.md - Revision. This section supersedes sections 2 and 4 above — the EKS-specific diagram content and its hero-integration were replaced entirely.

- [x] 7.1 Create `src/layouts/components/AwsArchitectureDiagram.astro` with nested boundary boxes: AWS Cloud → Region ("US East (N. Virginia)") → VPC → 2x Availability Zone, each AZ containing Public/Web/App/DB subnet boxes with EC2 (Web, App) and RDS (DB) icons+labels — also added a reusable `AwsDiagramIcon.astro` sub-component (colored rounded-square + glyph + label) to avoid repeating icon markup ~15 times
- [x] 7.2 Add the central stack: Route 53 (above the AWS Cloud box) → Internet Gateway → Application Load Balancer (+ adjacent WAF badge) → Auto Scaling (dashed band spanning Web+App subnets across both AZs) → Network Load Balancer, connected by a single straight vertical path
- [x] 7.3 Add the supporting-services sidebar: Trusted Advisor, CloudFormation, Shield, IAM, S3, CloudFront, ElastiCache as standalone labeled icons
- [x] 7.4 Use simple colored icon glyphs (rounded-square + shape) per service, following AWS's category color conventions (networking/compute/database/security/storage) rather than the site's purple theme — networking `#8C4FFF`, compute `#ED7100`, database `#3B48CC`, security `#DD344C`, storage `#7AA116`, management `#E7157B`
- [x] 7.5 Animate 2–3 markers traveling down the single central path (Route 53 → NLB) in an infinite loop; keep the reduced-motion gate from the original implementation — 3 markers, staggered 700ms apart, 2600ms duration each
- [x] 7.6 Replace `<EksArchitectureDiagram />` with `<AwsArchitectureDiagram />` (and update the import) in `src/pages/index.astro`
- [x] 7.7 Delete `src/layouts/components/EksArchitectureDiagram.astro` (superseded)
- [x] 7.8 Adjust the SVG `viewBox` / wrapper sizing to fit the taller nested-box composition rather than forcing the old 16:9 `aspect-video` ratio — used `viewBox="0 0 1500 850"` with `class="w-full h-auto"` so the SVG scales to its natural (wider-than-tall but not 16:9) aspect ratio instead of being cropped/forced
- [x] 7.9 Run `pnpm check` and confirm no new errors versus baseline — confirmed, same 2 pre-existing errors only
- [x] 7.10 Grep for any remaining `EksArchitectureDiagram` references to confirm no stragglers — confirmed clean
- [x] 7.11 Start the dev server, load `/`, and visually confirm the new diagram renders with the nested boxes, central stack, sidebar, and traveling markers — confirmed structurally via served HTML: all nested-box labels present exactly once per AZ (verified with tag-precise `>Public Subnet<` style greps, not naive substring counts which were thrown off by this codebase's convention of descriptive `<!-- comment -->` markers), central path + 3 markers present, script compiles/resolves cleanly with no import errors; did NOT visually watch the animation motion in a real browser (none available in this environment) — recommend a quick manual look

## 8. Detail refinement (second revision, closer match to reference)

See design.md - Revision 2. Main architecture confirmed correct by the user; this pass closed remaining visual-authenticity gaps against the reference image.

- [x] 8.1 Give `AwsDiagramIcon.astro`'s badge the AWS-style "folded flag" notch: rounded on three corners, diagonal cut top-right, with a subtle darkened overlay triangle at the fold
- [x] 8.2 Unify Availability Zone boundary color/style with the Region box (`#4B96E6` blue dashed, was neutral gray dashed)
- [x] 8.3 Switch the AWS Cloud outer boundary from dashed gray to a thin solid stroke, closer to the reference
- [x] 8.4 Add a small padlock glyph before each of the 4 subnet labels (Public/Web/App/DB), per AZ
- [x] 8.5 Add a flag glyph before the Region label and a cloud glyph before the VPC label
- [x] 8.6 Adjust subnet-embedded EC2/RDS icon vertical positions so icon+label stay within their subnet box now that lock+label headers take up top space
- [x] 8.7 Run `pnpm check` and confirm no new errors versus baseline — confirmed, same 2 pre-existing errors only
- [x] 8.8 Start the dev server and structurally verify the refinements render (icon notch count = 19 matching all `AwsDiagramIcon` instances, lock glyph count = 8 matching 4 subnets × 2 AZs) — did NOT visually inspect in a real browser (none available in this environment), recommend a manual look

## 9. Official icons + layout fixes (third revision)

See design.md - Revision 3. Direct feedback: use official AWS icons, reposition WAF, reduce EC2 count, add spacing, move Route 53 inside AWS Cloud.

- [x] 9.1 Research and install an official-AWS-icon-based npm package — found `aws-react-icons` (MIT, built from AWS's published Architecture Icons SVG set, confirmed via baked-in `<title>` elements matching AWS's internal naming e.g. `Icon-Architecture/48/Arch_Amazon-Route-53_48`); `pnpm add aws-react-icons`
- [x] 9.2 Delete `AwsDiagramIcon.astro` (hand-drawn badge component, superseded); create `AwsIconLabel.astro` helper for multi-line labels under the new official icon components
- [x] 9.3 Rewrite `AwsArchitectureDiagram.astro` to use official icon components for every service (Route 53, WAF, Internet Gateway, ALB, Auto Scaling, NLB, EC2, RDS, and all 7 sidebar services) and official `ArchitectureGroup*` icons for the AWS Cloud/Region/VPC/Public-subnet/Private-subnet corner badges
- [x] 9.4 Reposition WAF into the central stack between Route 53 and Internet Gateway
- [x] 9.5 Merge the Web Subnet and App Subnet tiers into a single "Web/App Subnet" tier per Availability Zone, reducing EC2 icons from 4 to 2 (one per AZ)
- [x] 9.6 Move Route 53 (and WAF) inside the AWS Cloud boundary box, positioned above the Region box (global/edge services, not region-scoped)
- [x] 9.7 Increase overall spacing: grow the viewBox, enlarge icon sizes, increase font sizes, and use the space freed by the Web/App subnet merge for larger gaps between tiers so multi-word labels lay out without crowding
- [x] 9.8 Run `pnpm check` and confirm no new errors versus baseline — confirmed, same 2 pre-existing errors only
- [x] 9.9 Start the dev server and structurally verify: all 20 official icon `<title>` elements present in rendered HTML (confirms genuine AWS artwork, not fallback/broken icons), EC2 count = 2, RDS count = 2, label order confirms Route 53 → WAF → Internet Gateway, script compiles/resolves cleanly — did NOT visually inspect in a real browser (none available in this environment), recommend a manual look
