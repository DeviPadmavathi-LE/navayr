import React, { useState } from 'react';
import { useMascot } from '../context/MascotContext';

const SUGGESTED_PROMPTS = [
  'oversized black leather jacket under ₹5,000',
  'vintage oversized denim jacket',
  'minimal streetwear outfit for winter',
];

export default function VisualSearch() {
  const [query, setQuery] = useState(SUGGESTED_PROMPTS[0]);
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [email, setEmail] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const {
    triggerTypingStart,
    triggerTypingPause,
    triggerSearchStart,
    triggerProcessing,
    triggerSuccessResponse,
    triggerRequestFailed,
    triggerTaskCompleted,
    resetToIdle,
  } = useMascot();

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    triggerTypingStart();
    triggerTypingPause();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    triggerTypingStart();
    triggerTypingPause();
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const actualQuery = query.trim() || 'fashion apparel';
    setSubmittedQuery(actualQuery);
    // 1. Search or retrieval begins: searching
    triggerSearchStart();
    // 2. AI request processing: working
    setTimeout(() => {
      triggerProcessing('working');
      // 3. Successful response: happy -> idle
      setTimeout(() => {
        setHasSearched(true);
        setIsJoined(false);
        triggerSuccessResponse();
      }, 700);
    }, 600);
  };

  const handleSelectPrompt = (promptText) => {
    setQuery(promptText);
    setSubmittedQuery(promptText);
    triggerSearchStart();
    setTimeout(() => {
      triggerProcessing('working');
      setTimeout(() => {
        setHasSearched(true);
        setIsJoined(false);
        triggerSuccessResponse();
      }, 700);
    }, 500);
  };

  const handleJoinWaitlist = (e) => {
    e.preventDefault();
    if (!email || !email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      triggerRequestFailed('Enter a valid email address 🧐');
      return;
    }

    triggerProcessing('working');
    setTimeout(() => {
      setIsJoined(true);
      setEmail('');
      triggerTaskCompleted('Joined VIP waitlist! 🎉');
    }, 700);
  };

  return (
    <section id="visual-search" className="py-24 md:py-32 px-6 bg-theme-bg text-theme-text border-t border-theme-border transition-colors duration-200 min-h-[70vh] flex flex-col justify-center relative overflow-hidden">
      
            {/* WhatsApp-style Repeating Fashion Doodle Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.85]" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'120\' height=\'120\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' stroke=\'%23FF6B02\' stroke-width=\'1.5\' stroke-opacity=\'0.12\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath transform=\'translate(10, 10) scale(0.8) rotate(-15)\' d=\'M20 20v-9.5l-4-3-1-1.5a3.5 3.5 0 00-6 0l-1 1.5-4 3V20h16z\' /%3E%3Cpath transform=\'translate(60, 15) scale(0.7) rotate(10)\' d=\'M2.5 13a4.5 4.5 0 019 0m0 0a4.5 4.5 0 019 0M2.5 13h9m9 0h-9m-9 0C1.5 10.5 2.5 6 6 6h12c3.5 0 4.5 4.5 3.5 7\' /%3E%3Cpath transform=\'translate(15, 60) scale(0.8) rotate(15)\' d=\'M12 2L12 8M12 2C10.8954 2 10 2.89543 10 4C10 5.10457 10.8954 6 12 6M12 8L22 14V17C22 17.5523 21.5523 18 21 18H3C2.44772 18 2 17.5523 2 17V14L12 8Z\' /%3E%3Cpath transform=\'translate(65, 65) scale(0.7) rotate(-10)\' d=\'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z\' /%3E%3Cpath transform=\'translate(45, 40) scale(0.6) rotate(30)\' d=\'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z\' /%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '120px 120px'
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02]"></span>
            <span className="text-xs uppercase tracking-widest text-[#FF6B02] font-mono font-bold">
              04 — SEE IT
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight leading-[0.95] mb-3">
            WHAT ARE YOU<br />
            <span className="text-theme-muted">LOOKING FOR?</span>
          </h2>
        </div>

        {/* Dynamic Content Area */}
        <div className="relative min-h-[250px]">
          
          {/* STATE 1: Search Box */}
          {!hasSearched && (
            <div className="mb-10 max-w-3xl mx-auto text-center animate-in fade-in duration-500 w-full">
              <form 
                onSubmit={handleSearch}
                className="p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-theme-card border border-theme-border-strong shadow-xl focus-within:border-[#FF6B02] focus-within:ring-2 focus-within:ring-[#FF6B02]/20 transition-all flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                <div className="flex items-center pl-4 pr-2 py-2 flex-1">
                  <span className="text-[#FF6B02] mr-3 font-mono text-sm">✦</span>
                  <input 
                    type="text"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder="Tell NAVAYR your style... (e.g. vintage leather jacket under ₹5,000)"
                    className="w-full bg-transparent text-sm sm:text-base text-theme-text placeholder:text-theme-muted focus:outline-none"
                    aria-label="Fashion Search Query"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#FF6B02] text-[#020108] font-mono font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full sm:rounded-full hover:bg-[#FF852E] transition-all hover:scale-[1.02] shadow-md shadow-[#FF6B02]/20 shrink-0 text-center"
                >
                  SEARCH →
                </button>
              </form>

              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-mono">
                <span className="text-theme-muted uppercase tracking-wider text-[11px] mr-1">TRY:</span>
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSelectPrompt(prompt)}
                    className={`px-3 py-1 rounded-full border text-[11px] tracking-wide transition-all ${
                      query === prompt
                        ? 'border-[#FF6B02] bg-[#FF6B02]/10 text-[#FF6B02] font-bold'
                        : 'border-theme-border bg-theme-surface text-theme-muted hover:text-theme-text'
                    }`}
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STATE 2: Intent Capture / Waitlist */}
          {hasSearched && (
            <div className="w-full max-w-2xl mx-auto animate-in slide-in-from-bottom-4 fade-in duration-700 ">
              <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B02] to-amber-500 opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {!isJoined ? (
                  <>
                    <h3 className="font-display font-medium text-2xl md:text-3xl text-theme-text mb-3 tracking-tight">
                      Looking for <span className="italic font-serif font-normal">"{submittedQuery}"</span> already? 
                    </h3>
                    <p className="text-theme-muted mb-10 text-base md:text-lg">
                      We're building <span className="text-theme-text font-bold font-mono tracking-wider uppercase text-sm">NAVAYR</span> to find it for you.
                    </p>
                    
                    <form onSubmit={handleJoinWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email" 
                        className="flex-1 bg-theme-bg border border-theme-border rounded-full px-5 py-4 focus:outline-none focus:border-[#FF6B02] transition-colors text-theme-text placeholder:text-theme-muted" 
                      />
                      <button 
                        type="submit" 
                        className="bg-theme-text text-theme-bg px-8 py-4 rounded-full font-mono font-bold uppercase text-sm tracking-widest hover:bg-[#FF6B02] hover:text-white transition-all shadow-md shrink-0 whitespace-nowrap"
                      >
                        Join the waitlist
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8 animate-in zoom-in-95 fade-in duration-500">
                    <div className="w-16 h-16 bg-[#FF6B02]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#FF6B02] text-3xl">
                      ✦
                    </div>
                    <h3 className="font-display font-bold text-2xl mb-2 text-theme-text">You're on the list.</h3>
                    <p className="text-theme-muted">We'll notify you as soon as we launch.</p>
                  </div>
                )}
                
                <div className="mt-8 pt-6 border-t border-theme-border/50">
                  <button 
                    onClick={() => {
                      setHasSearched(false);
                      setQuery('');
                      resetToIdle();
                    }} 
                    className="text-xs font-mono uppercase tracking-widest text-theme-muted hover:text-[#FF6B02] flex items-center justify-center gap-2 transition-colors w-full"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Try another search
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
