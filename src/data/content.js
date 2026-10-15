/**
 * NAVAYR — Editorial Content & Brand Copy
 * Aesthetic: Acne Studios × Linear × Apple
 * Ultra-minimal copy (150-250 words total)
 */

export const navLinks = [
  { label: 'Discovery', href: '#visual-search' },
  { label: 'Intelligence', href: '#price-intelligence' },
  { label: 'Archive', href: '#archive-drops' },
];

export const hero = {
  headline: 'Discover Fashion Differently.',
  subline: 'Neural visual search across luxury retailers and verified archives.',
  cta: 'Request Access',
};

export const problemStatements = [
  'Catalogues scattered across fragmented storefronts.',
  'Opaque price fluctuations masking true value.',
  'Archival grails buried without authenticity proof.',
];

export const visualSearch = {
  label: '01 / NEURAL DISCOVERY',
  headline: 'Drop an image. Index the internet.',
  subline: 'Neural vector search matches silhouette, cut, and drape in seconds.',
};

export const priceIntelligence = {
  label: '02 / PRICE INTELLIGENCE',
  headline: 'Fair market value, exposed.',
  subline: 'Historical tracking across retail markdowns and private sales.',
  sampleProduct: {
    name: 'Acne Studios 1989 Loose Fit',
    currentPrice: '₹28,500',
    high: '₹34,000',
    low: '₹24,900',
    history: [34000, 32500, 31000, 28500, 29000, 26500, 28500],
  },
};

export const newVsPreloved = {
  label: '03 / CIRCULAR LUXURY',
  headline: 'Retail price is arbitrary.',
  subline: 'Direct comparison between mint retail and certified pre-loved condition.',
  productName: 'Our Legacy Camion Boot',
  newPrice: '₹48,500',
  prelovedPrice: '₹23,800',
  savePercentage: '51%',
};

export const dropCategories = [
  { title: 'GORPCORE' },
  { title: 'QUIET LUXURY' },
  { title: 'Y2K' },
  { title: 'STREETWEAR' },
];

export const social = {
  label: '04 / CURATION',
  headline: 'Curated by stylists. Powered by neural search.',
};

export const waitlist = {
  headline: 'Experience the intelligence layer.',
  subline: 'Pre-launch access is allocated in limited weekly drops.',
  cta: 'Join Priority List',
};

export const footer = {
  brand: 'NAVAYR',
  tagline: 'The style intelligence algorithm.',
  year: '2025',
};

const content = {
  navLinks,
  hero,
  problemStatements,
  visualSearch,
  priceIntelligence,
  newVsPreloved,
  dropCategories,
  social,
  waitlist,
  footer,
};

export default content;
