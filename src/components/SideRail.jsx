import React, { useState, useEffect, useRef } from 'react';
import { SECTIONS } from '../data/sections';

export default function SideRail({ activeSection }) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  // Briefly indicate on section change, then immediately disappear
  useEffect(() => {
    setIsVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 600);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeSection]);

  // Briefly indicate while actively scrolling, then disappear
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const scrollTo = (id) => {
    // Immediately hide when clicking to navigate
    setIsVisible(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const el = document.getElementById(id);
    if (el) {
      const navOffset = 85;
      const elPos = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elPos - navOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside 
      onMouseEnter={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 300);
      }}
      className={`hidden xl:flex fixed right-4 2xl:right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-1.5 select-none transition-all duration-300 ease-out ${
        isVisible 
          ? 'opacity-100 translate-x-0 pointer-events-auto' 
          : 'opacity-0 translate-x-4 pointer-events-none'
      }`}
      aria-label="Section Navigation Rail"
    >
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            className="group flex items-center gap-2.5 py-1 px-2 rounded-md transition-all duration-200 text-right focus:outline-none"
            aria-label={`Jump to section ${sec.number}: ${sec.title}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {/* Minimal label: non-active labels are hidden (opacity-0) so they never cover card content */}
            <span 
              className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-200 ${
                isActive 
                  ? 'text-[#FF6B02] font-bold opacity-100 translate-x-0' 
                  : 'text-theme-muted opacity-0 group-hover:opacity-90 group-hover:text-theme-text group-hover:-translate-x-1'
              }`}
            >
              <span className="opacity-60 mr-1.5">{sec.number}</span>
              <span>{sec.title}</span>
            </span>

            {/* Subtle indicator dot */}
            <span 
              className={`rounded-full transition-all duration-300 shrink-0 ${
                isActive 
                  ? 'w-2 h-2 bg-[#FF6B02] shadow-[0_0_8px_rgba(255,107,2,0.6)]' 
                  : 'w-1 h-1 bg-theme-border-strong group-hover:bg-theme-muted group-hover:scale-125'
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
}
