---
title: "Rapid Production Streamlit App"
description: "A mission-critical, client-facing Streamlit application built under extreme time pressure, serving hundreds of bank tellers with real-time customer eligibility checks."
categories: ["Web Application"]
technologies: ["Python", "Streamlit", "SQL", "Teradata"]
image: "/images/projects/rapid-streamlit-app/rapid-streamlit-app-cover.png"
projectType: "fte"
company: "Santander Bank Poland"
year: "2024"
industry: "Credit Risk"
lang: "en"
---

## Problem Definition

I got approached with what might be one of the most stressful requests in software development: **build a client-facing application in approximately 24 hours**.

The app would be used by bank tellers, right there with customers sitting in front of them. Enter a client ID, check eligibility for financial products, get a clear yes/no decision. Hundreds of users, dozens of concurrent sessions.

And the complications?
- Data accuracy and speed were critical (customers waiting)
- A new database had to be set up because the standard one was too slow
- A daily ETL process needed to be established
- Business logic was still being finalized while we were building
- This would be our first truly **production-grade Streamlit deployment**

No pressure.

## Solution

Despite the constraints, **Streamlit turned out to be a surprisingly good fit**.

Why? Because the app was **backend-heavy but UI-light**. All the complex logic happened in the database queries and Python code. The interface was simple - an input field and results display. No fancy interactivity, no complex session state management. Just: enter ID → query → show result.

### What We Built

- Client ID input with validation
- Real-time database queries for eligibility checks
- Clear decision display (yes/no with relevant details)
- Error handling for edge cases
- **Usage logging** - tracking who checked which client, when (important for audit purposes)

### How It Went

After a few exhausting days (it stretched beyond the initial 24 hours, of course), the application was deployed. And it worked.

- **Handled hundreds of users** without falling over
- **Dozens of concurrent sessions** - Streamlit handled it better than I expected
- Zero critical failures after initial stabilization
- Successfully served its purpose

## Impact

This was a **proof point for Streamlit in production** at the bank. Previously it was considered more of a prototyping tool, but this showed it can handle real load when the use case fits.

The app served as a temporary solution while a more permanent system was being developed - but "temporary" in enterprise often means "runs for longer than expected," and it held up.

## Professional Takeaways

- **Streamlit can work in production** - but only when the use case aligns with its strengths (backend-heavy, simple UI, limited state management)
- **Deep framework knowledge enables rapid delivery** - knowing Streamlit's quirks and capabilities meant I could move fast without hitting unexpected walls
- **Time pressure development is a different skill** - it's not just about coding fast, it's about knowing what to simplify, what corners can be cut, and what absolutely cannot be compromised
