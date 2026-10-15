import React from 'react';

export default function Partnership({ onPartnerClick }) {
  return (
    <section id="partnership" className="relative py-24 bg-theme-bg transition-colors">
      <div className="max-w-[1050px] mx-auto px-6">
        
        {/* Section Label */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-[#FF6B02] uppercase font-bold">
            <span className="mr-2">●</span> 09 — PARTNERSHIP
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center bg-[#FAF9F6] dark:bg-[#1A1A1A] rounded-[2rem] overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 w-[95%] max-w-[1300px] mx-auto md:h-[480px]">
          
          {/* Left Image Section - Maintained tall aspect by reducing width % */}
          <div className="w-full md:w-[40%] bg-[#064253] relative h-[400px] md:h-full shrink-0">
            <img 
              src="/images/partnership_woman.jpg" 
              alt="Brand Partnership"
              className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
            />
          </div>

          {/* Right Content Section - Elegant typography */}
          <div className="w-full md:w-[60%] flex flex-col justify-center items-start p-8 md:p-16 lg:p-24">
            
            <p className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-[#FF6B02] uppercase mb-6 font-bold">
              FOR BRANDS
            </p>
            
            <h2 className="text-5xl md:text-6xl lg:text-[72px] font-display font-medium text-[#1A1A1A] dark:text-white leading-[1.05] tracking-tight mb-6">
              Post fits.<br/>
              <span className="text-theme-muted font-normal">Get traffic.</span>
            </h2>

            <p className="text-theme-muted text-lg md:text-xl font-medium mb-10 max-w-lg leading-relaxed">
              Zero ads. Pure organic reach.
            </p>
            
            <button 
              onClick={onPartnerClick}
              className="bg-[#FF6B02] hover:bg-[#e66002] text-[#111111] font-black text-[10px] md:text-xs tracking-[0.2em] uppercase py-4 px-10 rounded-full transition-all flex items-center gap-3 shadow-[0_15px_30px_-5px_rgba(255,107,2,0.3)] hover:-translate-y-1">
              PULL TRAFFIC
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </button>
            
          </div>
          
        </div>

      </div>
    </section>
  );
}
