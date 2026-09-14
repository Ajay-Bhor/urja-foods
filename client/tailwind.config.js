/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Urja Natural Agricultural Greens (High-end Emerald Spectrum)
        urja: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Urja Energy Harvest Gold & Amber (Solar Energy & Grain)
        harvest: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        earth: {
          50: '#fbfbf9',
          100: '#f5f4ef',
          200: '#eae7dc',
          300: '#d5d0c0',
          800: '#2c3127',
          900: '#1a1f16',
          950: '#0d110b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'urja-sm': '0 2px 8px -1px rgba(22, 163, 74, 0.08)',
        'urja-md': '0 12px 24px -4px rgba(22, 163, 74, 0.12)',
        'urja-lg': '0 20px 35px -5px rgba(22, 163, 74, 0.18)',
        'glow-emerald': '0 0 30px -4px rgba(34, 197, 94, 0.35)',
        'glow-harvest': '0 0 30px -4px rgba(245, 158, 11, 0.4)',
        'glass-card': '0 8px 32px 0 rgba(15, 23, 42, 0.06)',
        'glass-hover': '0 20px 40px -12px rgba(20, 83, 45, 0.18)',
        'bento-elevated': '0 24px 48px -12px rgba(15, 23, 42, 0.12)',
      },
      backdropBlur: {
        'xs': '2px',
        '2xl': '40px',
      },
      maxWidth: {
        '7xl': '1600px',
        '8xl': '1760px',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-delayed': 'floatDelayed 7s ease-in-out 1.5s infinite',
        'float-fast': 'floatFast 3s ease-in-out infinite',
        'shimmer-beam': 'shimmerBeam 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'gradient-flow': 'gradientShift 6s ease infinite',
        'pulse-ripple': 'pulseRipple 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'sparkle-twinkle': 'sparkleTwinkle 2.5s ease-in-out infinite',
        'orb-float': 'orbFloat 18s ease-in-out infinite alternate',
      }
    },
  },
  plugins: [],
}
