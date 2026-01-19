---
title: "Facebook Archive Analysis"
description: "A data pipeline that processes Facebook's personal data archive to extract insights about messaging patterns, friend connections, and communication habits using Python and SQL."
category: "Data Analysis"
technologies: ["Python", "pandas", "SQLite", "matplotlib", "plotly", "Jupyter"]
github: "https://github.com/PrzemyslawKepka/facebook-archive-analysis"
image: "public/images/projects/facebook-archive-analysis/fb-archive-analysis.png"
featured: false
projectType: "side"
year: "2020-2021"
industry: "Social Media"
order: 30
lang: "en"
---

## The Motivation

I was curious about my Facebook messaging patterns and communication habits over the years. Instead of just scrolling through old conversations, I decided to build a proper data pipeline to analyze the archive.

## The Solution

A complete data engineering pipeline that transforms raw JSON exports into a queryable database with rich visualizations.

### Data Processing Pipeline

**Multi-File JSON Ingestion**
- Recursively processes all message JSON files
- Handles 255+ files in ~13 seconds
- Proper encoding conversion (Latin1 → UTF-8)
- Graceful handling of missing fields

**User-Friendly File Selection**
```python
groups_directory = tkinter.filedialog.askdirectory(
    title='Please choose the directory of the unzipped archive'
)
```

### Data Enrichment

The pipeline transforms raw Facebook data into an enriched schema:

| Original | Enriched |
|----------|----------|
| Raw timestamp | datetime, Year, Day, Hour |
| Sender name | Sent/Received classification |
| Thread type | Conversation type |

### Database Creation

Automatic SQLite database generation with two main tables:
- **Messages**: Full message history with derived fields
- **Friends**: Friend list with connection dates

### Analysis Capabilities

**Messaging Patterns**
- Time-of-day activity patterns
- Multi-year aggregations
- Sent vs. received balance by conversation

**Top Conversations**
- Message count rankings
- Percentage share of total communication
- Communication reciprocity analysis

**SQL Analytics**
- 42.3% of friends had direct message conversations
- Most common first names among connections
- Complex subqueries and aggregations

**Text Visualization**
- Word cloud from 5.6M+ words
- Stopword filtering
- Vocabulary pattern identification

## Privacy-Conscious Implementation

The project includes data anonymization for sharing:

```python
random_names = {i: names.get_full_name() for i in df['Conversation'].unique()}
```

This allows sharing analysis and visualizations without exposing personal data.

## Technical Highlights

- **Performance tracking** with execution time measurement
- **Batch DataFrame creation** (accumulate lists, create DataFrame once)
- **Multiple visualization libraries** (matplotlib, plotly, wordcloud)
- **Both Python and SQL analysis** approaches
- **Cross-platform file dialog** for easy path selection

## Insights Discovered

- **5.6M+ words** analyzed across all conversations
- **42.3%** of Facebook friends had message history
- Clear patterns in communication frequency by time of day
- Identification of one-sided vs. balanced conversations

## Skills Demonstrated

This project showcases full-stack data capabilities:

- **Data Engineering**: ETL pipeline, encoding handling, database design
- **Data Analysis**: EDA, statistical aggregations, time series
- **SQL Proficiency**: Complex queries with subqueries, type casting
- **Visualization**: Multiple libraries for different use cases
- **Privacy Awareness**: Anonymization techniques for sensitive data
