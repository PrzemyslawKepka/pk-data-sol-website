---
title: "Customer Opinions ETL Pipeline"
description: "A production ETL pipeline processing customer feedback data from multiple sources, enabling data scientists and researchers to analyze sentiment, measure NPS, and understand customer experience."
categories: ["ETL Pipeline"]
technologies: ["Python", "SQL", "Airflow", "Teradata"]
image: "/images/projects/customer-opinions-etl/customer-opinions-etl-cover.png"
projectType: "fte"
company: "Santander Bank Poland"
year: "2025"
industry: "Finance"
lang: "en"
---

## Problem Definition

How does a bank know what customers actually think about their services? Surveys, social media, feedback forms - all this data is scattered across different systems and providers.

In my final months at Santander, I joined a team that was tackling exactly this challenge. The goal was to collect customer opinions from various sources, process them, and make them available for analysis - so data scientists could run sentiment models, UX specialists could measure experience, and the business could track NPS scores.

## Solution

This was a production ETL pipeline, already established when I joined. The data came from multiple channels:
- Customer surveys
- Social media mentions
- API integrations with external providers
- File-based data from various sources

Everything was **Python-based**, with **SQL transformations** for data preparation, all deployed and scheduled in **Airflow**.

### My Contributions

**Performance optimization** - improving existing processes and refactoring code that had accumulated technical debt over time.

**New data source integrations** - implementing connections to additional providers, following the established patterns (even when those patterns felt overengineered, like parametrized JSON instruction files).

**Documentation** - the pipeline had grown organically and documentation was lacking. I worked on filling those gaps and helping onboard new team members.

### The Different Challenge

Unlike most of my projects where I built things from scratch, here I had to **adapt to someone else's codebase and way of thinking**. Different coding style, different patterns, some decisions I would have made differently. But this is the reality of software engineering - not every project is greenfield.

## Impact

The data we processed was genuinely valuable for the bank:
- **Customer satisfaction insights** - understanding what people actually think
- **Data-driven decisions** - supporting product and service improvements
- **NPS tracking** - measuring the key metric over time

Beyond the technical work, this role involved a lot of **stakeholder management** - regular communication with business teams, translating their needs into code, coordinating with external data providers, and navigating GDPR/data privacy requirements with legal teams.

## Professional Takeaways

- **First production Airflow deployment** - finally working with a proper orchestrator, not just cron jobs
- **Working within an established team** - adapting to existing codebases and team dynamics
- **Production mindset** - maintaining critical infrastructure that others depend on, where failures have real consequences
- This project felt like a **full-circle moment** - proper data engineering, from collection through processing to enabling insights. It reinforced that data pipelines are the backbone that makes analytics, ML, and business intelligence possible.
