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

It's less than a few hours and it feels like you have already built a fully-fledged app. Everything is so great, very idyllic...**until it isn't**. You start **hitting a wall**, you're literally **battling the framework** and you're trying to **squeeze out more than it's meant to offer**.

A fantasy scenario? Not necessarily. This can be a reality of developing Streamlit applications. But it doesn't have to be a harsh reality.
Streamlit can be a fantastic tool when you **embrace its strengths**, while being **aware of its limitations**.

So in this guide we will tackle the problem of Streamlit not being the best fit anymore. The line between when it's shining and when it's underperforming can be blurry, so we will cover the process from the very beginning until the end - a successful migration to another tool.

And we approach it from a practical perspective - I do have a couple of Streamlit applications under my belt, and with the last one, [CM Rentals](https://pk-data-solutions.com/projects/cm-rentals), I went through exactly this migration path to Flask.

## What makes Streamlit unique

**Traditional web development** usually separates the **application logic layer (backend)** and the **interface layer** that the user interacts with (**frontend**).
So at the frontend foundations we would have HTML, CSS and JavaScript, possibly wrapped in a framework like React or Vue.js, while at the backend we can have even more programming languages and frameworks.

So that's potentially **a lot of technologies involved**. And at the same time, in the data world quite often the dashboards weren't enough, and then the **data professionals**, like data scientists, data analysts or data engineers were expected to **create web applications**.

But it would mean a **technology mismatch**: even though you could use Python at the backend, knowledge of frontend technologies isn't something a data professional would usually possess.

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


## What's next? The Migration Path

### Identifying bottlenecks

So the Streamlit app is working, it has received a positive feedback, why would we change anything? That's a very valid point, and if we would consider the project as finished then we could just end it here.

But if we will continue working on it, we have to **identify what is working and what is not**, basically weighing what bears lesser cost (time to outcome):
- Staying with Streamlit, but potentially struggle with the app growth (or even prevent the growth)
- Spending extra time on migrating the app to another tech stack, but with a prospect of potential time savings in the future, streamling the app growth as well

So we got functional app almost in no time, that have definitely worked very well. But if we wanted to go forward with the app, the pain points were making it a little bit bleak:
- **Dynamic pages** - we needed dedicated, individually accessible pages for each property, which we cannot achieve in Streamlit
- **SEO** - the app was public, so we wanted some search visibilty, and Streamlit does not shine at it either 
- **Layout & mobile** - while we have even made the app mobile-responsive, the default Streamlit look wasn't cutting it for a public-facing app
- **Performance** - the app was not that slow, but had some visible loading times (although maybe I could have optimized it better, but then the code simplicity would have to be compromised)

So essentially, we outgrew Streamlit in all the areas that matter for a **public-facing web application**. For an internal tool, most of these wouldn't even be a concern.

Additionally, we were also a little bit **outside data-centric** app boundaries here. Even though we did load data from a database, it would only be dozens or hundreds or records of records and no heavy data manipulation and computation (actually none at all). Just retrieve the records and display them. So beside functional layer, importance of the appearance was actually knocking here.

### Redefining the requirements

But before we delve onto all the possible options, we should stop for a second and think about our requirements for the app.
Using Streamlit imposes some rules on us.


### Choosing the new tech stack

So the decision is made. Farewall Streamlit it is. But what's next?
The abundance of options, so a number of technologies in which we can create a web app, might be stagggering and intimidating at the same.

So we should be smart here. We need some constraints. Using Streamlit means Python background, so that should be our starting point:
- We don't want to use some totally distinct technologies, so we're not gonna use PHP or .Net
- But we should rather stay with Python
- Although if staying 100% with Python is not possible, then we should accept a need to grasp some new technologies
- But as the complexity of our app won't be that high, we shouldn't pick frameworks with highest learning curves, aimed at more complicated projects

That's a start now.

#### Python-based data frameworks

Streamlit is actually not a one of a kind. There are more tools boasting to be all-in-one, alllowing to create web apps only with Python, focusing on data. **Dash**, **Panel**, **NiceGUI**, **Reflex**, the list can go on.

They would differ in the architecture compared to Streamlit, usually avoiding this problematic full re-run like Streamlit does, and some of them might actually have bigger capabilities in terms of creating a fully-fledged app rather than a prototype.

However, we have identified Streamlit's limitations on SEO, dynamic routing and layout control, and **switching to another data framework won't solve these problems**. They share the same fundamental constraints, and the improvement could potentially be only partial, not what we expect.

#### Full-stack frameworks

So we have no choice, but to enter the full-stack world.
And that world is vast, with basically three types of setups available:
- **Separate Backend and Frontend frameworks** - the most complex combination, but also giving us the most in terms of what can be achieved
- **Backend only + HTML templates** - JavaScript-based frontend frameworks like React or Vue.js still have to generate an HTML file, but they add high interactivity. But if interactivity is not what we care about the most, then at the exepnse of it we can simplify our approach and avoid going full-stack route - 
- **Frontend + Backend-as-a- Service** - this is actually an opposite approach to Backend only option. Here, we use a Frontend framework which will communicate with a da


So if data frameworks won't cut it, the next step is looking at actual web frameworks. And within Python, the main contenders are:

- **Flask** - lightweight and flexible, you build what you need without unnecessary boilerplate
- **Django** - batteries included, great for larger projects, but might be too opinionated for a smaller one
- **FastAPI** - excellent for building APIs, but if you need server-rendered pages with HTML templates, it's not its primary strength

For CM Rentals, **Flask** was the natural choice:
- It's **lightweight** - I didn't need a full-blown framework with ORM, admin panel and everything else Django provides
- It's **flexible** - I could structure the project exactly how I wanted
- It supports **Jinja2 templates** - server-side rendering, which is exactly what we need for SEO
- And most importantly, it's **Python** - so the transition from Streamlit isn't as dramatic as jumping to a completely different ecosystem


Important Note: Every migration assessment should be customised to the specific project.

### Implementation plan

Before writing any code, I documented what I had and what I needed:

- **All features** of the current Streamlit app - map display, property details, filtering
- **Database schema** - this one was crucial. I decided to **keep it unchanged**. No point in adding complexity by reorganizing the data layer during migration
- **External integrations** - Supabase for the database, Folium for maps
- **What to improve** - URL structure, SEO, mobile experience
- **What to drop** - the admin panel (would rebuild it later, separately)

The key principle was: **migrate the presentation layer, keep everything else intact**. The database stays, the data logic stays, we're just changing how things are displayed and served to the user.

## Flask vs Streamlit - Core Differences

So what does it actually look like to go from Streamlit to Flask? The fundamental difference is that **Flask separates what Streamlit combines**.

In Streamlit, your Python code **is** your app - the logic, the layout, the interactivity, all in one place. In Flask, these concerns are split:

- **Routes** (Python) - define what happens when someone visits a URL
- **Templates** (HTML/Jinja2) - define what the page looks like
- **Static files** (CSS/JS) - handle styling and interactivity

This means more files and more structure, but also **full control**. Every HTML element, every CSS rule, every URL is yours to define.

To illustrate with a simple example:

**Streamlit** - display a property:
```python
st.write(f"# {property.title}")
st.write(property.description)
col1, col2 = st.columns(2)
with col1:
    st.metric("Price", f"${property.price}/month")
```

**Flask** - the same thing, but separated into a route and a template:

Route (Python):
```python
@app.route('/listing/<slug>')
def listing(slug):
    property = get_property_by_slug(slug)
    return render_template('listing.html', property=property)
```

Template (HTML/Jinja2):
```html
<h1>{{ property.title }}</h1>
<p>{{ property.description }}</p>
<div class="price">{{ property.price }}/month</div>
```

More code? Yes. But notice what we got: a **clean URL** (`/listing/cosy-apartment`), **full HTML control**, and the ability to add **meta tags, structured data, or any CSS** we want. These are the things that weren't possible in Streamlit.

And for interactivity like filtering? No need for anything fancy. Standard **HTML forms** with a GET request do the job - the user selects their filters, clicks "Apply", and the page reloads with the filtered results. Simple, reliable, and no JavaScript framework required.

In Streamlit, filtering is arguably easier to set up with built-in widgets. But in Flask, once you write the form and the filtering logic, you have **full control** over how the filters look, how the URL changes, and how the results are displayed.

## Results

After the migration, the differences were clear:

| Metric | Streamlit | Flask |
|--------|-----------|-------|
| Initial load | ~3s | ~800ms |
| Google indexed pages | 1 | 50+ |
| Lighthouse Performance | 45 | 85 |
| Mobile usability | Limited | Full |
| Layout control | Constrained | Complete |

The **performance** improvement was significant - almost 4x faster initial load. But the biggest win was **SEO**: going from just one indexable page to over 50 individual property pages, each discoverable through Google search.

And the **layout freedom** - being able to design the pages exactly how I wanted, without fighting Streamlit's constraints - was honestly a relief.

## Lessons Learned

### 1. Don't Over-Engineer

I initially planned to use **React** for the frontend. Separate frontend and backend, API-driven, the whole thing. But that would have been a massive increase in complexity for what is, at its core, a content-focused website.

Flask with **Jinja2 templates** and **vanilla CSS/JS** turned out to be more than sufficient. The lesson: pick the simplest tool that solves your problem.

### 2. Keep the Database

This was probably the best decision of the whole migration. I didn't touch the database schema at all - same tables, same columns, same Supabase setup.

The migration was **purely about the presentation layer**. Changing the database at the same time would have introduced a whole new category of bugs and complexity. Optimize data later, once the new frontend is stable.

### 3. Streamlit Skills Transfer

Here's the good news if you're coming from Streamlit: **you're not starting from zero**. The concepts of session management, caching, and database queries all carry over to Flask. The mental models are the same, just implemented differently.

If anything, having wrestled with Streamlit's session state gave me a much better appreciation for how Flask handles state (spoiler: it's simpler).

