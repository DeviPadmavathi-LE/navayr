import React from 'react';
import DotMatrixFooter from './DotMatrixFooter';

export default function Footer() {
  return (
    <footer className="bg-theme-surface pt-16 md:pt-24 border-t border-theme-border overflow-hidden">
      {/* Top Branding & Navigation Links */}
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-theme-text uppercase tracking-tight leading-none mb-4">
              NAVAYR
            </h2>
            <p className="text-theme-muted font-mono text-xs tracking-widest uppercase">
              The Intelligent Fashion Layer.
            </p>
          </div>
          
          <div className="flex gap-12 font-mono text-xs uppercase tracking-widest text-theme-text font-bold">
            <div className="flex flex-col gap-4">
              <a href="#" className="hover:text-[#FF6B02] transition-colors">LinkedIn</a>
              <a href="#waitlist" className="hover:text-[#FF6B02] transition-colors">Waitlist</a>
            </div>
            <div className="flex flex-col gap-4">
              <a 
                href="https://www.instagram.com/dripfeedfashion/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#FF6B02] transition-colors"
              >
                Instagram
              </a>
              <a href="#" className="hover:text-[#FF6B02] transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Animated Dot-Matrix Section */}
      <DotMatrixFooter />
    </footer>
  );
}
