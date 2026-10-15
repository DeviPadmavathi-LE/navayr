import React, { useState } from 'react';

export default function NeverOverpay() {
  const [targetPrice, setTargetPrice] = useState(2800);
  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      const elPos = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elPos - 85, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="never-overpay" 
      className="relative py-12 md:py-16 lg:py-20 min-h-[82vh] flex items-center bg-theme-bg text-theme-text border-t border-theme-border transition-colors duration-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Single Balanced 2-Column Layout that fits completely in one screen */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14">
          
          {/* Left Column: Heading, Subtitle, Mini Steps, & CTA */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
            
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02] animate-pulse"></span>
              <span className="text-xs font-mono tracking-widest text-[#FF6B02] uppercase font-bold">
                03 — NEVER OVERPAY
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-theme-text leading-[0.95] tracking-tight uppercase mb-4">
              SAME DRIP.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B02] to-[#FF9E4D]">
                LESS CASH.
              </span>
            </h2>

            {/* Minimal Gen-Z Subtext */}
            <p className="text-theme-muted text-sm sm:text-base font-normal max-w-md leading-relaxed mb-6">
              Never pay full retail markup again. Save any fit, designer anarkali, or archive grail from brand flagships and verified ateliers—we ping your WhatsApp the second the price drops.
            </p>

            {/* 3 Compact Inline Steps */}
            <div className="grid grid-cols-3 gap-2.5 w-full max-w-lg mb-8">
              <div className="p-3 rounded-2xl bg-theme-surface border border-theme-border text-left">
                <span className="text-[10px] font-mono text-[#FF6B02] font-bold block mb-0.5">01</span>
                <span className="font-display font-bold text-xs text-theme-text block leading-snug">Save fit</span>
                <span className="text-[10px] text-theme-muted font-mono block">Any store link</span>
              </div>

              <div className="p-3 rounded-2xl bg-theme-surface border border-theme-border text-left">
                <span className="text-[10px] font-mono text-[#FF6B02] font-bold block mb-0.5">02</span>
                <span className="font-display font-bold text-xs text-theme-text block leading-snug">Name price</span>
                <span className="text-[10px] text-theme-muted font-mono block">24/7 drop radar</span>
              </div>

              <div className="p-3 rounded-2xl bg-theme-surface border border-theme-border text-left">
                <span className="text-[10px] font-mono text-[#FF6B02] font-bold block mb-0.5">03</span>
                <span className="font-display font-bold text-xs text-theme-text block leading-snug">Cop on drop</span>
                <span className="text-[10px] text-theme-muted font-mono block">WhatsApp alert</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={scrollToWaitlist}
              className="bg-[#FF6B02] hover:bg-[#FF7D1E] text-[#020108] px-8 py-3.5 rounded-full font-mono font-black uppercase text-xs tracking-widest transition-all shadow-md shadow-[#FF6B02]/25 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Get Price Drop Alerts</span>
              <span>→</span>
            </button>
          </div>

          {/* Right Column: Balanced & Proportionate Interactive Alert Card */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="w-full max-w-sm lg:max-w-[390px] rounded-3xl border border-theme-border bg-theme-surface p-4 sm:p-5 shadow-2xl space-y-3 text-left">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-theme-border">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B02] animate-pulse"></span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF6B02]">
                    LIVE DROP RADAR
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase text-[#FF6B02] font-bold px-2 py-0.5 rounded bg-[#FF6B02]/10 border border-[#FF6B02]/30">
                  DESIGNER ATELIER ARCHIVE
                </span>
              </div>

              {/* Product Visual + Clean Price Bar (Full Dress Clearly Visible) */}
              <div className="relative rounded-2xl overflow-hidden h-60 sm:h-64 bg-black border border-theme-border group">
                <img 
                  src="/images/pink_anarkali_kurta_focused.png" 
                  alt="Raw Silk Mirrorwork Anarkali Kurta Set" 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none"></div>

                <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                  <div>
                    <h4 className="text-white font-display font-bold text-xs sm:text-sm leading-tight drop-shadow-md">
                      Mirrorwork Anarkali Kurta Set
                    </h4>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-[#FF6B02] font-display font-black text-base sm:text-lg drop-shadow-md">
                        ₹2,800
                      </span>
                      <span className="text-[11px] font-mono text-zinc-300 line-through">
                        ₹8,000
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-[#FF6B02] text-[#020108] shadow-md">
                    -65% OFF
                  </span>
                </div>
              </div>

              {/* Minimal Target Price Slider (0 - 8k) */}
              <div className="space-y-1 pt-0.5">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-theme-muted text-[11px]">Alert me below:</span>
                  <span className="font-display font-black text-[#FF6B02] text-sm">
                    ₹{Number(targetPrice).toLocaleString('en-IN')}
                  </span>
                </div>

                <input
                  type="range"
                  min={0}
                  max={8000}
                  step={250}
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  className="w-full accent-[#FF6B02] cursor-pointer h-1.5 bg-theme-border rounded-lg"
                />

                <div className="flex justify-between text-[10px] font-mono text-theme-muted">
                  <span>Min: ₹0</span>
                  <span>Retail: ₹8,000</span>
                </div>
              </div>

              {/* WhatsApp Notification Pill */}
              <div className="p-2.5 rounded-xl bg-theme-card border border-theme-border space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#25D366] font-bold text-[11px]">
                    <span>💬</span>
                    <span>WhatsApp Alert</span>
                  </div>
                  <span className="text-[10px] text-theme-muted">Just now</span>
                </div>
                <p className="text-[11px] sm:text-xs text-theme-text font-medium leading-snug">
                  &ldquo;⚡ Price drop! <strong>Mirrorwork Anarkali Kurta Set</strong> just dropped to <strong>₹2,800</strong>. Tap to cop.&rdquo;
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
