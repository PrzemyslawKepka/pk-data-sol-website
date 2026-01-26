---
title: "Electronics Price Tracker"
description: "A web scraping pipeline deployed on Raspberry Pi for 4+ months to track laptop prices, capture Black Friday dynamics, and expose genuine vs. fake discounts through an interactive Streamlit dashboard."
categories: ["Web Scraping", "Dashboard"]
technologies: ["Python", "BeautifulSoup", "Streamlit", "pandas", "plotly", "Raspberry Pi"]
github: "https://github.com/PrzemyslawKepka/electronics-web-scraping"
image: "/images/projects/electronics-web-scraping/electronics-web-scraping-cover.png"
projectType: "side"
year: "2021"
lang: "en"
---

## Context

I wanted to buy a new laptop and was waiting for Black Friday to get a good deal. But there's always this nagging question - **are those "50% off" labels actually real discounts, or just marketing tricks?**

You know the classic move - raise the price before the sale, then "discount" it back to normal. But how do you prove it? Well, you need historical data. And if there's no historical data available... you build a system to collect it yourself.

## Solution

So I've built an automated price monitoring system and deployed it on my Raspberry Pi. It ran for **over 4 months** (August - December 2021), scraping laptop prices from a Polish electronics store, capturing the trends leading up to and through Black Friday.

### How It Worked

The scraper ran daily on a cron schedule, going through all laptop listings, collecting:
- Product names and specs
- **Current price** and **"former price"** (the crossed-out one)
- Ratings and availability

All saved to CSV files in append mode, building up a historical record. The Raspberry Pi just sat there, doing its job, **zero maintenance for over 4 months**.

### The Dashboard

To actually make sense of the data, I've built a Streamlit dashboard where you could:
- Select specific products and see their price history
- Filter to products with **20%+ price variance** (to focus on items with actual movement)
- Zoom into the Black Friday week
- See the lowest and highest prices in any time range

### What Did I Find?

The results were... well, pretty much what you'd expect if you're cynical about marketing:
- Many "deals" had much smaller actual discounts than advertised
- Some products had the "current price" actually **higher** than the "former price" (figure that one out)
- Having months of historical data made it easy to spot **pre-event price inflation**

So the 4 months of data collection paid off - you could actually verify whether Black Friday prices were genuinely the year's lowest, or just manufactured discounts.

## Real-world Application

This is basically **price monitoring and competitive intelligence** - a common business application:
- Retailers track competitor prices
- Consumers use price history tools (like CamelCamelCamel for Amazon)
- E-commerce platforms monitor market dynamics

The techniques are the same whether you're tracking laptops for yourself or building a business intelligence system - web scraping, data persistence, time series analysis, and visualization.

## Professional Takeaways

- **Second Raspberry Pi deployment** (after the temperature monitoring) - proved I could build reliable, autonomous systems that just work
- **Web scraping at scale** - handling pagination, encoding issues, layout changes
- **Long-term system reliability** - something running for 4+ months without babysitting is a good test of robustness
- **Edge computing approach** - zero cloud costs while gathering months of valuable data
