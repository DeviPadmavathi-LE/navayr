import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import avatarJson from '../freddy.avatar.json';

const MascotContext = createContext(null);

// Priority levels: higher priority events override lower priority events
export const MASCOT_PRIORITY = {
  IDLE: 1,        // idle, bored, drowsy
  TYPING: 2,      // listening, typing-paused thinking
  PROCESSING: 3,  // searching, working (AI request processing)
  ACTION: 4,      // clicks, form errors, successes, tasks completed
  DEBUG: 5,       // debug panel manual controls
};

export function MascotProvider({ children }) {
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [currentExpression, setCurrentExpression] = useState('neutral');
  const [currentPriority, setCurrentPriority] = useState(MASCOT_PRIORITY.IDLE);
  const [statusMessage, setStatusMessage] = useState(null);
  const [lastCommandResult, setLastCommandResult] = useState({ ok: true });
  const [isMinimized, setIsMinimized] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // References
  const controllerRef = useRef(null);
  const sequenceTimerRef = useRef(null);
  const sequenceIdRef = useRef(0);
  const inactivityTimerRef = useRef(null);
  const typingTimerRef = useRef(null);
  const typingIdleTimerRef = useRef(null);
  const isInactiveRef = useRef(false);
  const currentPriorityRef = useRef(MASCOT_PRIORITY.IDLE);

  // Keep priority ref in sync
  useEffect(() => {
    currentPriorityRef.current = currentPriority;
  }, [currentPriority]);

  // Check system reduced-motion preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        controllerRef.current?.setExpression('neutral');
      } else {
        controllerRef.current?.play('idle');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Validation helpers
  const hasAnimation = useCallback((name) => {
    return Boolean(avatarJson.animations && avatarJson.animations[name]);
  }, []);

  // Clear all pending transition and sequence timers
  const clearSequenceTimers = useCallback(() => {
    if (sequenceTimerRef.current) {
      clearTimeout(sequenceTimerRef.current);
      sequenceTimerRef.current = null;
    }
  }, []);

  /**
   * Central animation dispatcher.
   * Plays the specified animation on Freddy, respects priority hierarchy,
   * supports step chaining and auto-fallback to resting states.
   */
  const setFreddyState = useCallback((target, options = {}) => {
    if (prefersReducedMotion) return;

    const {
      priority = MASCOT_PRIORITY.ACTION,
      durationMs,
      next,
      status,
      force = false,
    } = options;

    // Check priority hierarchy unless forced
    if (!force && priority < currentPriorityRef.current) {
      return;
    }

    if (!hasAnimation(target)) {
      console.warn(`[Freddy Controller] Animation "${target}" does not exist in avatar JSON.`);
      setLastCommandResult({
        ok: false,
        error: { code: 'unknown_animation', message: `Animation "${target}" not found in freddy.avatar.json` },
      });
      return;
    }

    // Invalidate any previously running sequence
    clearSequenceTimers();
    const thisSequenceId = ++sequenceIdRef.current;

    // Update state tracking
    setCurrentAnimation(target);
    setCurrentPriority(priority);
    setStatusMessage(status || null);

    // Play animation on controller
    if (controllerRef.current) {
      const result = controllerRef.current.play(target);
      setLastCommandResult(result);
      if (!result.ok) {
        console.warn(`[Freddy Controller] Playback failed for "${target}":`, result.error);
      } else {
        // Read active expression from controller state
        const state = controllerRef.current.getState();
        if (state?.activeExpression) {
          setCurrentExpression(state.activeExpression);
        }
      }
    }

    // Schedule next animation in sequence if defined
    if (durationMs && next) {
      sequenceTimerRef.current = setTimeout(() => {
        // Ensure this sequence hasn't been superseded
        if (sequenceIdRef.current !== thisSequenceId) return;

        if (Array.isArray(next)) {
          if (next.length === 0) {
            setFreddyState('idle', { priority: MASCOT_PRIORITY.IDLE, force: true });
          } else {
            const [first, ...rest] = next;
            const nextKey = typeof first === 'string' ? first : first.animation;
            const nextDuration = typeof first === 'object' ? first.durationMs : undefined;
            const nextStatus = typeof first === 'object' ? first.status : undefined;
            setFreddyState(nextKey, {
              priority,
              durationMs: nextDuration,
              next: rest.length > 0 ? rest : (nextKey === 'idle' ? undefined : 'idle'),
              status: nextStatus,
              force: true,
            });
          }
        } else {
          const nextKey = typeof next === 'string' ? next : next.animation;
          const nextDuration = typeof next === 'object' ? next.durationMs : undefined;
          const nextStatus = typeof next === 'object' ? next.status : undefined;
          const isReturningToIdle = nextKey === 'idle';

          setFreddyState(nextKey, {
            priority: isReturningToIdle ? MASCOT_PRIORITY.IDLE : priority,
            durationMs: nextDuration,
            next: isReturningToIdle ? undefined : 'idle',
            status: nextStatus,
            force: true,
          });
        }
      }, durationMs);
    }
  }, [hasAnimation, prefersReducedMotion, clearSequenceTimers]);

  // Reset directly to idle resting state
  const resetToIdle = useCallback(() => {
    clearSequenceTimers();
    sequenceIdRef.current++;
    setFreddyState('idle', { priority: MASCOT_PRIORITY.IDLE, force: true, status: null });
  }, [clearSequenceTimers, setFreddyState]);

  // Trigger 1: Initial page load: waking (2600ms) → idle
  const triggerInitialLoad = useCallback(() => {
    setFreddyState('waking', {
      priority: MASCOT_PRIORITY.ACTION,
      durationMs: 2600,
      next: 'idle',
      status: 'Waking up...',
      force: true,
    });
  }, [setFreddyState]);

  // Trigger 2: User clicks Freddy: surprised (1800ms) → happy (2400ms) → idle
  const triggerMascotClick = useCallback(() => {
    setFreddyState('surprised', {
      priority: MASCOT_PRIORITY.ACTION,
      durationMs: 1800,
      next: [
        { animation: 'happy', durationMs: 2400, status: 'Glad you stopped by!' },
        { animation: 'idle', status: null },
      ],
      status: 'Whoa! Hey! 👋',
      force: true,
    });
  }, [setFreddyState]);

  // Trigger 3: User starts typing: listening
  const triggerTypingStart = useCallback(() => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    if (typingIdleTimerRef.current) clearTimeout(typingIdleTimerRef.current);

    setFreddyState('listening', {
      priority: MASCOT_PRIORITY.TYPING,
      status: 'Listening...',
    });
  }, [setFreddyState]);

  // Trigger 4: User stops typing briefly: thinking (debounced)
  const triggerTypingPause = useCallback(() => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    if (typingIdleTimerRef.current) clearTimeout(typingIdleTimerRef.current);

    typingTimerRef.current = setTimeout(() => {
      setFreddyState('thinking', {
        priority: MASCOT_PRIORITY.TYPING,
        status: 'Thinking...',
      });

      // After 3.5 seconds of no activity, revert back to idle
      typingIdleTimerRef.current = setTimeout(() => {
        resetToIdle();
      }, 3500);
    }, 750);
  }, [setFreddyState, resetToIdle]);

  // Trigger 5: Search or retrieval begins: searching
  const triggerSearchStart = useCallback(() => {
    setFreddyState('searching', {
      priority: MASCOT_PRIORITY.PROCESSING,
      status: 'Searching styles...',
      force: true,
    });
  }, [setFreddyState]);

  // Trigger 6: AI request is processing: working or thinking
  const triggerProcessing = useCallback((type = 'working') => {
    const targetAnim = type === 'thinking' ? 'thinking' : 'working';
    setFreddyState(targetAnim, {
      priority: MASCOT_PRIORITY.PROCESSING,
      status: targetAnim === 'thinking' ? 'Thinking...' : 'Working on it...',
      force: true,
    });
  }, [setFreddyState]);

  // Trigger 7: Successful response: happy (2500ms) → idle
  const triggerSuccessResponse = useCallback(() => {
    setFreddyState('happy', {
      priority: MASCOT_PRIORITY.ACTION,
      durationMs: 2500,
      next: 'idle',
      status: 'Found great matches! ✨',
      force: true,
    });
  }, [setFreddyState]);

  // Trigger 8: Request fails: confused (2000ms) → sad (2500ms) → idle
  const triggerRequestFailed = useCallback((msg = 'Check the form 🧐') => {
    setFreddyState('confused', {
      priority: MASCOT_PRIORITY.ACTION,
      durationMs: 2000,
      next: [
        { animation: 'sad', durationMs: 2500, status: 'Need a valid entry...' },
        { animation: 'idle', status: null },
      ],
      status: msg,
      force: true,
    });
  }, [setFreddyState]);

  // Trigger 9: Unexpected result: surprised (2200ms) → idle
  const triggerUnexpectedResult = useCallback((msg = 'Unexpected result!') => {
    setFreddyState('surprised', {
      priority: MASCOT_PRIORITY.ACTION,
      durationMs: 2200,
      next: 'idle',
      status: msg,
      force: true,
    });
  }, [setFreddyState]);

  // Trigger 10: Important task completed: celebrate (2800ms) → happy (2400ms) → idle
  const triggerTaskCompleted = useCallback((msg = 'Awesome! VIP Confirmed 🎉') => {
    setFreddyState('celebrate', {
      priority: MASCOT_PRIORITY.ACTION,
      durationMs: 2800,
      next: [
        { animation: 'happy', durationMs: 2400, status: 'You are on the list!' },
        { animation: 'idle', status: null },
      ],
      status: msg,
      force: true,
    });
  }, [setFreddyState]);

  // Trigger 11 & 12: Inactivity Detection (bored at 30s → drowsy at 65s → waking/happy on return)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let boredTimeout = null;
    let drowsyTimeout = null;

    const resetInactivityTimer = () => {
      // Do not interrupt active processing tasks
      if (currentPriorityRef.current >= MASCOT_PRIORITY.PROCESSING) {
        return;
      }

      if (isInactiveRef.current) {
        isInactiveRef.current = false;
        // User returned after inactivity: play waking or happy → idle
        setFreddyState('waking', {
          priority: MASCOT_PRIORITY.ACTION,
          durationMs: 2200,
          next: 'idle',
          status: 'Welcome back!',
          force: true,
        });
      }

      if (boredTimeout) clearTimeout(boredTimeout);
      if (drowsyTimeout) clearTimeout(drowsyTimeout);

      // Inactivity step 1: bored after 30 seconds
      boredTimeout = setTimeout(() => {
        if (currentPriorityRef.current <= MASCOT_PRIORITY.IDLE) {
          isInactiveRef.current = true;
          setFreddyState('bored', {
            priority: MASCOT_PRIORITY.IDLE,
            status: 'Taking a breather...',
            force: true,
          });

          // Inactivity step 2: drowsy after additional 35 seconds (65s total)
          drowsyTimeout = setTimeout(() => {
            if (isInactiveRef.current && currentPriorityRef.current <= MASCOT_PRIORITY.IDLE) {
              setFreddyState('drowsy', {
                priority: MASCOT_PRIORITY.IDLE,
                status: 'Catching Zzzs...',
                force: true,
              });
            }
          }, 35000);
        }
      }, 30000);
    };

    const throttledEvents = ['mousemove', 'keydown', 'scroll', 'touchstart'];
    let lastActivityTime = 0;
    const handleActivity = () => {
      const now = Date.now();
      if (now - lastActivityTime > 400) {
        lastActivityTime = now;
        resetInactivityTimer();
      }
    };

    throttledEvents.forEach((ev) => window.addEventListener(ev, handleActivity, { passive: true }));
    resetInactivityTimer();

    return () => {
      if (boredTimeout) clearTimeout(boredTimeout);
      if (drowsyTimeout) clearTimeout(drowsyTimeout);
      throttledEvents.forEach((ev) => window.removeEventListener(ev, handleActivity));
    };
  }, [setFreddyState]);

  // Clean up all timers on unmount
  useEffect(() => {
    return () => {
      clearSequenceTimers();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (typingIdleTimerRef.current) clearTimeout(typingIdleTimerRef.current);
    };
  }, [clearSequenceTimers]);

  // Compatibility helpers matching previously used API
  const triggerIdle = resetToIdle;
  const triggerLoading = useCallback((maxMs) => triggerProcessing('thinking'), [triggerProcessing]);
  const triggerSuccess = useCallback((dur) => triggerTaskCompleted(), [triggerTaskCompleted]);
  const triggerError = useCallback((dur) => triggerRequestFailed(), [triggerRequestFailed]);
  const playAnimation = useCallback((name) => setFreddyState(name, { priority: MASCOT_PRIORITY.ACTION, force: true }), [setFreddyState]);

  const value = {
    controllerRef,
    currentAnimation,
    currentExpression,
    currentPriority,
    statusMessage,
    lastCommandResult,
    isMinimized,
    setIsMinimized,
    prefersReducedMotion,
    avatarDefinition: avatarJson,
    allAnimations: avatarJson.animationOrder || Object.keys(avatarJson.animations || {}),
    allExpressions: avatarJson.expressionOrder || Object.keys(avatarJson.expressions || {}),
    hasAnimation,
    setFreddyState,
    resetToIdle,
    // Specific triggers
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
    // Legacy fallbacks
    triggerIdle,
    triggerLoading,
    triggerSuccess,
    triggerError,
    playAnimation,
    setCurrentExpression,
  };

  return (
    <MascotContext.Provider value={value}>
      {children}
    </MascotContext.Provider>
  );
}

export function useMascot() {
  const context = useContext(MascotContext);
  if (!context) {
    return {
      controllerRef: { current: null },
      currentAnimation: 'idle',
      currentExpression: 'neutral',
      currentPriority: MASCOT_PRIORITY.IDLE,
      statusMessage: null,
      lastCommandResult: { ok: true },
      isMinimized: false,
      setIsMinimized: () => {},
      prefersReducedMotion: false,
      avatarDefinition: avatarJson,
      allAnimations: [],
      allExpressions: [],
      hasAnimation: () => false,
      setFreddyState: () => {},
      resetToIdle: () => {},
      triggerInitialLoad: () => {},
      triggerMascotClick: () => {},
      triggerTypingStart: () => {},
      triggerTypingPause: () => {},
      triggerSearchStart: () => {},
      triggerProcessing: () => {},
      triggerSuccessResponse: () => {},
      triggerRequestFailed: () => {},
      triggerUnexpectedResult: () => {},
      triggerTaskCompleted: () => {},
      triggerIdle: () => {},
      triggerLoading: () => {},
      triggerSuccess: () => {},
      triggerError: () => {},
      playAnimation: () => {},
      setCurrentExpression: () => {},
    };
  }
  return context;
}
