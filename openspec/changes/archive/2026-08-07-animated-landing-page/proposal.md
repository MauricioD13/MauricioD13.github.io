## Why

The homepage hero currently shows a generic autoplay demo video (`showcase.mp4`) left over from the Automark SaaS template — it doesn't demonstrate anything about AWS/cloud engineering expertise. Replacing it with an animated AWS reference architecture diagram, built with anime.js, gives visitors an immediate, self-explaining visual of the kind of infrastructure this site's owner designs and operates, in the classic nested-boundary-box style AWS itself uses for architecture diagrams.

## What Changes

- **BREAKING**: Replace the hero `VideoShowcase` component (`showcase.mp4` autoplay video + sound-toggle UI) with a new animated AWS architecture diagram component.
- Add a new `AwsArchitectureDiagram` component rendering an SVG diagram in the AWS nested-boundary-box convention: AWS Cloud → Region → VPC → two Availability Zones, each with Public/Web/App/DB subnets containing EC2 and RDS; a central Route 53 → Internet Gateway → ALB (+ WAF) → Auto Scaling → Network Load Balancer stack; and a sidebar of supporting services (Trusted Advisor, CloudFormation, Shield, IAM, S3, CloudFront, ElastiCache).
- Animate the diagram with anime.js: small markers continuously travel down the central Route 53 → Internet Gateway → ALB → Auto Scaling → NLB path, looping indefinitely, to simulate live request traffic without cluttering the rest of the (otherwise static) reference-diagram-style layout. Respect `prefers-reduced-motion` by rendering the diagram statically (no animation) for users who request it.
- Add `animejs` as a project dependency (installed via pnpm, imported in the new component's scoped client script — not a global CDN script like the existing GSAP setup, since this animation is homepage-only).
- Remove the now-orphaned `VideoShowcase.astro` component, `public/showcase.mp4`, the GSAP `heroVideo()` scroll-tilt function in `public/scripts/animations.js` (its only consumer, `data-gsap-video-showcase`, goes away with `VideoShowcase.astro`), and the related CSS/markup.

## Capabilities

### New Capabilities
- `aws-architecture-diagram`: An animated SVG diagram on the homepage hero showing a standard multi-tier AWS reference architecture in AWS's nested-boundary-box diagram style, with a looping traffic-flow animation via anime.js on the central request path and reduced-motion support.

### Modified Capabilities
None.

## Impact

- `src/layouts/components/AwsArchitectureDiagram.astro` — new component (SVG markup + scoped `<script>` using anime.js). Supersedes the initial `EksArchitectureDiagram.astro` iteration, replaced after visual-style feedback, then further refined using official AWS icons after a second feedback round.
- `src/layouts/components/AwsIconLabel.astro` — new small helper component rendering multi-line text labels below each official AWS icon.
- `src/layouts/components/AwsDiagramIcon.astro` — deleted (hand-drawn icon badge component, superseded by real `aws-react-icons` components).
- `src/layouts/components/VideoShowcase.astro` — delete.
- `public/showcase.mp4` — delete.
- `public/scripts/animations.js` — remove `heroVideo()` function and its call in `init()`.
- `src/pages/index.astro` — swap `<VideoShowcase />` for `<AwsArchitectureDiagram />` in the hero section.
- `package.json` / `pnpm-lock.yaml` — add `animejs` and `aws-react-icons` dependencies.
