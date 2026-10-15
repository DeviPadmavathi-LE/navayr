export const BRAND_TICKER = [
  "ZARA", "MYNTRA", "AJIO LUXE", "FREEUP THRIFT", "BLUORNG", "BONKERS CORNER", 
  "COUTLOOT", "RELOVE", "URBANIC", "H&M", "THE SOULED STORE", "ALMOST GODS", 
  "SNITCH", "FARFETCH", "AMAZON FASHION", "WESTSIDE", "FUGAZEE", "BHAANE"
];

export const HERO_SCENARIOS = [
  {
    id: "leather-bomber",
    name: "Archival Distressed Leather Bomber",
    aesthetic: "Neo-Vintage Minimalist",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    tags: ["Oversized", "Aged Patina", "Heavyweight Boxy Cut", "Drop Shoulder"],
    retailBrand: "Zara Studio Collection",
    retailPrice: 8990,
    retailUrl: "https://zara.com",
    thriftBrand: "FreeUp Verified Closet",
    thriftPrice: 3200,
    condition: "Mint Condition / Like New",
    saving: 64,
    siglipMatch: 99.4,
    iqrPercentile: 14,
    verdict: "FAIR PRICE — 14th Percentile (Buy Now)",
    verdictType: "fair",
    vectorDim: "768-D [0.412, -0.892, 0.128, ...]",
    latency: "118ms"
  },
  {
    id: "linen-coord",
    name: "Raw Hem Tailored Linen Co-ord",
    aesthetic: "Quiet Luxury / Coastal Minimal",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    tags: ["100% Belgian Linen", "Cuban Collar", "Wide Pleated Trouser", "Natural Ecru"],
    retailBrand: "Massimo Dutti / Myntra",
    retailPrice: 11990,
    retailUrl: "https://myntra.com",
    thriftBrand: "Relove Vintage Archive",
    thriftPrice: 4400,
    condition: "Gently Used (Worn Once)",
    saving: 63,
    siglipMatch: 98.2,
    iqrPercentile: 22,
    verdict: "FAIR PRICE — 22nd Percentile (Buy Now)",
    verdictType: "fair",
    vectorDim: "768-D [0.819, 0.041, -0.631, ...]",
    latency: "104ms"
  },
  {
    id: "cargo-parachute",
    name: "Technical Ripstop Parachute Pant",
    aesthetic: "Gorpcore / Cyber Utility",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    tags: ["Water Repellent", "Bungee Toggle Cuffs", "Knee Dart Articulation", "Phantom Black"],
    retailBrand: "Bluorng D2C Direct",
    retailPrice: 5499,
    retailUrl: "https://bluorng.com",
    thriftBrand: "Coutloot Verified Pro",
    thriftPrice: 2150,
    condition: "Archival Deadstock (Tags Attached)",
    saving: 61,
    siglipMatch: 97.9,
    iqrPercentile: 31,
    verdict: "FAIR PRICE — 31st Percentile (Buy Now)",
    verdictType: "fair",
    vectorDim: "768-D [-0.198, 0.742, 0.384, ...]",
    latency: "126ms"
  }
];

export const PROBLEM_COMPARISON = [
  {
    issue: "Browser Overload",
    traditional: "7+ fragmented apps open (Zara, Myntra, Ajio, Amazon, Coutloot, FreeUp, Instagram DMs)",
    navayr: "1 unified fashion intelligence interface querying 150k+ items in sub-150ms"
  },
  {
    issue: "Fake Sale Markups",
    traditional: "Retailers hike base price 40% before 'Festive Offers' to create artificial discounts",
    navayr: "90-day IQR statistical engine shows true price percentiles and historical lows"
  },
  {
    issue: "Thrift Scam Anxiety",
    traditional: "Risky Instagram DM thrift sellers: no returns, fake shipping slips, ghosting after payment",
    navayr: "Organized, verified circular resale network with zero escrow and transparent merchant verification"
  },
  {
    issue: "Sizing Roulette",
    traditional: "Zara M fits like an H&M S and a Westside L — constant return headaches and courier waste",
    navayr: "AI Cross-Brand Size Normalizer converts your exact measurements into brand-specific fits"
  },
  {
    issue: "Fitting Room Indecision",
    traditional: "Clunky screenshots forwarded to 3 WhatsApp group chats; forgotten amidst 200 unread memes",
    navayr: "1-tap interactive WhatsApp preview voting cards with real-time dynamic tally in your inbox"
  }
];

