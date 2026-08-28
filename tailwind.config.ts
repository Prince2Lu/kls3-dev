import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: false, // Thème sombre unique — pas de toggle
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        card: '#111111',
        accent: '#4B7BF5',
        foreground: '#F0EDE8',
        'foreground-muted': 'rgba(240,237,232,0.45)',
        kls: {
          bg: '#0D0D0D',
          card: '#111111',
          accent: '#4B7BF5',
          text: '#F0EDE8',
          muted: 'rgba(240,237,232,0.45)',
          border: 'rgba(255,255,255,0.07)',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
