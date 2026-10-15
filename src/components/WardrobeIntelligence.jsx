import React, { useState } from 'react';

const WARDROBE_ITEMS = [
  {
    id: 1,
    title: 'Double Breasted Wool Trench',
    store: 'Zara Studio',
    price: '₹6,990',
    status: 'PRICE DIPPED 30%',
    image: '/images/wardrobe-zara.jpg',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 2,
    title: 'Raw Belgian Linen Co-ord',
    store: 'Relove Archive',
    price: '₹2,450',
    status: 'PRE-LOVED VERIFIED',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    aspect: 'aspect-[4/5]'
  },
  {
    id: 3,
    title: 'Boxy Heavyweight Denim Jacket',
    store: 'Bluorng D2C',
    price: '₹3,799',
    status: 'LOW STOCK',
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=400&q=80',
    aspect: 'aspect-[3/4]'
  }
];

const BRAND_FITS = [
  { brand: 'Zara', recommendedSize: 'M', fitNote: 'European slim shoulder cut' },
  { brand: 'H&M', recommendedSize: 'S', fitNote: 'Scandinavian relaxed body (+1 size)' },
  { brand: 'Westside', recommendedSize: 'L', fitNote: 'Indian comfort drape' },
  { brand: 'Bluorng', recommendedSize: 'M', fitNote: 'Signature exaggerated boxy drape' },
];

export default function WardrobeIntelligence() {
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(0);

  const activeFit = BRAND_FITS[selectedBrandIndex];

  return (
    <section id="wardrobe" className="py-24 md:py-36 px-6 bg-theme-surface text-theme-text border-t border-theme-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02]"></span>
              <span className="text-xs uppercase tracking-widest text-[#FF6B02] font-mono font-bold">
                06 — WARDROBE INTELLIGENCE
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight leading-[0.95]">
              ONE DIGITAL BOARD.<br />
              <span className="text-theme-muted">ZERO SIZE DOUBT.</span>
            </h2>
          </div>

          <p className="text-theme-muted text-sm md:text-base max-w-sm font-normal">
            Cross-store moodboard with AI size normalization across major Indian and global labels.
          </p>
        </div>

        {/* Visual Experience: Left Wardrobe Moodboard / Right Size Normalizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: 3-Item Overlapping Visual Wardrobe */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-5 items-end">
            {WARDROBE_ITEMS.map((item, idx) => (
              <div 
                key={item.id}
                className={`group relative rounded-2xl overflow-hidden border border-theme-border transition-all duration-500 hover:scale-[1.02] shadow-xl ${
                  idx === 1 ? 'translate-y-[-16px] border-[#FF6B02]/40' : ''
                }`}
              >
                <div className={`${item.aspect} overflow-hidden bg-zinc-900`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent opacity-90 pointer-events-none"></div>

                <div className="absolute top-2.5 right-2.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-theme-glass backdrop-blur-md text-[#FF6B02] border border-[#FF6B02]/30 font-bold">
                    {item.status}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] font-mono text-theme-muted uppercase block truncate">
                    {item.store}
                  </span>
                  <p className="text-xs sm:text-sm font-display font-bold text-theme-text truncate">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: AI Size Normalization Simulator */}
          <div className="lg:col-span-5 p-7 sm:p-9 rounded-3xl bg-theme-card border border-theme-border space-y-6 shadow-2xl text-left transition-colors duration-200">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF6B02] block mb-1 font-bold">
                MEASUREMENT TRANSLATOR
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-theme-text">
                Your Size Normalized
              </h3>
            </div>

            {/* Brand Switcher Pills */}
            <div className="grid grid-cols-4 gap-2">
              {BRAND_FITS.map((item, idx) => (
                <button
                  key={item.brand}
                  onClick={() => setSelectedBrandIndex(idx)}
                  className={`py-2 px-1 rounded-xl text-xs font-mono uppercase tracking-wider transition-all text-center ${
                    selectedBrandIndex === idx
                      ? 'bg-[#FF6B02] text-[#020108] font-bold shadow-md shadow-[#FF6B02]/25'
                      : 'bg-theme-surface text-theme-muted hover:text-theme-text border border-theme-border'
                  }`}
                >
                  {item.brand}
                </button>
              ))}
            </div>

            {/* Normalized Result Card */}
            <div className="p-5 rounded-2xl bg-theme-elevated border border-theme-border flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-theme-muted uppercase block">
                  IN {activeFit.brand.toUpperCase()} ORDER
                </span>
                <span className="text-2xl sm:text-3xl font-display font-black text-theme-text mt-0.5 block">
                  SIZE {activeFit.recommendedSize}
                </span>
                <span className="text-[11px] font-mono text-[#FF6B02] font-bold mt-1 block">
                  {activeFit.fitNote}
                </span>
              </div>

              <div className="w-12 h-12 rounded-2xl bg-[#FF6B02]/15 border border-[#FF6B02]/30 flex items-center justify-center font-mono font-bold text-lg text-[#FF6B02]">
                {activeFit.recommendedSize}
              </div>
            </div>

            <p className="text-xs font-mono text-theme-muted italic">
              Normalized from 38&quot; Chest / 31&quot; Waist body measurements.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
