# Internationalization (i18n) Guide

**Last Updated:** February 2026

This document explains how the dual language (English/Polish) system works and how to add translations.

---

## Table of Contents

1. [Overview](#overview)
2. [How Language Switching Works](#how-language-switching-works)
3. [URL Structure](#url-structure)
4. [Translation Files](#translation-files)
5. [Adding Polish Translations to Projects](#adding-polish-translations-to-projects)
6. [Adding Polish Translations to Blog Posts](#adding-polish-translations-to-blog-posts)
7. [Creating Fully Translated Content](#creating-fully-translated-content)
8. [Technical Architecture](#technical-architecture)

---

## Overview

The site supports two languages:
- **English (en)** - Default language
- **Polish (pl)** - Secondary language

**Current implementation:**
- All UI elements (navigation, buttons, labels, section headers) are fully translated
- Projects and blog posts have **English content** with optional **Polish short descriptions** (shown on cards and detail page headers)
- Full Polish content can be added as separate markdown files when needed

---

## How Language Switching Works

### User Flow

1. User clicks the language toggle in the header (EN/PL buttons)
2. The page navigates to the equivalent URL with the new language prefix
3. Language preference is saved to `localStorage` (key: `pk-lang`)

### Components Involved

| Component | Location | Purpose |
|-----------|----------|---------|
| `LanguageSwitcher.vue` | `src/components/` | Toggle button UI, triggers navigation |
| `Header.astro` | `src/components/` | Contains the language switcher |
| `languageStore.ts` | `src/utils/` | Language persistence and URL helpers |

---

## URL Structure

The site uses URL-based language routing:

```
English (default):
  /                      → Homepage
  /projects              → Projects listing
  /projects/my-project   → Project detail
  /blog                  → Blog listing
  /blog/my-post          → Blog post

Polish:
  /pl                    → Homepage (Polish)
  /pl/projects           → Projects listing (Polish)
  /pl/projects/my-project → Project detail (Polish)
  /pl/blog               → Blog listing (Polish)
  /pl/blog/my-post       → Blog post (Polish)
```

**Key points:**
- English uses the root path (no prefix)
- Polish uses `/pl` prefix
- All internal links automatically adjust based on current language

---

## Translation Files

### Location

```
src/i18n/
├── en.json   # English translations (~230 keys)
└── pl.json   # Polish translations (~230 keys)
```

### Structure

Translations are organized hierarchically:

```json
{
  "site": {
    "title": "...",
    "description": "..."
  },
  "nav": {
    "start": "Start",
    "about": "About",
    "services": "Services"
  },
  "hero": {
    "greeting": "Hi, I'm Przemek",
    "tagline": "I do all things data."
  },
  "projects": {
    "badgeLabels": {
      "fte": "Corporate",
      "current": "Current",
      "side": "Side Project"
    },
    "categories": {
      "webApplication": "Web Application",
      "automation": "Automation"
    },
    "industries": {
      "finance": "Finance",
      "creditRisk": "Credit Risk"
    }
  }
}
```

### Adding New UI Translations

**Step 1:** Add to English (`src/i18n/en.json`)
```json
"newSection": {
  "title": "My New Title",
  "button": "Click Me"
}
```

**Step 2:** Add to Polish (`src/i18n/pl.json`)
```json
"newSection": {
  "title": "Mój Nowy Tytuł",
  "button": "Kliknij"
}
```

**Step 3:** Use in component
```astro
---
import { useTranslations } from '../utils/i18n';
const lang = getLangFromParams(Astro.params.lang);
const t = useTranslations(lang);
---

<h2>{t.newSection.title}</h2>
<button>{t.newSection.button}</button>
```

---

## Adding Polish Translations to Projects

Projects currently use a **partial translation** approach: the main content stays in English, but you can add a Polish short description that appears on cards and detail page headers.

### Step 1: Add `descriptionPl` to frontmatter

Edit your project markdown file (e.g., `src/content/projects/my-project.md`):

```markdown
---
title: "My Project Name"
description: "A brief description in English shown on cards."
descriptionPl: "Krótki opis po polsku wyświetlany na kartach."
categories: ["Web Application"]
technologies: ["Python", "Flask"]
# ... other fields
---

## Overview

(English content - not translated)
```

### Step 2: That's it!

The system automatically:
- Shows `descriptionPl` on cards when viewing in Polish
- Falls back to English `description` if `descriptionPl` is not provided
- Shows the Polish description in the detail page header section

### Current State

Right now, all projects have:
- ✅ English content (full markdown body)
- ✅ Polish short descriptions (`descriptionPl` field)
- ⏳ Full Polish content (not yet - see [Creating Fully Translated Content](#creating-fully-translated-content))

A note is displayed on Polish project pages indicating the content is in English.

---

## Adding Polish Translations to Blog Posts

Same approach as projects:

### Step 1: Add `descriptionPl` to frontmatter

Edit your blog post (e.g., `src/content/blog/my-post.md`):

```markdown
---
title: "My Blog Post"
description: "A brief summary in English."
descriptionPl: "Krótkie podsumowanie po polsku."
publishDate: 2026-01-15
category: "Technical"
tags: ["python", "flask"]
---

## Introduction

(English content - not translated)
```

### Step 2: That's it!

The Polish description appears on cards when browsing in Polish, with automatic English fallback.

---

## Creating Fully Translated Content

**Future enhancement:** To add a complete Polish version of a project or blog post (full translated markdown body), follow this pattern:

### Option A: Duplicate with different lang

Create two separate files:

```
src/content/projects/
├── my-project.md         # lang: "en" (default)
└── my-project-pl.md      # lang: "pl"
```

**English version** (`my-project.md`):
```markdown
---
title: "My Project"
description: "English description"
lang: "en"
# ... other fields
---

English content here...
```

**Polish version** (`my-project-pl.md`):
```markdown
---
title: "Mój Projekt"
description: "Polski opis"
lang: "pl"
# ... other fields (match the English version)
---

Polska treść tutaj...
```

### Option B: Single file with descriptionPl (current approach)

This is what we do now - English content with Polish short description for cards.

### When to Use Each

| Approach | Best For |
|----------|----------|
| **Option A** (separate files) | Important projects/posts that warrant full translation |
| **Option B** (descriptionPl only) | Most content - Polish readers can understand English technical content |

---

## Technical Architecture

### Key Files

```
src/
├── i18n/
│   ├── en.json              # English UI translations
│   └── pl.json              # Polish UI translations
├── utils/
│   ├── i18n.js              # useTranslations() function
│   ├── langHelpers.ts       # Language path/routing helpers
│   ├── languageStore.ts     # localStorage persistence
│   └── translationHelpers.ts # Translation lookup utilities
├── components/
│   └── LanguageSwitcher.vue # Language toggle button
└── pages/
    └── [...lang]/           # Language-aware routing
        ├── index.astro      # Generates / and /pl
        ├── projects/
        │   ├── index.astro  # Generates /projects and /pl/projects
        │   └── [slug].astro # Project detail pages
        └── blog/
            ├── index.astro  # Generates /blog and /pl/blog
            └── [slug].astro # Blog post pages
```

### Utility Functions

| Function | File | Purpose |
|----------|------|---------|
| `useTranslations(lang)` | `i18n.js` | Load translation object for given language |
| `getLangFromParams(params)` | `langHelpers.ts` | Extract language from URL params |
| `getBasePath(lang)` | `langHelpers.ts` | Get URL prefix (`''` or `'/pl'`) |
| `getLocalizedDescription(data, lang)` | `translationHelpers.ts` | Get `descriptionPl` or fallback to `description` |
| `getStoredLanguage()` | `languageStore.ts` | Read language from localStorage |
| `setStoredLanguage(lang)` | `languageStore.ts` | Save language to localStorage |

### Page Generation

Pages use Astro's dynamic routing with `[...lang]` catch-all:

```typescript
// src/pages/[...lang]/index.astro
export function getStaticPaths() {
  return [
    { params: { lang: undefined } },  // English: /
    { params: { lang: 'pl' } }        // Polish: /pl
  ];
}

const lang = getLangFromParams(Astro.params.lang);
const t = useTranslations(lang);
const basePath = getBasePath(lang);
```

This generates both English and Polish versions at build time.

### Translation Lookup for Badges/Categories

Categories, industries, and project types are translated via centralized helpers:

```typescript
// src/utils/translationHelpers.ts
import { useTranslations } from './i18n';

export function getCategoryLabel(category: string, lang: string): string {
  const t = useTranslations(lang);
  const mapping: Record<string, string> = {
    'Web Application': t.projects.categories.webApplication,
    'Automation': t.projects.categories.automation,
    // ...
  };
  return mapping[category] || category;
}
```

---

## Quick Reference

### Adding Polish description to content

```yaml
# In frontmatter of .md file
description: "English description here"
descriptionPl: "Polski opis tutaj"
```

### Using translations in components

```astro
---
import { useTranslations } from '../utils/i18n';
import { getLangFromParams, getBasePath } from '../utils/langHelpers';

const lang = getLangFromParams(Astro.params.lang);
const t = useTranslations(lang);
const basePath = getBasePath(lang);
---

<a href={`${basePath}/projects`}>{t.nav.projects}</a>
```

### Checking current language

```typescript
// In Astro page
const lang = getLangFromParams(Astro.params.lang); // 'en' or 'pl'

// In Vue component (via props)
props.lang // 'en' or 'pl'
```

---

## Future Improvements

1. **Full Polish content** - Create separate Polish markdown files for important projects/posts
2. **Language detection** - Auto-detect browser language on first visit
3. **More languages** - Add `de.json`, `es.json` etc. and update routing

---

**See also:**
- `docs/PROJECT_STRUCTURE.md` - Overall project architecture
- `docs/PROJECT_DESCRIPTION_TEMPLATES.md` - Writing project content
