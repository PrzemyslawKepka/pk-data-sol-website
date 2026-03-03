# Claude Context

This is a personal portfolio website built with Astro and Vue.

## Important: Duplicated Components

**Project cards are implemented in TWO places that must be kept in sync:**

| File | Used On | Type |
|------|---------|------|
| `src/components/ProjectCard.astro` | Homepage | Astro (static) |
| `src/components/ProjectsGrid.vue` | /projects page | Vue (interactive, card markup inline) |

When making changes to project card styling or structure, **update BOTH files**.

**Blog cards are implemented in TWO places that must be kept in sync:**

| File | Used On | Type |
|------|---------|------|
| `src/components/BlogCard.astro` | Homepage | Astro (static) |
| `src/components/BlogsGrid.vue` | /blog page | Vue (interactive, card markup inline) |

When making changes to blog card styling or structure, **update BOTH files**.

See `docs/FUTURE_OPTIMIZATIONS.md` for the full explanation and proposed consolidation plan.

---

## Bilingual (Polish/English) system

This site is fully bilingual. Every piece of user-facing content exists in both Polish and English.

- Translation keys are managed via i18n config files — check existing patterns before adding new keys.
- When editing content files, always preserve both language versions. Never update one language without updating the other.
- Do not add new i18n keys without checking whether a similar key already exists.
- If a translation is unclear or missing, flag it rather than guessing.

---

## CSS and styling conventions

- Use `rem` units for spacing and sizing — not `px`.
- When a specific color is required, ask for the exact hex code rather than interpreting descriptive words like "yellow" or "warm amber". Descriptive color names are ambiguous, especially on dark backgrounds.
- Always verify that changes render correctly on **both desktop and mobile** before considering a fix done.
- The site uses a dark background — test any light-colored elements (badges, notifications, highlights) for sufficient contrast. When in doubt, check the contrast ratio rather than eyeballing it.
- Tailwind CSS v4 is in use — follow its conventions, not v3 patterns.
