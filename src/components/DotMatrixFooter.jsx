import React, { useEffect, useRef, useState } from 'react';

/**
 * DotMatrixFooter Component
 * Exact replication of Fourmula.ai Awwwards Site of the Day footer:
 * - Exact Heart from Fourmula.ai (Pattern 1)
 * - Exact Starburst / Cross from Fourmula.ai (Pattern 0)
 * - Exact Gem / Hourglass from Fourmula.ai (Pattern 2)
 * - Fashion Coat Hanger (clothing icon)
 * - Full NAVAYR Wordmark with complete "R"
 * - Interactive Cursor Magnification / Shrink Effect (dots shrink to 25% under cursor, matching Fourmula.ai MAX_DISTANCE=200, MIN_SCALE=0.25)
 * - Fourmula.ai Chaos Cloud & Stepped Digital Blinking Transition Loop
 * - Dynamic Dark Mode (#08060D, white dots) & Light Mode (#F6F6F8, black dots)
 * - Large, prominent dot matrix sizing
 */

const PATTERNS = [
  // 0: Heart (Exact 1:1 from Fourmula.ai Pattern 1)
  {
    name: 'heart',
    rows: [
      "------------------",
      "------------------",
      "------------------",
      "------------------",
      "------11--11------",
      "----1111111111----",
      "---111111111111---",
      "---111111111111---",
      "---111111111111---",
      "----1111111111----",
      "-----11111111-----",
      "------111111------",
      "-------1111-------",
      "--------11--------",
      "------------------",
      "------------------",
      "------------------",
      "------------------"
    ]
  },
  // 1: Clothing Hanger (Fashion / Apparel related)
  {
    name: 'hanger',
    rows: [
      "------------------",
      "------------------",
      "--------11--------",
      "-------1--1-------",
      "-------1----------",
      "--------11--------",
      "--------11--------",
      "-------1111-------",
      "------11--11------",
      "-----11----11-----",
      "----11------11----",
      "---11--------11---",
      "--11111111111111--",
      "--11111111111111--",
      "------------------",
      "------------------",
      "------------------",
      "------------------"
    ]
  },
  // 2: Fourmula Starburst / Cross (Exact 1:1 from Fourmula.ai Pattern 0)
  {
    name: 'fourmulaStar',
    rows: [
      "------------------",
      "------------------",
      "------------------",
      "--------11--------",
      "-----1--11--1-----",
      "----111-11-111----",
      "-----11----11-----",
      "------------------",
      "---111------111---",
      "---111------111---",
      "------------------",
      "-----11----11-----",
      "----111-11-111----",
      "-----1--11--1-----",
      "--------11--------",
      "--------11--------",
      "------------------",
      "------------------"
    ]
  },
  // 3: Fourmula Gem / Hourglass (Exact 1:1 from Fourmula.ai Pattern 2)
  {
    name: 'gem',
    rows: [
      "------------------",
      "------------------",
      "------------------",
      "--------1---------",
      "--------11--------",
      "--------11--------",
      "-------1111-------",
      "------111111------",
      "----1111--11111---",
      "---11111--1111----",
      "------111111------",
      "-------1111-------",
      "--------11--------",
      "--------11--------",
      "---------1--------",
      "------------------",
      "------------------",
      "------------------"
    ]
  },
  // 4: Complete NAVAYR Wordmark (Full "R" clearly visible)
  {
    name: 'navayrWord',
    rows: [
      "----------------------------",
      "----------------------------",
      "----------------------------",
      "----------------------------",
      "----------------------------",
      "----------------------------",
      "-1--1--11--1-1--11--1-1-111-",
      "-11-1-1--1-1-1-1--1-1-1-1--1",
      "-1-11-1111-1-1-1111--1--111-",
      "-1--1-1--1-1-1-1--1--1--1-1-",
      "-1--1-1--1--1--1--1--1--1--1",
      "----------------------------",
      "----------------------------",
      "----------------------------",
      "----------------------------",
      "----------------------------",
      "----------------------------",
      "----------------------------"
    ]
  }
];

