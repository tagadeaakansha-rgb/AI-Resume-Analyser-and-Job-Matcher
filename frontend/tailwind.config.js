/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          void: '#02050e',
          black: '#030712',
          card: '#081026',
          border: '#16284f',
          glow: '#00f0ff',
          neon: '#38bdf8',
          electric: '#2563eb',
          deep: '#0b1633',
        },
        midnight: {
          950: '#040817',
          900: '#070f26',
          850: '#0b1638',
          800: '#0f204d',
          700: '#172f6e',
          600: '#1f3e8f',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-mesh': 'radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.15), transparent 50%), radial-gradient(circle at 100% 100%, rgba(59, 130, 246, 0.12), transparent 40%)',
      },
      animation: {
        'scan-line': 'scan 3s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0%)' },
          '50%': { transform: 'translateY(100%)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(56, 189, 248, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.8))' },
        }
      }
    },
  },
  plugins: [],
}
