import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    lang: z.enum(['en', 'pl']).default('en')
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    categories: z.array(z.string()), // ["Web Application", "ETL Pipeline", "Dashboard", etc.]
    technologies: z.array(z.string()),
    github: z.string().optional(),
    liveUrl: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    projectType: z.enum(['fte', 'current', 'side']).default('side'),
    company: z.string().optional(), // For FTE projects (e.g., "Santander Bank Poland")
    year: z.string().optional(), // Year or year range (e.g., "2024" or "2021-2024")
    industry: z.string().optional(), // Industry domain (e.g., "Finance", "Real Estate", "IoT")
    order: z.number().default(0), // For custom sorting (higher = shown first)
    lang: z.enum(['en', 'pl']).default('en')
  })
});

export const collections = {
  blog,
  projects
};
