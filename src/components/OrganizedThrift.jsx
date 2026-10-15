import React, { useState } from 'react';

const THRIFT_CATEGORIES = ['ALL', 'LEATHER & BOMBERS', 'BAGS & ARCHIVE', 'STREETWEAR', 'DENIM'];

const THRIFT_ITEMS = [
  {
    id: 'th-1',
    category: 'LEATHER & BOMBERS',
    title: '1998 Distressed Biker Jacket',
    seller: 'Archive Studio Bombay',
    rating: '4.9 ★ Partner',
    price: '₹950',
    originalPrice: '₹12,000',
    condition: 'GRADE A • RESTORED',
    image: '/images/clean_jacket.jpg',
    badge: 'RARE 90S FIND'
  },
  {
    id: 'th-2',
    category: 'BAGS & ARCHIVE',
    title: 'Antique Maroon Beaded Reticule',
    seller: 'Thrift Vault India',
    rating: '4.9 ★ Partner',
    price: '₹350',
    originalPrice: '₹12,000',
    condition: 'GRADE A • GENTLY USED',
    image: '/images/bag_beaded.jpg',
    badge: 'DROPPING SOON'
  },
  {
    id: 'th-3',
    category: 'DRESSES & SETS',
    title: 'Maroon Brocade Lehenga Set',
    seller: 'Deccan Thrift Collective',
    rating: '4.8 ★ Partner',
    price: '₹650',
    originalPrice: '₹6,499',
    condition: 'GRADE A • NATURAL FADE',
    image: '/images/thrift_dress.jpg',
    badge: '1 OF 1'
  },
  {
    id: 'th-4',
    category: 'STREETWEAR',
    title: 'Vintage Washed Graphic Oversize',
    seller: 'Delhi Underground Archive',
    rating: '4.9 ★ Verified',
    price: '₹450',
    originalPrice: '₹4,200',
    condition: 'GRADE B+ • VINTAGE SOFT',
    image: '/images/thrift_tshirt.jpg',
    badge: 'DROPPING SOON'
  },
  {
    id: 'th-5',
    category: 'LEATHER & BOMBERS',
    title: 'Oversized Brown Vintage Moto',
    seller: 'Thrift Vault India',
    rating: '4.7 ★ Verified',
    price: '₹750',
    originalPrice: '₹5,999',
    condition: 'GRADE A • RESTORED',
    image: '/images/bomber_brown.jpg',
    badge: '1 OF 1'
  },
  {
    id: 'th-6',
    category: 'LEATHER & BOMBERS',
    title: 'Streetz Embroidered Racer',
    seller: 'Hype Archive',
    rating: '5.0 ★ Partner',
    price: '₹1,400',
    originalPrice: '₹14,999',
    condition: 'GRADE A+ • LIKE NEW',
    image: '/images/bomber_streetz.png',
    badge: 'AUTHENTICATED'
  },
  {
    id: 'th-7',
    category: 'LEATHER & BOMBERS',
    title: 'A.F.G.K Ferrari Boxy Bomber',
    seller: 'Curated Circular Vault',
    rating: '4.9 ★ Verified',
    price: '₹550',
    originalPrice: '₹24,000',
    condition: 'GRADE A • GENTLY USED',
    image: '/images/bomber_ferrari.png',
    badge: 'RARE 90S FIND'
  },
  {
    id: 'th-8',
    category: 'LEATHER & BOMBERS',
    title: 'Lucky Arrow Racing Leather',
    seller: 'Archive Studio Bombay',
    rating: '4.8 ★ Partner',
    price: '₹2,150',
    originalPrice: '₹28,500',
    condition: 'GRADE B+ • VINTAGE PATINA',
    image: '/images/bomber_lucky.jpg',
    badge: 'DROPPING SOON'
  },
  {
    id: 'th-9',
    category: 'BAGS & ARCHIVE',
    title: 'Patchwork Animal Print Purse',
    seller: 'Curated Circular Vault',
    rating: '5.0 ★ Verified',
    price: '₹990',
    originalPrice: '₹9,900',
    condition: 'GRADE A • RESTORED',
    image: '/images/bag_patchwork.png',
    badge: '1 OF 1'
  },
  {
    id: 'th-10',
    category: 'BAGS & ARCHIVE',
    title: 'Velvet Floral Crescent Bag',
    seller: 'Archive Studio Bombay',
    rating: '4.8 ★ Partner',
    price: '₹650',
    originalPrice: '₹5,500',
    condition: 'GRADE A+ • LIKE NEW',
    image: '/images/bag_floral.png',
    badge: 'AUTHENTICATED'
  },
  {
    id: 'th-11',
    category: 'BAGS & ARCHIVE',
    title: 'Boho Beaded Suede Hobo',
    seller: 'Delhi Underground Archive',
    rating: '4.7 ★ Verified',
    price: '₹550',
    originalPrice: '₹4,999',
    condition: 'GRADE B+ • VINTAGE SOFT',
    image: '/images/bag_boho.png',
    badge: 'RARE 90S FIND'
  },
  {
    id: 'th-12',
    category: 'BAGS & ARCHIVE',
    title: 'Structured Box Calfskin Clutch',
    seller: 'Curated Circular Vault',
    rating: '5.0 ★ Verified',
    price: '₹890',
    originalPrice: '₹8,500',
    condition: 'GRADE A+ • LIKE NEW',
    image: '/images/thrift_clutch.png',
    badge: 'AUTHENTICATED'
  },
  {
    id: 'th-13',
    category: 'STREETWEAR',
    title: 'Washed Grunge Denim Zip-Up',
    seller: 'Delhi Underground Archive',
    rating: '4.8 ★ Verified',
    price: '₹799',
    originalPrice: '₹6,400',
    condition: 'GRADE A • RESTORED',
    image: '/images/streetwear_girl.png',
    badge: '1 OF 1'
  },
  {
    id: 'th-14',
    category: 'STREETWEAR',
    title: 'Vintage 00 Mesh Jersey',
    seller: 'Archive Studio Bombay',
    rating: '5.0 ★ Partner',
    price: '₹350',
    originalPrice: '₹3,500',
    condition: 'GRADE A+ • LIKE NEW',
    image: '/images/streetwear_jersey.jpg',
    badge: 'AUTHENTICATED'
  },
  {
    id: 'th-15',
    category: 'STREETWEAR',
    title: 'Sun & Arrow Graphic Oversize',
    seller: 'Hype Archive',
    rating: '4.9 ★ Verified',
    price: '₹550',
    originalPrice: '₹4,200',
    condition: 'GRADE B+ • VINTAGE SOFT',
    image: '/images/streetwear_arrow.png',
    badge: 'RARE 90S FIND'
  },
  {
    id: 'th-16',
    category: 'STREETWEAR',
    title: 'Day of the Dead Skull Button-Up',
    seller: 'Thrift Vault India',
    rating: '4.7 ★ Partner',
    price: '₹600',
    originalPrice: '₹5,000',
    condition: 'GRADE A • GENTLY USED',
    image: '/images/streetwear_skull.jpg',
    badge: 'DROPPING SOON'
  },
  {
    id: 'th-17',
    category: 'DENIM',
    title: 'Two-Tone Vintage Denim Jacket',
    seller: 'Curated Circular Vault',
    rating: '4.9 ★ Verified',
    price: '₹850',
    originalPrice: '₹7,500',
    condition: 'GRADE A • RESTORED',
    image: '/images/denim_woman.png',
    badge: '1 OF 1'
  },
  {
    id: 'th-18',
    category: 'DENIM',
    title: 'Gold Embroidered Noir Denim',
    seller: 'Archive Studio Bombay',
    rating: '5.0 ★ Partner',
    price: '₹950',
    originalPrice: '₹8,900',
    condition: 'GRADE A+ • LIKE NEW',
    image: '/images/denim_embroidered.jpg',
    badge: 'AUTHENTICATED'
  },
  {
    id: 'th-19',
    category: 'DENIM',
    title: 'Leopard Patchwork Raw Jeans',
    seller: 'Hype Archive',
    rating: '4.8 ★ Verified',
    price: '₹650',
    originalPrice: '₹6,400',
    condition: 'GRADE B+ • VINTAGE FADE',
    image: '/images/denim_leopard.jpg',
    badge: 'RARE 90S FIND'
  },
  {
    id: 'th-20',
    category: 'DENIM',
    title: 'Frayed Logo Washed Black Denim',
    seller: 'Thrift Vault India',
    rating: '4.7 ★ Partner',
    price: '₹750',
    originalPrice: '₹5,999',
    condition: 'GRADE A • GENTLY USED',
    image: '/images/denim_black_jacket.png',
    badge: 'DROPPING SOON'
  }
];

