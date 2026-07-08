## ADDED Requirements

### Requirement: Categorized skills section on the About page
The About page SHALL display the site owner's tools and technologies grouped by category (e.g. Cloud & Infrastructure, Security, CI/CD & Automation, Observability), sourced from content frontmatter rather than hardcoded in a component.

#### Scenario: Skills render grouped by category
- **WHEN** `src/content/about/-index.md` defines a `skills` array of category groups, each with a list of tool items
- **THEN** the About page renders each category as a distinct labeled group containing its tool items

#### Scenario: Tool item displays name and icon
- **WHEN** a skill item in the `skills` frontmatter specifies a `name` and an `icon`
- **THEN** the rendered group shows the tool's icon alongside its name

### Requirement: About page reflects a single-person bio
The About page SHALL present the site as operated by a single consultant/engineer, without the fictional multi-person team block or fabricated SaaS-era statistics from the original template.

#### Scenario: Team section no longer shows fictional members
- **WHEN** the About page is rendered
- **THEN** it does not display the placeholder team members ("Josh Wangombe", "Daniel Jenson", "Toun Aalbers", "Peter van Ursel") or the "10,000+ Local Businesses Served" style stats from the original template

#### Scenario: Bio content describes the actual site owner
- **WHEN** the About page is rendered
- **THEN** its header/bio copy describes a single cloud security/administration consultant rather than a company with a founding team
