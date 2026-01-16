# PK Data Solutions - Project Structure Documentation

**Last Updated:** January 16, 2026
**Framework:** Astro + Tailwind CSS + Vue.js
**Domain:** pk-data-solutions.com

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Core Concepts](#core-concepts)
4. [How Content is Rendered](#how-content-is-rendered)
5. [Where to Edit What](#where-to-edit-what)
6. [Component Architecture](#component-architecture)
7. [Projects System](#projects-system)
8. [Styling System](#styling-system)
9. [Internationalization (i18n)](#internationalization-i18n)
10. [Adding New Content](#adding-new-content)
11. [Common Tasks](#common-tasks)

---

## Project Overview

This is a **static website** built with Astro that compiles to plain HTML/CSS/JavaScript files. Think of it like this:

- **Astro** = The builder that takes your `.astro` files and generates static HTML
- **Tailwind CSS** = Utility-first CSS framework for styling
- **Vue.js** = For interactive components (language switcher, tech cards)
- **Content Collections** = Markdown-based content management for blog posts and projects

### Key Principle: Build-Time vs Runtime

Most of your code runs at **build time** (when you run `npm run build`), NOT when users visit your site. This makes your site incredibly fast because everything is pre-generated.

---

## File Structure

```
pk-data-sol/
├── public/                      # Static assets (served as-is)
│   ├── images/                  # Your images
│   │   ├── projects/            # Project screenshots
│   │   └── icons/               # Technology icons
│   ├── favicon.svg              # Site icon (PK logo)
│   └── CNAME                    # Domain for GitHub Pages
│
├── src/                         # Your source code
│   ├── components/              # Reusable UI pieces
│   │   ├── Header.astro         # Navigation header
│   │   ├── Footer.astro         # Site footer
│   │   └── LanguageSwitcher.vue # EN/PL language toggle
│   │
│   ├── layouts/                 # Page templates
│   │   └── BaseLayout.astro     # Main layout (wraps all pages)
│   │
│   ├── pages/                   # Your website pages (routes)
│   │   └── index.astro          # Homepage (/)
│   │
│   ├── content/                 # Markdown content
│   │   ├── blog/                # Blog posts (.md files)
│   │   ├── projects/            # Project case studies (.md files)
│   │   └── config.ts            # Content collection schemas
│   │
│   ├── i18n/                    # Translations
│   │   ├── en.json              # English text
│   │   └── pl.json              # Polish text
│   │
│   ├── utils/                   # Helper functions
│   │   └── i18n.js              # Translation utilities
│   │
│   └── styles/                  # Stylesheets
│       └── global.css           # Global styles + Tailwind
│
├── astro.config.mjs             # Astro configuration
├── package.json                 # Dependencies
└── tsconfig.json                # TypeScript configuration
```

---

## Core Concepts

### 1. The `.astro` File Format

Astro files have **three sections**:

```astro
---
// SECTION 1: FRONTMATTER (JavaScript/TypeScript)
// This runs at BUILD TIME on the server
import Component from './Component.astro';
const data = await fetchData();
---

<!-- SECTION 2: TEMPLATE (HTML + Dynamic Content) -->
<!-- This becomes static HTML -->
<div>
  <h1>{data.title}</h1>
  <Component />
</div>

<style>
/* SECTION 3: SCOPED CSS (Optional) */
/* Only applies to this component */
h1 {
  color: blue;
}
</style>
```

### 2. File-Based Routing

Files in `src/pages/` automatically become routes:

```
src/pages/index.astro           → /  (homepage)
src/pages/about.astro           → /about
src/pages/blog/index.astro      → /blog
src/pages/blog/[slug].astro     → /blog/my-post (dynamic route)
```

**No route configuration needed!** Just create a file.

### 3. Components vs Pages

- **Pages** (`src/pages/`) = Full website pages with routes
- **Components** (`src/components/`) = Reusable UI pieces (like Lego blocks)
- **Layouts** (`src/layouts/`) = Page templates that wrap content

### 4. Static vs Interactive

- **Astro Components** (`.astro`) = Static, no JavaScript in browser
- **Vue Components** (`.vue`) = Interactive, requires `client:*` directive

Example:
```astro
<!-- Static component (no JS) -->
<Header />

<!-- Interactive component (runs JS in browser) -->
<LanguageSwitcher client:load />
```

---

## How Content is Rendered

### The Rendering Flow

```
1. User visits homepage (/)
   ↓
2. Astro serves: src/pages/index.astro
   ↓
3. index.astro imports:
   - BaseLayout (wraps page with <html>, <head>, <body>)
   - Header component
   - Footer component
   - Translation data from i18n/en.json
   ↓
4. Frontmatter code runs (fetching data, processing)
   ↓
5. Template is rendered with data
   ↓
6. CSS is applied (global + scoped styles)
   ↓
7. Vue components are hydrated (made interactive)
   ↓
8. Final HTML sent to browser
```

### Example: Homepage Rendering

**File:** `src/pages/index.astro`

```astro
---
// 1. Import layout and components
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { useTranslations } from '../utils/i18n';

// 2. Load translations
const lang = 'en';
const t = useTranslations(lang);

// 3. Prepare data
const industries = [
  { name: 'Finance', emoji: '💰' },
  // ...
];
---

<!-- 4. Render template -->
<BaseLayout title="Home" lang={lang}>
  <Header lang={lang} />

  <main>
    <section id="start">
      <h1>{t.hero.greeting}</h1>
      <!-- ... -->
    </section>
  </main>

  <Footer lang={lang} />
</BaseLayout>
```

**What happens:**
1. `BaseLayout` wraps everything with `<html>`, `<head>`, `<body>`
2. `Header` is inserted at the top (nav bar)
3. Main content sections are rendered with translated text
4. `Footer` is inserted at the bottom
5. Final HTML is generated and served

---

## Where to Edit What

### ✏️ To Change Website Text/Content

**Location:** `src/i18n/en.json` (English) or `src/i18n/pl.json` (Polish)

**Example:**
```json
{
  "hero": {
    "greeting": "Hi, I'm Przemek (🇬🇧 Sh-am-ack).",
    "tagline": "I do all things data."
  }
}
```

**Used in:** `src/pages/index.astro`
```astro
<h1>{t.hero.greeting}</h1>
<p>{t.hero.tagline}</p>
```

---

### 🎨 To Change Colors/Styles

**Global Styles:** `src/styles/global.css`

```css
:root {
  --color-bg-primary: #0f172a;      /* Dark background */
  --color-accent-blue: #0ea5e9;     /* Primary blue */
  --color-text-primary: #f1f5f9;    /* Light text */
}
```

**Change these variables to update colors site-wide!**

**Component-Specific Styles:** In the `<style>` section of each `.astro` file

---

### 📐 To Change Layout/Structure

**Homepage Structure:** `src/pages/index.astro`

Each `<section>` represents a page section:
```astro
<section id="start" class="hero-section">...</section>     <!-- Hero -->
<section id="about" class="about-section">...</section>     <!-- About -->
<section id="services" class="services-section">...</section> <!-- Services -->
<!-- etc. -->
```

**To add/remove a section:** Edit `index.astro`, add/remove `<section>` blocks

---

### 🔗 To Change Navigation Links

**Location:** `src/components/Header.astro`

```astro
const navLinks = [
  { text: t.nav.start, href: '#start' },
  { text: t.nav.about, href: '#about' },
  { text: t.nav.services, href: '#services' },
  // Add more links here
];
```

**Note:** Text comes from `src/i18n/en.json` → `nav` object

---

### 📸 To Add Images

**1. Place image in:** `public/images/`

Example: `public/images/projects/cm-rentals.png`

**2. Reference in code:**
```astro
<img src="/images/projects/cm-rentals.png" alt="CM Rentals" />
```

**Important:** Path starts with `/` (root of public folder)

---

### 🌐 To Change Domain

**1. Update:** `astro.config.mjs`
```javascript
export default defineConfig({
  site: 'https://your-new-domain.com',
  // ...
});
```

**2. Update:** `public/CNAME`
```
your-new-domain.com
```

---

## Component Architecture

### BaseLayout (src/layouts/BaseLayout.astro)

**Purpose:** Wraps every page with HTML structure, SEO, fonts

**What it does:**
- Sets up `<html>`, `<head>`, `<body>` tags
- Adds meta tags (title, description, Open Graph)
- Imports global CSS
- Loads Inter font from Google Fonts

**Usage:**
```astro
<BaseLayout title="My Page" description="..." lang="en">
  <!-- Your page content here -->
</BaseLayout>
```

---

### Header (src/components/Header.astro)

**Purpose:** Top navigation bar (sticky)

**Contains:**
- Logo (PK) + Name (Przemysław Kępka / PK Data Solutions)
- Navigation links (Start, About, Services, etc.)
- Social icons (GitHub, LinkedIn, Twitter)
- Language switcher (Vue component)
- Mobile menu button (hamburger icon)

**How it works:**
1. Accepts `lang` prop to load correct translations
2. Builds `navLinks` array from translations
3. Renders desktop nav (hidden on mobile)
4. Shows mobile menu button (hidden on desktop)

**Styling:** Sticky header with backdrop blur effect

---

### Footer (src/components/Footer.astro)

**Purpose:** Bottom footer with links and info

**Contains:**
- Logo + brand name
- Quick links (sections)
- Social media links
- Copyright text

---

### LanguageSwitcher (src/components/LanguageSwitcher.vue)

**Purpose:** Toggle between English and Polish

**Type:** Vue component (interactive)

**Current State:** Basic functionality (changes state, updates HTML lang attribute)

**Future Enhancement:** Full language switching with route changes

**Why Vue?** Needs reactivity (button states, click handling)

---

## Projects System

### Overview

The projects system displays portfolio work on two pages:
- **Homepage** (`/`) - Shows featured projects only
- **Projects page** (`/projects`) - Shows all projects with filtering

### Architecture

```
Content Layer:
src/content/
├── config.ts              # Schema definition (required fields, types)
└── projects/              # Project markdown files
    ├── cm-rentals.md
    ├── entity-report.md
    └── streamlit-center.md

Rendering Layer:
src/components/
├── ProjectCard.astro      # Card component (used on homepage)
└── ProjectsGrid.vue       # Grid + filtering (used on /projects)

Page Layer:
src/pages/
├── index.astro            # Homepage (imports ProjectCard.astro)
└── projects/
    ├── index.astro        # Projects listing (imports ProjectsGrid.vue)
    └── [slug].astro       # Individual project pages
```

### Project Schema

**File:** `src/content/config.ts`

Each project markdown file must include these frontmatter fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Project name |
| `description` | string | Yes | Short description (shown on cards) |
| `category` | string | Yes | e.g., "Web Application", "Automation", "Dashboard" |
| `technologies` | string[] | Yes | Array of tech used |
| `github` | string | No | GitHub repository URL |
| `liveUrl` | string | No | Live website URL |
| `image` | string | No | Path to screenshot (e.g., "/images/projects/name.png") |
| `featured` | boolean | No | If true, shows on homepage (default: false) |
| `projectType` | enum | No | "fte" \| "current" \| "side" (default: "side") |
| `company` | string | No | Company name (for FTE projects) |
| `year` | string | No | Year or range (e.g., "2024" or "2021-2024") |
| `industry` | string | No | Industry domain (e.g., "Finance", "Real Estate") |
| `order` | number | No | Sort order - higher values appear first (default: 0) |
| `lang` | enum | No | "en" \| "pl" (default: "en") |

### Project Card Badges

Cards display up to 3 badges on the image:

| Badge | Position | Color | Source Field |
|-------|----------|-------|--------------|
| Project Type | Top-left | Blue/Green/Purple | `projectType` |
| Category | Top-right | Amber | `category` |
| Industry | Bottom-right | Pink | `industry` |

**Project Type Colors:**
- `fte` (Corporate) → Blue
- `current` (Current) → Green
- `side` (Side Project) → Purple

### Adding a New Project

**Step 1:** Create image (optional but recommended)

```
public/images/projects/my-project.png
```

Recommended size: 800x600px or similar aspect ratio.

**Step 2:** Create markdown file

```
src/content/projects/my-project.md
```

**Step 3:** Add frontmatter and content

```markdown
---
title: "My Project Name"
description: "A brief description that appears on the card (keep it concise, 1-2 sentences)"
category: "Web Application"
technologies: ["Python", "Flask", "PostgreSQL", "HTML", "CSS"]
github: "https://github.com/username/my-project"
liveUrl: "https://my-project.com"
image: "/images/projects/my-project.png"
featured: true
projectType: "current"
company: "Company Name"
year: "2025"
industry: "Finance"
order: 50
lang: "en"
---

## The Problem

Describe the problem you were solving...

## The Solution

Explain your approach and what you built...

## Technical Implementation

- **Backend:** Flask (Python)
- **Database:** PostgreSQL
- **Key features:** List main features

## Results / Impact

- Quantifiable results if available
- User feedback
- Lessons learned
```

**Step 4:** Project appears automatically

- If `featured: true` → Shows on homepage
- Always shows on `/projects` page
- Individual page available at `/projects/my-project`

### Controlling Display Order

Use the `order` field to control sorting (higher = appears first):

```markdown
order: 100  # Appears first
order: 50   # Appears in middle
order: 0    # Appears last (default)
```

**Tip:** Use increments of 10 (10, 20, 30...) to leave room for inserting projects later.

### Filtering on /projects Page

The `/projects` page has a **three-layer filter system**:

| Layer | Filter By | Default | Source Field |
|-------|-----------|---------|--------------|
| 1 | Project Type | All Types | `projectType` |
| 2 | Category | All Categories | `category` |
| 3 | Industry | All Industries | `industry` |

**Project Types (predefined):**
- All Types, Current, Corporate, Side Projects

**Categories (predefined):**
- All Categories, Web Application, Automation, Developer Tools, Dashboard, ETL Pipeline, Data Analysis

**Industries (predefined):**
- All Industries, Finance, Credit Risk, Real Estate, IoT, E-commerce, Healthcare

All three filters work together - projects must match ALL selected criteria to be displayed.

### Adding New Categories or Industries

When you create a project with a new category or industry value, you must add it to the filter system in **3 files**:

#### Step 1: Add to English translations

**File:** `src/i18n/en.json`

```json
"categories": {
  "all": "All Categories",
  "webApplication": "Web Application",
  "myNewCategory": "My New Category"  // Add here
},
"industries": {
  "all": "All Industries",
  "finance": "Finance",
  "myNewIndustry": "My New Industry"  // Add here
}
```

#### Step 2: Add to Polish translations

**File:** `src/i18n/pl.json`

```json
"categories": {
  "all": "Wszystkie Kategorie",
  "webApplication": "Aplikacja Webowa",
  "myNewCategory": "Moja Nowa Kategoria"  // Add here
},
"industries": {
  "all": "Wszystkie Branże",
  "finance": "Finanse",
  "myNewIndustry": "Moja Nowa Branża"  // Add here
}
```

#### Step 3: Add to ProjectsGrid.vue component

**File:** `src/components/ProjectsGrid.vue`

Update the `Translations` interface:
```typescript
interface Translations {
  categories: {
    // ...existing entries...
    myNewCategory: string;  // Add here
  };
  industries: {
    // ...existing entries...
    myNewIndustry: string;  // Add here
  };
}
```

Update the `categories` computed array:
```typescript
const categories = computed(() => [
  { key: 'all', label: props.translations.categories.all },
  // ...existing entries...
  { key: 'My New Category', label: props.translations.categories.myNewCategory }  // Add here
]);
```

Update the `industries` computed array:
```typescript
const industries = computed(() => [
  { key: 'all', label: props.translations.industries.all },
  // ...existing entries...
  { key: 'My New Industry', label: props.translations.industries.myNewIndustry }  // Add here
]);
```

**Important:** The `key` value must match exactly what you use in the project's frontmatter (e.g., `category: "My New Category"`).

### Where Cards Are Rendered

**Important:** Project cards are rendered in two separate components:

| Location | Component | Used For |
|----------|-----------|----------|
| Homepage | `src/components/ProjectCard.astro` | Featured projects |
| /projects | `src/components/ProjectsGrid.vue` | All projects with filtering |

When modifying card appearance, **both files may need updating**. See `docs/FUTURE_OPTIMIZATIONS.md` for notes on potential consolidation.

### Quick Reference: Project File Template

Copy this template for new projects:

```markdown
---
title: ""
description: ""
category: ""
technologies: []
github: ""
liveUrl: ""
image: "/images/projects/.png"
featured: false
projectType: "side"
company: ""
year: ""
industry: ""
order: 0
lang: "en"
---

## Overview

## The Problem

## The Solution

## Technical Details

## Results
```

---

## Styling System

### Three Levels of Styling

#### 1. Global Styles (`src/styles/global.css`)

**Applies to:** Entire website

**Contains:**
- CSS custom properties (color variables)
- Global resets (margin, padding, box-sizing)
- Typography (fonts, sizes)
- Utility classes (.btn, .card, .text-gradient)
- Responsive breakpoints

**Example:**
```css
.btn-primary {
  background-color: var(--color-accent-blue);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}
```

---

#### 2. Scoped Component Styles

**Applies to:** Single component only

**Location:** `<style>` section in `.astro` files

**Example:** `src/pages/index.astro`
```astro
<style>
.hero-section {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
}
</style>
```

**Scoped = Won't affect other components!**

---

#### 3. Inline Tailwind Classes

**Applies to:** Individual elements

**Example:**
```astro
<div class="flex gap-4 p-6 bg-gray-900 rounded-lg">
```

**When to use:**
- Quick styling
- One-off adjustments
- Utility-first approach

---

### CSS Custom Properties (Variables)

Defined in `src/styles/global.css`:

```css
:root {
  --color-bg-primary: #0f172a;        /* Main dark background */
  --color-bg-secondary: #1e293b;      /* Card backgrounds */
  --color-bg-tertiary: #334155;       /* Hover states */
  --color-text-primary: #f1f5f9;      /* Main text */
  --color-text-secondary: #cbd5e1;    /* Secondary text */
  --color-accent-blue: #0ea5e9;       /* Primary blue */
  --color-accent-blue-dark: #3b82f6;  /* Darker blue */
  --color-border: #475569;            /* Borders */
}
```

**Usage:**
```css
.my-element {
  background-color: var(--color-bg-secondary);
  color: var(--color-accent-blue);
}
```

**To change site colors:** Just update these variables!

---

## Internationalization (i18n)

### How It Works

```
1. Translation files store all text
   ├── src/i18n/en.json (English)
   └── src/i18n/pl.json (Polish)

2. Utility function loads translations
   └── src/utils/i18n.js

3. Pages/components use translations
   └── const t = useTranslations('en');
   └── <h1>{t.hero.greeting}</h1>
```

---

### Translation File Structure

**File:** `src/i18n/en.json`

```json
{
  "site": {
    "title": "Przemysław Kępka - PK Data Solutions"
  },
  "nav": {
    "start": "Start",
    "about": "About"
  },
  "hero": {
    "greeting": "Hi, I'm Przemek",
    "tagline": "I do all things data."
  }
}
```

**Nested structure:** `site.title`, `nav.start`, `hero.greeting`

---

### Using Translations in Code

**Step 1:** Import utility function
```astro
---
import { useTranslations } from '../utils/i18n';
---
```

**Step 2:** Load translations for language
```astro
---
const lang = 'en'; // or 'pl'
const t = useTranslations(lang);
---
```

**Step 3:** Use in template
```astro
<h1>{t.hero.greeting}</h1>
<p>{t.hero.tagline}</p>
```

**Output:**
```html
<h1>Hi, I'm Przemek</h1>
<p>I do all things data.</p>
```

---

### Adding New Translations

**1. Add to English:** `src/i18n/en.json`
```json
{
  "newSection": {
    "title": "My New Title",
    "description": "My new description"
  }
}
```

**2. Add to Polish:** `src/i18n/pl.json`
```json
{
  "newSection": {
    "title": "Mój Nowy Tytuł",
    "description": "Mój nowy opis"
  }
}
```

**3. Use in page:**
```astro
<h2>{t.newSection.title}</h2>
<p>{t.newSection.description}</p>
```

---

## Adding New Content

### Adding a Blog Post

**Step 1:** Create markdown file in `src/content/blog/`

**Example:** `src/content/blog/my-first-post.md`

```markdown
---
title: "Getting Started with Astro"
description: "A beginner's guide to building static sites"
date: 2026-01-14
category: "Tutorial"
tags: ["astro", "web development"]
image: "/images/blog/astro-tutorial.png"
lang: "en"
---

# Getting Started with Astro

Your blog post content here in **markdown** format!

## Code Examples

```python
def hello():
    print("Hello from blog!")
```

More content...
```

**Step 2:** Blog post is automatically available at `/blog/my-first-post`

**Step 3:** Create blog listing page (if not exists): `src/pages/blog/index.astro`

---

### Adding a Project

**Step 1:** Create markdown file in `src/content/projects/`

**Example:** `src/content/projects/cm-rentals.md`

```markdown
---
title: "CM Rentals"
description: "Property rental platform for Cozumel, Mexico"
category: "Web Application"
technologies: ["Python", "Flask", "PostgreSQL", "HTML", "CSS"]
github: "https://github.com/yourusername/cm-rentals"
liveUrl: "https://cm-rentals.com"
image: "/images/projects/cm-rentals.png"
featured: true
projectType: "current"  # or "fte", "side"
lang: "en"
---

# CM Rentals - Property Rental Platform

## Problem

Users needed a simple way to browse rental properties...

## Solution

Built a Flask-based web application with...

## Technologies Used

- **Backend:** Flask (Python)
- **Database:** PostgreSQL
- **Frontend:** HTML/CSS

## Results

- 50+ active listings
- Positive Reddit feedback
- Responsive design

## Screenshots

![Homepage](/images/projects/cm-rentals-home.png)
```

**Step 2:** Project is automatically available (once you create project pages)

---

### Adding a New Page

**Step 1:** Create file in `src/pages/`

**Example:** `src/pages/pricing.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="Pricing" lang="en">
  <Header lang="en" />

  <main>
    <section class="pricing-section">
      <div class="container">
        <h1>Pricing</h1>
        <p>Your pricing content here...</p>
      </div>
    </section>
  </main>

  <Footer lang="en" />
</BaseLayout>
```

**Step 2:** Page is automatically available at `/pricing`

**Step 3:** Add link to navigation in `src/components/Header.astro`

---

## Common Tasks

### Task 1: Change Hero Text

**File:** `src/i18n/en.json`

Find:
```json
"hero": {
  "greeting": "Hi, I'm Przemek (🇬🇧 Sh-am-ack).",
  "tagline": "I do all things data."
}
```

Edit text, save file, and refresh browser.

---

### Task 2: Add a New Navigation Link

**File:** `src/components/Header.astro`

Add to `navLinks` array:
```astro
const navLinks = [
  { text: t.nav.start, href: '#start' },
  { text: 'Pricing', href: '/pricing' }, // New link
  // ...
];
```

**Don't forget:** Add translation to `src/i18n/en.json` if using `t.nav.pricing`

---

### Task 3: Change Primary Color

**File:** `src/styles/global.css`

Find:
```css
:root {
  --color-accent-blue: #0ea5e9;
}
```

Change to your color:
```css
:root {
  --color-accent-blue: #10b981; /* Green example */
}
```

**Result:** All blue accents change site-wide!

---

### Task 4: Add Project Screenshot

**Step 1:** Save image to `public/images/projects/`
```
public/images/projects/my-project.png
```

**Step 2:** Reference in project markdown:
```markdown
![My Project](/images/projects/my-project.png)
```

Or in Astro template:
```astro
<img src="/images/projects/my-project.png" alt="My Project" />
```

---

### Task 5: Add New Industry Pill

**File:** `src/pages/index.astro`

Find `industries` array:
```astro
const industries = [
  { name: 'Finance', emoji: '💰', namepl: 'Finanse' },
  { name: 'Your Industry', emoji: '🎯', namepl: 'Twoja Branża' }, // Add here
  // ...
];
```

**Result:** New pill appears in Services section

---

### Task 6: Update Social Links

**Files to update:**
- `src/components/Header.astro` (header social icons)
- `src/components/Footer.astro` (footer social icons)

Find:
```astro
<a href="https://github.com/przemyslawkepka" ...>
```

Replace with your URLs.

---

### Task 7: Setup Contact Form

**Step 1:** Sign up at https://formspree.io

**Step 2:** Create new form, get Form ID (e.g., `mvojabcd`)

**Step 3:** Update `src/pages/index.astro`

Find:
```astro
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Replace:
```astro
<form action="https://formspree.io/f/mvojabcd" method="POST">
```

**Done!** Form now works.

---

### Task 8: Replace Photo Placeholder

**Step 1:** Add your photo to `public/images/`
```
public/images/przemek-photo.jpg
```

**Step 2:** Update `src/pages/index.astro`

Find:
```astro
<div class="image-placeholder">
  <!-- SVG icon -->
</div>
```

Replace with:
```astro
<img src="/images/przemek-photo.jpg" alt="Przemysław Kępka" class="hero-photo" />
```

**Step 3:** Add styles:
```css
.hero-photo {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--color-accent-blue);
}
```

---

## Development Workflow

### Starting Development Server

```bash
npm run dev
```

Opens at: http://localhost:4321/ (or 4322 if 4321 is in use)

**Features:**
- Auto-reload on file changes
- Hot module replacement (HMR)
- Error messages in terminal and browser

---

### Building for Production

```bash
npm run build
```

**What happens:**
1. Astro reads all pages in `src/pages/`
2. Runs frontmatter code (data fetching, processing)
3. Generates static HTML files
4. Optimizes CSS, JavaScript, images
5. Outputs to `dist/` folder

**Output:**
```
dist/
├── index.html              # Homepage
├── about.html              # About page
├── _astro/                 # Optimized assets
│   ├── main.abc123.css
│   └── component.def456.js
└── images/                 # Copied from public/
```

---

### Previewing Production Build

```bash
npm run preview
```

Tests production build locally before deployment.

---

### Deploying to GitHub Pages

**Already configured!**

1. Commit and push to GitHub
2. GitHub Actions automatically builds and deploys
3. Site live at: pk-data-solutions.com

**Configuration files:**
- `.github/workflows/deploy.yml` (GitHub Actions workflow)
- `public/CNAME` (custom domain)
- `astro.config.mjs` (site URL)

---

## Project Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER VISITS                         │
│                    pk-data-solutions.com                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     ASTRO SERVES                            │
│                  src/pages/index.astro                      │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ BaseLayout  │  │ Translations│  │  Data       │
│ (Wrapper)   │  │  (i18n)     │  │ (Industries)│
└──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                │                │
       └────────────────┼────────────────┘
                        │
                        ▼
         ┌──────────────────────────────┐
         │   RENDERED HTML PAGE         │
         │                              │
         │  ┌────────────────────────┐  │
         │  │  Header (Navigation)   │  │
         │  └────────────────────────┘  │
         │                              │
         │  ┌────────────────────────┐  │
         │  │  Main Content          │  │
         │  │  ├─ Hero Section       │  │
         │  │  ├─ About Section      │  │
         │  │  ├─ Services Section   │  │
         │  │  ├─ Projects Section   │  │
         │  │  ├─ Technologies       │  │
         │  │  ├─ Blog Section       │  │
         │  │  └─ Contact Section    │  │
         │  └────────────────────────┘  │
         │                              │
         │  ┌────────────────────────┐  │
         │  │  Footer                │  │
         │  └────────────────────────┘  │
         └──────────────────────────────┘
                        │
                        ▼
         ┌──────────────────────────────┐
         │   STYLES APPLIED             │
         │   ├─ Global CSS              │
         │   ├─ Component Styles        │
         │   └─ Tailwind Utilities      │
         └──────────────────────────────┘
                        │
                        ▼
         ┌──────────────────────────────┐
         │   VUE HYDRATION              │
         │   └─ LanguageSwitcher        │
         │      becomes interactive     │
         └──────────────────────────────┘
                        │
                        ▼
         ┌──────────────────────────────┐
         │   FINAL HTML TO BROWSER      │
         └──────────────────────────────┘
```

---

## Key Takeaways

### 🎯 Remember These Points

1. **Content = i18n JSON files** → Edit text here, not in `.astro` files
2. **Structure = index.astro** → Add/remove sections here
3. **Colors = global.css** → Change CSS variables for site-wide updates
4. **Images = public/ folder** → Reference with `/images/...`
5. **Static Site = Fast** → Everything pre-generated at build time
6. **Components = Reusable** → Header/Footer used on every page
7. **Frontmatter runs once** → At build time, not per request
8. **Scoped styles** → Won't leak to other components

---

### 📚 Quick Reference

| I want to...                    | Edit this file...                  |
|---------------------------------|------------------------------------|
| Change website text             | `src/i18n/en.json` or `pl.json`    |
| Change colors                   | `src/styles/global.css`            |
| Add/remove section              | `src/pages/index.astro`            |
| Change navigation               | `src/components/Header.astro`      |
| Add image                       | `public/images/`                   |
| Add blog post                   | `src/content/blog/my-post.md`      |
| Add project                     | `src/content/projects/my-proj.md`  |
| Change domain                   | `astro.config.mjs` + `public/CNAME`|
| Setup contact form              | Update Formspree ID in index.astro |

---

### 🚀 Development Commands

```bash
npm run dev      # Start development server (auto-reload)
npm run build    # Build for production (generates dist/)
npm run preview  # Preview production build locally
```

---

### ❓ Common Questions

**Q: Why are there two similar files (.astro and .vue)?**
A: `.astro` = Static components (no JavaScript). `.vue` = Interactive components (needs JavaScript).

**Q: Where does the content come from?**
A: Text from `src/i18n/*.json`, images from `public/images/`, blog/projects from `src/content/`.

**Q: Can I use plain HTML/CSS?**
A: Yes! Astro components are basically HTML with superpowers. You can write regular HTML/CSS inside them.

**Q: How do I add a new language?**
A: Create `src/i18n/de.json` (German example), add translations, update `src/utils/i18n.js` to include it.

**Q: Do I need to know Vue.js?**
A: Not really! Only for interactive components like the language switcher. Most of the site is plain Astro.

---

## Next Steps

Now that you understand the structure, you can:

1. ✅ Edit content in i18n files
2. ✅ Add your professional photo
3. ✅ Create project case studies in `src/content/projects/`
4. ✅ Write blog posts in `src/content/blog/`
5. ✅ Customize colors in `global.css`
6. ✅ Setup Formspree for contact form
7. ✅ Deploy to GitHub Pages

---

**Questions?** Check the files mentioned above or refer to:
- [Astro Documentation](https://docs.astro.build)
- [PRD Document](PRD/PORTFOLIO_WEBSITE_PRD.md)
- [Astro Getting Started Guide](PRD/ASTRO_GETTING_STARTED_GUIDE.md)

---

**Last Updated:** January 16, 2026
**Version:** 1.0
**Author:** Claude Code