export default function DotMatrixFooter() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isInside: false });

  // Theme Detection: Synchronized with document theme
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      const theme = document.documentElement.dataset.theme;
      if (theme === 'dark') return true;
      if (theme === 'light') return false;
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  const isDarkRef = useRef(isDark);
  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const handleThemeUpdate = () => {
      const theme = document.documentElement.dataset.theme;
      const isDarkActive = theme === 'dark' || 
        (!theme && document.documentElement.classList.contains('dark')) ||
        (!theme && !document.documentElement.classList.contains('light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setIsDark(isDarkActive);
    };

    handleThemeUpdate();
    const observer = new MutationObserver(handleThemeUpdate);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class']
    });

    return () => observer.disconnect();
  }, []);

  // Main Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let isVisible = true;
    let prefersReducedMotion = false;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion = motionQuery.matches;
    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Grid Dot Memory State
    let dots = [];
    let cols = 0;
    const ROWS = 16; // 16 rows for generous vertical height
    const GROUPS = 20; // 20 staggered groups matching Fourmula.ai

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Dot spacing matching Fourmula.ai prominent grid
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;
      const spacing = isMobile ? 16 : (isTablet ? 22 : 26);

      cols = Math.floor(width / spacing);
      if (cols % 2 === 0) cols += 1;

      const gridWidth = (cols - 1) * spacing;
      const gridHeight = (ROWS - 1) * spacing;
      const offsetX = (width - gridWidth) / 2;
      const offsetY = (height - gridHeight) / 2;

      dots = [];
      const total = cols * ROWS;

      for (let i = 0; i < total; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const group = (col * 7 + row * 13 + (col ^ row)) % GROUPS;

        dots.push({
          col,
          row,
          x: offsetX + col * spacing,
          y: offsetY + row * spacing,
          intensity: 0.15,
          targetIntensity: 0.15,
          scale: 1.0,
          group,
          blinkTimer: Math.random() * 10,
          blinkSpeed: 0.08 + Math.random() * 0.08
        });
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // Mouse Tracking for Cursor Shrink Effect (Fourmula.ai: MIN_SCALE=0.25, MAX_DISTANCE=200)
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= -40 && x <= rect.width + 40 && y >= -40 && y <= rect.height + 40) {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
        mouseRef.current.isInside = true;
      } else {
        mouseRef.current.isInside = false;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isInside = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Viewport IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Exact Pattern Coordinate Mapping centered on (cx, cy)
    const getPatternSet = (patternObj, gridCols, gridRows) => {
      const patternRows = patternObj.rows;
      const pHeight = patternRows.length;
      const pWidth = patternRows[0].length;

      const cx = Math.floor(gridCols / 2);
      const cy = Math.floor(gridRows / 2);

      const startCol = cx - Math.floor(pWidth / 2);
      const startRow = cy - Math.floor(pHeight / 2);

      const set = new Set();
      for (let r = 0; r < pHeight; r++) {
        for (let c = 0; c < pWidth; c++) {
          if (patternRows[r][c] === '1') {
            set.add(`${startCol + c}:${startRow + r}`);
          }
        }
      }
      return set;
    };

    // Fourmula Timing Cycle
    const FIGURE_PAUSE = 2400; // ms holding shape
    const CLOUD_DURATION = 1000; // ms chaos cloud
    const CYCLE_DURATION = FIGURE_PAUSE + CLOUD_DURATION;

    const startTime = performance.now();

    const render = (now) => {
      animFrameRef.current = requestAnimationFrame(render);
      if (!isVisible) return;

      const elapsed = now - startTime;
      const dark = isDarkRef.current;
      const isMobile = width < 640;

      // Theme background
      ctx.fillStyle = dark ? '#08060D' : '#F6F6F8';
      ctx.fillRect(0, 0, width, height);

      const cx = Math.floor(cols / 2);
      const cy = Math.floor(ROWS / 2);
      const CLOUD_RADIUS = isMobile ? 8 : 12;

      let patternIndex = 0;
      let isCloudPhase = false;

      if (!prefersReducedMotion) {
        const totalCycleTime = elapsed % (PATTERNS.length * CYCLE_DURATION);
        patternIndex = Math.floor(totalCycleTime / CYCLE_DURATION) % PATTERNS.length;
        const timeInCurrentCycle = totalCycleTime % CYCLE_DURATION;

        isCloudPhase = timeInCurrentCycle >= FIGURE_PAUSE;
      }

      const activePatternSet = getPatternSet(PATTERNS[patternIndex], cols, ROWS);

      // Fourmula Dot Radii
      const baseRadius = isMobile ? 2.6 : 4.2;
      const activeRadius = isMobile ? 4.8 : 7.6;

      // Mouse Shrink parameters (Fourmula.ai exact values)
      const mouse = mouseRef.current;
      const MAX_DISTANCE = 190;
      const MIN_SCALE = 0.25;

      const len = dots.length;
      for (let i = 0; i < len; i++) {
        const dot = dots[i];
        const key = `${dot.col}:${dot.row}`;
        const isPatternDot = activePatternSet.has(key);

        dot.blinkTimer += dot.blinkSpeed;

        if (prefersReducedMotion) {
          dot.targetIntensity = isPatternDot ? 1.0 : 0.15;
          dot.intensity = dot.targetIntensity;
        } else if (isCloudPhase) {
          // Cloud Phase: Randomized blinking chaos cloud (Fourmula showCloud)
          const dx = dot.col - cx;
          const dy = dot.row - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const coreFactor = Math.max(0, 1 - dist / CLOUD_RADIUS);

          // Digital stepped flicker
          const flicker = Math.sin(dot.blinkTimer * 4.5) > 0.15 ? 0.3 : -0.15;
          const cloudIntensity = 0.15 + coreFactor * 0.72 + flicker;
          dot.targetIntensity = Math.min(1, Math.max(0.15, cloudIntensity));
        } else {
          // Pattern Phase: Active dots snap to high intensity with subtle micro-blink
          if (isPatternDot) {
            const subtleBreathe = 0.04 * Math.sin(dot.blinkTimer + dot.group);
            dot.targetIntensity = 0.96 + subtleBreathe;
          } else {
            dot.targetIntensity = 0.15;
          }
        }

        // Stepped / Lerped Blinking Easing
        const lerpRate = isCloudPhase ? 0.22 : 0.14;
        dot.intensity += (dot.targetIntensity - dot.intensity) * lerpRate;

        // Mouse hover shrink calculation (Dots get small under cursor!)
        let targetScale = 1.0;
        if (mouse.isInside) {
          const mdx = dot.x - mouse.x;
          const mdy = dot.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < MAX_DISTANCE) {
            targetScale = 1 - (1 - MIN_SCALE) * ((MAX_DISTANCE - mdist) / MAX_DISTANCE);
            targetScale = Math.max(MIN_SCALE, Math.min(1.0, targetScale));
          }
        }
        dot.scale += (targetScale - dot.scale) * 0.25;

        // Final radius with intensity expansion and mouse shrink
        const intensity = Math.min(1, Math.max(0.15, dot.intensity));
        const normalized = (intensity - 0.15) / 0.85;
        const radius = (baseRadius + (activeRadius - baseRadius) * Math.pow(normalized, 0.85)) * dot.scale;

        // Color and Opacity based on Dark vs Light Mode
        let fillStyle = '';
        if (dark) {
          const alpha = 0.12 + normalized * 0.88;
          fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
        } else {
          const red = Math.round(212 - normalized * 203);
          const green = Math.round(212 - normalized * 203);
          const blue = Math.round(216 - normalized * 205);
          const alpha = 0.20 + normalized * 0.80;
          fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha.toFixed(3)})`;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
      observer.disconnect();
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section 
      aria-label="Fourmula Animated Dot Matrix Effect"
      className={`w-full ${
        isDark 
          ? 'bg-[#08060D] border-t border-white/10 text-[#F7F4EE]' 
          : 'bg-[#F6F6F8] border-t border-black/10 text-[#18181B]'
      } overflow-hidden select-none transition-colors duration-300`}
    >
      {/* Top Editorial Metadata Bar (Cleanly Contained) */}
      <div className={`max-w-7xl mx-auto px-6 pt-6 sm:pt-8 pb-3 sm:pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-xs font-mono uppercase tracking-widest ${
        isDark ? 'text-[#8E8A96] border-b border-white/10' : 'text-[#71717A] border-b border-[#E4E4E7]'
      } gap-2`}>
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-[#FF6B02]' : 'bg-[#18181B]'} animate-pulse`} />
          <span className={`font-bold ${isDark ? 'text-[#F7F4EE]' : 'text-[#18181B]'}`}>
            © 2026 NAVAYR. ALL RIGHTS RESERVED.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>THE INTELLIGENT FASHION LAYER</span>
          <span className="hidden md:inline opacity-30">/</span>
          <span className="hidden md:inline font-mono">STYLE MATRIX 01</span>
        </div>
      </div>

      {/* Full-Width Canvas Grid - Prominent Large Dot Display */}
      <div 
        ref={containerRef} 
        className="w-full h-[320px] sm:h-[380px] md:h-[440px] relative overflow-hidden flex items-center justify-center cursor-default"
      >
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block" 
        />
      </div>
    </section>
  );
}
