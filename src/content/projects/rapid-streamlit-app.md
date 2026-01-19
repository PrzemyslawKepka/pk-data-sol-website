---
title: "Rapid Production Streamlit App"
description: "A mission-critical, client-facing Streamlit application built under extreme time pressure, serving hundreds of bank tellers with real-time customer eligibility checks."
category: "Web Application"
technologies: ["Python", "Streamlit", "SQL", "Teradata"]
featured: false
projectType: "fte"
company: "Santander Bank Poland"
year: "2024"
industry: "Credit Risk"
order: 75
lang: "en"
---

## The Challenge

I was approached with an urgent request: build a client-facing application in approximately 24 hours. The app would be used by bank tellers working directly with customers.

**The Requirements**
- Interface to enter client IDs
- Perform eligibility checks against the database
- Return clear yes/no decisions on financial products
- Handle hundreds of users with dozens of concurrent sessions

**The Complications**
- Data accuracy and retrieval speed were critical
- A new database had to be set up (standard one too slow)
- Daily ETL process needed to be established
- Business logic was still being finalized
- This would be our first truly production-grade Streamlit deployment

## The Solution

Despite the constraints, Streamlit proved to be a surprisingly good fit for this use case.

### Why Streamlit Worked

**Backend-Heavy, UI-Light**
- Complex logic happened in the database queries and Python
- The UI was straightforward: input field, results display
- No complex session state management needed

**Rapid Development**
- Pure Python meant fast iteration
- Built-in components for inputs and displays
- No frontend framework overhead

### Features Implemented

**Core Functionality**
- Client ID input with validation
- Real-time database queries
- Clear eligibility decision display
- Error handling for edge cases

**Production Considerations**
- Usage logging to database (who checked which client, when)
- Performance optimization for concurrent users
- Proper error messages for user guidance

## The Outcome

After a few exhausting days (it stretched beyond the initial 24 hours), the application was successfully deployed and performed well under production load.

**Key Achievements**
- Handled hundreds of users without issues
- Dozens of concurrent sessions supported
- Zero critical failures after initial stabilization
- Successfully served its purpose as a temporary solution

## Lessons Learned

**Streamlit in Production**
- Can work for certain production scenarios
- Best suited for backend-heavy applications with simple UIs
- Concurrent session handling was better than expected

**Time Pressure Development**
- Having deep framework knowledge enables rapid delivery
- Clear requirements (even if evolving) are essential
- Team coordination critical under pressure

## Personal Note

While I'd still be cautious about Streamlit for all production apps, this project proved it can be battle-tested in a large organization when the use case aligns with its strengths.
