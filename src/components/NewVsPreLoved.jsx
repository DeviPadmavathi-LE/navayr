import React, { useState } from 'react';

export default function NewVsPreLoved() {
  const [activeMode, setActiveMode] = useState('split'); // 'split', 'new', 'preloved'

  return (
    <section id="pre-loved" className="py-24 md:py-36 px-6 bg-theme-surface text-theme-text border-t border-theme-border transition-colors duration-200">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Section Label */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02]"></span>
          <span className="text-xs uppercase tracking-widest text-[#FF6B02] font-mono font-bold">
            05 — NEW &times; PRE-LOVED
          </span>
        </div>

        {/* Huge Bold Editorial Headline */}
        <h2 className="text-5xl sm:text-7xl lg:text-9xl font-display font-black tracking-tighter uppercase mb-6 flex flex-col items-center justify-center leading-[0.88]">
          <span>NEW &times;</span>
          <span className="text-[#FF6B02] font-editorial italic font-normal lowercase tracking-normal">
            pre-loved.
          </span>
        </h2>

        {/* Minimal Mode Switcher */}
        <div className="inline-flex p-1 rounded-full bg-theme-card border border-theme-border mb-14 text-xs font-mono">
          <button
            onClick={() => setActiveMode('split')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeMode === 'split' ? 'bg-[#FF6B02] text-[#020108] font-bold shadow-md shadow-[#FF6B02]/20' : 'text-theme-muted hover:text-theme-text'
            }`}
          >
            SPLIT COMPARISON
          </button>
          <button
            onClick={() => setActiveMode('new')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeMode === 'new' ? 'bg-[#FF6B02] text-[#020108] font-bold shadow-md shadow-[#FF6B02]/20' : 'text-theme-muted hover:text-theme-text'
            }`}
          >
            NEW ONLY
          </button>
          <button
            onClick={() => setActiveMode('preloved')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              activeMode === 'preloved' ? 'bg-[#FF6B02] text-[#020108] font-bold shadow-md shadow-[#FF6B02]/20' : 'text-theme-muted hover:text-theme-text'
            }`}
          >
            PRE-LOVED ONLY
          </button>
        </div>

        {/* Side by Side Visual Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto mb-12">
          
          {/* Brand New Card */}
          {(activeMode === 'split' || activeMode === 'new') && (
            <div 
              className={`relative rounded-3xl overflow-hidden border border-theme-border bg-theme-card transition-all duration-500 cursor-pointer text-left shadow-2xl ${
                activeMode === 'new' ? 'sm:col-span-2 max-w-md mx-auto w-full' : ''
              } hover:border-theme-border-strong`}
            >
              <div className="aspect-[3/4] overflow-hidden bg-zinc-900">
                <img 
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=700&q=80" 
                  alt="Brand New Tailored Coat" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent opacity-90 pointer-events-none"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block text-[11px] font-mono tracking-widest text-theme-muted uppercase mb-1">
                  RETAIL STOREFRONT
                </span>
                <p className="text-2xl sm:text-3xl font-display font-bold text-theme-text">₹3,999</p>
                <span className="text-[10px] font-mono text-theme-muted block mt-1">Condition: Brand New with Tags</span>
              </div>
            </div>
          )}

          {/* Pre-Loved Card */}
          {(activeMode === 'split' || activeMode === 'preloved') && (
            <div 
              className={`relative rounded-3xl overflow-hidden border border-[#FF6B02]/50 bg-theme-card ring-1 ring-[#FF6B02]/20 transition-all duration-500 cursor-pointer text-left shadow-2xl ${
                activeMode === 'preloved' ? 'sm:col-span-2 max-w-md mx-auto w-full' : ''
              } hover:border-[#FF6B02]`}
            >
              <div className="aspect-[3/4] overflow-hidden bg-zinc-900">
                <img 
                  src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=80" 
                  alt="Pre-Loved Vintage Archival Jacket" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 filter contrast-110"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-transparent to-transparent opacity-90 pointer-events-none"></div>
              
              {/* Savings Badge */}
              <div className="absolute top-4 right-4">
                <span className="inline-block bg-[#FF6B02] text-[#020108] text-[11px] font-mono font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md shadow-[#FF6B02]/30">
                  SAVE 55%
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block text-[11px] font-mono tracking-widest text-[#FF6B02] uppercase font-bold mb-1">
                  VERIFIED PRE-LOVED ARCHIVE
                </span>
                <p className="text-2xl sm:text-3xl font-display font-bold text-theme-text">₹1,799</p>
                <span className="text-[10px] font-mono text-theme-muted block mt-1">Condition: Grade A (Light Patina)</span>
              </div>
            </div>
          )}

        </div>

        {/* Minimal Editorial Subline */}
        <p className="text-lg md:text-xl text-theme-muted font-editorial italic font-normal tracking-wide">
          Same taste. Less waste.
        </p>

      </div>
    </section>
  );
}
