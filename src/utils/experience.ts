// Experience calculation utility
// Start date for years of experience calculation
export const EXPERIENCE_START_DATE = '2018-01';

/**
 * Calculate full years of experience from the start date
 * Only counts completed years (e.g., if start is 2018-01 and now is 2026-01, returns 8)
 */
export function getYearsOfExperience(): number {
  const [startYear, startMonth] = EXPERIENCE_START_DATE.split('-').map(Number);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // getMonth() is 0-indexed

  let years = currentYear - startYear;

  // Adjust if we haven't reached the anniversary month yet this year
  if (currentMonth < startMonth) {
    years--;
  }

  return years;
}
