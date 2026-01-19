---
title: "CM Rentals"
description: "A web application helping people find monthly rental accommodations in Chiang Mai, Thailand. Features an interactive map displaying verified properties with filters and detailed information."
category: "Web Application"
technologies: ["Python", "Flask", "Streamlit", "PostgreSQL", "Supabase", "HTML", "CSS", "Leaflet.js"]
github: "https://github.com/PrzemyslawKepka/cm-rentals-flask"
liveUrl: "https://cm-rentals.com"
image: "/images/projects/cm-rentals/cm-rentals-cover.png"
featured: true
projectType: "current"
year: "2025-2026"
industry: "Real Estate"
order: 100
lang: "en"
---

## The Problem

Finding short-term accommodation (1-3 months) in Chiang Mai, Thailand proved to be surprisingly challenging. While Airbnb works for month-long stays, it can be overpriced. Facebook groups have listings but lack map functionality, making it hard to visualize locations and compare options.

## The Solution

I built CM Rentals - a web application that aggregates and displays monthly rental properties on an interactive map. The app allows users to:

- **View all properties on an interactive map** - see exactly where each property is located
- **Filter by price range, amenities, and property type** - find exactly what you're looking for
- **Access detailed property information** - including photos, contact details, and availability
- **Compare options easily** - with all data in one place

## Technical Implementation

The project evolved through multiple iterations:

1. **Initial Prototype (Streamlit)** - Quick MVP to validate the idea, using Supabase as the backend
2. **Production Version (Flask)** - Rewrote to Flask for better SEO and performance, with HTML templates and proper routing

### Key Technical Decisions

- **Supabase** for database and storage - free tier, PostgreSQL-based, easy to work with
- **Leaflet.js** for interactive maps - open source, mobile-friendly
- **Self-hosted on VPS** - full control over deployment, cost-effective

## Impact & Reception

Posted on Reddit and Facebook groups, the project received positive feedback:

- **Active users** finding accommodations through the platform
- **Positive comments** from the digital nomad community
- **Practical demonstration** of turning a personal pain point into a useful tool

## Lessons Learned

- Sometimes the best projects come from solving your own problems
- Streamlit is great for prototypes but has SEO limitations
- Community feedback is invaluable for validation
- Don't over-engineer - start simple, iterate based on real usage
