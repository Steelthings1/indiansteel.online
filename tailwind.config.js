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
        steel: {
          50: '#f4f6f8',
          100: '#e5e9f0',
          200: '#cbd4e1',
          300: '#94a3b8',
          400: '#64748b',
          500: '#475569',
          600: '#334155',
          700: '#1e293b',
          800: '#0f172a',
          900: '#0b1120',
          950: '#060a12',
        },
        graphite: {
          50: '#1e222a',
          100: '#1a1d24',
          200: '#161920',
          300: '#13151b',
          400: '#0f1115',
          500: '#0a0c10',
        },
        brand: {
          orange: '#FF5500',
          'orange-hover': '#E04B00',
          'orange-light': '#FF6B1A',
          amber: '#F59E0B',
          silver: '#E2E8F0',
          metallic: '#8E9BAE',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'steel-pattern': "radial-gradient(circle at 50% 50%, rgba(255,85,0,0.05) 0%, transparent 60%), linear-gradient(to bottom, rgba(10,12,16,0.98), rgba(16,19,26,0.99))",
        'metallic-card': "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
        'metallic-glow': "linear-gradient(90deg, transparent 0%, rgba(255, 85, 0, 0.2) 50%, transparent 100%)",
        'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        'industrial': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
        'orange-glow': '0 0 25px rgba(255, 85, 0, 0.4)',
        'orange-glow-lg': '0 0 45px rgba(255, 85, 0, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spark-flare': 'spark 2s ease-in-out infinite alternate',
      },
      keyframes: {
        spark: {
          '0%': { opacity: '0.3', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
