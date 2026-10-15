import React, { useState } from 'react';

const FILTER_TABS = ['ALL', 'SIMILAR', 'MATCHES', 'ALTERNATIVES', 'NEW', 'PRE-LOVED'];

const DISCOVERY_ITEMS = [
  {
    id: 1,
    title: 'Boxy Cropped Leather',
    category: 'MATCHES',
    type: 'NEW',
    price: '₹4,999',
    match: '99%',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=500&q=80',
    tag: 'EXACT FIT'
  },
  {
    id: 2,
    title: 'Archival Distressed Moto',
    category: 'SIMILAR',
    type: 'PRE-LOVED',
    price: '₹2,199',
    match: '94%',
    image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=500&q=80',
    tag: 'SAVE 56%'
  },
  {
    id: 3,
    title: 'Raw Hem Waxed Jacket',
    category: 'ALTERNATIVES',
    type: 'PRE-LOVED',
    price: '₹1,850',
    match: '91%',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=500&q=80',
    tag: 'VINTAGE'
  },
  {
    id: 4,
    title: 'Minimalist Utility Bomber',
    category: 'MATCHES',
    type: 'NEW',
    price: '₹3,799',
    match: '96%',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=500&q=80',
    tag: 'D2C STUDIO'
  }
];

export default function Discovery() {
  const [activeTab, setActiveTab] = useState('ALL');

  const filtered = activeTab === 'ALL'
    ? DISCOVERY_ITEMS
    : DISCOVERY_ITEMS.filter(item => 
        item.category === activeTab || item.type === activeTab
      );

  return (
    <section id="discovery" className="py-24 md:py-36 px-6 bg-theme-surface text-theme-text border-t border-theme-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6 text-left">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02]"></span>
              <span className="text-xs uppercase tracking-widest text-[#FF6B02] font-mono font-bold">
                04 — FIND IT
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase tracking-tight leading-[0.95]">
              SEE SOMETHING YOU LIKE?<br />
              <span className="text-theme-muted">SNAP IT.</span>
            </h2>
          </div>

          <div className="max-w-md space-y-2">
            <p className="text-sm md:text-base text-theme-muted font-normal leading-relaxed">
              Now that NAVAYR understands your style, where can you actually find it? NAVAYR maps the look across retail flagships, indie D2C labels, and pre-loved archives.
            </p>
          </div>
        </div>

        {/* Visual Showcase: Inspiration image with detection markers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Main Visual with Detection Tags */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden aspect-[4/5] border border-theme-border group bg-theme-card shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80"
              alt="Street style inspiration"
              className="w-full h-full object-cover grayscale-[15%] group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent opacity-90"></div>

            {/* Subtle detection markers with #FF6B02 pulse */}
            <div className="absolute top-1/4 left-1/3 bg-theme-glass backdrop-blur-md border border-theme-border px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02] animate-ping"></span>
              <span className="text-[11px] font-mono tracking-wider uppercase text-theme-text font-bold">
                CROPPED SILHOUETTE
              </span>
            </div>

            <div className="absolute bottom-1/3 right-1/4 bg-theme-glass backdrop-blur-md border border-theme-border px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02]"></span>
              <span className="text-[11px] font-mono tracking-wider uppercase text-theme-text font-bold">
                HEAVYWEIGHT COTTON
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-left">
              <p className="text-xs font-mono text-theme-muted uppercase tracking-wider">
                INPUT / INSTAGRAM FEED
              </p>
              <p className="text-sm font-display font-bold text-theme-text mt-0.5">
                Target detected in 118ms
              </p>
            </div>
          </div>

          {/* Right: Reveal Tabs & Visual Discovery Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 pb-2">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                    activeTab === tab
                      ? 'bg-[#FF6B02] text-[#020108] font-bold shadow-md shadow-[#FF6B02]/25'
                      : 'bg-theme-card text-theme-muted hover:text-theme-text hover:bg-theme-elevated border border-theme-border'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-3xl bg-theme-card border border-theme-border hover:border-[#FF6B02]/50 transition-all duration-300 group cursor-pointer text-left shadow-lg"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3 bg-zinc-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-theme-glass backdrop-blur-md text-[#FF6B02] font-bold border border-[#FF6B02]/30">
                      {item.tag}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display font-bold text-sm text-theme-text group-hover:text-[#FF6B02] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs font-mono text-theme-muted mt-0.5">
                        {item.type} • {item.price}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[#FF6B02] font-bold shrink-0">
                      {item.match}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
