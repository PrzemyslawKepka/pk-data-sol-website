---
title: "CM Rentals"
description: "A web application helping people find monthly rental accommodations in Chiang Mai, Thailand. Features an interactive map displaying verified properties with filters and detailed information."
categories: ["Web Application"]
technologies: ["Python", "Flask", "Streamlit", "PostgreSQL", "Supabase", "HTML", "CSS", "Leaflet.js"]
github: "https://github.com/PrzemyslawKepka/cm-rentals-flask"
liveUrl: "https://cm-rentals.com"
image: "/images/projects/cm-rentals/cm-rentals-cover.png"
projectType: "current"
year: "2025-2026"
industry: "Real Estate"
isCommercial: false
lang: "en"
---

## Context

When I arrived in Chiang Mai, Thailand, I needed to find a monthly rental for a few months. Sounds simple enough, right?

Well, not really. Airbnb works for month-long stays, but it's often overpriced for what you get. The real deals are in Facebook groups - locals and agents post there. But Facebook groups have no map functionality whatsoever. You're scrolling through hundreds of posts, trying to figure out where each place actually is, whether it's close to what you need, and comparing options becomes a nightmare.

So I thought - **why not build a tool that solves this?**

## Solution

I've built CM Rentals - a web application that displays rental properties on an interactive map, making it actually possible to see where everything is and compare options at a glance.

### Core Features

- **Interactive map with all properties** - finally you can see the locations
- **Filtering by price, amenities, and property type** - to narrow down to what you actually need
- **Detailed property pages** - with photos and contact info

### Technical Evolution

The project went through two versions:
- **First, a Streamlit prototype** - quick to build, good for validating if the idea even makes sense
- **Then a Flask rewrite** - because Streamlit has SEO limitations and I wanted the site to be discoverable on Google

I'm using **Supabase** for the database (PostgreSQL-based, free tier is generous), **Leaflet.js** for the maps, and the whole thing is **self-hosted on a VPS** for full control.

## Real-world Application

So what happened when I shared it? I posted on Reddit and in local Facebook groups, and actually got positive feedback. People started using it to find accommodations, which was quite validating.

This project is a good example of **turning a personal pain point into something useful for others**. The data engineering side (collecting, storing, displaying property data) is straightforward, but the real value is in solving an actual problem that people have.

## Professional Takeaways

- **The best project ideas often come from your own problems** - if something frustrates you, it probably frustrates others too
- **Start with an MVP, then iterate** - the Streamlit prototype helped me validate the idea before investing more time
- **Streamlit has its place, but it's not for everything** - for a public-facing site that needs SEO, a proper web framework is better
- **Community feedback is invaluable** - real users tell you what matters
