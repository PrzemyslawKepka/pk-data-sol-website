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

Building solutions is one thing, but building an online presence, showcasing what you can do, so in the end you can...build even more, is another. So I've decided that I need my own website.

And while as a "data guy" building visually sophisticated websites is not my main cup of tea, I do claim full-stack capabilities, so why wouldn't I be able to be a robust site for myself as well?

## Solution

The website you're looking at right now is the result.

### Building process

Before a first line of code was even written, I already had to put in quite a lot of effort:
- I want to build my own website, so I have to know (more or less) how I want it to look like and what content it is supposed to have. So as my extensive research process I have checked dozens of websites from other professionals, potentially my competitors even, deceding on website content and how it's supposed to work
- Then I have prepered a very detailed document, where I have described how I envision the whole website, it's design and layout. I would go as deep here, as explaining the logic and niity gritties for each section
Note: I didn't say anything about the tech stack here yet
- And based on my vision, the AI (Claude Code) have prepared a detailed PRD document

And only having the PRD document was beginning of the coding process:
- I have set up base Astro project myself
- Then Claude Code has generate the code based on the PRD
- And from that on it was an iterative process of improving and implementing all the functionalities

So the AI just built you a website in one day? Well, I wish that was the case, but that wasn't even close to that. The site is content-heavy, so it couldn't be that simple:
- Even though the AI had samples of my writing, still what it was able to produce in most of the cases didn't really resemble what I would create
- And as I have decided to go pretty detailed in describing my projects, it meant a lot of writing for me
- And instead of AI-generated images, I went with a route of providing screenshots, images, or generating mockup screenshots for the projects where I was unable to show any real photos
- So even with leveraging the LLMs quite heavily, it wasn't the straighforward to create a website I will be genuinely pleased at (and that is actually a requirement)

### Why Astro?

The AI had a lot of context before starting this endeavour - not only my vision for the website, but also a broader picture with my plans, technologies that I know, and want to learn as well.

And I have heard about **Astro** before, and it indeed looks like a perfect fit here.

its "content-first" philosophy alignes with the sheer volume fo content I'm about have here, growing over time with new projects and blog posts. And as the site is mostly static content (project descriptions, blog, postsabout page), so I don't need a heavy JavaScript framework. Astro generates static HTML, which means **fast loading and good SEO**.

But I still wanted some interactivity - the project filters, for example. That's where Astro's **"islands architecture"** comes in - I can use **Vue components** where I need them, and they only load JavaScript when necessary. And this goes pretty well with my next projects, where Vue will be used extensively.

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

## Professional Takeaways

- **Astro is great for content-heavy sites** - the static generation is fast, the content collections are elegant, and you can add interactivity where needed
- **Building your own portfolio forces clarity** - you have to actually articulate what you do and what value you bring
- **Full-stack means full-stack** - being able to go from Python data work to modern frontend development is genuinely useful