### 4. Consider a Hybrid Approach

Not everything has to migrate. For CM Rentals, the **public-facing pages** are served by Flask, but I still use a **Streamlit app as an admin panel** for managing properties.

Why? Because for an internal tool where only I interact with it, Streamlit is genuinely perfect - rapid development, no need for SEO or custom layouts. Each tool where it shines.

## When to Stay with Streamlit

Migration isn't always the answer. Before committing to a rewrite, honestly assess if you actually need it. **Stay with Streamlit** if:

- Your app is **internal-only** - no SEO concerns, no public users
- **Appearance is secondary** - the default look is fine for your use case
- You need **rapid iteration** over polish - shipping fast matters more than pixel-perfect design
- Your team **knows Python but not web development** - and learning HTML/CSS/JS isn't on the roadmap
- The app is **data-exploration focused** - exactly what Streamlit was built for

And there's nothing wrong with that. Not every app needs to be a polished, SEO-optimized web application. Sometimes a Streamlit app is **exactly the right tool** - and acknowledging that is just as important as knowing when to move on.

## Conclusion

The Streamlit to Flask migration for CM Rentals was a significant effort. But the result - a **faster, SEO-friendly, mobile-responsive** application with complete design control - made it worth it.

The real takeaway isn't "Flask is better than Streamlit." It's that **Streamlit and Flask aren't competitors - they're tools for different stages and different needs**. Start fast with Streamlit to validate your idea, and migrate when (and if) you outgrow it.

And if you're facing a similar decision right now - take a look at the [CM Rentals project page](https://pk-data-solutions.com/projects/cm-rentals) to see the end result, and feel free to reach out if you want to chat about the specifics.
