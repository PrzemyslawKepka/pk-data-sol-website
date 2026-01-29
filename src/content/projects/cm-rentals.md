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

Apartment hunt might be a daunting task on many levels - and one of them might be the online search, especially if you use platforms that do not provide any **map functionality** to see the location of the place you might be interested in. So you end up with a list of places worth checking, but you cannot really visualize them together on the map, which would definitely be helpful in that process.

So during my personal search for an apartment in the city of Chiang Mai, Thailand, I've come up with an idea of creating a simple tool, where I would save places through a basic form and then all of them would be displayed on a map.

## Solution

So what started as a simple, personal tool ended up as CM Rentals - a web application that displays rental properties on an interactive map, making it actually possible to see where everything is and compare options at a glance.

### Core Features

- **Interactive map with all properties** - finally you can see the locations
<img src="/images/projects/cm-rentals/map-with-popover.png" alt="Map details" width=500/>

- **Properties table** - beside the map, all the places can be seen in a tabular format as well
<img src="/images/projects/cm-rentals/listings-table.png" alt="Listings table"/>

- **Property pages** - dedicated pages for every property
<img src="/images/projects/cm-rentals/listing-details.png" alt="Listing details" width=400/>

- **Availability tracking** - every place can retain availability history, displaying not only the most up-to-date status, but the previous ones as well
<img src="/images/projects/cm-rentals/availability.png" alt="Availability section"/>

- **Interactive filters** - to narrow down to what you actually need

### Technical Evolution

The project went through three phases:
- **Streamlit prototype as an internal tool** - used for saving and displaying places
- **Public Streamlit version** - first public version, only for viewing places
- **Flask version** - the final, production-grade version, rewritten to Flask

So I've started the app with Streamlit, which is great for prototyping. And I've went with it as far as to a public app, available on the internet, not as an internal tool only. However, with Streamlit limitations in both functional and visual aspects, paired with limited SEO options, I've decided to revamp the app to a 'proper web application', so that's how I ended up with Flask.

(More about Streamlit to Flask transition in a dedicated blog post)

### App Reception

Once my internal tool had successfully completed its task, I realized I had gathered quite a lot of information - an extensive list of places offering monthly rentals that might be useful for others looking for an apartment in the city.

So I've posted the app on Facebook and Reddit, and especially on Reddit, where I have also shared some more tips, it had very positive reception:
- **28k** post views in total
- **32** upvotes
- **86.4%** upvote to downvote ratio
- **12** comments, claiming the app usefulness

<img src="/images/projects/cm-rentals/reddit-stats.png" alt="Reddit statistics" width=400/>


## Real-world Application

This project is a good example of **turning a personal pain point into something useful for others**. The data engineering side (collecting, storing, displaying property data) might be straightforward, but the real value is in **solving an actual problem** that people have.

In this case I can't commercialize it (visa restrictions), but this is how businesses are born - starting from a real problem that resonates with others, then building up the solution.

## Professional Takeaways

- **The best project ideas often come from your own problems** - if something frustrates you, it probably frustrates others too
- **Start with an MVP, then iterate** - first version doesn't have to be perfect, if it brings some value then it will be appreciated anyway, and polished solution can come later 
- **Embrace tool strengths, but replace it as soon as it's not a best fit anymore** - each tools has its own area where it shines, but at the same time it might be underwhelming at other aspects. So if your project grows, the scope has changed and previously perfect tool does not deliver anymore, then you shouldn't hesitate with ditching it and going with a different tool (when the switch is feasible of course)
- **Community feedback is invaluable** - real users tell you what matters
