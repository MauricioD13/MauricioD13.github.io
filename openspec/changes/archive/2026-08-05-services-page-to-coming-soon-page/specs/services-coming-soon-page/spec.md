## Purpose

Gives the `/services` URL — already linked from the main nav and the homepage hero CTA — a real page to land on, so visitors see a "Coming Soon" placeholder with a way to get in touch instead of a 404.

## ADDED Requirements

### Requirement: Services page renders instead of 404ing
The system SHALL serve a page at `/services` instead of returning a 404, containing a title and a message indicating the services page is coming soon.

#### Scenario: Visitor navigates to /services
- **WHEN** a visitor requests `/services`
- **THEN** the system returns a 200 page (not a 404) with a heading and a "coming soon" message

#### Scenario: Visitor reaches /services via existing nav or homepage links
- **WHEN** a visitor clicks the "Services" nav link or the homepage "Explore Our Services" CTA
- **THEN** they land on the `/services` coming-soon page rather than a broken link

### Requirement: Coming-soon page offers a contact path
The system SHALL present a call-to-action on the `/services` page that links to the `/contact` page, so interested visitors can still reach out.

#### Scenario: Visitor wants to get in touch early
- **WHEN** a visitor on `/services` clicks the contact call-to-action
- **THEN** they are taken to `/contact`
