/**
 * Centralized project ordering configuration.
 *
 * - Order is implicit: first item = highest priority (appears first)
 * - To reorder: simply move lines up/down
 * - To add a new project: insert its slug where you want it to appear
 *
 * Slugs must match the markdown filenames in src/content/projects/ (without .md)
 */

export const projectOrder: string[] = [
  'tekyous',
  'cm-rentals',
  'pk-data-solutions-website',
  'entity-report',
  'customer-opinions-etl',
  'streamlit-center',
  'rapid-streamlit-app',
  'supabase-img-linker-ui',
  'bank-statement-automation',
  'financial-data-reconciliation',
  'wbc-game-assistant',
  'temperature-monitoring',
  'facebook-archive-analysis',
  'electronics-web-scraping',
  'image-editor',
];

/**
 * Featured projects shown on the homepage.
 * Order here determines display order on homepage.
 * Maximum 3 will be shown.
 */
export const featuredProjects: string[] = [
  'tekyous',
  'cm-rentals',
  'entity-report',
];

/**
 * Helper function to get the order index for a project slug.
 * Returns a high number for unknown projects (they appear last).
 */
export function getProjectOrder(slug: string): number {
  const index = projectOrder.indexOf(slug);
  return index === -1 ? projectOrder.length : index;
}

/**
 * Helper function to check if a project is featured.
 */
export function isProjectFeatured(slug: string): boolean {
  return featuredProjects.includes(slug);
}
