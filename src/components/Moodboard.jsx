import React, { useState } from 'react';

const MOODBOARD_ITEMS = [
  {
    id: 'mb-1',
    category: 'STREETWEAR',
    source: 'Instagram Screenshot',
    match: '99% Match Found',
    title: 'Vintage Boxy Layered Fit',
    tags: ['Heavyweight Tee', 'Cargo Archive', 'Red Cap'],
    image: '/images/moodboard2.png',
  },
  {
    id: 'mb-2',
    category: 'MINIMAL CHIC',
    source: 'Pinterest Pin',
    match: '97% Match Found',
    title: 'Silk Slip Dress & Blazer',
    tags: ['Tailored Wool', 'Slip Dress', 'Warm Minimal'],
    image: '/images/moodboard3.png',
  },
  {
    id: 'mb-3',
    category: 'Y2K ARCHIVE',
    source: 'Camera Roll Inspo',
    match: '95% Match Found',
    title: 'Oversized Crewneck Edit',
    tags: ['Heather Grey', 'Cotton Fleece', 'Vintage Tape'],
    image: '/images/moodboard4.jpg',
  }
];

export default function Moodboard() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      const elPos = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elPos - 85, behavior: 'smooth' });
    }
  };

  const filteredItems = activeCategory === 'ALL'
    ? MOODBOARD_ITEMS
    : MOODBOARD_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="moodboard" className="py-20 md:py-32 px-6 bg-theme-surface text-theme-text border-t border-theme-border transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-8 text-left">
          <div className="max-w-2xl">
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02] animate-pulse"></span>
              <span className="text-xs font-mono tracking-widest text-[#FF6B02] uppercase font-bold">
                07 — YOUR MOODBOARD
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-theme-text leading-[0.95] tracking-tight mb-4 uppercase">
              Dump your inspo.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B02] to-[#FF9E4D]">
                We find the fits.
              </span>
            </h2>

            <p className="text-theme-muted text-sm sm:text-base font-normal max-w-xl leading-relaxed">
              Drop your screenshots, TikTok saves, or Pinterest boards. NAVAYR's vision AI breaks down every layer and hunts down the exact pieces (or affordable archive dupes) so you can actually cop them. No more gatekeeping.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button 
              onClick={scrollToWaitlist}
              className="bg-[#FF6B02] hover:bg-[#FF7D1E] text-[#020108] px-8 py-4 rounded-full font-mono font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-[#FF6B02]/25 active:scale-95 flex items-center gap-2"
            >
              <span>Start Your Board</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Inspo Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 justify-start">
          {['ALL', 'STREETWEAR', 'MINIMAL CHIC', 'Y2K ARCHIVE'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                activeCategory === cat
                  ? 'bg-[#FF6B02] text-[#020108] font-bold shadow-md shadow-[#FF6B02]/20'
                  : 'bg-theme-card text-theme-muted hover:text-theme-text border border-theme-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Clean, Non-Overlapping Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch text-left">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden border border-theme-border bg-theme-card transition-all duration-300 hover:border-[#FF6B02]/60 hover:shadow-2xl hover:-translate-y-1 flex flex-col"
            >
              {/* Image Container with Proper Aspect Ratio (Zero Overlapping) */}
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Subtle Clean Bottom Gradient for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-theme-card via-transparent to-transparent opacity-80 pointer-events-none"></div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#020108]/85 text-[#FF6B02] border border-[#FF6B02]/30 backdrop-blur-md">
                    {item.source}
                  </span>

                  <span className="text-[10px] font-mono font-black uppercase px-2.5 py-1.5 rounded-full bg-[#FF6B02] text-[#020108] shadow-md">
                    {item.match}
                  </span>
                </div>
              </div>

              {/* Card Meta Content Box */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#FF6B02] uppercase tracking-widest font-bold block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-display font-black text-xl text-theme-text group-hover:text-[#FF6B02] transition-colors leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Recognized Style Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-theme-surface border border-theme-border text-theme-muted"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Action Prompt */}
                <div className="pt-3 border-t border-theme-border flex items-center justify-between text-xs font-mono text-theme-muted">
                  <span>AI Breakdown Ready</span>
                  <span className="text-[#FF6B02] font-bold group-hover:translate-x-1 transition-transform">
                    Find Fits →
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Upload Dropzone CTA Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme-border flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#FF6B02] uppercase tracking-widest font-bold block">
              INSTANT MOODBOARD SCANNER
            </span>
            <h4 className="font-display font-black text-xl sm:text-2xl text-theme-text">
              Have a style screenshot saved on your phone?
            </h4>
            <p className="text-xs font-mono text-theme-muted">
              Upload any outfit photo. NAVAYR matches silhouette, fabric, and finds exact links in under 3 seconds.
            </p>
          </div>

          <button
            onClick={scrollToWaitlist}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-theme-surface border border-[#FF6B02] text-[#FF6B02] hover:bg-[#FF6B02] hover:text-[#020108] text-xs font-mono font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2"
          >
            <span>+ Upload Screenshot</span>
          </button>
        </div>

      </div>
    </section>
  );
}
