import React, { useState } from 'react';
import y2kCyber from '../assets/drop/y2k-cyber.jpg';
import quietLuxury from '../assets/drop/quiet-luxury.png';
import ethnicEdits from '../assets/drop/ethnic-edits.jpg';

const MOODS = [
  {
    id: 'gorp',
    title: 'ETHNIC EDITS',
    image: ethnicEdits,
    alt: 'Ethnic and festive wear fashion editorial',
    tag: 'FESTIVE WEAR',
    width: 'w-72 sm:w-80 md:w-96',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'quiet',
    title: 'QUIET LUXURY',
    image: quietLuxury,
    alt: 'Quiet luxury cashmere and linen fashion editorial',
    tag: 'LINEN & CASHMERE',
    width: 'w-80 sm:w-96 md:w-[420px]',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'y2k',
    title: 'Y2K CYBER',
    image: y2kCyber,
    alt: 'Y2K cyber fashion editorial',
    tag: 'ARCHIVE DENIM',
    width: 'w-72 sm:w-80 md:w-96',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 'street',
    title: 'STREETWEAR',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop',
    alt: 'Streetwear heavyweight fleece fashion editorial',
    tag: 'HEAVYWEIGHT FLEECE',
    width: 'w-80 sm:w-96 md:w-[400px]',
    aspect: 'aspect-[1/1]',
  }
];

export default function TheDrop() {
  const [failedImages, setFailedImages] = useState({});

  const handleImageError = (id) => {
    setFailedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="drop" className="py-24 md:py-36 pl-6 md:pl-12 lg:pl-24 bg-theme-bg text-theme-text overflow-hidden border-t border-theme-border transition-colors duration-200">
      <div className="max-w-7xl mx-auto mb-12 pr-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-left">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02]"></span>
            <span className="text-xs uppercase tracking-widest text-[#FF6B02] font-mono font-bold">
              05 — THE DROP
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-display tracking-tight leading-[0.95]">
            THE DROP.
          </h2>
        </div>

        <p className="text-xs font-mono text-theme-muted uppercase tracking-wider">
          HORIZONTAL SCROLL / DRAG ➔
        </p>
      </div>
      
      {/* Horizontal Snap Visual Sequence with Varied Aspect Ratios */}
      <div 
        className="flex gap-5 md:gap-8 overflow-x-auto snap-x snap-mandatory pr-6 md:pr-12 lg:pr-24 pb-8 -ml-6 md:-ml-12 lg:-ml-24 pl-6 md:pl-12 lg:pl-24 no-scrollbar items-end"
      >
        {MOODS.map((mood) => (
          <div 
            key={mood.id}
            className={`group relative flex-none ${mood.width} ${mood.aspect} rounded-3xl overflow-hidden snap-start cursor-pointer transform transition-all duration-500 hover:scale-[1.015] border border-theme-border hover:border-[#FF6B02]/50 shadow-2xl bg-theme-surface`}
          >
            <div className="absolute inset-0 overflow-hidden bg-zinc-900">
              {failedImages[mood.id] ? (
                /* Sophisticated NAVAYR Fallback Surface (Never shows broken image icon) */
                <div className="w-full h-full bg-gradient-to-br from-[#121020] via-[#1a172e] to-[#020108] flex flex-col items-center justify-center p-6 text-center select-none">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6B02]/15 border border-[#FF6B02]/40 flex items-center justify-center text-[#FF6B02] mb-3 text-lg font-bold">
                    ✦
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#FF6B02] uppercase font-bold">
                    {mood.tag}
                  </span>
                  <span className="text-xl font-display font-black text-theme-text uppercase mt-1">
                    {mood.title}
                  </span>
                  <span className="text-[9px] font-mono text-theme-muted uppercase tracking-wider mt-2">
                    EDITORIAL ARCHIVE
                  </span>
                </div>
              ) : (
                <img 
                  src={mood.image} 
                  alt={mood.alt}
                  onError={() => handleImageError(mood.id)}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter grayscale-[10%]"
                  loading="lazy"
                />
              )}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/25 to-transparent opacity-90 pointer-events-none" />
            
            <div className="absolute top-5 right-5 pointer-events-none">
              <span className="text-[10px] font-mono uppercase tracking-widest bg-theme-glass backdrop-blur-md px-3 py-1 rounded-full text-theme-text border border-theme-border font-bold">
                {mood.tag}
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-left pointer-events-none">
              <h3 className="text-2xl sm:text-3xl font-display font-black text-theme-text tracking-tight uppercase group-hover:text-[#FF6B02] transition-colors">
                {mood.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
