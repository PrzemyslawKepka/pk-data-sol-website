---
title: "Streamlit Center & Standards"
description: "A comprehensive initiative to standardize Streamlit usage across a 150+ person BI department, including a visual cookiecutter for scaffolding new projects and unified authentication mechanism."
categories: ["Developer Tools"]
technologies: ["Python", "Streamlit", "Jinja2", "LDAP", "JWT", "Posit Connect"]
image: "/images/projects/streamlit-center/streamlit-center-cover.webp"
projectType: "fte"
company: "Santander Bank Poland"
year: "2024"
lang: "en"
---

## Problem Definition

What happens when a tool becomes popular but nobody coordinates how it's used?

Streamlit was growing rapidly within our Business Intelligence department - around 150 people including data engineers, data scientists and data analysts. Different teams were building applications independently, which led to the predictable problems:

- **Inconsistent project structures** - everyone organizing code differently
- **Duplicated effort** - teams solving the same problems over and over
- **No standard for authentication** - everyone implementing it their own way
- **Knowledge silos** - what one team learned didn't reach others

So my role was to **create global standards** for Streamlit usage and a helper tool to streamline new application development.

## Solution

Rather than just writing documentation that nobody reads, I built **a Streamlit app that helps you create Streamlit apps**. We called it "Streamlit Center."

### The Visual Cookiecutter

The main feature was a **project generator with a visual interface**:
- Select how many pages you need, name them
- Choose which features to include
- Click generate, download a ZIP with a **ready-to-use project template**

Under the hood, it used the **Python Cookiecutter** module and **Jinja2 templates** to generate consistent code patterns. Every new project would start with the same structure, coding style, and patterns (no more different logos for every app).

### Authentication Module

One of the biggest pain points was authentication - not every app should be accessible to everyone in the organization. I developed a **unified authentication mechanism** using LDAP and Active Directory:
- **Single Sign-On** for all Streamlit apps
- **JWT encoding** for credential handling
- **Reusable code** that could be easily implemented in any project (ultimately intended to be released as an internal library)
- **Per-app access control** - app owners could individually decide who gets access

This ran across multiple applications for several months, until licensing changes at Posit Connect (the hosting platform) deprecated this approach.

### Logging Module

For some apps, tracking usage is crucial - who visits, who clicks what (and sometimes, who broke what). We implemented a custom logging solution:

#### Infrastructure
- **Dedicated logging tables** in MS SQL Server
- **Database class** with INSERT permissions, implemented in app code

#### What We Track
- **Page visits**
- **Executed actions** (button clicks, etc.)

We also handled **deduplication** - Streamlit's re-run on every interaction could otherwise result in many duplicate log entries.

Several apps successfully implemented this logging. Some tables now have tens of thousands of rows (probably hundreds of thousands by now).

### The Guidelines Hub

The app also served as **a central place for documentation** - best practices, code examples, integration guides, solutions to common problems. All in one place, searchable, maintained.

## Impact

**Standardization** - new projects actually followed consistent patterns because it was the path of least resistance (the template did it for you).

**Faster onboarding** - new team members could become productive faster because the patterns were documented and the templates handled the boilerplate.

**Community building** - the initiative led to regular showcases and meetings where teams shared what they built.

This also led to **broader discussions** about tool selection - when to use Streamlit vs Power BI vs a proper Vue.js frontend. Sometimes the answer was "Streamlit isn't the right tool for this."

## Professional Takeaways

- **Developer experience matters** - if the standardized way is easier than doing it yourself, people will actually use it
- **Opinionated defaults are valuable** - sometimes you need to just make decisions instead of offering endless configuration options
- **Documentation without tooling doesn't stick** - the project generator was what made people actually follow the standards