export default function OrganizedThrift() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredItems = activeCategory === 'ALL'
    ? THRIFT_ITEMS.slice(0, 4)
    : THRIFT_ITEMS.filter(item => item.category === activeCategory);

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      const elPos = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elPos - 85, behavior: 'smooth' });
    }
  };

  return (
    <section id="thrift" className="py-24 md:py-36 px-6 bg-theme-bg text-theme-text border-t border-theme-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 text-left">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02]"></span>
              <span className="text-xs uppercase tracking-widest text-[#FF6B02] font-mono font-bold">
                07 — ORGANIZED THRIFT
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight leading-[0.95]">
              PRE-LOVED.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B02] to-[#FF9E4D]">
                PROPERLY DISCOVERED.
              </span>
            </h2>
          </div>

          <div className="max-w-md space-y-3">
            <p className="text-lg font-display font-bold text-theme-text">
              Thrift, without the hunt.
            </p>
            <p className="text-sm text-theme-muted font-normal leading-relaxed">
              No more doom-scrolling random Instagram pages or haggling in DMs. NAVAYR indexes curated pre-loved sellers and verified thrift partners into a single searchable universe.
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 justify-start">
          {THRIFT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                activeCategory === cat
                  ? 'bg-[#FF6B02] text-[#020108] font-bold shadow-md shadow-[#FF6B02]/25'
                  : 'bg-theme-card text-theme-muted hover:text-theme-text border border-theme-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Curated Pre-Loved Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-3xl bg-theme-card border border-theme-border hover:border-[#FF6B02]/50 transition-all duration-300 group cursor-pointer text-left shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-zinc-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[5%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent opacity-80 pointer-events-none"></div>

                  <span className="absolute top-3 left-3 text-[9px] font-mono px-2.5 py-1 rounded-full bg-[#020108]/90 text-[#FF6B02] font-black border border-[#FF6B02]/30 backdrop-blur-md uppercase tracking-wider">
                    {item.badge}
                  </span>

                  <span className="absolute bottom-3 left-3 right-3 text-[10px] font-mono text-theme-muted truncate uppercase">
                    SELLER: {item.seller}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-theme-muted">
                    <span className="text-[#FF6B02] font-bold">{item.condition}</span>
                    <span>{item.rating}</span>
                  </div>
                  <h4 className="font-display font-black text-base text-theme-text group-hover:text-[#FF6B02] transition-colors leading-snug">
                    {item.title}
                  </h4>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-theme-border flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-display font-black text-theme-text">
                    {item.price}
                  </span>
                  <span className="text-xs font-mono text-theme-muted line-through">
                    {item.originalPrice}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#FF6B02] font-black">
                  VERIFIED
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Verification Standard & Direct CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-theme-surface border border-theme-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl text-left">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B02] font-bold">
                NAVAYR CURATED THRIFT RADAR
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-theme-text leading-tight">
              Are you a vintage curator or thrift seller?
            </h3>
            <p className="text-sm text-theme-muted font-normal leading-relaxed">
              Connect your catalog with zero upfront listing friction. Reach buyers searching for your exact aesthetic.
            </p>
          </div>

          <button
            onClick={scrollToWaitlist}
            className="bg-[#FF6B02] text-[#020108] rounded-full px-8 py-4 font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#FF852E] transition-all hover:scale-[1.02] shadow-lg shadow-[#FF6B02]/30 shrink-0"
          >
            JOIN THE THRIFT DROP →
          </button>
        </div>

      </div>
    </section>
  );
}
