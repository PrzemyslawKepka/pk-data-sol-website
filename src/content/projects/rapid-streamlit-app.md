---
title: "Rapid Production Streamlit App"
description: "A mission-critical, client-facing Streamlit application built under very high time pressure."
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

Being suddenly asked by your superiors

*"What are your plans for the next 24 hours?*

Usually do not foreshadow anything good, but overtime and a lot of coffee to be consumed at not the most usual hours.

So I was approached to quickly develop an app that would be a complimentary tool for bank tellers to check clients availability for financial products.

In theory it does not sound that bad, right? Just a simple interface and a database check. Well...not exactly. There were some complications as well:
- **Business logic was still being finalized** while we were building
- **A new database had to be set up** because the standard one was too slow
- **A daily ETL process** needed to be established
- So far Streamlit apps in our organization were rather non-critical, while this was supposed to be a **production-grade Streamlit deployment**, client-facing actually
- And we would expect dozens of concurrent users at the same time, and potentially even hundreds of users daily in total, so a way **higher scale than the apps we had before**.

And the app should be ready for yesterday. Well...good luck there then.

## Solution

Building a functional app in just one day? Easy-peasy with AI one might say (although heavily debatable). But what if the usage of AI is still limited at your organization, and you have to come up with the solution yourself?

Streamlit to the rescue!

Already established in the organization, known for rapid development, that's the reason why it was chosen for this task.

And turned out to be a good fit.

Why? Because the app was **backend-heavy but UI-light**. All the complex logic happened in the database queries and Python code. The interface was rather simple - an input field and results display. No fancy interactivity, no complex session state management. Just: enter ID → query → show result.

### What We Built

- Client ID input with validation
- Real-time database queries for eligibility checks
- Clear decision display (yes/no with relevant details)
- Error handling for edge cases
- LDAP authentication, used before for other Streamlit apps (no seperate accounts, just a corporate acount used within the organization)
- **Usage logging** - tracking who checked which client, when (important for audit purposes), everything saved in the database
- **Admin panel** - with not only usage logs, but also for maintaining business logic rules (so not everything had to be hard-coded and edited by us in code, but Control Analysts could edit some of the rules themselves)

And separately we have established a new database with a daily ETL process (this part was mostly handed by boss, while I was responsible for the Streamlit part).

### How It Went

After a few exhausting days (it stretched beyond the initial 24 hours, of course), the application was deployed. And it worked.

- **Handled hundreds of users** without falling over
- **Dozens of concurrent sessions** - Streamlit handled it better than we have expected
- Zero critical failures after initial stabilization
- Successfully served its purpose

## Impact

This was a **proof point for Streamlit in production** at the bank. Previously it was considered more of a prototyping tool, but this showed it can handle real load when the use case fits.

The app served as a temporary solution while a more permanent system was being developed - but "temporary" in enterprise often means "runs for longer than expected," and it held up. But eventually it was replaced by an app written in Vue, and the subsequent app was just better. Not only in terms of the UI, but also in terms of additional features, which would be very limited in Streamlit.

But the Streamlit app was good enough for the start, and even though the Vue was created rather rapidly as well, it didn't have to be created under the same pressure.

## Professional Takeaways

- **Streamlit can work in production** - but only when the use case aligns with its strengths (backend-heavy, simple UI, limited state management)
- **Deep framework knowledge enables rapid delivery** - knowing Streamlit's quirks and capabilities meant I could move fast without hitting unexpected walls
- **Time pressure development is a different skill** - it's not just about coding fast, it's about knowing what to simplify, what corners can be cut, and what absolutely cannot be compromised
