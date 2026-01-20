---
title: "Customer Opinions ETL Pipeline"
description: "A production ETL pipeline processing customer feedback data from multiple sources, enabling data scientists and researchers to analyze sentiment, measure NPS, and understand customer experience."
category: "ETL Pipeline"
technologies: ["Python", "SQL", "Airflow", "Teradata"]
image: "/images/projects/customer-opinions-etl/customer-opinions-etl-cover.png"
featured: false
projectType: "fte"
company: "Santander Bank Poland"
year: "2025"
industry: "Finance"
order: 85
lang: "en"
---

## The Context

In my final months at Santander, I was part of a team responsible for maintaining and developing a crucial data pipeline. This pipeline collected and processed customer opinions about the bank from various sources.

## The Pipeline

### Data Sources

The pipeline ingested customer feedback from multiple channels:
- **Surveys** sent to customers
- **Social media posts** about the bank
- **API integrations** with external providers
- **File-based data** sent to our servers

### Technical Architecture

**Data Processing**
- Python-based ETL with advanced patterns (Factory classes, multithreading)
- SQL transformations for data preparation
- Deployed and scheduled in Airflow

**Data Consumers**
- Data scientists running ML models
- Researchers analyzing customer sentiment
- UX specialists measuring experience
- Net Promoter Score (NPS) calculations

### My Contributions

**Optimization Work**
- Performance improvements to existing processes
- Code refactoring and cleanup

**New Data Sources**
- Implemented integrations following established patterns
- Worked with external data providers

**Documentation**
- Created missing documentation for the pipeline
- Helped onboard team members

## Unique Aspects

### Joining an Existing Codebase

Unlike my previous projects where I built from scratch, here I inherited a substantial codebase:
- Different coding style and patterns
- Some overengineered components (parametrized JSON instruction files)
- Required adaptation to someone else's way of thinking

This is normal in software engineering - not every project starts from scratch.

### Business Impact

The data we processed was genuinely valuable:
- Enabled understanding of customer satisfaction
- Supported data-driven product decisions
- Measured effectiveness of service improvements

### Stakeholder Management

Beyond the technical work:
- Regular communication with business stakeholders
- Understanding and translating their needs into code
- Coordination with external data providers
- GDPR/data privacy considerations (working with legal teams)

## Technical Growth

This project expanded my skill set:
- **Airflow**: First time deploying pipelines to production orchestrator
- **Advanced Python patterns**: Factory classes, multithreading
- **Team dynamics**: Working within an established technical team
- **Production mindset**: Maintaining critical infrastructure others depend on

## Personal Note

This project represented a full-circle moment: from data collection through processing to enabling insights - a proper data engineering role. It reinforced that data pipelines are the backbone that makes analytics, ML, and business intelligence possible.
