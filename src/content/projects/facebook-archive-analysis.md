---
title: "Facebook Archive Analysis"
description: "A data pipeline that processes Facebook's personal data archive to extract insights about messaging patterns, friend connections, and communication habits using Python and SQL."
categories: ["Data Analysis"]
technologies: ["Python", "pandas", "SQLite", "matplotlib", "plotly", "Jupyter"]
github: "https://github.com/PrzemyslawKepka/facebook-archive-analysis"
image: "/images/projects/facebook-archive-analysis/facebook-archive-analysis-cover.png"
projectType: "side"
year: "2020-2021"
industry: "Social Media"
lang: "en"
---

## Context

Did you know you can download your entire Facebook data archive? All your messages, friend connections, everything - Facebook lets you export it as JSON files.

So I did. And once I had years of messaging history sitting on my disk, I got curious. Who did I message the most? How did my communication patterns change over time? Are some conversations more one-sided than others?

Instead of just scrolling through old chats, I decided to build a proper data pipeline to actually analyze this.

## Solution

The project turned into a **complete ETL pipeline** - from raw JSON files to a queryable SQLite database with visualizations.

### Processing the Archive

Facebook exports your data as hundreds of JSON files scattered across folders. My pipeline:
- Recursively finds and processes all message files (handled **255+ files in about 13 seconds**)
- Deals with Facebook's weird encoding choices (Latin1 → UTF-8 conversion)
- Enriches the data with derived fields - extracting year, day, hour from timestamps, classifying sent vs. received messages

### Building the Database

Everything gets loaded into a **SQLite database** with proper tables for messages and friend connections. This makes it easy to run SQL queries and explore the data however you want.

### What I Discovered

Some interesting findings from analyzing my own data:
- **5.6M+ words** across all conversations (that's a lot of chatting over the years)
- **42.3%** of my Facebook friends had actual message history with me
- Clear patterns in when I'm most active - time-of-day communication habits
- Some conversations were pretty one-sided (either them or me doing most of the talking)

I even generated a **word cloud** from all the messages to see vocabulary patterns.

### Privacy Consideration

Since this is personal data and I wanted to share the project publicly, I built in **anonymization** - all names get replaced with random generated ones before any visualizations are shared.

## Real-world Application

This is basically a **data engineering project applied to personal data**:
- **ETL pipeline** - extracting from messy source files, transforming, loading into a database
- **Encoding issues** - a classic real-world data problem
- **Multiple analysis approaches** - both pandas and SQL
- **Visualization** - using the right tool for each use case

The same techniques apply to any JSON-based data source - API responses, log files, export archives from various platforms.

## Professional Takeaways

- **Handling messy real-world data** - encoding issues, inconsistent structures, missing fields
- **Building proper pipelines** - not just notebooks, but reusable code that processes data consistently
- **SQL and Python together** - using each where it makes sense
- **Privacy awareness** - thinking about anonymization when working with personal data
