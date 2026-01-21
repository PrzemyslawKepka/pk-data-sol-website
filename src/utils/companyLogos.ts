// Mapping of company names to their logo file paths
const companyLogos: Record<string, string> = {
  'Santander Bank Poland': '/images/icons/companies/Santander_idE2Zv_6nc_logos.svg',
  'Ascensia Diabetes Care': '/images/icons/companies/ascensia_diabetes_care_logo.webp',
  'JLL': '/images/icons/companies/JLL_idwD2CH2ZL_1768978037301.svg',
};

export function getCompanyLogo(companyName: string | undefined): string | null {
  if (!companyName) return null;
  return companyLogos[companyName] || null;
}

export default companyLogos;
