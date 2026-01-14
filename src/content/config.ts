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
    category: z.string(), // "Web Application", "ETL", "Automation", "Dashboard", etc.
    technologies: z.array(z.string()),
    github: z.string().optional(),
    liveUrl: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    projectType: z.enum(['fte', 'current', 'side']).default('side'),
    lang: z.enum(['en', 'pl']).default('en')
  })
});

export const collections = {
  blog,
  projects
};
