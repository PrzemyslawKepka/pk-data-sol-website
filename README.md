# Portfolio Website

Personal portfolio website built with Astro, Vue, and Tailwind CSS.

**Live:** [przemek-kepka.com](https://przemek-kepka.com)

## Tech Stack

- **[Astro](https://astro.build)** - Static site generator
- **[Vue.js](https://vuejs.org)** - Interactive components
- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first styling
- **Content Collections** - Markdown-based content management

## Project Structure

```
pk-data-sol/
├── public/                 # Static assets (images, favicon, CNAME)
├── src/
│   ├── components/         # Astro + Vue components
│   ├── content/            # Markdown content (projects, blog)
│   │   ├── blog/           # Blog posts (.md)
│   │   ├── projects/       # Project case studies (.md)
│   │   └── config.ts       # Content collection schemas
│   ├── i18n/               # Translation files
│   │   ├── en.json         # English
│   │   └── pl.json         # Polish
│   ├── layouts/            # Page templates
│   ├── pages/              # Routes (file-based routing)
│   ├── styles/             # Global CSS
│   └── utils/              # Helper functions
├── docs/                   # Documentation
├── astro.config.mjs        # Astro configuration
└── package.json
```

## Development

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (localhost:4321)
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview production build locally
```

## Key Features

### Content Collections

Projects and blog posts are managed via Markdown files with frontmatter:

```markdown
---
title: "Project Name"
description: "Short description"
descriptionPl: "Polish description for i18n"
category: "Web Application"
technologies: ["Python", "Flask"]
featured: true
projectType: "current"  # "fte" | "current" | "side"
---

Content here...
```

### Internationalization (i18n)

The site supports English and Polish with URL-based routing:

| Language | URL Pattern |
|----------|-------------|
| English  | `/`, `/projects`, `/blog` |
| Polish   | `/pl`, `/pl/projects`, `/pl/blog` |

UI translations are stored in `src/i18n/*.json`. Content uses `descriptionPl` fields for Polish card descriptions.

### Astro + Vue Components

- **Astro components** (`.astro`) - Static, zero JavaScript
- **Vue components** (`.vue`) - Interactive elements (language switcher, filters)

Vue components require `client:load` directive:
```astro
<LanguageSwitcher client:load lang={lang} />
```

### Contact Form

The contact form is handled by [Web3Forms](https://web3forms.com/) - a free, no-backend form submission service.

## Deployment

Deploys automatically to GitHub Pages via GitHub Actions on push to master. Custom domain is managed through Cloudflare DNS.

Configuration:
- `.github/workflows/deploy.yml` - CI/CD workflow
- `public/CNAME` - Custom domain
- `astro.config.mjs` - Site URL setting
- **Cloudflare** - DNS management, linking custom domain to GitHub Pages

## Documentation

- [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) - Full architecture guide
- [`docs/INTERNATIONALIZATION-i18n.md`](docs/INTERNATIONALIZATION-i18n.md) - i18n implementation details
- [`docs/PROJECT_DESCRIPTION_TEMPLATES.md`](docs/PROJECT_DESCRIPTION_TEMPLATES.md) - Content writing guidelines
