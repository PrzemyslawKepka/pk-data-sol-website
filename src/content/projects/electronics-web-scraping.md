---
title: "Electronics Price Tracker"
description: "A web scraping pipeline intended to capture the best deals, while exposing fake discounts at the same time."
categories: ["Web Scraping", "Dashboard"]
technologies: ["Python", "BeautifulSoup", "Streamlit", "pandas", "plotly", "Raspberry Pi"]
github: "https://github.com/PrzemyslawKepka/electronics-web-scraping"
image: "/images/projects/electronics-web-scraping/electronics-web-scraping-cover.png"
projectType: "side"
year: "2021"
lang: "en"
---

## Context

*"Shall I buy it now, or maybe I should wait for a discount?"*

That is a very common dilemma for so many of us. Then the (in)famous Black Friday arrives, you see an allegedly big price drop, you're about to make the transaction, but then you suddently think

*"Is the discount real? Was it really that expensive before?"*

So facing exactly this while wanting to buy a new laptop, I've decided to build a web scraping pipeline, which would collect the data from an online store over time, allowing me to spot real discounts, distinguish them from...not discounts, only claimed as one.

*Note: this was done before the EU-law, introduced in 2023, enforcing sellers to show the lowest price within last 30 days, and effectively exposing these bad practices of creating a "fake discount" by raising the base price.*

## Solution

So I have set up a web scraping pipeline, scheduled to retrieve all products available under laptops category, at one of the leading retail online stores in Poland for electronics. And having the data gathered, I could then do some analytics.

So I've built an automated price monitoring system and deployed it on my Raspberry Pi. It ran for **over 4 months** (August - December 2021), scraping laptop prices from a Polish electronics store, capturing the trends leading up to and through Black Friday.

### How It Worked

The scraper ran daily on a cron schedule, going through all laptop listings every half an hour, collecting:
- Product names and specs
- **Current price** and **"former price"** (the crossed-out one)
- Ratings and availability

All saved to CSV files in append mode, building up a historical record. The Raspberry Pi, on which it was deployed, just sat there, doing its job, **zero maintenance for over 4 months**.

### The Dashboard

To actually make sense of the data, I've built a Streamlit dashboard where you could:
- Select specific products and see their price history
- Filter to products with **20%+ price variance** (to focus on items with actual movement)
- Zoom into the Black Friday week
- See the lowest and highest prices in any time range

### What Did I Find?

Well...in the end I didn't buy a laptop through some amazing deal found thanks to the scraping pipeline. I just found some reasonable price by directly browsing the store's website.

But through the analytics I could indeed see how price were fluctuating, when was indeed the best time to buy, and if the discount was actually real. So if I would just pair this up with some notifications, then it could really land me some good deal.

## Real-world Application

This is basically **price monitoring and competitive intelligence** - a common business application:
- Retailers track competitor prices
- Consumers use price history tools (like CamelCamelCamel for Amazon)
- E-commerce platforms monitor market dynamics

The techniques are the same whether you're tracking laptops for yourself or building a business intelligence system - web scraping, data persistence, time series analysis, and visualization.

## Professional Takeaways

- **Second Raspberry Pi deployment** (after the temperature monitoring) - proved I could build reliable, autonomous systems that just work, without much maintenance needed
- **Long-term system reliability** - something running for 4+ months without babysitting is a good test of robustness
- **Web scraping at scale** - handling pagination, encoding issues, layout changes
- **But if API is available, go with the API** - so in this case the web scraping wasn't that complicated, but some website it might be really problematic, where you would basically have to imititate browser actions to retrieve all the data. But the same time, this data might be exposed through API, so it's way simpler to just use API (but of course it has to be done accordingly to the shop rules about scraping, as these internal API usually aren't intended to be used outside the web app). In the published product I have used only web scraping from one store, but in my brief attempt to retrieve data from another store I was indeed able to connect to the API


