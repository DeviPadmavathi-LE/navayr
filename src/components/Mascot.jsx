import React, { useState } from 'react';
import { Avatar } from '@bible-strong/avatar-react';
import '@bible-strong/avatar-react/styles.css';
import { useMascot } from '../context/MascotContext';

export default function Mascot() {
  const {
    controllerRef,
    statusMessage,
    currentAnimation,
    prefersReducedMotion,
    isMinimized,
    setIsMinimized,
    avatarDefinition,
    triggerInitialLoad,
    triggerMascotClick,
    setCurrentExpression,
  } = useMascot();

  const [isHovered, setIsHovered] = useState(false);

  // Trigger initial load: waking -> idle
  React.useEffect(() => {
    const timer = setTimeout(() => {
      triggerInitialLoad();
    }, 120);
    return () => clearTimeout(timer);
  }, [triggerInitialLoad]);

  const activeBubbleMessage = statusMessage || (isHovered ? 'Freddy here! 👋' : null);

  return (
    <aside
      aria-label="Freddy Mascot"
      className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 pointer-events-none select-none transition-all duration-300 ease-out"
    >
      {isMinimized ? (
        /* Minimized pill state for mobile / user preference */
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white dark:bg-[#15111A] border border-black/10 dark:border-white/20 shadow-lg text-[10px] sm:text-[11px] font-mono font-bold text-[#17151A] dark:text-[#F7F4EE] hover:text-[#FF6B02] hover:border-[#FF6B02]/50 active:scale-95 transition-all cursor-pointer"
          aria-label="Expand Freddy Mascot"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF6B02] animate-pulse" />
          <span>FREDDY</span>
          <span className="text-[10px] sm:text-xs text-theme-muted">▲</span>
        </button>
      ) : (
        /* Responsive Mascot display: compact ~76px on mobile, ~105px on tablet, ~120px on desktop */
        <div className="relative flex flex-col items-end">
          
          {/* Reaction speech bubble */}
          {activeBubbleMessage && (
            <div
              className={`mb-1 mr-1 sm:mb-1.5 sm:mr-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-mono font-semibold shadow-xl border backdrop-blur-md transition-all duration-200 pointer-events-none max-w-[190px] sm:max-w-xs text-center ${
                currentAnimation === 'confused' || currentAnimation === 'sad'
                  ? 'bg-white dark:bg-[#181119] border-red-500/40 text-red-500 dark:text-red-400'
                  : currentAnimation === 'happy' || currentAnimation === 'celebrate'
                  ? 'bg-white dark:bg-[#1C120C] border-[#FF6B02]/50 text-[#FF6B02]'
                  : currentAnimation === 'thinking' || currentAnimation === 'working' || currentAnimation === 'searching'
                  ? 'bg-white dark:bg-[#1A150A] border-amber-500/50 text-amber-500 dark:text-amber-400 animate-pulse'
                  : 'bg-white dark:bg-[#16131D] border-black/10 dark:border-white/20 text-[#17151A] dark:text-[#F7F4EE]'
              } ${prefersReducedMotion ? 'motion-reduce:animate-none' : ''}`}
            >
              {activeBubbleMessage}
            </div>
          )}

          {/* Mascot wrapper - responsive scaling */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative w-[76px] sm:w-[105px] md:w-[120px] flex flex-col items-center"
          >
            {/* Small minimize button on top-right of mascot: subtly visible on mobile for touch accessibility, hover-only on desktop */}
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="pointer-events-auto absolute -top-1 -right-1 sm:-top-1 sm:right-0 opacity-70 hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity w-5 h-5 flex items-center justify-center rounded-full bg-white dark:bg-[#1c1824] border border-black/10 dark:border-white/20 text-[9px] sm:text-[10px] text-theme-muted hover:text-theme-text shadow-sm cursor-pointer z-10 active:scale-90"
              title="Minimize Freddy"
              aria-label="Minimize Freddy"
            >
              ✕
            </button>

            {/* Avatar container: clickable to trigger surprised -> happy -> idle */}
            <div
              onClick={triggerMascotClick}
              role="button"
              tabIndex={0}
              aria-label="Freddy Mascot - Click to interact"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  triggerMascotClick();
                }
              }}
              className={`w-[76px] h-[76px] sm:w-[105px] sm:h-[105px] md:w-[120px] md:h-[120px] transition-transform duration-300 pointer-events-auto cursor-pointer ${
                prefersReducedMotion
                  ? 'motion-reduce:transform-none motion-reduce:transition-none'
                  : 'hover:scale-105 active:scale-95'
              }`}
            >
              {/* Responsive Avatar bound directly to AvatarController ref */}
              <Avatar
                ref={controllerRef}
                definition={avatarDefinition}
                defaultAnimation={prefersReducedMotion ? undefined : 'idle'}
                defaultExpression={prefersReducedMotion ? 'neutral' : undefined}
                onExpressionChange={setCurrentExpression}
                size="100%"
                className="w-full h-full drop-shadow-md select-none"
                ariaLabel="Freddy animated mascot"
              />
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
