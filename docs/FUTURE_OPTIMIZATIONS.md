# Future Optimizations

**Created:** January 16, 2026

This document tracks potential code improvements and optimizations to revisit in the future.

---

## 1. Consolidate ProjectCard Components

**Status:** Not Started
**Priority:** Low (code works, just not DRY)

### Current Situation

Project cards are implemented in **two separate places**:

| File | Used On | Type |
|------|---------|------|
| `src/components/ProjectCard.astro` | Index page (homepage) | Astro (static) |
| `src/components/ProjectsGrid.vue` | /projects page | Vue (interactive, card markup inline) |

Both render visually identical cards but the code is duplicated. When changes are made (e.g., adding badges, updating button styles), they must be applied in both files.

### Why It Exists This Way

- **Index page** uses Astro components (server-rendered, no JS shipped to client)
- **/projects page** needs Vue for client-side filtering functionality
- Vue components cannot render Astro components inside them
- This led to duplicating the card markup inside the Vue component

### Proposed Solution

**Create a single `ProjectCard.vue` component** and use it everywhere:

```
src/components/
├── ProjectCard.vue      # Single source of truth for card markup
└── ProjectsGrid.vue     # Imports ProjectCard.vue, handles filtering
```

**Implementation steps:**

1. Extract card markup from `ProjectsGrid.vue` into a new `ProjectCard.vue`
2. Update `ProjectsGrid.vue` to import and use `ProjectCard.vue`
3. Replace `ProjectCard.astro` usage on index page with `ProjectCard.vue` using `client:load`
4. Delete `ProjectCard.astro`

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

## 2. (Future items can be added here)

*Add other optimization ideas as they come up.*

---

**Note:** This file is for tracking improvements, not bugs. Working code that could be cleaner goes here.
