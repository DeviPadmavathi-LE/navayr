import React, { useState, useEffect, useRef } from 'react';
import { SECTIONS } from '../data/sections';

export default function FloatingNav({ activeSection, theme, onToggleTheme }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Dynamic Scroll Progress & Smart Hide/Reveal
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? Math.round((currentY / docHeight) * 100) : 0;
          
          setScrollProgress(Math.min(100, Math.max(0, progress)));

          // Smart Hide/Reveal: Scroll Down hides subtly, Scroll Up reveals
          if (currentY > 90) {
            if (currentY > lastScrollY.current + 8) {
              setIsVisible(false); // scrolling down
            } else if (currentY < lastScrollY.current - 8) {
              setIsVisible(true); // scrolling up
            }
          } else {
            setIsVisible(true);
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle cursor approaching the top to restore the control bar
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY < 75) {
        setIsVisible(true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Lock background body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 85;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Permanent Floating Control Bar */}
      <header 
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-theme-glass backdrop-blur-xl border border-theme-border shadow-2xl text-xs font-mono tracking-wider select-none text-theme-text transition-colors duration-200">
          
          {/* Menu Trigger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 hover:text-[#FF6B02] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF6B02] rounded"
            aria-label="Toggle Navigation Menu"
            aria-expanded={menuOpen}
          >
            <span className="text-sm font-bold leading-none">☰</span>
            <span className="font-bold">MENU</span>
          </button>

          <span className="text-theme-muted opacity-40">|</span>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="flex items-center justify-center w-6 h-6 rounded-full hover:text-[#FF6B02] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FF6B02]"
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? (
              <span className="text-sm leading-none" title="Dark Mode Active">◐</span>
            ) : (
              <span className="text-sm leading-none text-[#FF6B02]" title="Light Mode Active">◑</span>
            )}
          </button>

          <span className="text-theme-muted opacity-40">|</span>

          {/* Dynamic Scroll Progress % */}
          <div className="flex items-center gap-1.5 min-w-[42px] font-bold">
            <span className={scrollProgress === 100 ? 'text-[#FF6B02]' : ''}>
              {scrollProgress}%
            </span>
          </div>

          {/* Signature NAVAYR Orange Signal Dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02] animate-pulse"></span>
        </div>
      </header>

      {/* Full-Height Editorial Navigation Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-[#FAF9F6] dark:bg-[#020108] backdrop-blur-2xl flex flex-col justify-between p-6 md:p-14 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation Overlay"
        >
          {/* Top Bar of Menu */}
          <div className="flex items-center justify-between max-w-6xl w-full mx-auto pb-6 border-b border-theme-border">
            <div className="flex items-center gap-3">
              <span className="font-display font-black text-2xl tracking-tighter text-theme-text">
                NAVAYR
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-[#FF6B02]/10 text-[#FF6B02] border border-[#FF6B02]/20">
                PRE-LAUNCH 2026
              </span>
            </div>

            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-xs font-mono tracking-wider uppercase text-theme-muted hover:text-[#FF6B02] transition-colors focus:outline-none"
              aria-label="Close Navigation Menu"
            >
              [ CLOSE ✕ ]
            </button>
          </div>

          {/* Editorial Section List from Canonical SECTIONS */}
          <nav className="max-w-6xl w-full mx-auto my-auto py-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollTo(sec.id)}
                  className={`group flex items-center justify-between py-3.5 px-4 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FF6B02]/10 text-[#FF6B02] font-bold border border-[#FF6B02]/25'
                      : 'text-theme-text hover:bg-theme-surface hover:text-[#FF6B02]'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-mono ${isActive ? 'text-[#FF6B02]' : 'text-theme-muted'}`}>
                      {sec.number}
                    </span>
                    <span className="text-base sm:text-lg font-display tracking-tight uppercase group-hover:translate-x-1 transition-transform">
                      {sec.title}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono tracking-widest text-theme-muted uppercase hidden sm:inline">
                    {sec.tag}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Bottom Metainfo */}
          <div className="max-w-6xl w-full mx-auto pt-6 border-t border-theme-border flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-theme-muted">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02]"></span>
              <span>SCROLL PROGRESS: {scrollProgress}%</span>
            </div>
            <div className="mt-2 sm:mt-0">
              © 2026 NAVAYR • THE STYLE ALGORITHM
            </div>
          </div>

        </div>
      )}
    </>
  );
}
