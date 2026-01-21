---
title: "Streamlit Center & Standards"
description: "A comprehensive initiative to standardize Streamlit usage across a 150+ person BI department, including a visual cookiecutter for scaffolding new projects and unified authentication mechanism."
categories: ["Developer Tools"]
technologies: ["Python", "Streamlit", "Jinja2", "LDAP", "JWT", "Posit Connect"]
image: "/images/projects/streamlit-center/streamlit-center-cover.png"
projectType: "fte"
company: "Santander Bank Poland"
year: "2024"
lang: "en"
---

## The Context

Streamlit was growing rapidly within our Business Intelligence department (~150 data engineers, scientists, and analysts). Different teams were creating applications independently, leading to:

- Inconsistent project structures
- Duplicated effort in solving common problems
- No standardized patterns for authentication
- Knowledge silos between teams

## The Initiative

I was tasked with creating global standards for Streamlit usage and a helper tool to streamline new application development.

### Streamlit Center

Rather than just documentation, we created a Streamlit app that serves as both a guide and a code generator:

**Visual Cookiecutter**
- Users select configuration through a visual interface
- Number of pages, page names, features to include
- Generated ZIP archive with ready-to-use project template
- Jinja2 templates ensuring consistent code patterns

**Guidelines Hub**
- Best practices documentation
- Code examples and patterns
- Integration guides
- Common pitfall solutions

### Authentication Solution

Developed a unified authentication mechanism using LDAP and Active Directory:

- **Single Sign-On** for all Streamlit applications
- **JWT encoding** for credential handling
- **Reusable module** that any app could integrate
- Used across multiple applications for several months

## Impact

- **Standardization**: New projects followed consistent patterns
- **Knowledge sharing**: Central place for Streamlit knowledge
- **Faster development**: Templates reduced setup time
- **Community building**: Regular showcases and meetings

## Broader Outcomes

The initiative also led to:

- **Guidelines for tool selection**: When to use Streamlit vs Power BI vs Vue.js
- **Promotion of best practices** through meetings and demos
- **Foundation for future work**: Ideas for AI-powered code generation

## Technical Insights

Working on this project reinforced the importance of:

- **Opinionated defaults**: Sometimes standardization requires making decisions
- **Developer experience**: Good tooling increases adoption
- **Documentation**: Without it, standards don't stick
