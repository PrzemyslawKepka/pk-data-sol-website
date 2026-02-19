# Future Optimizations

**Created:** January 16, 2026
**Updated:** February 2026

This document tracks potential code improvements and optimizations to revisit in the future.

---

## 1. Consolidate Card Components

**Status:** Not Started
**Priority:** Low (code works, just not DRY)

### Current Situation

Both project and blog cards are implemented in **two separate places**:

**Project Cards:**
| File | Used On | Type |
|------|---------|------|
| `src/components/ProjectCard.astro` | Homepage | Astro (static) |
| `src/components/ProjectsGrid.vue` | /projects page | Vue (interactive, card markup inline) |

**Blog Cards:**
| File | Used On | Type |
|------|---------|------|
| `src/components/BlogCard.astro` | Homepage | Astro (static) |
| `src/components/BlogsGrid.vue` | /blog page | Vue (interactive, card markup inline) |

Both sets render visually identical cards but the code is duplicated. When changes are made (e.g., adding badges, updating button styles), they must be applied in both files.

### Why It Exists This Way

- **Index page** uses Astro components (server-rendered, no JS shipped to client)
- **/projects page** needs Vue for client-side filtering functionality
- Vue components cannot render Astro components inside them
- This led to duplicating the card markup inside the Vue component

### Proposed Solution

**Create single Vue components** for both card types:

```
src/components/
├── ProjectCard.vue      # Single source of truth for project card markup
├── ProjectsGrid.vue     # Imports ProjectCard.vue, handles filtering
├── BlogCard.vue         # Single source of truth for blog card markup
└── BlogsGrid.vue        # Imports BlogCard.vue, handles filtering
```

**Implementation steps (for each card type):**

1. Extract card markup from Grid.vue into a new Card.vue
2. Update Grid.vue to import and use Card.vue
3. Replace Card.astro usage on homepage with Card.vue using `client:load`
4. Delete Card.astro

**Index page usage would change from:**
```astro
<ProjectCard project={project} translations={...} />
```

**To:**
```astro
<ProjectCard client:load project={project} translations={...} />
```

### Trade-offs

| Pros | Cons |
|------|------|
| Single source of truth - edit once, applies everywhere | Index page now ships Vue JS for cards (currently zero JS) |
| Easier maintenance | Slightly larger bundle size |
| No more sync issues between two files | Minor performance cost (negligible for portfolio site) |

### When to Do This

Consider doing this refactor when:
- You've made 2-3 more changes that required editing both files
- The maintenance burden becomes annoying
- You want to add significant new card functionality

**Not urgent** - the current setup works fine. This is a "nice to have" for cleaner code.

---

## 2. Full Polish Content for Projects/Blog Posts

**Status:** Not Started
**Priority:** Low (current descriptionPl approach works well)

### Current Situation

Projects and blog posts have:
- Full English content (markdown body)
- Polish short descriptions (via `descriptionPl` field)

When viewing in Polish, users see Polish card descriptions but English full content with a note.

### Potential Enhancement

For important content, create fully translated Polish versions:

```
src/content/projects/
├── my-project.md      # lang: "en" - English version
└── my-project-pl.md   # lang: "pl" - Full Polish version
```

### When to Consider

- When a specific project/post is particularly important for Polish audience
- When you have time/resources for full translation
- For flagship projects that represent core skills

See [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md) for implementation details.

---

## 3. (Future items can be added here)

*Add other optimization ideas as they come up.*

---

**Note:** This file is for tracking improvements, not bugs. Working code that could be cleaner goes here.
