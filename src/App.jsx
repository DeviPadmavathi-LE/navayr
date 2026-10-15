import React, { useState, useEffect } from 'react';
import { SECTIONS } from './data/sections';
import FloatingNav from './components/FloatingNav';
import SideRail from './components/SideRail';
import Hero from './components/Hero';
import Problem from './components/Problem';
import VisualSearch from './components/VisualSearch';
import Discovery from './components/Discovery';
import SearchLessPayLess from './components/SearchLessPayLess';
import PriceIntelligence from './components/PriceIntelligence';
import OrganizedThrift from './components/OrganizedThrift';
import NewVsPreLoved from './components/NewVsPreLoved';
import TheDrop from './components/TheDrop';
import WardrobeIntelligence from './components/WardrobeIntelligence';
import SocialDecision from './components/SocialDecision';
import NeverOverpay from './components/NeverOverpay';
import Partnership from './components/Partnership';
import Comparison from './components/Comparison';
import PartnershipPage from './components/PartnershipPage';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';
import { MascotProvider } from './context/MascotContext';
import Mascot from './components/Mascot';
import MascotDebugPanel from './components/MascotDebugPanel';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('navayr-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'light';
    }
    return 'light';
  });

  // Apply theme dataset to HTML root for global CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    // Also toggle class for fallback selectors
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('navayr-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Robust active section detection via IntersectionObserver
  useEffect(() => {
    const observers = [];

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) {
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(sec.id);
            }
          },
          {
            rootMargin: '-30% 0px -50% 0px',
            threshold: 0
          }
        );
        obs.observe(el);
        observers.push({ obs, el });
      }
    });

    return () => {
      observers.forEach(({ obs, el }) => obs.unobserve(el));
    };
  }, []);

  const handleOpenWaitlist = () => {
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

  return (
    <MascotProvider>
      {currentPage === 'partner' ? (
        <PartnershipPage onBack={() => {
          const html = document.documentElement;
          const prevBehavior = html.style.scrollBehavior;
          html.style.scrollBehavior = 'auto';
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          setCurrentPage('home');
          requestAnimationFrame(() => {
            html.style.scrollBehavior = prevBehavior;
          });
        }} />
      ) : (
        <div className="min-h-screen bg-theme-bg text-theme-text antialiased selection:bg-[#FF6B02] selection:text-white font-body transition-colors duration-200">
          
          {/* Permanent Floating Navigation & Control Bar */}
          <FloatingNav 
            activeSection={activeSection}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          {/* Desktop Vertical Section Rail (shows all 12 section titles & numbers) */}
          <SideRail activeSection={activeSection} />

          {/* Main Experience Stream */}
          <main className="relative">
            {/* 01 — HERO */}
            <Hero onOpenWaitlist={handleOpenWaitlist} />

            {/* 02 — THE PROBLEM */}
            <Problem />

            {/* 03 — NEVER OVERPAY */}
            <NeverOverpay />

            {/* 04 — SEE IT (Visual Search) */}
            <VisualSearch />

            {/* 05 — THE DROP */}
            <TheDrop />

            {/* 06 — WARDROBE INTELLIGENCE */}
            <WardrobeIntelligence />

            {/* 07 — ORGANIZED THRIFT */}
            <OrganizedThrift />

            {/* 08 — WHY NAVAYR / COMPARISON */}
            <Comparison />

            {/* 09 — PARTNERSHIP */}
            <Partnership onPartnerClick={() => {
              const html = document.documentElement;
              const prevBehavior = html.style.scrollBehavior;
              html.style.scrollBehavior = 'auto';
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
              setCurrentPage('partner');
              requestAnimationFrame(() => {
                html.style.scrollBehavior = prevBehavior;
              });
            }} />

            {/* 10 — FINAL CTA / WAITLIST */}
            <Waitlist />
          </main>

          {/* FOOTER */}
          <Footer />

        </div>
      )}

      {/* Freddy Mascot Component */}
      <Mascot />

      {/* Freddy Animation Lab / Debug Panel (Dev / Debug mode only) */}
      <MascotDebugPanel />
    </MascotProvider>
  );
}
