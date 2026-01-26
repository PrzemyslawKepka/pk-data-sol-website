---
title: "PK Data Solutions Portfolio"
description: "A modern, responsive portfolio website built with Astro, Vue.js, and Tailwind CSS. Features content-driven architecture, project filtering, and i18n support."
categories: ["Web Application"]
technologies: ["Astro", "Vue.js", "Tailwind CSS", "TypeScript", "Markdown"]
github: "https://github.com/PrzemyslawKepka/pk-data-sol"
liveUrl: "https://pk-data-solutions.com"
projectType: "current"
year: "2026"
lang: "en"
---

## Context

After years of building data solutions for others, I realized I needed a proper online presence. A portfolio that showcases my work and explains what I actually do.

Now, I could have used a template or a website builder. But where's the fun in that? And more importantly - **if I'm claiming full-stack capabilities, shouldn't I be able to build my own website?**

So I decided to build it myself.

## Solution

The website you're looking at right now is the result.

### Why Astro?

I chose **Astro** because of its "content-first" philosophy. The site is mostly static content (project descriptions, about page), so I don't need a heavy JavaScript framework. Astro generates static HTML, which means **fast loading and good SEO**.

But I still wanted some interactivity - the project filters, for example. That's where Astro's **"islands architecture"** comes in - I can use **Vue components** where I need them, and they only load JavaScript when necessary.

### The Stack

- **Astro** for the core framework and static generation
- **Vue** for interactive components (project filtering, etc.)
- **Tailwind CSS** for styling
- **Markdown** for all content - each project is a `.md` file with frontmatter for metadata

### Content Architecture

Each project lives as a Markdown file:
```
src/content/projects/
├── cm-rentals.md
├── entity-report.md
├── temperature-monitoring.md
└── ...
```

This makes it easy to add or edit projects - just update the Markdown file, no database needed. The frontmatter handles all the metadata (technologies, categories, project type, etc.), and Astro's content collections give me type-safety.

## Real-world Application

Building this site was essentially a **frontend engineering project**:
- Component architecture and reusability
- Responsive design (mobile-first)
- Content management without a traditional CMS
- Deployment and hosting considerations

It's also a demonstration of **eating your own cooking** - if I'm showcasing technical skills, the website itself should reflect that.

## Professional Takeaways

- **Astro is great for content-heavy sites** - the static generation is fast, the content collections are elegant, and you can add interactivity where needed
- **Building your own portfolio forces clarity** - you have to actually articulate what you do and what value you bring
- **Full-stack means full-stack** - being able to go from Python data work to modern frontend development is genuinely useful
