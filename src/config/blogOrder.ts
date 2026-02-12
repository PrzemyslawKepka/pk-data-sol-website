/**
 * Centralized blog post ordering configuration.
 *
 * - Order is implicit: first item = highest priority (appears first)
 * - To reorder: simply move lines up/down
 * - To add a new post: insert its slug where you want it to appear
 *
 * Slugs must match the markdown filenames in src/content/blog/ (without .md)
 */

export const blogOrder: string[] = [
  'streamlit-to-flask-migration', // 1. First blog post
];

/**
 * Featured blog posts shown on the homepage.
 * Order here determines display order on homepage.
 * Maximum 3 will be shown.
 */
export const featuredBlogPosts: string[] = [
  'streamlit-to-flask-migration',
];

/**
 * Helper function to get the order index for a blog post slug.
 * Returns a high number for unknown posts (they appear last).
 */
export function getBlogOrder(slug: string): number {
  const index = blogOrder.indexOf(slug);
  return index === -1 ? blogOrder.length : index;
}

/**
 * Helper function to check if a blog post is featured.
 */
export function isBlogFeatured(slug: string): boolean {
  return featuredBlogPosts.includes(slug);
}
