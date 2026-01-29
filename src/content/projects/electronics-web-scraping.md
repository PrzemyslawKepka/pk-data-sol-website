---
title: "Electronics Price Tracker"
description: "A web scraping pipeline intended to capture the best deals, while exposing fake discounts at the same time."
categories: ["Web Scraping", "Dashboard"]
technologies: ["Python", "BeautifulSoup", "Streamlit", "pandas", "plotly", "Raspberry Pi"]
github: "https://github.com/PrzemyslawKepka/electronics-web-scraping"
image: "/images/projects/electronics-web-scraping/electronics-web-scraping-cover.webp"
projectType: "side"
year: "2021"
lang: "en"
---

## Context

*"Should I buy it now, or wait for a discount?"*

A common dilemma we all face. Then the (in)famous Black Friday arrives, you see an allegedly big price drop, you're about to click "buy", but then you suddenly think:

*"Is this discount real? Was it actually this expensive before?"*

Facing exactly this while shopping for a new laptop, I decided to build a web scraping pipeline to collect price data from an online store over time - allowing me to spot **real discounts** and expose the fake ones.

*Note: this project predates the 2023 EU directive requiring sellers to display the lowest price from the past 30 days, which now effectively exposes these "fake discount" practices.*

## Solution

I built an automated price monitoring system and deployed it on my Raspberry Pi. It ran for **over 4 months** (August - December 2021), scraping laptop prices from one of Poland's largest electronics retailers - capturing pricing trends leading up to and through Black Friday.

### How It Worked

The scraper ran on a cron schedule, processing all laptop listings every half hour and collecting:
- Product names and specs
- **Current price** and **"former price"** (the crossed-out one)
- Ratings and availability

Everything was saved to CSV files in append mode, building up a historical price record. The Raspberry Pi just sat there quietly doing its job - **zero maintenance for over 4 months**.

### The Dashboard

To make sense of the data, I built a Streamlit dashboard that lets you:
- Select specific products and view their price history
- Filter to products with **20%+ price variance** (focusing on items with actual price movement)
- Zoom into the Black Friday period
- Compare lowest and highest prices across any time range

### What Did I Find?

Ironically, I didn't end up buying a laptop through some amazing deal discovered by the pipeline - I just found a reasonable price while browsing the store's website directly.

But the analytics clearly showed how prices were fluctuating, when the best time to buy actually was, and whether discounts were real. If I had paired this with a notification system, it could have landed me a genuinely good deal.

## Real-world Application

This is basically **price monitoring and competitive intelligence** - a common business application:
- Retailers track competitor prices
- Consumers use price history tools (like CamelCamelCamel for Amazon)
- E-commerce platforms monitor market dynamics

The techniques are the same whether you're tracking laptops for yourself or building a business intelligence system - web scraping, data persistence, time series analysis, and visualization.

## Professional Takeaways

- **Second Raspberry Pi deployment** (after the temperature monitoring project) - further proved I could build reliable, autonomous systems that just work
- **Long-term system reliability** - 4+ months of unattended operation is a solid test of robustness
- **Web scraping at scale** - handling pagination, encoding issues, and layout changes
- **Prefer APIs when available** - while this particular scraping wasn't overly complex, some sites require mimicking full browser behavior. When the same data is exposed via an internal API, it's often simpler to use that instead (respecting the site's terms of service, of course). I briefly explored another retailer's site and successfully connected to their API
