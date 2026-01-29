---
title: "Rapid Production Streamlit App"
description: "A mission-critical, client-facing Streamlit application built under very high time pressure."
categories: ["Web Application"]
technologies: ["Python", "Streamlit", "SQL", "Teradata"]
image: "/images/projects/rapid-streamlit-app/rapid-streamlit-app-cover.webp"
projectType: "fte"
company: "Santander Bank Poland"
year: "2024"
industry: "Credit Risk"
lang: "en"
---

## Problem Definition

*"What are your plans for the next 24 hours?"*

When your superiors ask this, it usually means overtime and a lot of coffee at unusual hours.

I was asked to quickly develop an app for bank tellers to check clients' eligibility for financial products.

Sounds simple, right? Just an interface and a database check. But there were complications:
- **Business logic was still being finalized** while we were building
- **New database needed** - the standard one was too slow
- **Daily ETL process** had to be established
- **Production-grade deployment** - previous Streamlit apps were non-critical; this one was client-facing
- **Higher scale** - dozens of concurrent users, potentially hundreds daily

And the app should have been ready yesterday.

## Solution

Building a functional app in one day? With AI tools, maybe. But AI usage was still limited at the organization - I had to build this myself.

**Streamlit** was the answer. Already established in the organization and known for rapid development, it was a natural choice.

And it turned out to be a good fit. The app was **backend-heavy but UI-light** - all the complex logic happened in database queries and Python code. The interface was simple: an input field and results display. No fancy interactivity, no complex session state. Just: enter ID → query → show result.

### What We Built

#### Core Features
- **Client ID input** with validation
- **Real-time eligibility checks** via database queries
- **Clear decision display** - yes/no with relevant details
- **Error handling** for edge cases

#### Authentication & Compliance
- **LDAP authentication** - no separate accounts, just corporate credentials already used in the organization
- **Usage logging** - tracking who checked which client and when, saved to database for audit purposes

#### Administration
- **Admin panel** - not just usage logs, but also business logic rule maintenance. Control Analysts could edit some rules themselves without touching code.

Separately, we established a new database with a daily ETL process (my boss handled this part while I focused on Streamlit).

### How It Went

After a few exhausting days (it stretched beyond 24 hours, of course), the application was deployed. And it worked:

- **Hundreds of users** handled without issues
- **Dozens of concurrent sessions** - Streamlit performed better than expected
- **Zero critical failures** after initial stabilization
- Successfully served its purpose

## Impact

This was a **proof point for Streamlit in production** at the bank. Previously considered just a prototyping tool, this project showed it can handle real load when the use case fits.

The app served as a temporary solution while a permanent system was being developed. Of course, "temporary" in enterprise often means "runs longer than expected" - and it held up.

Eventually it was replaced by a Vue app with better UI and additional features that would have been limited in Streamlit. But the Streamlit version was good enough for the start, and the Vue replacement didn't have to be built under the same time pressure.

## Professional Takeaways

- **Streamlit can work in production** - but only when the use case aligns with its strengths (backend-heavy, simple UI, limited state management)
- **Deep framework knowledge enables rapid delivery** - knowing Streamlit's quirks and capabilities meant I could move fast without hitting unexpected walls
- **Time pressure development is a different skill** - it's not just about coding fast, it's about knowing what to simplify, what corners can be cut, and what absolutely cannot be compromised
