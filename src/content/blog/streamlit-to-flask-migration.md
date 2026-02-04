---
title: "From Streamlit to Flask: When and Why to Make the Jump"
description: "A practical guide to migrating from Streamlit to Flask, based on real experience with the CM Rentals project. Learn when Streamlit hits its limits and how to plan a successful migration."
publishDate: 2026-01-29
category: "Technical"
tags: ["Python", "Flask", "Streamlit", "Web Development", "Migration"]
image: "/images/blog/streamlit-to-flask-migration/streamlit-to-flask-migration-cover.webp"
readTime: 8
lang: "en"
---

## Introduction

Creating apps in Streamlit feel like a natural extension for data work in python. You have loaded your source data, you have your dataframes, charts, possible already visualised using Jupyter Notebook. Then you decide to share your work as a web app, so you fire up Streamlit and...everything is so smooth.

You're still within your known realm, so operating on dataframes and charts, while the usage of Streamlit feels very easy and effective at the same time. You call just one method and boom, your whole table is displayed. Adding just two more lines of code and you have a filter or a clickable button as well.

It's less then a few hours and it feels like you have already built a fully-fledged app. Everything is so great, very idyllic...until it isn't. You start hitting the wall, you're literally battling the framework and you're trying to squeeze from it more than it's supposed to offer.

A fantasy scenario? Not necessarily. It can be a reality of developing Streamlit applications. But it doesn't have to be a harsh reality.
Streamlit can be a fantastic tool when you embrace its strengths, and at the same time you're aware of its limitations.

So in this guide we will tackle the problem of Streamlit not being the best fit anymore. The line of when it's shining and when it's underperforming might be blurry, so we will cover the process from the very beginning until the end, so a successful migration to another tool.

And we approach it from a practical perspective - I do have a couple of Streamlit applications under my belt, and with the last one, [CM Rentals](https://pk-data-solutions.com/projects/cm-rentals), I went exactly through the migration path to Flask.

## What makes Streamlit unique

Traditional web development usually seperate the application logic layer (backend) and the interface layer, with which the user interacts (frontend).
So at the frontend foundations we would have HTML,CSS and JavaScript, possibly wrapped around a framework like React or Vue.js, while at the backend we can have even more programing languages and frameworks.

So that's potentially a lot of technologies involved. And at the same time, in the data world quite often the dashboards weren't enough, and then the data professionals, like data scientists, data analysts or data engingeers were supposed to create web applications. But it would mean a technology mismatch: even though you could use Python at the backend, knowledge of frontend technologies isn't something a data professional would usually possess.

And that's where Streamlit comes in clutch. It's an abstraction layer, allowing to have all the application logic and the frontend part all in one language, in Python, and just in one framework, so in Streamlit.

Sounds too good to be real? Well, to achieve simplification at the development process it means that we need some serious complexity under the hood, as in the end we still need to generate the HTML file for the website and we need CSS for styling as well (and also JavaScript for the interactivity part). So this is abstracted away in Streamlit, but the ease in development comes at the cost of many compromises.

What we can achieve "traditionally" might not be possible in Streamlit at all, or will turn out to be overly complex. Crucial part of Streamlit is it's reactivity - every interaction with the app, like clicking a button, means that the code for the whole app will be re-run. This introduces concepts of caching and session state management, which can quickly turn a simple code to a real headache.

## When Streamlit Works Great

Before diving into limitations, let's acknowledge where Streamlit excels:

- **Rapid prototyping** - Get a working app in hours (yes, one can argue that with AI you can build any app with any tech stack that quickly, but if we talk about really owning and understanding the code then it's really hard to compete with Streamlit)
- **Data-focused applications** - Built-in support for charts, tables, and data manipulation
- **ML/AI demos** - And the data focus extends to ML and AI, with built-in functions for features like chatbots
- **Internal tools** - All the users will get the link to the app, it won't be public and you don't care about search engines, with users discovering the app organically
- **Single-page applications** - When you need one view with interactive widgets
- **Utility first, appearance second** - You focus on the app being functional, not on customizing the appearance


## Signs You've Outgrown Streamlit

### 1. Maintaining Robust App State

Streamlit's interactivity is a blessing and a curse at the same time. A full app re-run at every interaction means that:
- If you're loading a table from a database, Streamlit will attempt to load it again anytime you click something in the app
- If you're displaying a message after clicking a button and then you use another widget, like filter, the button message will disappear unless retain explicitly

Streamlit of course provides measure to prevent this and maintain the app state:
- Caching for saving the output of a function, meaning that effectively we can just load our dataset once
- Session state for retaining the state of the app, meaning that what we have clicked once will be here to stay

And while caching might be a little bit easier to harness, session state might be a real hassle if we want just want to retain too much.

### 2. Performance

Even if somehow we have managed to have an immaculate caching and session state, Streamlit still needs to do a very heavy lifting in the background to render our python-only code with a local web server and the frontend code.

So not matter how much optimization we implement in our code, Streamlit is still an extra abstraction layer, and real performance boost might be possible only by...not using Streamlit.

### 3. SEO Limitations

Streamlit apps are essentially single-page applications rendered client-side. Search engines struggle to index dynamic content, so there's limited control over meta tags, URLs, and page structure.

So if our app goes 'public', there's a big chance that it will struggle to climb to that #1 position in Google search. 

### 4. Dynamic pages

Streamlit also allows multipage apps, so we can create many pages of our app, which also helps the code to stay more organized.

However, under the hood it's still one HTML file, one document.

So in our case, for CM Rentals, we wanted to have dynamic pages for two aspects:
- functional - sepearate, dedicated pages with all the information about selected property
- search-engine optimization - each dedicated page for a property should be indexed seperately by Google Search Engine, meaning that they can be discovered directly

So to basically have an URL address like this:  
https://cm-rentals.com/listing/cosy-apartment

However, this is not effectively possible in Streamlit.

Each "page" has to be declared explicitly. And dynamic page is a keyword here - we will be loading properties from a database, they might change over time, so we cannot specify all of them. The app should just be able of handling all of them and create the URLS by itself.

What we could only try to achieve in Streamlit is to create dynamic sections/subheaders in the app like:
https://cmrentals.tojest.dev/#cosy-apartment

But this would be neither effective nor remotely close to what we want to achieve.

### 5. Layout Constraints

Streamlit comes with with a pre-designed layout. Fully functional and looks good out-of-the box. But if you want to go more custom, than it can be very cumbersome to try to make it your way.

### 6. Mobile capabilities

By default, Streamlit does not come with any features that can make the app more mobile-friendly. However, with external libraries it's possible to retrieve user's screen size and such, so we can adjust the app at least a little bit. But this is still far from perfect, and won't be as pleasant experience as the desktop.


## What's next? The Migration path

### Identifying bottlenecks

### Choosing the new tech stack

#### Python-based data frameworks

#### Full-stack frameworks

### Implementation plan

## Flask vs Streamlit - core differences

## Results

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


---------
Old, deprecated

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
