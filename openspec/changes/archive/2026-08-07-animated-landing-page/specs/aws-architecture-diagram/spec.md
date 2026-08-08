## Purpose

Gives homepage visitors an immediate, self-explaining visual of the kind of AWS infrastructure the site's owner designs and operates, in the classic nested-boundary-box style AWS itself uses for reference architecture diagrams, replacing a generic template demo video.

## ADDED Requirements

### Requirement: Homepage hero renders an AWS reference architecture diagram
The system SHALL render an SVG diagram in the homepage hero section depicting a standard multi-tier AWS web application architecture, using nested boundary boxes for AWS Cloud, a region, a VPC, and two Availability Zones, each Availability Zone containing Public, Web, App, and DB subnets.

#### Scenario: Visitor loads the homepage
- **WHEN** a visitor requests `/`
- **THEN** the hero section renders the AWS architecture diagram instead of the previous demo video

### Requirement: Diagram shows the core request path
The diagram SHALL depict, as a connected central stack inside the AWS Cloud boundary, Route 53, AWS WAF, an Internet Gateway, an Application Load Balancer, an Auto Scaling group spanning the Web/App subnets across both Availability Zones, and a Network Load Balancer, with one EC2 instance in the Web/App subnet and RDS in the DB subnet of each Availability Zone.

#### Scenario: Visitor inspects the diagram
- **WHEN** a visitor views the hero diagram
- **THEN** Route 53, Internet Gateway, ALB, WAF, Auto Scaling, Network Load Balancer, EC2, and RDS are all visible as labeled elements in their respective boundary boxes

### Requirement: Diagram shows a supporting-services sidebar
The diagram SHALL display a sidebar list of supporting AWS services (at minimum: Trusted Advisor, CloudFormation, Shield, IAM, S3, CloudFront, ElastiCache) as standalone labeled icons alongside the main architecture.

#### Scenario: Visitor inspects the sidebar
- **WHEN** a visitor views the hero diagram
- **THEN** the supporting-services sidebar is visible with labeled icons for each listed service

### Requirement: Diagram animates simulated request traffic
The system SHALL animate small markers continuously traveling down the central Route 53 → Internet Gateway → ALB → Auto Scaling → Network Load Balancer path, looping indefinitely while the diagram is visible.

#### Scenario: Visitor views the diagram with motion allowed
- **WHEN** a visitor without a reduced-motion preference views the hero diagram
- **THEN** animated markers continuously travel down the central path in a looping animation

### Requirement: Diagram respects reduced-motion preference
The system SHALL render the diagram without any animation when the visitor's OS/browser signals `prefers-reduced-motion: reduce`.

#### Scenario: Visitor has reduced motion enabled
- **WHEN** a visitor with `prefers-reduced-motion: reduce` set views the homepage
- **THEN** the hero diagram renders fully but with no traveling-marker animation
