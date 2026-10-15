import React, { useEffect, useState } from 'react';

const images = [
  "/images/discover.png", // 0 - STYLE
  "/images/style.png", // 1 - DISCOVER
  "/images/match.png", // 2 - MATCH
  "/images/shop.png", // 3 - SHOP
  "/images/leather.png", // 4 - TARGET (Leather Jacket)
  "/images/varsity.png", // 5
  "/images/patterned.png", // 6
  "/images/brown.png", // 7
  "/images/man_beige.jpg", // 8
  "/images/new1.jpg", // 9
  "/images/new2.png", // 10
  "/images/new3.png", // 11
  "/images/new4.png", // 12
];

const stage0Text = ["STYLE.", "DISCOVER.", "MATCH.", "SHOP."];

export default function Hero() {
  const [stage, setStage] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [winWidth, setWinWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [highlight, setHighlight] = useState(false);

  // Responsive window tracking
  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Stage sequence loop with dynamic timings
  useEffect(() => {
    let timeout;
    if (stage === 0) {
      // Stage 0: The 4 intro cards
      timeout = setTimeout(() => setStage(1), 2000);
    } else if (stage === 1) {
      // Stage 1: The spinning circle "BEST DEAL?"
      timeout = setTimeout(() => setStage(2), 3500);
    }
    return () => clearTimeout(timeout);
  }, [stage]);

  // Highlight deal sub-animation during stage 2
  useEffect(() => {
    if (stage === 2) {
      const timer = setTimeout(() => setHighlight(true), 2500);
      return () => clearTimeout(timer);
    } else {
      setHighlight(false);
    }
  }, [stage]);

  // Frame-perfect manual rotation state for the circle (Stage 1)
  useEffect(() => {
    let frameId;
    let lastTime = performance.now();
    const spin = (time) => {
      const delta = time - lastTime;
      lastTime = time;
      setRotation(prev => prev + (delta * 0.015)); // Spin speed
      frameId = requestAnimationFrame(spin);
    };
    frameId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Compute dynamic styles for each of the 14 persistent DOM images
  const getItemStyle = (idx) => {
    const isMobile = winWidth < 640;
    
    if (stage === 0) {
      if (idx < 4) {
        const spreadX = isMobile ? 85 : 170;
        const offsetX = (idx - 1.5) * spreadX; 
        const offsetY = idx % 2 === 0 ? 25 : -25;
        return {
          transform: `translate(${offsetX}px, ${offsetY}px) scale(1)`,
          width: isMobile ? '80px' : '160px',
          height: isMobile ? '120px' : '240px',
          opacity: 1,
          zIndex: 10
        };
      } else {
        return {
          transform: `translate(0px, 0px) scale(0)`,
          width: '160px',
          height: '240px',
          opacity: 0,
          zIndex: 0
        };
      }
    } else if (stage === 1) {
      if (idx < 4) {
        return {
          transform: `translate(0px, 0px) scale(0)`,
          width: '160px',
          height: '240px',
          opacity: 0,
          zIndex: 0
        };
      } else {
        const spinIdx = idx - 4; // 0 to 8 (9 items)
        const angle = (spinIdx / 9) * 2 * Math.PI - Math.PI / 2 + (rotation * Math.PI / 180);
        const radius = isMobile ? 130 : 230;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return {
          transform: `translate(${x}px, ${y}px) scale(1)`,
          width: isMobile ? '70px' : '112px',
          height: isMobile ? '90px' : '144px',
          opacity: 1,
          zIndex: 10
        };
      }
    } else if (stage === 2) {
      if (idx < 4) {
        return {
          transform: `translate(0px, 0px) scale(0)`,
          width: '160px',
          height: '240px',
          opacity: 0,
          zIndex: 0
        };
      } else if (idx === 4) {
        return {
          transform: `translate(0px, 0px) scale(${isMobile ? 0.9 : 1}) rotate(-6deg)`,
          width: isMobile ? '160px' : '230px',
          height: isMobile ? '200px' : '320px',
          opacity: 1,
          zIndex: 40
        };
      } else {
        const spinIdx = idx - 4;
        const angle = (spinIdx / 9) * 2 * Math.PI - Math.PI / 2 + (rotation * Math.PI / 180);
        const x = Math.cos(angle) * (isMobile ? 250 : 450);
        const y = Math.sin(angle) * (isMobile ? 250 : 450);
        return {
          transform: `translate(${x}px, ${y}px) scale(0.5)`,
          width: '112px',
          height: '144px',
          opacity: 0,
          zIndex: 0
        };
      }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-theme-bg text-theme-text transition-colors duration-200">
      <div className="relative w-full max-w-5xl h-[700px] flex items-center justify-center">
        
        {/* ONE PERSISTENT SET OF IMAGES: They physically move across stages */}
        {images.map((img, idx) => (
          <div 
            key={idx}
            className="absolute rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center"
            style={{ 
              ...getItemStyle(idx),
              // CRITICAL: Disable transform transition in Stage 1 to allow frame-perfect spinning via React state,
              // but enable it for Stage 0 and 2 so they smoothly slide into position!
              transition: stage === 1 
                ? 'width 1.2s, height 1.2s, opacity 1.2s' 
                : 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1), width 1.2s, height 1.2s, opacity 1.2s',
            }}
          >
            <img 
              src={img} 
              className={`absolute max-w-none object-cover bg-gray-200 dark:bg-gray-800 ${idx === 4 ? 'object-top' : ''}`}
              style={idx === 4 ? { width: '115%', height: '115%', left: 0, top: 0 } : { width: '100%', height: '100%', left: 0, top: 0 }}
            />
            
            {/* Stage 0 Text Overlays (Only for first 4 images) */}
            {idx < 4 && (
              <div 
                className="absolute inset-0 flex items-center justify-center text-white font-display font-black text-sm sm:text-2xl tracking-widest italic drop-shadow-lg transition-opacity duration-700"
                style={{ opacity: stage === 0 ? 1 : 0, background: 'rgba(0,0,0,0.2)' }}
              >
                {stage0Text[idx]}
              </div>
            )}
          </div>
        ))}

        {/* STAGE 1 Specific: BEST DEAL? Center Text */}
        <div 
          className="absolute text-theme-text font-mono font-bold tracking-[0.4em] z-20 text-lg sm:text-2xl transition-all duration-1000"
          style={{ 
            opacity: stage === 1 ? 1 : 0,
            transform: stage === 1 ? 'scale(1)' : 'scale(0.5)',
            pointerEvents: stage === 1 ? 'auto' : 'none'
          }}
        >
          BEST DEAL?
        </div>

        {/* STAGE 2 Specific: Price Deal Cards that fade in around the target */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${stage === 2 ? 'opacity-100 z-30 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}>
          
          {/* Card 1: ZARA (Left) */}
          <div 
            className="absolute bg-theme-card text-theme-text backdrop-blur-xl border border-theme-border rounded-[1.5rem] p-3 sm:p-4 w-32 sm:w-40 shadow-xl flex flex-col gap-2 transition-all duration-1000 ease-out z-30"
            style={{
              transform: stage === 2 ? `translate(${winWidth < 640 ? -140 : -280}px, ${winWidth < 640 ? -40 : -50}px) rotate(0deg) scale(${winWidth < 640 ? 0.8 : 1})` : `translate(0px, 0px) scale(0.5)`,
              opacity: stage === 2 ? (highlight ? 0.3 : 1) : 0,
              filter: stage === 2 && highlight ? 'blur(2px) grayscale(50%)' : 'none',
              transitionDelay: highlight ? '0ms' : '400ms'
            }}
          >
            <div className="w-full h-32 sm:h-40 rounded-[1rem] overflow-hidden">
              <img 
                src={images[4]} 
                className="w-full h-full object-cover object-top" 
              />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] text-[#FF6B02] font-mono font-black uppercase tracking-wider">BRAND STORE</div>
              <div className="text-theme-text font-black text-xs sm:text-sm mt-0.5">ZARA</div>
              <div className="text-theme-muted italic text-[10px] sm:text-xs mt-0.5">Rs. 4,999</div>
            </div>
          </div>

          {/* Card 2: MYNTRA (Top Right) */}
          <div 
            className="absolute bg-theme-card text-theme-text backdrop-blur-xl border border-theme-border rounded-[1.5rem] p-3 sm:p-4 w-32 sm:w-40 shadow-2xl flex flex-col gap-2 transition-all duration-1000 ease-out z-30"
            style={{
              transform: stage === 2 ? `translate(${winWidth < 640 ? 140 : 260}px, ${winWidth < 640 ? -100 : -160}px) rotate(0deg) scale(${winWidth < 640 ? 0.8 : 1})` : `translate(0px, 0px) scale(0.5)`,
              opacity: stage === 2 ? (highlight ? 0.3 : 1) : 0,
              filter: stage === 2 && highlight ? 'blur(2px) grayscale(50%)' : 'none',
              transitionDelay: highlight ? '100ms' : '550ms'
            }}
          >
            <div className="w-full h-32 sm:h-40 rounded-[1rem] overflow-hidden">
              <img 
                src={images[4]} 
                className="w-full h-full object-cover object-top" 
              />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] text-theme-muted font-mono font-bold uppercase tracking-wider">MARKETPLACE</div>
              <div className="text-theme-text font-black text-xs sm:text-sm mt-0.5">MYNTRA</div>
              <div className="text-theme-muted italic text-[10px] sm:text-xs mt-0.5">Rs. 3,499</div>
            </div>
          </div>

          {/* Card 3: H&M - BEST DEAL (Bottom Right) */}
          <div 
            className={`absolute bg-theme-card text-theme-text border ${highlight ? 'border-emerald-500 shadow-[0_0_35px_rgba(16,185,129,0.3)]' : 'border-theme-border'} rounded-[1.5rem] p-4 sm:p-5 w-32 sm:w-40 shadow-2xl flex flex-col gap-2 sm:gap-3 transition-all duration-1000 ease-out z-30`}
            style={{
              transform: stage === 2 
                ? (highlight ? `translate(${winWidth < 640 ? 100 : 220}px, ${winWidth < 640 ? 140 : 160}px) rotate(0deg) scale(${winWidth < 640 ? 0.9 : 1.05})` : `translate(${winWidth < 640 ? 100 : 220}px, ${winWidth < 640 ? 140 : 160}px) rotate(0deg) scale(${winWidth < 640 ? 0.8 : 1})`) 
                : `translate(0px, 0px) scale(0.5)`,
              opacity: stage === 2 ? 1 : 0,
              transitionDelay: highlight ? '200ms' : '700ms'
            }}
          >
            {/* Dropped Tag (Pop out) */}
            <div 
              className="absolute -right-4 sm:-right-8 bottom-8 sm:bottom-12 bg-emerald-950/95 border-2 border-emerald-500 text-emerald-400 text-[9px] sm:text-xs font-black px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center shadow-xl transition-all duration-700 ease-out z-30"
              style={{
                opacity: highlight ? 1 : 0,
                transform: highlight ? 'translate(0px, 0px) scale(1) rotate(6deg)' : 'translate(-20px, 10px) scale(0.5) rotate(0deg)'
              }}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              DROPPED
            </div>

            <div 
              className="absolute -top-3 right-3 sm:right-5 bg-[#FF6B02] text-[#020108] text-[8px] sm:text-[9px] font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1 shadow-lg tracking-wider transition-all duration-700 ease-out"
              style={{
                opacity: highlight ? 1 : 0,
                transform: highlight ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              ✦ BEST DEAL
            </div>
            <div className="w-full h-32 sm:h-40 rounded-[1rem] overflow-hidden">
              <img 
                src={images[4]} 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] text-[#FF6B02] font-mono font-black uppercase tracking-wider mt-1">BRAND STORE</div>
              <div className="text-theme-text font-black text-sm sm:text-base mt-0.5">H&M</div>
              <div className="relative flex items-center mt-0.5">
                <span className={`transition-all duration-700 ${highlight ? 'text-theme-muted line-through text-[9px] sm:text-[10px]' : 'text-[#FF6B02] italic font-black text-xs sm:text-sm'}`}>
                  Rs. 2,299
                </span>
                <span 
                  className="absolute left-11 sm:left-14 text-emerald-500 italic font-black text-xs sm:text-sm transition-all duration-700 whitespace-nowrap"
                  style={{
                    opacity: highlight ? 1 : 0,
                    transform: highlight ? 'translateX(0) scale(1)' : 'translateX(-10px) scale(0.8)'
                  }}
                >
                  Rs. 1,899
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* 2-line Headline Text at Bottom Left matching the website's clean, large style */}
      <div 
        className={`absolute left-6 sm:left-12 bottom-12 sm:bottom-16 z-20 font-display text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight pointer-events-none flex flex-col leading-[0.95] transition-all duration-1000 delay-500 ${stage === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <span className="text-theme-text">Your personal</span>
        <span className="text-theme-muted">fashion agent.</span>
      </div>
    </section>
  );
}
