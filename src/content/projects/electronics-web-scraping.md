---
title: "Electronics Price Tracker"
description: "A web scraping pipeline deployed on Raspberry Pi for 4+ months to track laptop prices, capture Black Friday dynamics, and expose genuine vs. fake discounts through an interactive Streamlit dashboard."
categories: ["Web Scraping", "Dashboard"]
technologies: ["Python", "BeautifulSoup", "Streamlit", "pandas", "plotly", "Raspberry Pi"]
github: "https://github.com/PrzemyslawKepka/electronics-web-scraping"
image: "/images/projects/electronics-web-scraping/electronics-web-scraping-cover.png"
featured: false
projectType: "side"
year: "2021"
order: 25
lang: "en"
---

## The Motivation

I wanted to buy a new laptop and hoped to find good Black Friday discounts. But are those "50% off" deals real or just marketing tricks? I decided to find out with data.

## The Solution

I built an automated price monitoring system and deployed it on my Raspberry Pi for 4+ months (August - December 2021), capturing price trends leading up to and through Black Friday.

### Web Scraping Pipeline

**Multi-Page Scraping**
- Dynamic page detection and iteration
- Comprehensive data extraction: name, specs, price, former price, ratings
- Robust error handling for layout variations
- Polish character encoding support

**Data Collected**
- Product details and technical specs (screen, processor, memory, graphics)
- Current price vs. "former" price (pre-discount)
- Star ratings and review counts
- Delivery availability

**Production Deployment**
- Raspberry Pi autonomous operation
- Scheduled execution via cron
- Append-mode CSV for continuous collection
- Zero-maintenance for 4+ months

### Alternative API Exploration

I also discovered and documented x-kom's mobile API:
- REST API with structured JSON responses
- Cleaner than HTML scraping
- Pagination and filtering support

### Interactive Dashboard

A Streamlit application for exploring the collected data:

**Features**
- Product selection filtered to 20%+ price variance (genuine discounts)
- Time range slider for Black Friday week
- Technical specs display
- Lowest/highest price in range
- Star rating visualization

**Interactive Price Chart**
- Plotly line chart with current vs. former prices
- Hover tooltips for exact values
- Time series showing price fluctuations

## Key Findings

**Discount Validation**
- Filtering for 20%+ variance revealed many "deals" were smaller
- Some products had "current price" higher than "former price"
- Historical baseline exposed pre-event price inflation

**The Value of Long-Term Monitoring**
- 4 months of data provided statistical confidence
- Could verify if Black Friday prices were actually year's lowest
- Identified products with genuine vs. manufactured discounts

## Technical Implementation

```
├── laptops_scraping.py         # Main scraper
├── st_app.py                   # Streamlit dashboard
├── dash_app.py                 # Dash exploration
├── black_friday.ipynb          # Data analysis
└── xkom.ipynb                  # API exploration
```

### Production Considerations

- **Append mode** for continuous data collection
- **Timestamps** for tracking scrape times
- **Error resilience** with try/except for missing fields
- **Caching** in Streamlit for performance

## Technical Growth

This project demonstrated:
- **Web scraping** with BeautifulSoup at scale
- **API discovery** and integration
- **Production deployment** on edge devices
- **Interactive visualization** with multiple frameworks
- **Long-term system reliability** (4+ months autonomous operation)

## Personal Note

This second Raspberry Pi deployment (after temperature monitoring) proved I could build reliable, autonomous systems. The edge computing approach meant zero cloud costs while gathering months of valuable data.
