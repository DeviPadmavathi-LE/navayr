import React, { useState, useRef, useEffect } from 'react';

const SQUAD_LOOKS = [
  {
    id: 'look-1',
    title: 'Vintage Distressed Biker Jacket',
    price: '₹3,499',
    retail: '₹8,999',
    source: 'Archive Studio Bombay',
    type: 'PRE-LOVED',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=700&q=80',
    curator: 'Arjun asked your squad',
    tag: 'ARCHIVE LEATHER',
    initialCop: 28,
    initialDrop: 4
  },
  {
    id: 'look-2',
    title: 'Heavyweight Boxy Raw Co-ord',
    price: '₹2,890',
    retail: '₹5,500',
    source: 'Bluorng Studio D2C',
    type: 'NEW D2C',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=700&q=80',
    curator: 'Rhea asked your squad',
    tag: 'STREETWEAR DROP',
    initialCop: 34,
    initialDrop: 3
  },
  {
    id: 'look-3',
    title: 'Double Breasted Minimalist Trench',
    price: '₹4,999',
    retail: '₹11,990',
    source: 'Zara Studio Edit',
    type: 'CURATED',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80',
    curator: 'Kabir asked your squad',
    tag: 'TAILORED CHIC',
    initialCop: 21,
    initialDrop: 6
  },
  {
    id: 'look-4',
    title: 'Structured Box Calfskin Clutch',
    price: '₹2,750',
    retail: '₹8,500',
    source: 'Circular Vault Hub',
    type: 'PRE-LOVED',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',
    curator: 'Mira asked your squad',
    tag: 'VERIFIED ARCHIVE',
    initialCop: 42,
    initialDrop: 2
  },
  {
    id: 'look-5',
    title: 'Retro Platform Chunky Low',
    price: '₹3,999',
    retail: '₹9,499',
    source: 'Sneaker Archive Vault',
    type: 'PRE-LOVED',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=700&q=80',
    curator: 'Dev asked your squad',
    tag: 'RARE SNEAKER',
    initialCop: 31,
    initialDrop: 5
  }
];

