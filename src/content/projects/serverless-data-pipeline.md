---
title: "Serverless Data Pipeline — Lambda, S3, Athena & Metabase"
meta_title: "Serverless Data Pipeline Case Study"
description: "Built a serverless data pipeline with Lambda, S3, and Athena, surfaced through Metabase dashboards."
date: 2025-06-05
draft: false
category: "client"

image: "/images/case-study-hero.png"
thumbnail: "/images/case-study-hero.png"

badge: "Data Engineering"
logo: "/images/brands/livechat-logo-svg-150px.svg"
company: "Client (NDA)"

client_info:
  - icon: "/images/icons/careerdevelopment.svg"
    label: "Client"
    value: "Confidential"
  - icon: "/images/icons/healthicon.svg"
    label: "Industry"
    value: "Analytics"
  - icon: "/images/icons/paidtimeoff.svg"
    label: "Service"
    value: "Data Pipeline & Reporting"
  - icon: "/images/icons/wellbeing.svg"
    label: "Engagement"
    value: "Build & Deploy"

overview:
  image: "/images/case-study-overview.png"
  title: "Overview"
  content: |
    Raw data was landing in S3 with no automated way to process it or make it available for reporting — analysis meant manual exports and one-off queries.

    The goal was a serverless pipeline that processes incoming data automatically and exposes it through dashboards the team could self-serve from, without maintaining always-on infrastructure.

solution:
  image: "/images/case-study-solution.png"
  title: "What I Did"
  content: "Built an event-driven, serverless pipeline from raw data to dashboard."
  items:
    - "S3 as the landing zone for raw data, triggering processing via Lambda"
    - "Lambda functions to transform and catalog data for querying"
    - "Athena for serverless SQL querying directly against S3 data"
    - "Connected Metabase for self-serve dashboards and reporting on top of Athena"
---
