import React from 'react';
import { Check, X, Sparkles, ArrowRight } from 'lucide-react';

export default function Comparison() {
  const scrollToWaitlist = () => {
    const el = document.getElementById('waitlist');
    if (el) {
      const navOffset = 85;
      const elPos = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elPos - navOffset,
        behavior: 'smooth'
      });
    }
  };

  // Pure Gen-Z Ocla-inspired punchy comparison statements (NO redundant subheadings!)
  const comparisonData = [
    {
      shortName: "Price Drops",
      navayr: { text: "Instant WhatsApp ping when price drops. Never pay retail.", status: "pass" },
      chatbot: { text: "Knows price ranges & brand lore (zero live drop radar).", status: "pass" },
      visualAi: { text: "Static photo match only. Zero price tracking.", status: "fail" }
    },
    {
      shortName: "True Fit",
      navayr: { text: "Zara M = Uniqlo S. Zero return drama.", status: "pass" },
      chatbot: { text: "Generic size charts. Doesn't know cut variations.", status: "fail" },
      visualAi: { text: "Blind to how clothes actually fit or drape.", status: "fail" }
    },
    {
      shortName: "Photo Snap",
      navayr: { text: "Drop any IG fit. Finds silhouette & archive twins.", status: "pass" },
      chatbot: { text: "Text-only. Can't inspect fabric drape or cut.", status: "fail" },
      visualAi: { text: "Fast photo reverse-search & exact product lookup.", status: "pass" }
    },
    {
      shortName: "Fit Ideas",
      navayr: { text: "Freddy cooks up curated fits matching your aesthetic daily.", status: "pass" },
      chatbot: { text: "Great for wild brainstorming, moodboards & fit advice.", status: "pass" },
      visualAi: { text: "Zero dialogue or personal styling context.", status: "fail" }
    },
    {
      shortName: "Thrift Twins",
      navayr: { text: "Auto-finds vintage/thrift grails for 50–70% less.", status: "pass" },
      chatbot: { text: "Hallucinates dead links & out-of-stock items.", status: "fail" },
      visualAi: { text: "Finds similar photos, but pushes brand-new stock.", status: "partial" }
    },
    {
      shortName: "Clean Feed",
      navayr: { text: "Pure intent. 0 ads. 0 sponsored junk.", status: "pass" },
      chatbot: { text: "Clean, ad-free text interface.", status: "pass" },
      visualAi: { text: "60% of results are sponsored marketplace ads.", status: "fail" }
    }
  ];

  const renderStatusIcon = (status) => {
    if (status === 'pass') {
      return (
        <span className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
          <Check size={10} strokeWidth={3} />
        </span>
      );
    }
    if (status === 'partial') {
      return (
        <span className="w-4 h-4 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
          ~
        </span>
      );
    }
    return (
      <span className="w-4 h-4 rounded-full bg-red-500/10 text-red-400/80 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
        <X size={10} strokeWidth={2.5} />
      </span>
    );
  };

  return (
    <section 
      id="comparison" 
      className="relative py-14 md:py-20 px-4 sm:px-6 bg-theme-surface text-theme-text border-t border-theme-border transition-colors duration-200 overflow-hidden"
    >
      {/* Subtle ambient glow behind NAVAYR */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#FF6B02]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header - Punchy & Editorial */}
        <div className="text-center max-w-xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FF6B02]/10 border border-[#FF6B02]/30 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02] animate-pulse"></span>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#FF6B02] uppercase font-bold">
              08 — THE AI DIFFERENCE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight uppercase leading-[0.95] mb-3">
            BUILT FOR FIT.<br />
            <span className="text-[#FF6B02]">NOT GENERAL CHAT.</span>
          </h2>

          <p className="text-theme-muted text-xs sm:text-sm font-normal max-w-md mx-auto">
            Chatbots write text. Image tools match pixels. NAVAYR actually understands fits, sizing, and price drops.
          </p>
        </div>

        {/* 3-COLUMN PUNCHY CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          
          {/* COLUMN 1: NAVAYR (Featured Column) */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-theme-card border-2 border-[#FF6B02] p-5 sm:p-6 shadow-[0_15px_40px_rgba(255,107,2,0.16)] flex flex-col justify-between">
            <div className="absolute -top-3 left-5 px-3 py-0.5 rounded-full bg-[#FF6B02] text-[#020108] text-[9px] font-mono font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles size={10} className="fill-current" />
              <span>THE FASHION AGENT</span>
            </div>

            <div>
              {/* Header */}
              <div className="pb-4 border-b border-[#FF6B02]/25 mb-4 pt-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-display font-black text-theme-text tracking-tight uppercase">
                    NAVAYR
                  </h3>
                  <span className="text-[9px] font-mono text-[#FF6B02] font-bold px-2 py-0.5 rounded-full bg-[#FF6B02]/10 border border-[#FF6B02]/30">
                    6 / 6 ALL PASS
                  </span>
                </div>
                <p className="text-[11px] font-mono text-theme-muted uppercase tracking-wider mt-0.5">
                  Autonomous Style & Drop Radar
                </p>
              </div>

              {/* 6 Direct Punchy Points */}
              <ul className="space-y-3">
                {comparisonData.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 py-1 text-left border-b border-theme-border/20 last:border-0">
                    {renderStatusIcon(item.navayr.status)}
                    <span className="text-xs sm:text-[13px] font-bold text-theme-text leading-snug">
                      {item.navayr.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom CTA */}
            <div className="pt-4 mt-4 border-t border-[#FF6B02]/20">
              <button
                onClick={scrollToWaitlist}
                className="w-full py-2.5 px-4 rounded-full bg-[#FF6B02] hover:bg-[#FF852E] text-[#020108] font-mono font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-[#FF6B02]/25 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
              >
                <span>Join Early VIP Access</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* COLUMN 2: General Chatbot AI */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-theme-card/70 border border-theme-border p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="pb-4 border-b border-theme-border mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-bold text-theme-text tracking-tight uppercase">
                    General AI
                  </h3>
                  <span className="text-[9px] font-mono text-emerald-500 uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-bold">
                    3 / 6 PASS
                  </span>
                </div>
                <p className="text-[11px] font-mono text-theme-muted uppercase tracking-wider mt-0.5">
                  ChatGPT • Claude • Gemini
                </p>
              </div>

              {/* 6 Direct Punchy Points */}
              <ul className="space-y-3">
                {comparisonData.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 py-1 text-left border-b border-theme-border/20 last:border-0">
                    {renderStatusIcon(item.chatbot.status)}
                    <span className={`text-xs sm:text-[13px] leading-snug ${
                      item.chatbot.status === 'pass' 
                        ? 'text-theme-text font-bold' 
                        : item.chatbot.status === 'partial' 
                        ? 'text-amber-500/90 font-medium' 
                        : 'text-theme-muted font-normal'
                    }`}>
                      {item.chatbot.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Summary Pill */}
            <div className="pt-4 mt-4 border-t border-theme-border">
              <div className="py-2 px-3 rounded-xl bg-theme-surface border border-theme-border text-center">
                <p className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                  Great for brainstorming & lore • No live radar
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 3: Visual Search AI */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-theme-card/70 border border-theme-border p-5 sm:p-6 shadow-sm flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="pb-4 border-b border-theme-border mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-bold text-theme-text tracking-tight uppercase">
                    Google Lens
                  </h3>
                  <span className="text-[9px] font-mono text-emerald-500 uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-bold">
                    2 / 6 PASS
                  </span>
                </div>
                <p className="text-[11px] font-mono text-theme-muted uppercase tracking-wider mt-0.5">
                  Pinterest AI & Visual Lookup
                </p>
              </div>

              {/* 6 Direct Punchy Points */}
              <ul className="space-y-3">
                {comparisonData.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 py-1 text-left border-b border-theme-border/20 last:border-0">
                    {renderStatusIcon(item.visualAi.status)}
                    <span className={`text-xs sm:text-[13px] leading-snug ${
                      item.visualAi.status === 'pass' 
                        ? 'text-theme-text font-bold' 
                        : item.visualAi.status === 'partial' 
                        ? 'text-amber-500/90 font-medium' 
                        : 'text-theme-muted font-normal'
                    }`}>
                      {item.visualAi.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Summary Pill */}
            <div className="pt-4 mt-4 border-t border-theme-border">
              <div className="py-2 px-3 rounded-xl bg-theme-surface border border-theme-border text-center">
                <p className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                  Fast photo lookup • Blind to sizing & drops
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
