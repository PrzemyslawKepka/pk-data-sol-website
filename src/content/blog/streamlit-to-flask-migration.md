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

Creating apps in **Streamlit** feels like a **natural extension for data work in Python**. You've loaded your source data, you have your dataframes, charts, possibly already visualized using Jupyter Notebook. Then you decide to share your work as a web app, so you fire up Streamlit and..**.everything is so smooth**.

You're still within your known realm, operating on dataframes and charts, while Streamlit itself feels very easy and effective. You call just one method and boom, your whole table is displayed. Adding just two more lines of code and you have a filter or a clickable button as well.

It's less than a few hours and it feels like you have already built a fully-fledged app. Everything is so great, very idyllic...**until it isn't**. You start **hitting a wall**, you're literally **battling the framework** and you're trying to squeeze out more than it's meant to offer.

A fantasy scenario? Not necessarily. This can be a reality of developing Streamlit applications. But it doesn't have to be a harsh reality.
Streamlit can be a fantastic tool when you **embrace its strengths**, while being **aware of its limitations**.

So in this guide we will tackle the problem of Streamlit not being the best fit anymore. The line between when it's shining and when it's underperforming can be blurry, so we will cover the process from the very beginning until the end - a successful migration to another tool.

And we approach it from a practical perspective - I do have a couple of Streamlit applications under my belt, and with the last one, [CM Rentals](https://pk-data-solutions.com/projects/cm-rentals), I went through exactly this migration path to Flask.

## What makes Streamlit unique

**Traditional web development** usually separates the **application logic layer (backend)** and the **interface layer** that the user interacts with (**frontend**).
So at the frontend foundations we would have HTML, CSS and JavaScript, possibly wrapped in a framework like React or Vue.js, while at the backend we can have even more programming languages and frameworks.

So that's potentially **a lot of technologies involved**. And at the same time, in the data world quite often the dashboards weren't enough, and then the data professionals, like data scientists, data analysts or data engineers were expected to create web applications.

But it would mean a technology mismatch: even though you could use Python at the backend, knowledge of frontend technologies isn't something a data professional would usually possess.

And that's where **Streamlit comes in clutch**. It's an abstraction layer, allowing you to have all the application logic and the frontend part **all in one language**, in Python, and just in one framework, so in Streamlit.

Sounds too good to be real? Well, to achieve simplification of the development process, we need some serious complexity under the hood - in the end, we still need to generate HTML, CSS and JavaScript for the browser.

So this is all abstracted away in Streamlit, but the **ease of development** comes at the cost of many **compromises**.

What we can achieve "traditionally" might not be possible in Streamlit at all, or will turn out to be overly complex. A crucial part of Streamlit is its **reactivity** - every interaction with the app, like clicking a button, means that the code for the whole app will be re-run. This introduces concepts of caching and session state management, which can quickly turn simple code into a real headache.

## When Streamlit Works Great

Before diving into limitations, let's acknowledge where Streamlit excels:

- **Rapid prototyping** - Get a working app in hours (yes, one can argue that with AI you can build any app with any tech stack that quickly, but if we talk about really owning and understanding the code then it's really hard to compete with Streamlit)
- **Data-focused applications** - Built-in support for charts, tables, and data manipulation
- **ML/AI demos** - And the data focus extends to ML and AI, with built-in functions for features like chatbots
- **Internal tools** - All users get the link to the app directly, so you don't need to worry about search engines or organic discovery
- **Single-page applications** - When you need one view with interactive widgets
- **Utility first, appearance second** - You focus on the app being functional, not on customizing the appearance


## Signs You've Outgrown Streamlit

### 1. Maintaining Robust App State

Streamlit's interactivity is a blessing and a curse at the same time. A full app re-run at every interaction means that:
- If you're loading a table from a database, Streamlit will attempt to load it again anytime you click something in the app
- If you're displaying a message after clicking a button and then you use another widget, like filter, the button message will disappear unless retained explicitly

Streamlit of course provides measures to prevent this and maintain the app state:
- Caching for saving the output of a function, meaning that effectively we can just load our dataset once
- Session state for retaining the state of the app, meaning that what we've clicked once is here to stay

And while caching might be a little bit easier to harness, session state might be a real hassle if we just want to retain too much.

### 2. Performance

Even if somehow we have managed to have immaculate caching and session state, Streamlit still needs to do very heavy lifting in the background to render our Python-only code with a local web server and the frontend.

So no matter how much optimization we implement in our code, Streamlit is still an extra abstraction layer, and a real performance boost might be possible only by...not using Streamlit.

### 3. SEO Limitations

Streamlit apps are essentially single-page applications rendered client-side. There's limited control over meta tags, URLs, and page structure, so search engines struggle to index the content properly.

So if our app goes 'public', there's a good chance it will struggle to climb to that #1 position in Google search. 

### 4. Dynamic pages

Streamlit also allows multipage apps, so we can create many pages of our app, which also helps keep the code more organized.

However, under the hood it's still **one HTML file, one document**.

So in our case, for CM Rentals, we wanted to have dynamic pages for two aspects:
- **functional** - separate, dedicated pages with all the information about a selected property
- **SEO** - each dedicated page for a property should be indexed separately by Google, meaning they can be discovered directly

So to basically have a URL like this:  
https://cm-rentals.com/listing/cosy-apartment

However, this is effectively impossible in Streamlit.

Each "page" has to be declared explicitly. And **dynamic** is the keyword here - we will be loading properties from a database, they might change over time, so we cannot specify all of them. The app should just be able to handle all of them and generate the URLs on its own.

The most we could try to achieve in Streamlit is creating dynamic sections/subheaders in the app like:
https://cmrentals.tojest.dev/#cosy-apartment

But this would be neither effective nor remotely close to what we want to achieve.

### 5. Layout Constraints

Streamlit comes with a pre-designed layout. Fully functional and looks good out of the box. But if you want to go more custom, then it can be very cumbersome to make it your own.

### 6. Mobile capabilities

By default, Streamlit doesn't come with any built-in features to make the app mobile-friendly. However, with external libraries it's possible to retrieve the user's screen size and such, so we can adjust the app at least a little bit. But this is still far from perfect, and won't be as pleasant an experience as on desktop.


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