export const D2C_BRANDS = [
  {
    name: "BLUORNG",
    tagline: "High-density Indian Luxury Streetwear",
    location: "New Delhi",
    commission: "12%",
    myntraCommission: "34%",
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=700&q=80",
    signature: "Heavy GSM Chenille Boxy Tees & Acid Wash Cargos",
    avgPrice: "₹3,999 - ₹7,499",
    growth: "+140% YoY"
  },
  {
    name: "BONKERS CORNER",
    tagline: "Subculture & Anime Oversized Silhouettes",
    location: "Mumbai",
    commission: "10%",
    myntraCommission: "32%",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80",
    signature: "Drop Shoulder Graphic Fleece & Parachute Bottoms",
    avgPrice: "₹1,299 - ₹2,799",
    growth: "+210% YoY"
  },
  {
    name: "BHAANE",
    tagline: "Contemporary Global Indian Design",
    location: "New Delhi",
    commission: "15%",
    myntraCommission: "38%",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80",
    signature: "Sculptural Tailoring, Fine Cotton, Modern Drapes",
    avgPrice: "₹4,500 - ₹12,000",
    growth: "+85% YoY"
  },
  {
    name: "FUGAZEE",
    tagline: "Accessible Urban Aesthetic & Utility",
    location: "Noida",
    commission: "10%",
    myntraCommission: "30%",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=700&q=80",
    signature: "Modular Multi-Pocket Cargo & Tech Windbreakers",
    avgPrice: "₹1,899 - ₹3,499",
    growth: "+175% YoY"
  }
];

export const PRICE_CHECK_SAMPLES = [
  {
    url: "zara.com/in/oversized-trench-coat-p0214811.html",
    name: "Double Breasted Wool-Blend Trench",
    currentPrice: 6990,
    originalPrice: 9990,
    historicalLow: 5490,
    historicalHigh: 10990,
    iqrPercentile: 24,
    verdict: "FAIR PRICE",
    verdictColor: "#00E599",
    advice: "Current price is in the 24th percentile. Only ₹1,500 above all-time 90-day low. Safe to buy now.",
    history: [
      { day: "Day 1", price: 9990 },
      { day: "Day 15", price: 9990 },
      { day: "Day 30", price: 10990 },
      { day: "Day 45", price: 8990 },
      { day: "Day 60", price: 7990 },
      { day: "Day 75", price: 5490 },
      { day: "Day 90", price: 6990 },
    ]
  },
  {
    url: "myntra.com/jackets/levis-vintage-fit-trucker-jacket/281921",
    name: "Levi's Type III Sherpa Denim Trucker",
    currentPrice: 5999,
    originalPrice: 5999,
    historicalLow: 3299,
    historicalHigh: 6499,
    iqrPercentile: 88,
    verdict: "WAIT FOR SALE",
    verdictColor: "#FF385C",
    advice: "Current price is in the 88th percentile. Historical data shows this drops to ₹3,500 during monthly weekend flash sales. We recommend setting a Watchdog alert.",
    history: [
      { day: "Day 1", price: 6499 },
      { day: "Day 15", price: 4199 },
      { day: "Day 30", price: 3499 },
      { day: "Day 45", price: 3299 },
      { day: "Day 60", price: 5299 },
      { day: "Day 75", price: 5799 },
      { day: "Day 90", price: 5999 },
    ]
  },
  {
    url: "ajio.com/luxe/ted-baker-slim-chinos/p/461298192",
    name: "Sateen Cotton Stretch Tailored Chino",
    currentPrice: 4200,
    originalPrice: 6500,
    historicalLow: 3900,
    historicalHigh: 6500,
    iqrPercentile: 48,
    verdict: "TYPICAL PRICE",
    verdictColor: "#FFB800",
    advice: "Price is right around the 90-day median (48th percentile). Neither heavily discounted nor overpriced.",
    history: [
      { day: "Day 1", price: 6500 },
      { day: "Day 15", price: 5200 },
      { day: "Day 30", price: 4400 },
      { day: "Day 45", price: 3900 },
      { day: "Day 60", price: 4100 },
      { day: "Day 75", price: 4300 },
      { day: "Day 90", price: 4200 },
    ]
  }
];

