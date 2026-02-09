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

Streamlit's interactivity is a blessing and a curse at the same time. A **full app re-run at every interaction** means that:
- If you're loading a table from a database, Streamlit will attempt to **load it again anytime you click something** in the app
- If you're displaying a message after clicking a button and then you use another widget, like filter, the button message will **disappear unless retained explicitly**

Streamlit of course provides measures to prevent this and maintain the app state:
- **Caching** for saving the output of a function, meaning that effectively we can just load our dataset once
- **Session state** for retaining the state of the app, meaning that what we've clicked once is here to stay

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
Usage of Streamlit imposes some rules on us. It's not only the functional and visual constraints, but also the reactivity. App reload after every interaction is actually a highest degree of interactivity that we can have in the we app.

But do we actually need that much interactivity? The answer is - no, not at all.

Our requirements are as following:
- We keep **all features** of the current Streamlit app - map display, property table, filtering
- We also retain the **database schema** - there's no point in adding complexity by reorganizing the data layer during migration, especially that it works seamlessly already
- **External integrations** should be here to stay - Supabase for the database, Folium for maps
- We add **dedicating property pages** - for SEO and better user experience
- Simiarly, we also improve the general **layout and mobile responsiveness**

And the reactivity part:
- We retrieve all the data from database while loading the website
- When we go to specific property page then we already have all the data
- We will have Filters feature for properties, but it doesn't have to be that interactive, reload just after we changes some parameters. It is more than acceptable to click an extra button to apply the filter changes

So we reach a conclusion here. **We don't need highly interactive application**. We will be more than happy with a static website, where the content of the webiste will be pre-loaded for us by the server, and not changed dynamically while browsing the app.
That's almost a breakthrough. It not only aligns with our main goal improving the SEO, but should generally mean that the app code might be simpler.


### Choosing the new tech stack

So the decision is made. Farewall Streamlit it is. And we have already revisited our requirements, so we have a direction we're headed to.

Bu the abundance of options, so a number of technologies in which we can create a web app, might be stagggering and intimidating at the same.

#### Tech-stack prerequisites

So we should stay smart here as well. We need some constraints. Using Streamlit means Python background, so that should be our starting point:
- We don't want to use some totally distinct technologies, so we're not gonna use PHP or .Net
- But we should rather stay with Python
- Although if staying 100% with Python is not possible, then we should accept a need to grasp some new technologies
- But as the complexity of our app won't be that high, we shouldn't pick frameworks with highest learning curves, aimed at more complicated projects

That's a start now.

#### Python-based data frameworks

Streamlit is actually not a one of a kind. There are more tools boasting to be all-in-one, allowing to create web apps only with Python, focusing on data. **Dash**, **Panel**, **NiceGUI**, **Reflex**, the list can go on.

They would differ in the architecture compared to Streamlit, usually avoiding this problematic full re-run like Streamlit does, and some of them might actually have bigger capabilities in terms of creating a fully-fledged app rather than a prototype.

However, we have identified Streamlit's limitations on SEO, dynamic routing and layout control, and **switching to another data framework won't solve these problems**. They share the same fundamental constraints, and the improvement could potentially be only partial, not what we expect.

#### Full-stack frameworks

So we have no choice, but to enter the full-stack world.
And that world is vast, with basically three types of setups available:
- **Separate Backend and Frontend frameworks** - The most complex combination, but also giving us the most in terms of what can be achieved
- **Backend only + HTML templates** - JavaScript-based frontend frameworks like React or Vue.js still have to generate an HTML file, but they add high interactivity. But if interactivity is not what we care about the most, then at the expense of it we can simplify our approach and avoid going full-stack route - known as Server-Side Rendering (SSR)
- **Frontend + Backend-as-a- Service** - An opposite approach to Backend only option. Here, we use a Frontend framework which will communicate with a database through API, effectively serving as backend - heavily interactive approach, following Client-Side Rendering (we load minimal HTML file, and the whole app logic happens when the user clicks through the website)

#### Decision process

Thanks to our requirements redefinion, we can substantially narrow down our choice here:
- Firstly we can cross out the Frontend + Backend-as-a-Service option - this approach does not favour SEO, it would require some extra effort, and it's a JavaScriptheavy choice as well, so it means we would be unable to leverage our Python background
- We can also exclude the full-stack option - we have already concluded, that our project is not that complicated, and also we aim for static website, meaning that going with a fully-fledged frontend we would potentially be  overengineering

So that leaves to the usage of a Backend framework + Templates. And within Python, the main contenders are:

- **Flask** - deemed as the most simple one
- **Django** - called as "batteries included", great for larger projects, but might just be too heavy for a smaller app
- **FastAPI** - excellent for building APIs, also allows to create server-rendered pages with HTML templates, but it's not its primary strength

For CM Rentals, **Flask** was the natural choice:
- It's **lightweight** - I didn't need a full-blown framework with ORM, admin panel and everything else Django provides
- It's **flexible** - I could structure the project exactly how I wanted, without too much overhead
- It supports **Jinja2 templates** - server-side rendering, which is exactly what we need for SEO

### Implementation plan

We have our winner now. So how to proceed with the migration to Flask now?

1. First and foremost, we don't want to completely erase our Streamlit code right now. Quite the opposite, this is our foundation, a reference on which we will be building up the new app
- So from technical point, we don't overwrite the code of our app. We just create a new git repository, so in the end we will be left with two codebases, which will help us in fully understanding Flask code, as we would be able to compare it with deprecated Streamlit code

