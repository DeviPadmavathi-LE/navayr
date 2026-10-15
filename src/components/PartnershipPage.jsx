import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle2, TrendingUp, ShieldCheck, Zap, Users, ArrowUpRight } from 'lucide-react';
import HowToGetStarted from './HowToGetStarted';
import { useMascot } from '../context/MascotContext';

// Reusable component for scroll-triggered fade-up animations
function FadeInSection({ children, delay = 0 }) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transform transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function PartnershipPage({ onBack }) {
  const [submitted, setSubmitted] = useState(false);
  const [isNavVisible, setNavVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    triggerTypingStart,
    triggerTypingPause,
    triggerProcessing,
    triggerTaskCompleted,
    resetToIdle,
  } = useMascot();

  const handleInputChange = () => {
    triggerTypingStart();
    triggerTypingPause();
  };

  useEffect(() => {
    // Instantly reset scroll to top without smooth animation artifact
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    const frame = requestAnimationFrame(() => {
      html.style.scrollBehavior = prevScrollBehavior;
    });

    const timer = setTimeout(() => setNavVisible(true), 50);
    
    const handleScroll = () => {
      // Navbar solid transition
      setIsScrolled(window.scrollY > 100);
    };
    
    // Use passive listener for butter-smooth scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Trigger once on mount
    handleScroll();
    
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerProcessing('working');
    setTimeout(() => {
      setSubmitted(true);
      triggerTaskCompleted('Partner Application Received! 🎉');
    }, 700);
  };

  const features = [
    {
      icon: <Users size={24} />,
      title: "Hyper-Targeted Audience",
      description: "Reach buyers specifically searching for your aesthetic—no more shouting into the void on generic marketplaces."
    },
    {
      icon: <Zap size={24} />,
      title: "Zero Listing Friction",
      description: "Our AI automatically categorizes, tags, and prices your pieces. Just upload a photo, we do the rest."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Data-Driven Intelligence",
      description: "Access real-time insights on what's trending, how to price, and when to drop your best pieces."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Verified Trust",
      description: "Get a 'Verified Partner' badge that instantly builds trust with our community of high-end vintage collectors."
    }
  ];

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text font-body transition-colors duration-200">
      
      {/* Navigation Bar */}
      <nav 
        className={`fixed top-0 left-0 w-full px-6 py-4 md:px-12 md:py-6 z-50 flex justify-between items-center transform transition-all duration-700 
          ${isNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          ${isScrolled 
            ? 'bg-theme-bg border-b border-theme-divider text-theme-text shadow-sm' 
            : 'bg-transparent border-b border-white/5 text-white'
          }
        `}
      >
        <button 
          onClick={onBack}
          className={`flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors drop-shadow-md
            ${isScrolled ? 'text-theme-muted hover:text-[#FF6B02]' : 'text-white/80 hover:text-white'}
          `}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </nav>

      {/* Hero Section - True Full-Screen Background */}
      <div className="relative w-full h-screen overflow-hidden bg-[#050505]">
        
        {/* Background Video - Fills screen, scaled and framed on mobile to crop out bottom subtitles */}
        <video 
          autoPlay loop muted playsInline 
          className="absolute inset-0 w-full h-full object-cover object-[center_20%] md:object-[center_30%] opacity-90 z-0 scale-[1.28] sm:scale-[1.18] md:scale-[1.01] origin-[center_15%] md:origin-center transition-transform duration-300"
        >
          <source src="/images/valentino_video.mp4" type="video/mp4" />
        </video>
        
        {/* Base overlay for text legibility */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none z-10"></div>

        {/* Bottom gradient fade on mobile to guarantee seamless transition and eliminate subtitle remnants */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10 md:hidden"></div>

        {/* Hero Content Overlay */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6 text-center text-white pointer-events-none">
          <FadeInSection delay={100}>
            <p className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-[#FF6B02] uppercase mb-6 drop-shadow-md">Partner with us</p>
            <h1 className="text-5xl md:text-7xl lg:text-[110px] font-display font-medium leading-[0.95] tracking-tighter mb-8 drop-shadow-2xl">
              No ads.<br/>
              Just <span className="italic font-light">aura.</span>
            </h1>
          </FadeInSection>
        </div>
      </div>

      <main className="w-full">
        {/* Why Join Us Section - Editorial Grid */}
        <section className="mb-32">
          {/* Section Header */}
          <div className="pt-24 pb-16 px-6 md:px-12 text-center md:text-left border-b border-theme-divider">
            <FadeInSection delay={0}>
              <h2 className="text-xs font-mono tracking-widest uppercase text-[#FF6B02] mb-4">Why Navyr</h2>
              <p className="text-4xl md:text-6xl font-display font-medium max-w-3xl leading-[1.1] tracking-tight">
                Built for curation. Zero clutter.
              </p>
            </FadeInSection>
          </div>

          {/* Cinematic Sticky Stacking Cards with Pure CSS Native Scroll */}
          <div className="relative w-full">
            {[
              {
                num: "01", label: "THE CROWD", title1: "Find your", title2: "exact crowd.",
                bullets: [
                  "Direct line to buyers who actually get your taste. Zero void.",
                  "Skip fast-fashion noise. Direct access to archive collectors."
                ],
                bg: "bg-gradient-to-br from-[#FF512F] to-[#DD2476]", 
                textCol: "text-white", numCol: "text-white/20",
                topClass: "top-0", roundedClass: ""
              },
              {
                num: "02", label: "ZERO FRICTION", title1: "Zero listing", title2: "friction.",
                bullets: [
                  "Drop a photo. AI auto-tags, categorizes, and prices in seconds.",
                  "Zero hours lost on descriptions. Spend all your energy sourcing heat."
                ],
                bg: "bg-gradient-to-br from-[#11998E] to-[#38EF7D]",
                textCol: "text-white", numCol: "text-white/20",
                topClass: "top-0", roundedClass: "rounded-t-[3rem] border-t border-white/30 shadow-[0_-20px_50px_rgba(0,0,0,0.4)]"
              },
              {
                num: "03", label: "THE INTEL", title1: "Data that", title2: "hits different.",
                bullets: [
                  "Live pulse on trending grails, search spikes, and buyer demand.",
                  "Drop pieces when hype peaks. Price with signal, not guesswork."
                ],
                bg: "bg-gradient-to-br from-[#4776E6] to-[#8E54E9]",
                textCol: "text-white", numCol: "text-white/20",
                topClass: "top-0", roundedClass: "rounded-t-[3rem] border-t border-white/30 shadow-[0_-20px_50px_rgba(0,0,0,0.4)]"
              },
              {
                num: "04", label: "THE FLEX", title1: "Verified", title2: "Aura.",
                bullets: [
                  "Official verified badge on every piece you list. Pure legitimacy.",
                  "Instant trust with a community obsessed with authentic archives."
                ],
                bg: "bg-gradient-to-br from-[#FDC830] to-[#F37335]",
                textCol: "text-white", numCol: "text-white/20",
                topClass: "top-0", roundedClass: "rounded-t-[3rem] border-t border-white/30 shadow-[0_-20px_50px_rgba(0,0,0,0.4)]"
              }
            ].map((card, i) => {
              return (
                <div 
                  key={i} 
                  className={`sticky ${card.topClass} w-full h-[100vh] flex flex-col justify-between ${card.bg} ${card.roundedClass} overflow-hidden`}
                >
                
                {/* Top Section */}
                <div className="w-full px-6 md:px-16 pt-24 md:pt-32 flex-1 flex flex-col relative max-w-[1400px] mx-auto">
                  
                  {/* Tiny center label */}
                  <div className={`absolute top-12 left-1/2 -translate-x-1/2 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase opacity-70 font-bold ${card.textCol}`}>
                    ({card.label})
                  </div>

                  {/* Title and Number */}
                  <div className="flex justify-between items-end mt-auto mb-12 md:mb-20 w-full relative z-10">
                    <h2 className={`text-[12vw] md:text-[8vw] lg:text-[110px] font-display font-medium leading-[0.95] tracking-tighter ${card.textCol} max-w-[90%]`}>
                      {card.title1} <br /> {card.title2}
                    </h2>
                    <div className={`absolute right-0 bottom-[-20%] md:static text-[35vw] md:text-[20vw] lg:text-[280px] font-display font-medium leading-none ${card.numCol} -mb-4 md:-mb-12 tracking-tighter -z-10`}>
                      {card.num}
                    </div>
                  </div>

                </div>

                {/* Bottom Section - 2 Columns */}
                <div className="w-full border-t border-white/20 flex flex-col md:flex-row h-auto md:h-1/3 min-h-[220px] bg-black/20 backdrop-blur-xl pb-10 md:pb-0">
                  <div className="flex-1 p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-white/10 flex items-center hover:bg-white/10 transition-colors duration-300">
                    <div className="flex items-start gap-5 max-w-lg mx-auto md:mx-0">
                      <div className="w-2.5 h-2.5 bg-white mt-2.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)] shrink-0"></div>
                      <p className={`text-lg md:text-2xl font-medium text-white leading-relaxed tracking-wide drop-shadow-md`}>
                        {card.bullets[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 p-8 md:p-12 lg:p-16 flex items-center hover:bg-white/10 transition-colors duration-300">
                    <div className="flex items-start gap-5 max-w-lg mx-auto md:mx-0">
                      <div className="w-2.5 h-2.5 bg-white mt-2.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.8)] shrink-0"></div>
                      <p className={`text-lg md:text-2xl font-medium text-white leading-relaxed tracking-wide drop-shadow-md`}>
                        {card.bullets[1]}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
          </div>
        </section>

        <HowToGetStarted />

        {/* Application Form Section (Contained) */}
        <section className="px-6 max-w-4xl mx-auto pb-32">
          <FadeInSection delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-display font-medium mb-4">Lock in your spot</h2>
              <p className="text-theme-muted text-sm font-mono tracking-wide">Limited drops for private beta.</p>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            {submitted ? (
              <div className="bg-theme-surface border border-theme-divider rounded-3xl p-12 text-center flex flex-col items-center">
                <CheckCircle2 size={48} className="text-[#FF6B02] mb-6" />
                <h2 className="text-2xl font-display font-medium mb-4">You're on radar.</h2>
                <p className="text-theme-muted mb-8 max-w-md">
                  We review every partner manually. If your aura fits, we'll reach out within 48h.
                </p>
                <button 
                  onClick={() => {
                    resetToIdle();
                    onBack();
                  }}
                  className="bg-theme-text text-theme-bg px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-[#FF6B02] hover:text-white transition-colors"
                >
                  Return Home
                </button>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit} 
                className="bg-theme-surface border border-theme-divider rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
              >
                {/* Subtle top accent line */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-theme-surface via-[#FF6B02] to-theme-surface opacity-80"></div>

                <div className="space-y-6 relative z-10 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2.5">
                        <label htmlFor="name" className="text-[11px] font-mono tracking-[0.1em] text-theme-text font-bold uppercase pl-1">
                          Who are you?
                        </label>
                        <input required type="text" id="name" onChange={handleInputChange} className="w-full bg-black/5 dark:bg-white/5 border border-theme-divider/40 rounded-xl px-5 py-4 text-theme-text text-base focus:outline-none focus:border-[#FF6B02] focus:ring-1 focus:ring-[#FF6B02]/50 transition-all placeholder:text-theme-muted/50" placeholder="e.g. Jane Doe" />
                      </div>
                      
                      <div className="flex flex-col gap-2.5">
                        <label htmlFor="brand" className="text-[11px] font-mono tracking-[0.1em] text-theme-text font-bold uppercase pl-1">
                          Brand / Store
                        </label>
                        <input required type="text" id="brand" onChange={handleInputChange} className="w-full bg-black/5 dark:bg-white/5 border border-theme-divider/40 rounded-xl px-5 py-4 text-theme-text text-base focus:outline-none focus:border-[#FF6B02] focus:ring-1 focus:ring-[#FF6B02]/50 transition-all placeholder:text-theme-muted/50" placeholder="e.g. Archive Studio" />
                      </div>
                    </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="email" className="text-[11px] font-mono tracking-[0.1em] text-theme-text font-bold uppercase pl-1">
                        Where do we reach you? (Email)
                      </label>
                      <input required type="email" id="email" onChange={handleInputChange} className="w-full bg-black/5 dark:bg-white/5 border border-theme-divider/40 rounded-xl px-5 py-4 text-theme-text text-base focus:outline-none focus:border-[#FF6B02] focus:ring-1 focus:ring-[#FF6B02]/50 transition-all placeholder:text-theme-muted/50" placeholder="hello@yourbrand.com" />
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center justify-between pl-1 pr-1">
                        <label htmlFor="phone" className="text-[11px] font-mono tracking-[0.1em] text-theme-text font-bold uppercase">
                          Mobile / WhatsApp Number
                        </label>
                        <span className="text-[10px] font-mono text-theme-muted uppercase">
                          OPTIONAL
                        </span>
                      </div>
                      <input type="tel" id="phone" onChange={handleInputChange} className="w-full bg-black/5 dark:bg-white/5 border border-theme-divider/40 rounded-xl px-5 py-4 text-theme-text text-base focus:outline-none focus:border-[#FF6B02] focus:ring-1 focus:ring-[#FF6B02]/50 transition-all placeholder:text-theme-muted/50" placeholder="+91 98201 45892" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="url" className="text-[11px] font-mono tracking-[0.1em] text-theme-text font-bold uppercase pl-1">
                      Drop your link
                    </label>
                    <input required type="url" id="url" onChange={handleInputChange} className="w-full bg-black/5 dark:bg-white/5 border border-theme-divider/40 rounded-xl px-5 py-4 text-theme-text text-base focus:outline-none focus:border-[#FF6B02] focus:ring-1 focus:ring-[#FF6B02]/50 transition-all placeholder:text-theme-muted/50" placeholder="Instagram or Website URL" />
                  </div>

                  <div className="flex flex-col gap-2.5 pt-2">
                    <label htmlFor="details" className="text-[11px] font-mono tracking-[0.1em] text-theme-text font-bold uppercase pl-1">
                      What are you curating?
                    </label>
                    <textarea required id="details" rows="3" onChange={handleInputChange} className="w-full bg-black/5 dark:bg-white/5 border border-theme-divider/40 rounded-xl px-5 py-4 text-theme-text text-base focus:outline-none focus:border-[#FF6B02] focus:ring-1 focus:ring-[#FF6B02]/50 transition-all resize-none placeholder:text-theme-muted/50" placeholder="Your vibe, archive grails, or brand story..."></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 mt-6 border-t border-theme-divider/50">
                    <span className="text-xs text-theme-muted font-medium italic opacity-80">
                      *Curated manually. No bots.
                    </span>
                    <button type="submit" className="px-10 bg-[#FF6B02] text-[#111111] font-bold text-[11px] tracking-wider uppercase py-4 rounded-xl hover:bg-[#e66002] transition-all transform active:scale-[0.98] shadow-[0_10px_20px_-5px_rgba(255,107,2,0.3)] shrink-0 flex items-center justify-center gap-2">
                      LOCK IN
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </FadeInSection>
        </section>

      </main>
    </div>
  );
}
