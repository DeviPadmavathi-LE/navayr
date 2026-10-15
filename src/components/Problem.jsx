import React, { useEffect, useRef, useState } from 'react';

export default function Problem() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section id="problem" className="py-32 md:py-48 px-6 bg-theme-surface text-theme-text overflow-hidden transition-colors duration-200 border-t border-theme-border">
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto flex flex-col items-start justify-center min-h-[48vh]"
      >
        <div className="space-y-6 md:space-y-8 text-left max-w-5xl">
          
          {/* Section Label */}
          <div className="flex items-center justify-start gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02]"></span>
            <span className="text-xs uppercase tracking-widest text-[#FF6B02] font-mono font-bold">
              02 — THE PROBLEM
            </span>
          </div>

          {/* Main 4 Statements - Vertical Autoscroll */}
          <h2 className="font-display font-black tracking-tight text-[8vw] sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.92] mb-12 relative overflow-hidden h-[3.8em]">
            <div className={`transition-all duration-1000 transform motion-reduce:transition-none motion-reduce:transform-none ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} delay-100 h-full`}>
              <div className="flex flex-col animate-marquee-up">
                
                {/* First Set */}
                <div className="flex flex-col pb-4">
                  <span className="whitespace-nowrap">TOO MUCH GUESSING.</span>
                  <span className="whitespace-nowrap text-theme-muted">TOO MANY TABS.</span>
                  <span className="whitespace-nowrap">TOO MANY PRICES.</span>
                  <span className="whitespace-nowrap text-theme-muted">TOO MANY WEBSITES.</span>
                </div>
                
                {/* Duplicate Set for Seamless Loop */}
                <div className="flex flex-col pb-4">
                  <span className="whitespace-nowrap">TOO MUCH GUESSING.</span>
                  <span className="whitespace-nowrap text-theme-muted">TOO MANY TABS.</span>
                  <span className="whitespace-nowrap">TOO MANY PRICES.</span>
                  <span className="whitespace-nowrap text-theme-muted">TOO MANY WEBSITES.</span>
                </div>

              </div>
            </div>

          </h2>
          
          {/* Distinctive Orange-Gradient Editorial Visual Statement */}
          <div className={`transition-all duration-1000 transform motion-reduce:transition-none motion-reduce:transform-none ${isVisible ? 'translate-y-0 opacity-100 filter-none' : 'translate-y-6 opacity-0 blur-sm'} delay-700`}>
            <p className="text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight leading-tight">
              <span className="text-theme-text">ONLINE SHOPPING IS </span>
              <span className="font-editorial italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B02] via-[#FF852E] to-[#FFB066] drop-shadow-[0_0_25px_rgba(255,107,2,0.25)]">
                broken.
              </span>
            </p>

            <p className="text-xs sm:text-sm font-mono text-theme-muted uppercase tracking-widest mt-4">
              NAVAYR BRINGS FASHION DISCOVERY INTO ONE PLACE
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-marquee-up {
          animation: marquee-up 12s linear infinite;
        }
      `}</style>
    </section>
  );
}