2. And what about the coding? Basically we have two approaches here (can be mixed together):
- We start writing the code ourselves, which is already a little bit old-fashioned considering how fast the things in the tech world are moving
- Or...we create the code with AI. No matter what's your approach to the usage of AI, or what you think about the quality of LLM-generated code, there was never a better time to just say:  
*I have my app written in technology X, please rewrite it using technology Y*

3. But before writing the code, we have to know exactly what we want to achieve. If we go the AI route, we cannot just say *copy this* and expect a working app, fully meeting meeting our expectiations. We should write down what we need, so creating a Product Requirements Document (PRD). 

We should already have it, as we did redefine our requirements before choosing the tech stack. So listing features to retain, new features to add, and the expectations about the layout - specifying all of this will significantly decrease the chance of being dissapointed at the first version.

4. Whether the code will be generated by the AI, or we  decide to write it ourselves to reinforce our understanding of Flask, it won't be an instant process, but rather an iteration. We should work on features one by one, ensuring that they work properly before jumping to another one.

5. And while working on the code, we cannot forget to the test our app throught the process. And not only on the desktop, but on a mobile device as well, as the user experience and mobile-friendliness are the aspects we care about here.

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

Also project structures will differ, with Flask having relatively more folders and files.

But both are still easy to follow, only with Streamlit having only .py files, while with Flask naturally we also need these HTML and CSS files.

**Streamlit project structure:**
```
cm-rentals-streamlit/
├── app.py                  # Main entry point - all UI code here
├── pg/
│   ├── form.py             # Form page logic
│   └── map.py              # Map page logic
├── property_map/
│   ├── db.py               # Database queries
│   └── map_utils.py        # Map utilities
├── static/
│   └── robots.txt
└── requirements.txt
```

**Flask project structure:**
```
cm-rentals-flask/
├── flask_app/
│   ├── __init__.py         # App factory
│   ├── config.py           # Configuration
│   ├── constants.py        # Constants
│   ├── errors.py           # Error handlers
│   ├── views.py            # Route definitions
│   ├── services/
│   │   └── properties.py   # Business logic
│   └── utils/
│       └── map_builder.py  # Map utilities
├── templates/              # HTML templates (Jinja2)
│   ├── base.html           # Base layout
│   ├── index.html          # Homepage
│   ├── listing_detail.html # Property page
│   ├── privacy.html
│   └── errors/
│       ├── 404.html
│       └── 500.html
├── static/
│   └── css/
│       └── main.css        # Custom styles
├── wsgi.py                 # WSGI entry point
└── requirements.txt
```

The difference is clear: Streamlit has **6 Python files** and that's it. Flask has **10 Python files** plus **6 HTML templates** and a **CSS file**. More files, but also more control over every aspect of the application. Streamlit was just this simplified app, not a "toy app" as it was fully functional, but with Flask we even cover potential erroneous URLs by having custom error pages, making it a "real web app" in every aspect, going way deeper than with Streamlit.

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

<div style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
  <img src="/images/blog/streamlit-to-flask-migration/streamlit-interface.png" alt="Streamlit interface" style="width: min(100%, 420px);" />
  <img src="/images/blog/streamlit-to-flask-migration/flask-interface.png" alt="Flask interface" style="width: min(100%, 420px);" />
</div>

## Lessons Learned

### 1. Each project migration is be different

There's no default rule, that every project can be migrated from Streamlit to Flask and this will be a good decision.

Before choosing the new framework, we have done a thorough assessment, leading us to this particular choice. And we should follow exactly the same path for every project migration. We cannot just assume that one framework will fit very different cases, where our end-goals for the app might be different.

If interactivity would be our main concert, then a frontend framework like React or Vue.js would be more advisable. Similarly, if the app logic would be more complex, for instance we would have user accounts, user would be able to add comments and rate different properties, then potentially Django would make more sense as it's heaviness comes together with many features working out-of-the-box, while with Flask we have to make many choices ourselves and use some external solutions.

### 2. Don't Over-Engineer

Web dev world is not only vast, but also very volatile, changing rapidly. There will always be some new frameworks, shiny tools and most popular choices. And that puts us to a risk of going down to a rabbit hole, choosing an overly complicated tools and not leveraging our current skills.

### 3. Control the whole migration and development process

Even if we delegate most of the coding itself to the AI, we still have to stay in the loop and oversee the whole process, understanding our codebase.

If we didn't start with the requirements, didn't use an AI tool that allows use to create code with any language and framework (Claude Code in this case), it's very likely that we would have ended up with some JavaScript framework, so following the over-engineered route we wanted to stay away from. And going further it could be only worse, having more and more code we don't really understand.

Instead, we were making conscious choices from the beginning, maintaining control of the whole project, while leveraging LLMs capabilities for the code creation.

### 4. Database is the backbone, no matter the technologies used for the app itself

Having data background, we should rather understand the importance of having solid data foundations of our app from the very beginning - having the database set up with tables schema, even if it's rather simple. But outside data world, it can get neglected quite often, leading to serious issues in syncing the application itself and the database.

But with a correct approach, we set our data layer and it perfectly integrates with any technology - Streamlit or Flask, we use exactly the same data and the same tables. Let it be Django or only the frontend framework with Supabase, we would still use this database in exactly the same way, only the app code would differ.

### 5. Streamlit Skills Transfer

Here's the good news if you're coming from Streamlit: **you're not starting from zero**. The concepts of session management, caching, and database queries all carry over to Flask. The mental models are the same, just implemented differently.
And obviously we're staying within Python ecosystem, so we can still use the same library, just the difference will be that we pass the objects to the HTML template, not to Streamlit's functions. 

If anything, having wrestled with Streamlit's session state might give you a much better appreciation for how other frameworks will handle state (spoiler: usually it will be much simpler).

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