export const TREND_DROPS = [
  {
    id: "old-money",
    title: "Old Money Curation",
    subtitle: "Understated luxury, cream knitwear, pleated wool, and quiet tailoring",
    saves: "4.8k",
    curator: "Algorithmic Editorial Cluster #09",
    itemsCount: 142,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    tags: ["Belgian Linen", "Loafers", "Merino Wool", "Oxford Cotton", "Tortoiseshell"],
    priceRange: "₹1,800 — ₹6,500"
  },
  {
    id: "gorpcore",
    title: "Gorpcore Under ₹2,000",
    subtitle: "High-function outdoor technical wear curated strictly for budget city explorers",
    saves: "9.2k",
    curator: "Reddit & IG Streetwear Scraper",
    itemsCount: 88,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80",
    tags: ["Tactical Nylon", "Paracord", "Bungee Toggle", "Cargo Vests", "Water-Repellent"],
    priceRange: "₹899 — ₹1,999"
  },
  {
    id: "y2k-cyber",
    title: "Cyber Y2K & Grunge",
    subtitle: "Wide flares, distressed knitwear, chrome accents, and archive Japanese denim",
    saves: "7.1k",
    curator: "Pinterest Viral Cluster",
    itemsCount: 116,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    tags: ["Raw Edge", "Chrome Hardware", "Acid Wash", "Baby Tees", "Chunky Platforms"],
    priceRange: "₹1,200 — ₹4,800"
  },
  {
    id: "coastal-linen",
    title: "Monochrome Coastal Linen",
    subtitle: "Breathable airy ecru, unbleached cotton, and minimalist resort silhouettes",
    saves: "3.5k",
    curator: "Summer Editorial Feed",
    itemsCount: 94,
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
    tags: ["Unstructured", "Breathable", "Resort Collar", "Ecru / Stone", "Relaxed Fit"],
    priceRange: "₹1,499 — ₹5,200"
  }
];

export const SIZE_MAPPING = {
  Zara: {
    S: { chest: "36-38", waist: "30-31", note: "European slim cut. Tighter in the shoulders." },
    M: { chest: "38-40", waist: "32-33", note: "Standard European fit." },
    L: { chest: "41-43", waist: "34-35", note: "True to size." },
    XL: { chest: "44-46", waist: "36-38", note: "Roomier body." }
  },
  "H&M": {
    S: { chest: "34-36", waist: "29-30", note: "Relaxed Scandinavian sizing, runs slightly larger." },
    M: { chest: "38-40", waist: "31-33", note: "Generous chest room." },
    L: { chest: "42-44", waist: "34-36", note: "Comfort cut." },
    XL: { chest: "46-48", waist: "38-40", note: "Wide chest." }
  },
  Westside: {
    S: { chest: "38-39", waist: "31-32", note: "Indian relaxed comfort sizing. Size down for tailored fit." },
    M: { chest: "40-41", waist: "33-34", note: "Broad shoulder clearance." },
    L: { chest: "42-43", waist: "35-36", note: "Full relaxed fit." },
    XL: { chest: "44-46", waist: "37-39", note: "Generous drape." }
  },
  Bluorng: {
    S: { chest: "42", waist: "30-32", note: "Signature oversized boxy drape. Fits 1 size larger intentionally." },
    M: { chest: "44", waist: "32-34", note: "Heavy drop shoulder, ultra-relaxed." },
    L: { chest: "46", waist: "34-36", note: "Streetwear exaggerated silhouette." },
    XL: { chest: "48", waist: "36-38", note: "Maximum volume boxy cut." }
  }
};
