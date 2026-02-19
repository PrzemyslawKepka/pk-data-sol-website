import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    descriptionPl: z.string().optional(), // Polish short description (for cards and header)
    publishDate: z.date(), // Full date: year-month-day
    category: z.enum(['Technical', 'Business']), // Only one badge per post
    tags: z.array(z.string()), // Hashtags like #python #flask
    image: z.string().optional(), // Cover image path
    readTime: z.number().optional(), // Estimated read time in minutes (auto-calculated if not provided)
    lang: z.enum(['en', 'pl']).default('en')
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    descriptionPl: z.string().optional(), // Polish short description (for cards and header)
    categories: z.array(z.string()), // ["Web Application", "ETL Pipeline", "Dashboard", etc.]
    technologies: z.array(z.string()),
    github: z.string().optional(),
    liveUrl: z.string().optional(),
    image: z.string().optional(),
    projectType: z.enum(['fte', 'current', 'side']).default('side'),
    company: z.string().optional(), // For FTE projects (e.g., "Santander Bank Poland")
    year: z.string().optional(), // Year or year range (e.g., "2024" or "2021-2024")
    industry: z.string().optional(), // Industry domain (e.g., "Finance", "Real Estate", "IoT")
    isCommercial: z.boolean().optional(), // For 'current' projects only - indicates if it's a commercial venture
    lang: z.enum(['en', 'pl']).default('en')
  })
});

export const collections = {
  blog,
  projects
};
