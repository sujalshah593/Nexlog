// tailwind.config.mjs
export default {
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
        'pulse-fast': 'pulse-fast 1s ease-in-out infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'pulse-fast': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
