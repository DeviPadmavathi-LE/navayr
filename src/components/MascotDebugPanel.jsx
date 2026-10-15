import React, { useState, useEffect } from 'react';
import { useMascot, MASCOT_PRIORITY } from '../context/MascotContext';

export default function MascotDebugPanel() {
  const {
    currentAnimation,
    currentExpression,
    currentPriority,
    lastCommandResult,
    statusMessage,
    allAnimations,
    hasAnimation,
    setFreddyState,
    resetToIdle,
    triggerInitialLoad,
    triggerMascotClick,
    triggerTypingStart,
    triggerTypingPause,
    triggerSearchStart,
    triggerProcessing,
    triggerSuccessResponse,
    triggerRequestFailed,
    triggerUnexpectedResult,
    triggerTaskCompleted,
  } = useMascot();

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show panel if Vite DEV mode or if URL has debug query/hash
  useEffect(() => {
    const isDev = import.meta.env.DEV;
    const hasDebugQuery = typeof window !== 'undefined' && 
      (new URLSearchParams(window.location.search).has('debug') || window.location.hash.includes('debug'));
    setIsVisible(Boolean(isDev || hasDebugQuery));
  }, []);

  if (!isVisible) return null;

  const currentExistsInJson = hasAnimation(currentAnimation);
  const isRendererAccepted = lastCommandResult?.ok === true;
  const rendererError = lastCommandResult?.error ? JSON.stringify(lastCommandResult.error) : 'None';

  return (
    <div className="fixed bottom-4 left-4 z-50 font-mono text-xs select-none">
      {/* Collapsed Toggle Pill */}
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#0d0d12]/95 text-white border border-[#FF6B02]/50 shadow-2xl hover:border-[#FF6B02] hover:bg-[#151520] transition-all cursor-pointer group"
          title="Open Freddy Mascot Animation Lab"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B02] animate-ping" />
          <span className="font-bold tracking-wider text-[11px] text-[#FF6B02]">FREDDY LAB</span>
          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/80">
            {currentAnimation}
          </span>
        </button>
      ) : (
        /* Expanded Debug Panel Window */
        <div className="w-[calc(100vw-2rem)] max-w-[360px] sm:max-w-none sm:w-[420px] max-h-[85vh] flex flex-col rounded-2xl bg-[#0d0d14]/98 text-white border border-[#FF6B02]/40 shadow-2xl backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#151522] border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B02]" />
              <span className="font-bold text-[12px] tracking-wide text-white">FREDDY ANIMATION LAB</span>
              <span className="text-[10px] text-[#FF6B02] font-semibold bg-[#FF6B02]/15 px-2 py-0.5 rounded">
                23 Anims
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Close panel"
            >
              ✕
            </button>
          </div>

          <div className="p-4 overflow-y-auto space-y-4 max-h-[calc(85vh-56px)]">
            
            {/* Live Status Card */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-[11px]">
              <div className="flex justify-between items-center">
                <span className="text-white/60">Active Animation:</span>
                <span className="font-bold text-[#FF6B02] px-2 py-0.5 rounded bg-[#FF6B02]/10">
                  {currentAnimation}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Active Expression:</span>
                <span className="font-semibold text-emerald-400">
                  {currentExpression || 'neutral'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Exists in JSON:</span>
                <span className={currentExistsInJson ? 'text-emerald-400 font-semibold' : 'text-red-400 font-semibold'}>
                  {currentExistsInJson ? '✓ Yes' : '✗ Not Found'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Renderer Accepted:</span>
                <span className={isRendererAccepted ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-semibold'}>
                  {isRendererAccepted ? '✓ Accepted (ok: true)' : '✗ Not Accepted'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/60">Speech Bubble:</span>
                <span className="text-white/80 italic max-w-[200px] truncate">
                  {statusMessage || 'None'}
                </span>
              </div>
              {rendererError !== 'None' && (
                <div className="mt-1 p-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[10px]">
                  <strong>Error:</strong> {rendererError}
                </div>
              )}
            </div>

            {/* Main Action Bar */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={resetToIdle}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md text-center"
              >
                ↺ Reset to Idle
              </button>
            </div>

            {/* Website Trigger Sequences Testing */}
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#FF6B02] mb-2">
                Simulate Website Events
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <button
                  type="button"
                  onClick={triggerInitialLoad}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
                  title="Page Load: waking -> idle"
                >
                  <span className="text-[#FF6B02] font-bold">1. Page Load</span>
                  <div className="text-[9px] text-white/50">waking → idle</div>
                </button>
                <button
                  type="button"
                  onClick={triggerMascotClick}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
                  title="Click: surprised -> happy -> idle"
                >
                  <span className="text-[#FF6B02] font-bold">2. Click Mascot</span>
                  <div className="text-[9px] text-white/50">surprised → happy → idle</div>
                </button>
                <button
                  type="button"
                  onClick={triggerTypingStart}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
                  title="Typing Start: listening"
                >
                  <span className="text-[#FF6B02] font-bold">3. Start Typing</span>
                  <div className="text-[9px] text-white/50">listening</div>
                </button>
                <button
                  type="button"
                  onClick={triggerTypingPause}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
                  title="Typing Pause: thinking"
                >
                  <span className="text-[#FF6B02] font-bold">4. Pause Typing</span>
                  <div className="text-[9px] text-white/50">thinking</div>
                </button>
                <button
                  type="button"
                  onClick={triggerSearchStart}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
                  title="Search: searching"
                >
                  <span className="text-[#FF6B02] font-bold">5. Search Start</span>
                  <div className="text-[9px] text-white/50">searching</div>
                </button>
                <button
                  type="button"
                  onClick={() => triggerProcessing('working')}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
                  title="AI Processing: working"
                >
                  <span className="text-[#FF6B02] font-bold">6. AI Processing</span>
                  <div className="text-[9px] text-white/50">working</div>
                </button>
                <button
                  type="button"
                  onClick={triggerSuccessResponse}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
                  title="Success: happy -> idle"
                >
                  <span className="text-emerald-400 font-bold">7. Search Success</span>
                  <div className="text-[9px] text-white/50">happy → idle</div>
                </button>
                <button
                  type="button"
                  onClick={() => triggerRequestFailed('Form Error 🧐')}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
                  title="Error: confused -> sad -> idle"
                >
                  <span className="text-red-400 font-bold">8. Request Fail</span>
                  <div className="text-[9px] text-white/50">confused → sad → idle</div>
                </button>
                <button
                  type="button"
                  onClick={() => triggerUnexpectedResult('Surprise!')}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
                  title="Unexpected: surprised -> idle"
                >
                  <span className="text-amber-400 font-bold">9. Unexpected</span>
                  <div className="text-[9px] text-white/50">surprised → idle</div>
                </button>
                <button
                  type="button"
                  onClick={() => triggerTaskCompleted('Joined VIP list! 🎉')}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-colors cursor-pointer"
                  title="Task Completed: celebrate -> happy -> idle"
                >
                  <span className="text-purple-400 font-bold">10. VIP Confirmed</span>
                  <div className="text-[9px] text-white/50">celebrate → happy → idle</div>
                </button>
              </div>
            </div>

            {/* All 23 Animations Grid */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF6B02]">
                  All 23 Animations
                </span>
                <span className="text-[9px] text-white/40">
                  Click to play on Freddy
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {allAnimations.map((animKey) => {
                  const isActive = currentAnimation === animKey;
                  return (
                    <button
                      key={animKey}
                      type="button"
                      onClick={() => {
                        setFreddyState(animKey, {
                          priority: MASCOT_PRIORITY.DEBUG,
                          force: true,
                          status: `Playing: ${animKey}`,
                        });
                      }}
                      className={`p-1.5 rounded text-[11px] text-center font-medium transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#FF6B02] text-black border-[#FF6B02] font-bold shadow-md shadow-[#FF6B02]/30 scale-[1.02]'
                          : 'bg-white/5 hover:bg-white/12 text-white/80 border-white/10 hover:border-white/20'
                      }`}
                    >
                      {animKey}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
