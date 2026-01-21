---
title: "PK Data Solutions Portfolio"
description: "A modern, responsive portfolio website built with Astro, Vue.js, and Tailwind CSS. Features content-driven architecture, project filtering, and i18n support."
categories: ["Web Application"]
technologies: ["Astro", "Vue.js", "Tailwind CSS", "TypeScript", "Markdown"]
github: "https://github.com/PrzemyslawKepka/pk-data-sol"
liveUrl: "https://pk-data-solutions.com"
featured: false
projectType: "current"
year: "2026"
order: 95
lang: "en"
---

## The Motivation

After years of building data solutions for others, I needed a proper online presence to showcase my work. Rather than using a template or website builder, I decided to build it myself - applying the same principles I use in data projects: clean architecture, good tooling, and practical functionality.

## Technical Stack

### Why Astro?

Astro was chosen for its "content-first" philosophy:
- **Static Site Generation**: Fast loading, great SEO
- **Content Collections**: Markdown-based project management
- **Island Architecture**: JavaScript only where needed
- **Vue Integration**: For interactive components

### Key Technologies

**Frontend Framework**
- Astro 5.x for static site generation
- Vue 3.5 for interactive components (project filters, language switcher)
- Tailwind CSS 4.x for utility-first styling

**Content Management**
- Markdown files for project descriptions
- Content collections with type-safe schemas
- Frontmatter for project metadata

**Features**
- Responsive design (mobile-first)
- Dark theme with amber accents
- Project filtering by type, category, and industry
- i18n support (prepared for EN/PL)
- Contact form integration

## Architecture

### Content-Driven Design

Projects are stored as Markdown files with rich frontmatter:

```
src/content/projects/
├── cm-rentals.md
├── entity-report.md
├── temperature-monitoring.md
└── ...
```

Each project includes metadata like category, technologies, project type (FTE/current/side), industry, and display order.

### Component Structure

```
src/
├── components/
│   ├── Header.astro
│   ├── ProjectCard.astro
│   ├── ProjectFilter.vue      # Interactive filtering
│   └── ProjectsGrid.vue       # Dynamic project display
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro            # Homepage
│   └── projects/
│       ├── index.astro        # Projects listing
│       └── [slug].astro       # Individual project pages
└── content/
    └── projects/*.md          # Project content
```

### Styling Approach

Tailwind CSS with custom configuration:
- Slate color palette for dark theme
- Amber accent colors
- Consistent spacing and typography
- Hover states and transitions

## Lessons Learned

**Astro's Content Collections**
- Type-safe content management
- Easy to add new projects
- Markdown for long-form content

**Vue + Astro Integration**
- Islands architecture works well
- Vue components hydrate only when needed
- Clean separation between static and interactive

**Building Your Own Portfolio**
- Forces you to articulate your value proposition
- Great way to learn new frontend technologies
- Eating your own cooking - using skills you showcase

## Personal Note

This website itself demonstrates the full-stack mindset I bring to projects: from data-heavy Python work to modern frontend development. It's built with the same principles I apply everywhere - practical solutions, clean code, and tools that fit the job.
