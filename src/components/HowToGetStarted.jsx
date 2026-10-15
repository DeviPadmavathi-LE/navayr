import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, RefreshCw, Zap, BarChart2, MapPin } from 'lucide-react';

export default function HowToGetStarted() {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  const steps = [
    { num: "01", title: "Zero setup fees", desc: "Plug in via your affiliate network. No BS.", icon: <MapPin size={32} strokeWidth={1.5} /> },
    { num: "02", title: "Set the cut", desc: "You decide the commission.", icon: <TrendingUp size={32} strokeWidth={1.5} /> },
    { num: "03", title: "Quick launch", desc: "We sync your catalog in days.", icon: <RefreshCw size={32} strokeWidth={1.5} /> },
    { num: "04", title: "Go live", desc: "Your pieces drop directly into our search.", icon: <Zap size={32} strokeWidth={1.5} /> },
    { num: "05", title: "Scale up", desc: "Check the metrics. Push what works.", icon: <BarChart2 size={32} strokeWidth={1.5} /> }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = rect.top;
      // Subtract windowHeight so progress hits exactly 1.0 at the end of the scroll container
      const total = rect.height - windowHeight;
      const current = -start;
      
      const progress = Math.min(Math.max(current / total, 0), 1);
      
      // Derive active step strictly based on scroll percentage (0 to length-1)
      const stepIndex = Math.min(Math.floor(progress * steps.length), steps.length - 1);
      setActiveStep(stepIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps.length]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#FAF9F6] dark:bg-[#08060D] h-[500vh] transition-colors duration-200">
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center overflow-hidden">
         
         <div className="w-full max-w-4xl mx-auto px-6 flex flex-col h-[75vh] md:h-[65vh]">
            
            {/* Header & Horizontal Progress */}
            <div className="mb-16 md:mb-24 mt-10 md:mt-0">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-[#1A1A1A] dark:text-[#F7F4EE] tracking-tight mb-16 text-center">
                How to get started
              </h2>

              <div className="relative flex items-center justify-between max-w-3xl mx-auto">
                 {/* Faint Background Line */}
                 <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/10 dark:bg-white/10 -translate-y-1/2 z-0"></div>
                 
                 {/* Active Orange Line */}
                 <div 
                   className="absolute top-1/2 left-0 h-[2px] bg-[#FF6B02] -translate-y-1/2 z-0 transition-all duration-700 ease-out" 
                   style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                 ></div>

                 {/* Step Nodes */}
                 {steps.map((step, i) => (
                    <div 
                      key={i} 
                      className={`relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] bg-[#FAF9F6] dark:bg-[#0D0A12] border-[2px] ${
                        activeStep === i 
                          ? 'border-[#FF6B02] text-[#FF6B02] shadow-[0_0_20px_rgba(255,107,2,0.15)] scale-110' 
                          : activeStep > i 
                            ? 'border-[#FF6B02] text-[#FF6B02] bg-[#FF6B02]/5 scale-100' 
                            : 'border-black/10 dark:border-white/15 text-black/30 dark:text-white/30 scale-100'
                      }`}
                    >
                       <span className="font-mono text-[10px] md:text-[11px] font-bold tracking-wider">{step.num}</span>
                    </div>
                 ))}
              </div>
            </div>

            {/* Dynamic Central Card Display */}
            <div className="relative flex-1">
               {steps.map((step, i) => (
                  <div 
                    key={i} 
                    // Liquid smooth 700ms transition with exactly 20px (translate-y-5) movement and 0.98 scale as requested
                    className={`absolute inset-0 flex flex-col items-center justify-start text-center pt-4 md:pt-10 transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      activeStep === i 
                        ? 'opacity-100 translate-y-0 scale-100 z-10 pointer-events-auto' 
                        : activeStep < i 
                          ? 'opacity-0 translate-y-5 scale-[0.98] z-0 pointer-events-none'
                          : 'opacity-0 -translate-y-5 scale-[0.98] z-0 pointer-events-none'
                    }`}
                  >
                     <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.25rem] bg-white dark:bg-[#15111A] border border-black/5 dark:border-white/10 text-[#FF6B02] flex items-center justify-center mb-8 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.06)] dark:shadow-none">
                        {step.icon}
                     </div>
                     <h3 className="text-3xl md:text-5xl font-display font-medium text-[#1A1A1A] dark:text-[#F7F4EE] mb-4 md:mb-6 tracking-tight">
                        {step.title}
                     </h3>
                     <p className="text-base md:text-xl text-[#7A7463] dark:text-[#8E8A96] max-w-lg mx-auto font-medium leading-relaxed">
                        {step.desc}
                     </p>
                  </div>
               ))}
            </div>

         </div>
      </div>

    </section>
  );
}
