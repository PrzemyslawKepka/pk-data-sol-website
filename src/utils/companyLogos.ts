// Mapping of company names to their logo file paths
const companyLogos: Record<string, string> = {
  'Santander Bank Poland': '/images/icons/companies/Santander_id_cIxIG4D_logos.jpeg',
  'Ascensia Diabetes Care': '/images/icons/companies/Ascensia_idL44xPnly_logos.jpeg',
  'JLL': '/images/icons/companies/JLL_Symbol_0.svg',
};

export function getCompanyLogo(companyName: string | undefined): string | null {
  if (!companyName) return null;
  return companyLogos[companyName] || null;
}

export default companyLogos;
