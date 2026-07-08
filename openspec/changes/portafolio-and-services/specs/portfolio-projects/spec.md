## ADDED Requirements

### Requirement: Projects collection with client/personal categorization
The system SHALL provide a `projects` content collection (replacing the former `caseStudy` collection) where each entry has a `category` field of either `"client"` or `"personal"`.

#### Scenario: Client project entry
- **WHEN** a content entry in `src/content/projects/` has `category: "client"`
- **THEN** the entry is treated as client work and is eligible to populate `client_info`, `challenges`, `solution`, and `results` sections

#### Scenario: Personal project entry omits client-only sections
- **WHEN** a content entry in `src/content/projects/` has `category: "personal"` and omits `client_info`, `challenges`, `solution`, or `results`
- **THEN** the entry still validates against the schema and renders without those sections appearing on the page

### Requirement: Projects index page groups entries by category
The `/projects` index page SHALL render two distinct, labeled groups of project cards: client work and personal projects/labs, derived from each entry's `category` field.

#### Scenario: Mixed categories render as separate sections
- **WHEN** the `projects` collection contains both `category: "client"` and `category: "personal"` entries
- **THEN** the index page displays a "Client Work" section containing only client entries and a "Personal Projects & Labs" section containing only personal entries

#### Scenario: Category with no entries
- **WHEN** the `projects` collection contains no entries of a given category
- **THEN** the corresponding section is omitted from the index page rather than rendered empty

### Requirement: Project detail pages served at /projects/[slug]
Each individual project entry SHALL be rendered at `/projects/<slug>`, where `<slug>` is the content entry's id.

#### Scenario: Visiting a project detail page
- **WHEN** a visitor navigates to `/projects/<slug>` for an existing project entry
- **THEN** the page renders that project's overview and any populated optional sections (client info, challenges, solution, results)

### Requirement: Legacy /case-study URLs redirect to /projects
Requests to the former `/case-study` routes SHALL be permanently redirected to the corresponding `/projects` routes.

#### Scenario: Redirect from case-study index
- **WHEN** a visitor or search engine requests `/case-study`
- **THEN** the response is a permanent redirect to `/projects`

#### Scenario: Redirect from case-study detail page
- **WHEN** a visitor or search engine requests `/case-study/<slug>`
- **THEN** the response is a permanent redirect to `/projects/<slug>`

### Requirement: Main navigation links to a working /projects route
The site's primary navigation SHALL link to `/projects`, and that route SHALL resolve to a rendered page (not a 404).

#### Scenario: Nav link resolves
- **WHEN** a visitor clicks "Projects" in the main navigation
- **THEN** they land on the `/projects` index page showing real content, not a 404 or placeholder page
