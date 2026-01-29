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
  'tekyous',                       // 1. Commercial, coming soon
  'cm-rentals',                    // 2. Active, real users, great story
  'entity-report',                 // 3. Largest corporate, leadership
  'supabase-img-linker-ui',        // 4. Open source utility, marketing potential
  'customer-opinions-etl',         // 5. Most recent corporate, production ETL
  'streamlit-center',              // 6. Developer tools, org-wide impact
  'rapid-streamlit-app',           // 7. Production under pressure
  'bank-statement-automation',     // 8. "Founding story" - first Python project
  'financial-data-reconciliation', // 9. Solid corporate
  'wbc-game-assistant',            // 10. Live URL, community feedback
  'temperature-monitoring',        // 11. IoT, technical depth
  'pk-data-solutions-website',     // 12. We're already here
  'facebook-archive-analysis',     // 13. Good ETL showcase
  'electronics-web-scraping',      // 14. Web scraping
  'image-editor',                  // 15. Simplest project
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