export default function SocialDecision() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [animatingDirection, setAnimatingDirection] = useState(null); // 'cop' | 'drop' | null
  const [votesTally, setVotesTally] = useState({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const cardRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const SWIPE_THRESHOLD = 80; // px threshold for triggering decision

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(media.matches);
      const listener = (e) => setPrefersReducedMotion(e.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  // Current and stacked cards (modulo for endless discovery)
  const totalItems = SQUAD_LOOKS.length;
  const activeCard = SQUAD_LOOKS[currentIndex % totalItems];
  const secondCard = SQUAD_LOOKS[(currentIndex + 1) % totalItems];
  const thirdCard = SQUAD_LOOKS[(currentIndex + 2) % totalItems];

  const currentVotes = votesTally[activeCard.id] || { 
    cop: activeCard.initialCop, 
    drop: activeCard.initialDrop 
  };
  const totalVotes = currentVotes.cop + currentVotes.drop;
  const copPercentage = totalVotes > 0 ? Math.round((currentVotes.cop / totalVotes) * 100) : 50;

  // Unified decision function for swipe, button click, and keyboard
  const handleDecision = (direction) => {
    if (animatingDirection) return; // Prevent double-trigger during animation

    setAnimatingDirection(direction);

    // Record decision in local tally
    setVotesTally(prev => {
      const existing = prev[activeCard.id] || { cop: activeCard.initialCop, drop: activeCard.initialDrop };
      return {
        ...prev,
        [activeCard.id]: {
          ...existing,
          cop: direction === 'cop' ? existing.cop + 1 : existing.cop,
          drop: direction === 'drop' ? existing.drop + 1 : existing.drop
        }
      };
    });

    // Advance stack after exit animation (300ms)
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setDragOffset({ x: 0, y: 0 });
      setAnimatingDirection(null);
      setIsDragging(false);
    }, prefersReducedMotion ? 150 : 300);
  };

  // Pointer event handlers for touch and mouse
  const handlePointerDown = (e) => {
    if (animatingDirection) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    if (cardRef.current && e.target.setPointerCapture) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (err) {
        // Ignore fallback if unsupported
      }
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging || animatingDirection) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    // Allow horizontal movement, slight vertical resistance
    setDragOffset({ x: deltaX, y: deltaY * 0.2 });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);

    if (e.target.releasePointerCapture) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Ignore fallback
      }
    }

    if (dragOffset.x > SWIPE_THRESHOLD) {
      handleDecision('cop');
    } else if (dragOffset.x < -SWIPE_THRESHOLD) {
      handleDecision('drop');
    } else {
      // Snap back smoothly to center
      setDragOffset({ x: 0, y: 0 });
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handleDecision('drop');
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleDecision('cop');
    }
  };

  // Compute dynamic transform and stamps
  const dragProgress = Math.min(1, Math.max(0, Math.abs(dragOffset.x) / SWIPE_THRESHOLD));
  const isDraggingRight = dragOffset.x > 0;
  const isDraggingLeft = dragOffset.x < 0;

  // Active top card transform
  let cardTransform = '';
  if (animatingDirection === 'cop') {
    cardTransform = prefersReducedMotion 
      ? 'translateX(60px) opacity(0)' 
      : 'translateX(140%) rotate(18deg) scale(0.95)';
  } else if (animatingDirection === 'drop') {
    cardTransform = prefersReducedMotion 
      ? 'translateX(-60px) opacity(0)' 
      : 'translateX(-140%) rotate(-18deg) scale(0.95)';
  } else if (isDragging) {
    const rotation = prefersReducedMotion ? 0 : dragOffset.x * 0.075;
    cardTransform = `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotation}deg)`;
  } else {
    cardTransform = 'translate3d(0, 0, 0) rotate(0deg)';
  }

  return (
    <section 
      id="social"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="py-24 md:py-36 px-6 bg-theme-surface text-theme-text flex flex-col items-center justify-center border-t border-theme-border transition-colors duration-200 outline-none"
      aria-label="Social Decision: Swipe to decide"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        
        {/* Section Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B02] animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-[#FF6B02] font-mono font-bold">
              08 — SOCIAL DECISION
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight uppercase leading-[0.95]">
            SWIPE TO DECIDE.
          </h2>

          <p className="text-base md:text-lg text-theme-muted font-normal mt-3 max-w-md mx-auto">
            See it. Feel it. Cop it or drop it.
          </p>
        </div>

        {/* Editorial Swipe Instruction Banner Above Card */}
        <div className="mb-6 flex flex-col items-center justify-center gap-1 select-none">
          <div className="inline-flex items-center gap-6 px-5 py-2 rounded-full bg-theme-card border border-theme-border text-xs font-mono tracking-wider shadow-sm">
            <div className="flex items-center gap-1.5 font-bold text-theme-muted">
              <span className="inline-block transform -translate-x-0.5 transition-transform">←</span>
              <span>DROP</span>
            </div>

            <span className="w-1 h-1 rounded-full bg-theme-border-strong"></span>

            <span className="text-[11px] uppercase tracking-widest text-theme-text font-bold">
              SWIPE TO DECIDE
            </span>

            <span className="w-1 h-1 rounded-full bg-theme-border-strong"></span>

            <div className="flex items-center gap-1.5 font-bold text-[#FF6B02]">
              <span>COP</span>
              <span className="inline-block transform translate-x-0.5 transition-transform">→</span>
            </div>
          </div>

          <span className="text-[10px] font-mono text-theme-muted tracking-widest uppercase mt-1 hidden sm:block">
            SWIPE LEFT TO DROP • SWIPE RIGHT TO COP
          </span>
        </div>

        {/* 3-Card Interactive Depth Stack */}
        <div 
          className="relative w-full max-w-[340px] sm:max-w-[380px] mx-auto h-[510px] sm:h-[540px] flex items-center justify-center select-none"
          style={{ touchAction: 'pan-y' }}
        >
          
          {/* Card 3: Deep Back Card */}
          {thirdCard && (
            <div 
              className="absolute w-full h-[460px] sm:h-[490px] rounded-3xl bg-theme-card border border-theme-border/60 p-4 shadow-md transition-all duration-300 pointer-events-none text-left"
              style={{
                transform: 'scale(0.88) translateY(36px)',
                opacity: 0.35,
                zIndex: 10
              }}
              aria-hidden="true"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 mb-3 opacity-60">
                <img src={thirdCard.image} alt="" className="w-full h-full object-cover grayscale" />
              </div>
            </div>
          )}

          {/* Card 2: Second Card in Stack */}
          {secondCard && (
            <div 
              className="absolute w-full h-[460px] sm:h-[490px] rounded-3xl bg-theme-card border border-theme-border p-5 shadow-xl transition-all duration-300 pointer-events-none text-left"
              style={{
                transform: 'scale(0.94) translateY(18px)',
                opacity: isDragging ? 0.8 : 0.65,
                zIndex: 20
              }}
              aria-hidden="true"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 mb-3 relative">
                <img 
                  src={secondCard.image} 
                  alt={secondCard.title} 
                  className="w-full h-full object-cover grayscale-[10%]" 
                />
                <div className="absolute inset-0 bg-black/30"></div>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-theme-muted">
                <span className="truncate">{secondCard.title}</span>
                <span className="font-bold text-theme-text">{secondCard.price}</span>
              </div>
            </div>
          )}

          {/* Card 1: Active Front Draggable Card */}
          <div
            ref={cardRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`absolute w-full h-[460px] sm:h-[490px] rounded-3xl bg-theme-card border border-theme-border-strong p-5 shadow-2xl text-left cursor-grab active:cursor-grabbing flex flex-col justify-between overflow-hidden transition-colors ${
              isDragging ? '' : 'transition-transform duration-300 ease-out'
            }`}
            style={{
              transform: cardTransform,
              zIndex: 30,
              touchAction: 'pan-y'
            }}
          >
            {/* Top Curator Metainfo Bar */}
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-theme-muted mb-3 pb-2 border-b border-theme-border">
                <span className="truncate max-w-[200px]">{activeCard.curator}</span>
                <span className="text-[#FF6B02] font-bold shrink-0">LOOK #{currentIndex + 1}</span>
              </div>

              {/* Product Visual Container with Dynamic Decision Stamps */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900 mb-3 group">
                <img 
                  src={activeCard.image} 
                  alt={activeCard.title} 
                  className="w-full h-full object-cover pointer-events-none transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/90 via-transparent to-transparent opacity-80 pointer-events-none"></div>

                {/* Condition & Source Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#020108]/90 text-[#FF6B02] font-bold border border-[#FF6B02]/30 backdrop-blur-md">
                    {activeCard.tag}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-theme-surface text-theme-text font-bold border border-theme-border backdrop-blur-md">
                    {activeCard.type}
                  </span>
                </div>

                {/* DYNAMIC STAMP: COP ✓ (Emerges when dragging right or on COP decision) */}
                <div 
                  className="absolute top-8 left-6 border-[3.5px] border-[#FF6B02] text-[#FF6B02] font-display font-black text-3xl sm:text-4xl px-4 py-1.5 rounded-2xl uppercase tracking-wider rotate-[-12deg] pointer-events-none transition-opacity duration-150 shadow-xl bg-[#020108]/70 backdrop-blur-sm"
                  style={{
                    opacity: animatingDirection === 'cop' 
                      ? 1 
                      : (isDraggingRight ? dragProgress : 0)
                  }}
                >
                  COP ✓
                </div>

                {/* DYNAMIC STAMP: DROP × (Emerges when dragging left or on DROP decision) */}
                <div 
                  className="absolute top-8 right-6 border-[3.5px] border-zinc-400 text-zinc-200 font-display font-black text-3xl sm:text-4xl px-4 py-1.5 rounded-2xl uppercase tracking-wider rotate-[12deg] pointer-events-none transition-opacity duration-150 shadow-xl bg-[#020108]/70 backdrop-blur-sm"
                  style={{
                    opacity: animatingDirection === 'drop' 
                      ? 1 
                      : (isDraggingLeft ? dragProgress : 0)
                  }}
                >
                  DROP ×
                </div>

                {/* Bottom Image Overlay Details */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider block">
                    {activeCard.source}
                  </span>
                  <div className="flex items-baseline justify-between gap-2 mt-0.5">
                    <h3 className="font-display font-black text-base sm:text-lg text-theme-text leading-tight truncate">
                      {activeCard.title}
                    </h3>
                    <div className="flex items-baseline gap-1.5 shrink-0 pl-1">
                      <span className="text-base sm:text-lg font-display font-black text-[#FF6B02]">
                        {activeCard.price}
                      </span>
                      <span className="text-[10px] font-mono text-theme-muted line-through">
                        {activeCard.retail}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Squad Consensus Bar */}
            <div className="pt-1 space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-theme-muted uppercase tracking-wider">
                  SQUAD VERDICT ({totalVotes} VOTES)
                </span>
                <span className="text-[#FF6B02] font-black">
                  {copPercentage}% COP
                </span>
              </div>
              <div className="w-full h-1.5 bg-theme-elevated rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FF6B02] to-[#FF9E4D] transition-all duration-300 rounded-full"
                  style={{ width: `${copPercentage}%` }}
                ></div>
              </div>
            </div>

          </div>

        </div>

        {/* 2 LARGE, CLEAR, UNMISTAKABLE BUTTONS DIRECTLY BELOW CARD */}
        <div className="w-full max-w-[340px] sm:max-w-[380px] mx-auto mt-8 grid grid-cols-2 gap-4">
          
          {/* LARGE DROP BUTTON */}
          <button
            type="button"
            onClick={() => handleDecision('drop')}
            disabled={animatingDirection !== null}
            className="group relative h-14 sm:h-16 rounded-2xl bg-theme-card border-2 border-theme-border-strong hover:border-zinc-400 hover:bg-theme-surface active:scale-[0.97] transition-all flex items-center justify-center gap-3 text-theme-text font-display font-black text-base sm:text-lg tracking-wider uppercase shadow-xl focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none disabled:opacity-50 cursor-pointer"
            aria-label="Drop this product (Swipe Left)"
          >
            <span className="text-xl sm:text-2xl transform transition-transform group-hover:-translate-x-1 font-mono">
              ←
            </span>
            <span>DROP</span>
          </button>

          {/* LARGE COP BUTTON */}
          <button
            type="button"
            onClick={() => handleDecision('cop')}
            disabled={animatingDirection !== null}
            className="group relative h-14 sm:h-16 rounded-2xl bg-[#FF6B02] text-[#020108] border-2 border-[#FF6B02] hover:bg-[#FF852E] hover:border-[#FF852E] active:scale-[0.97] transition-all flex items-center justify-center gap-3 font-display font-black text-base sm:text-lg tracking-wider uppercase shadow-xl shadow-[#FF6B02]/25 focus-visible:ring-2 focus-visible:ring-[#FF6B02] focus-visible:outline-none disabled:opacity-50 cursor-pointer"
            aria-label="Cop this product (Swipe Right)"
          >
            <span>COP</span>
            <span className="text-xl sm:text-2xl transform transition-transform group-hover:translate-x-1 font-mono">
              →
            </span>
          </button>

        </div>

        {/* Keyboard and Gesture Accessible Hint */}
        <p className="text-[11px] font-mono text-theme-muted mt-5 uppercase tracking-wider">
          Press <kbd className="px-1.5 py-0.5 rounded bg-theme-card border border-theme-border font-bold">←</kbd> to Drop or <kbd className="px-1.5 py-0.5 rounded bg-theme-card border border-theme-border font-bold text-[#FF6B02]">→</kbd> to Cop
        </p>

      </div>
    </section>
  );
}
