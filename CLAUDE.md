# Claude Context

This is a personal portfolio website built with Astro and Vue.

## Important: Duplicated Components

**Project cards are implemented in TWO places that must be kept in sync:**

| File | Used On | Type |
|------|---------|------|
| `src/components/ProjectCard.astro` | Homepage | Astro (static) |
| `src/components/ProjectsGrid.vue` | /projects page | Vue (interactive, card markup inline) |

When making changes to project card styling or structure, **update BOTH files**.

See `docs/FUTURE_OPTIMIZATIONS.md` for the full explanation and proposed consolidation plan.
