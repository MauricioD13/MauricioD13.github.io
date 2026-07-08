---
title: "Pricing"
meta_title: "Pricing - Cloud Security & Administration Services"
description: "Reference pricing for cloud security assessments and ongoing cloud administration services."
image: ""
draft: false
page_header:
  badge: "Pricing"
  title: "Pricing Built For Secure, Well-Run Cloud Infrastructure"
  content: "Reference pricing shown below. Final scope and cost depend on your environment size and complexity — book a consultation for an accurate quote."
toggler:
  monthly_label: "Monthly"
  yearly_label: "Yearly"
plans:
  - title: "Assessment"
    price: "1,500"
    yearly_price: "15,000"
    is_featured: false
    button:
      enable: true
      label: "Book a Consultation"
      link: "/contact"
    description: "A one-time cloud security posture assessment to identify and prioritize risk."
    features:
      - label: "CSPM / Configuration Review"
        included: true
      - label: "IAM & Access Audit"
        included: true
        tooltip: "Identify over-privileged roles and unused access."
      - label: "Findings & Remediation Report"
        included: true
      - label: "Infrastructure as Code Setup"
        included: false
      - label: "Ongoing Monitoring"
        included: false
  - title: "Managed Cloud"
    price: "2,500"
    yearly_price: "25,000"
    is_featured: true
    offer_text: Most Popular
    button:
      enable: true
      label: "Book a Consultation"
      link: "/contact"
    description: "Ongoing cloud security and administration for teams that need a hands-on partner."
    features:
      - label: "Everything in Assessment"
        included: true
      - label: "Infrastructure as Code (Terraform)"
        included: true
        tooltip: "Version-controlled, repeatable environments."
      - label: "CI/CD Pipeline Management"
        included: true
      - label: "Runtime Monitoring & Alerting"
        included: true
      - label: "Multi-Cloud Coverage"
        included: false
  - title: "Enterprise"
    price: "Custom"
    yearly_price: "Custom"
    is_featured: false
    button:
      enable: true
      label: "Contact Us"
      link: "/contact"
    description: "Tailored engagements for organizations with complex, multi-cloud, or multi-team needs."
    features:
      - label: "Everything in Managed Cloud"
        included: true
      - label: "Multi-Cloud Coverage (AWS, Azure, GCP)"
        included: true
        tooltip: "Unified security and administration across providers."
      - label: "AI-SPM & Advanced Threat Detection"
        included: true
      - label: "Compliance Support"
        included: true
      - label: "Dedicated Engineer"
        included: true
comparison:
  enable: true
  badge: "Plan Matrix"
  title: "Pricing Plans <strong>Comparison</strong>"
  headers:
    - label: "Features"
    - label: "Assessment"
    - label: "Managed Cloud"
    - label: "Enterprise"
  rows:
    - feature: "Starting Price"
      values: ["$1,500 (one-time)", "$2,500/mo", "Custom"]
    - feature: "Cloud Accounts Covered"
      values: ["1", "Up to 3", "Unlimited"]
    - feature: "CSPM / Configuration Review"
      values: [true, true, true]
    - feature: "IAM & Access Audit"
      values: [true, true, true]
    - feature: "Infrastructure as Code"
      values: [false, true, true]
    - feature: "CI/CD Pipeline Management"
      values: [false, true, true]
    - feature: "Runtime Threat Detection"
      values: [false, true, true]
    - feature: "Multi-Cloud Coverage"
      values: [false, false, true]
    - feature: "Support"
      values: ["Email Support", "Priority Support", "Dedicated Engineer"]
---
