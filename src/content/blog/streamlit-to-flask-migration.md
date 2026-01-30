---
title: "From Streamlit to Flask: When and Why to Make the Jump"
description: "A practical guide to migrating from Streamlit to Flask, based on real experience with the CM Rentals project. Learn when Streamlit hits its limits and how to plan a successful migration."
publishDate: 2026-01-29
category: "Technical"
tags: ["Python", "Flask", "Streamlit", "Web Development", "Migration"]
image: "/images/blog/streamlit-to-flask-migration/streamlit-to-flask-migration-cover.png"
readTime: 8
lang: "en"
---

## Introduction

Streamlit is fantastic for rapid prototyping and data applications. It lets you go from idea to working app in hours, not days. But there comes a point where you hit its ceiling - and that's when you need to decide: stay within Streamlit's constraints or migrate to a full web framework.

This post shares my experience migrating CM Rentals from Streamlit to Flask, covering the decision process, migration strategy, and lessons learned.

## When Streamlit Works Great

Before diving into limitations, let's acknowledge where Streamlit excels:

- **Rapid prototyping** - Get a working app in hours
- **Data-focused applications** - Built-in support for charts, tables, and data manipulation
- **Internal tools** - Perfect for team dashboards and admin panels
- **ML/AI demos** - Showcase models with minimal code
- **Single-page applications** - When you need one view with interactive widgets

For CM Rentals, Streamlit was perfect for the initial prototype. I could save rental properties through a simple form and display them on a map immediately.

## Signs You've Outgrown Streamlit

Here's what pushed me toward migration:

### 1. SEO Limitations

Streamlit apps are essentially single-page applications rendered client-side. Search engines struggle to index dynamic content, and you have limited control over meta tags, URLs, and page structure.

**The problem:** I wanted individual property pages that could be indexed by Google. With Streamlit, every property was just a different state of the same page.

### 2. URL Structure

Streamlit uses query parameters for state management, resulting in URLs like:

```
app.com/?property_id=123&view=detail
```

Instead of clean, SEO-friendly URLs like:

```
app.com/properties/cozy-studio-nimman
```

### 3. Layout Constraints

Streamlit's column-based layout is great for dashboards but limiting for custom designs. You can't easily create:

- Complex navigation structures
- Custom responsive layouts
- Pixel-perfect designs matching a brand

### 4. Performance

Every interaction triggers a full rerun of your Python script. For data-heavy applications, this means:

- Repeated database queries
- Slow interactions as the app grows
- Limited caching options

### 5. Authentication Complexity

While Streamlit now has authentication features, implementing custom auth flows (social login, role-based access) remains challenging compared to established web frameworks.

## Planning the Migration

### Step 1: Audit Your Current App

Before writing any code, I documented:

- **All features** currently in the Streamlit app
- **Database schema** (unchanged - this was a huge advantage)
- **External integrations** (Supabase, map APIs)
- **User flows** from the analytics

### Step 2: Choose Your Stack

For CM Rentals, I chose:

- **Flask** - Lightweight, flexible, Python-based (matching my Streamlit skills)
- **Jinja2 templates** - Server-side rendering for SEO
- **Leaflet.js** - Same map library I was comfortable with
- **HTMX** - For interactive elements without heavy JavaScript

Why Flask over Django or FastAPI?

- **Django** - Too opinionated for a small project
- **FastAPI** - Great for APIs, but I needed server-rendered pages
- **Flask** - Just right: flexible, well-documented, and Python

### Step 3: Define the Migration Scope

Not everything needed to migrate. I categorized features:

| Keep | Improve | Remove |
|------|---------|--------|
| Map display | URL structure | Admin panel (rebuild later) |
| Property details | SEO optimization | |
| Filtering | Mobile experience | |

## The Migration Process

### Phase 1: Core Structure (Week 1)

Set up the Flask application structure:

```
cm-rentals/
├── app/
│   ├── __init__.py
│   ├── routes/
│   │   ├── main.py
│   │   └── properties.py
│   ├── templates/
│   │   ├── base.html
│   │   └── properties/
│   └── static/
├── config.py
└── run.py
```

Key decision: Keep the same database. No schema changes meant the data layer worked immediately.

### Phase 2: Template Migration (Week 2)

This was the most time-consuming part. Converting Streamlit's automatic rendering to Jinja2 templates:

**Before (Streamlit):**
```python
st.write(f"# {property.title}")
st.write(property.description)
col1, col2 = st.columns(2)
with col1:
    st.metric("Price", f"${property.price}/month")
```

**After (Flask/Jinja2):**
```html
<h1>{{ property.title }}</h1>
<p>{{ property.description }}</p>
<div class="grid grid-cols-2">
    <div class="metric">
        <span class="label">Price</span>
        <span class="value">${{ property.price }}/month</span>
    </div>
</div>
```

### Phase 3: Interactive Features (Week 3)

Streamlit handles interactivity automatically. With Flask, I used:

- **HTMX** for filtering without full page reloads
- **JavaScript** for map interactions
- **Form submissions** for user inputs

Example: Property filtering with HTMX

```html
<select name="bedrooms"
        hx-get="/api/properties"
        hx-target="#property-list"
        hx-trigger="change">
    <option value="">All</option>
    <option value="1">1 Bedroom</option>
    <option value="2">2 Bedrooms</option>
</select>
```

### Phase 4: SEO Implementation (Week 4)

The main reason for migration. I added:

- **Dynamic meta tags** for each property
- **Sitemap generation** for search engines
- **Clean URLs** with Flask routes
- **Structured data** (JSON-LD) for rich snippets

## Results

After migration:

| Metric | Before (Streamlit) | After (Flask) |
|--------|-------------------|---------------|
| Initial load | ~3s | ~800ms |
| Google indexed pages | 1 | 50+ |
| Lighthouse Performance | 45 | 85 |
| Mobile usability | Limited | Full |

## Lessons Learned

### 1. Don't Over-Engineer

I initially planned to use React for the frontend. That would have doubled the development time. Flask with Jinja2 and a bit of HTMX was sufficient.

### 2. Keep the Database

Changing the database schema during migration adds unnecessary complexity. Migrate the presentation layer first, optimize data later.

### 3. Streamlit Skills Transfer

Understanding Python web concepts in Streamlit (sessions, caching, database queries) made Flask much easier to learn.

### 4. Consider Hybrid Approach

For internal admin tools, I still use Streamlit. Public-facing pages use Flask. Best of both worlds.

## When to Stay with Streamlit

Migration isn't always the answer. Stay with Streamlit if:

- Your app is internal-only
- SEO doesn't matter
- You need rapid iteration over polish
- Your team knows Python but not web development
- The app is data-exploration focused

## Conclusion

The Streamlit to Flask migration for CM Rentals took about 4 weeks of part-time work. The investment paid off with better SEO, faster performance, and complete design control.

The key insight: **Streamlit and Flask aren't competitors - they're different tools for different stages.** Start fast with Streamlit, migrate when you hit its limits.

If you're facing similar decisions, feel free to reach out. I'm happy to share more specific details about the migration process.
