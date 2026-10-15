/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme variables mapping
        theme: {
          bg: 'var(--bg-main)',
          surface: 'var(--bg-surface)',
          card: 'var(--bg-card)',
          elevated: 'var(--bg-elevated)',
          text: 'var(--text-primary)',
          muted: 'var(--text-muted)',
          border: 'var(--border-subtle)',
          'border-strong': 'var(--border-strong)',
          accent: 'var(--accent)',
          'accent-hover': 'var(--accent-hover)',
          glass: 'var(--overlay-glass)',
          menu: 'var(--overlay-menu)',
        },

        // Direct Orange Brand Token
        orange: {
          DEFAULT: '#FF6B02',
          light: '#FF852E',
          dark: '#E05D00',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        editorial: ['"Instrument Serif"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scanLine: {
          '0%': { transform: 'translateY(0%)', opacity: '0' },
          '15%': { opacity: '1' },
          '85%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        scanLine: 'scanLine 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
