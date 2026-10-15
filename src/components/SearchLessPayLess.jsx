import React, { useState } from 'react';

const CAROUSEL_PRODUCTS = [
  {
    id: 'p1',
    category: 'JACKETS',
    name: 'Vintage Biker Leather Jacket',
    retail: '₹7,999',
    found: '₹3,499',
    saving: 'SAVE 56%',
    source: 'Curated Pre-Loved Archive',
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=80',
    tag: 'ARCHIVE VINTAGE'
  },
  {
    id: 'p2',
    category: 'SNEAKERS',
    name: 'Retro Platform Chunky Low',
    retail: '₹9,499',
    found: '₹3,999',
    saving: 'SAVE 58%',
    source: 'Verified Sneaker Seller',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
    tag: 'SNEAKER DROP'
  },
  {
    id: 'p3',
    category: 'HANDBAGS',
    name: 'Baguette Calfskin Shoulder Bag',
    retail: '₹8,990',
    found: '₹2,899',
    saving: 'SAVE 68%',
    source: 'Pre-Loved Vintage Hub',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80',
    tag: 'CURATED LUXURY'
  },
  {
    id: 'p4',
    category: 'STREETWEAR',
    name: '500 GSM Heavyweight Boxy Hoodie',
    retail: '₹5,499',
    found: '₹2,799',
    saving: 'SAVE 49%',
    source: 'Direct D2C Brand Partner',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80',
    tag: 'HOMEGROWN D2C'
  },
  {
    id: 'p5',
    category: 'ACCESSORIES',
    name: 'Brushed Titanium Minimalist Watch',
    retail: '₹12,499',
    found: '₹4,990',
    saving: 'SAVE 60%',
    source: 'Verified Archive Watchmaker',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80',
    tag: 'ARCHIVE COLLECTIBLE'
  }
];

export default function SearchLessPayLess() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProduct = CAROUSEL_PRODUCTS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : CAROUSEL_PRODUCTS.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < CAROUSEL_PRODUCTS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="search-less" className="py-24 md:py-36 px-6 bg-theme-surface text-theme-text border-t border-theme-border overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8 text-left">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02]"></span>
              <span className="text-xs uppercase tracking-widest text-[#FF6B02] font-mono font-bold">
                05 — SEARCH LESS. PAY LESS.
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight leading-[0.95]">
              SEARCH LESS.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B02] to-[#FF9E4D]">
                PAY LESS.
              </span>
            </h2>
          </div>

          <div className="max-w-md space-y-2">
            <p className="text-lg font-display font-bold text-theme-text">
              &ldquo;Same drip, less cash.&rdquo;
            </p>
            <p className="text-sm text-theme-muted font-normal leading-relaxed">
              You describe the style. NAVAYR finds the match. Then we search and compare across stores to help you discover the lower available price.
            </p>
          </div>
        </div>

        {/* Category Filter Controls */}
        <div className="flex flex-wrap gap-2 mb-12 justify-start">
          {CAROUSEL_PRODUCTS.map((prod, idx) => (
            <button
              key={prod.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                activeIndex === idx
                  ? 'bg-[#FF6B02] text-[#020108] font-bold shadow-md shadow-[#FF6B02]/25'
                  : 'bg-theme-card text-theme-muted hover:text-theme-text border border-theme-border'
              }`}
            >
              {prod.category}
            </button>
          ))}
        </div>

        {/* Central Product Showcase with Orbiting Side Cards */}
        <div className="relative max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Centerpiece Visual Mobile Frame Interface */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-theme-border-strong bg-theme-card shadow-2xl group">
                <img 
                  src={activeProduct.image} 
                  alt={activeProduct.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[5%]"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent opacity-90 pointer-events-none"></div>

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#020108]/90 text-[#FF6B02] border border-[#FF6B02]/30 font-bold backdrop-blur-md">
                    {activeProduct.tag}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#FF6B02] text-[#020108] font-black shadow-lg">
                    {activeProduct.saving}
                  </span>
                </div>

                {/* Bottom Card Readout */}
                <div className="absolute bottom-6 left-6 right-6 text-left space-y-2">
                  <span className="text-[11px] font-mono text-theme-muted uppercase tracking-wider block">
                    FOUND VIA: {activeProduct.source}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-black text-theme-text leading-tight">
                    {activeProduct.name}
                  </h3>
                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="text-3xl font-display font-black text-[#FF6B02]">
                      {activeProduct.found}
                    </span>
                    <span className="text-sm font-mono text-theme-muted line-through">
                      Retail: {activeProduct.retail}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Comparative Discovery Breakdown & Pipeline */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme-border space-y-5 shadow-2xl">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6B02] font-bold block mb-1">
                    PRICE DISCOVERY ENGINE
                  </span>
                  <h4 className="font-display font-black text-xl sm:text-2xl text-theme-text leading-tight">
                    How NAVAYR Found It
                  </h4>
                </div>

                <div className="space-y-3 pt-2 text-xs font-mono">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-theme-surface border border-theme-border">
                    <span className="text-theme-muted">Official Retail Flagship</span>
                    <span className="font-bold text-theme-muted line-through">{activeProduct.retail}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-xl bg-theme-surface border border-theme-border">
                    <span className="text-theme-muted">Luxury Multi-Brand Portal</span>
                    <span className="font-bold text-theme-muted">₹{(parseInt(activeProduct.retail.replace(/[^\d]/g, ''), 10) * 0.85).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                  </div>

                  <div className="flex justify-between items-center p-3.5 rounded-xl bg-[#FF6B02]/10 border border-[#FF6B02]/40 text-[#FF6B02]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B02]"></span>
                      <span className="font-bold">NAVAYR Verified Lower Option</span>
                    </div>
                    <span className="font-black text-base">{activeProduct.found}</span>
                  </div>
                </div>

                <p className="text-xs text-theme-muted font-normal leading-relaxed pt-2">
                  Built to compare across authenticated retail, direct D2C brands, and verified pre-loved archives so you never pay full markup.
                </p>

                {/* Navigation arrows */}
                <div className="flex items-center justify-between pt-4 border-t border-theme-border">
                  <div className="text-xs font-mono text-theme-muted">
                    {activeIndex + 1} / {CAROUSEL_PRODUCTS.length}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full border border-theme-border bg-theme-surface hover:border-[#FF6B02] hover:text-[#FF6B02] transition-colors flex items-center justify-center font-bold"
                      aria-label="Previous Product"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full border border-theme-border bg-theme-surface hover:border-[#FF6B02] hover:text-[#FF6B02] transition-colors flex items-center justify-center font-bold"
                      aria-label="Next Product"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
