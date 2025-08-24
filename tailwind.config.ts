import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-beige': '#E6EAD7',
        'vibrant-orange': '#D95323',
        'warm-yellow': '#F2C94C',
        'dark-green': '#29432B',
        // Enhanced color palette with better contrast
        'light-beige-50': '#F7F8F4',
        'light-beige-100': '#F0F2E9',
        'light-beige-200': '#E6EAD7',
        'light-beige-300': '#D8DCC8',
        'vibrant-orange-50': '#FEF2F0',
        'vibrant-orange-100': '#FDE4E0',
        'vibrant-orange-200': '#FBC7BC',
        'vibrant-orange-300': '#F8A395',
        'vibrant-orange-400': '#F47A66',
        'vibrant-orange-500': '#D95323',
        'vibrant-orange-600': '#C44A1F',
        'warm-yellow-50': '#FFFBEB',
        'warm-yellow-100': '#FEF3C7',
        'warm-yellow-200': '#FDE68A',
        'warm-yellow-300': '#FCD34D',
        'warm-yellow-400': '#F2C94C',
        'warm-yellow-500': '#EAB308',
        'dark-green-50': '#F0F4F0',
        'dark-green-100': '#E1E9E1',
        'dark-green-200': '#C3D3C3',
        'dark-green-300': '#A5BDA5',
        'dark-green-400': '#87A787',
        'dark-green-500': '#29432B',
        'dark-green-600': '#1F331F',
      },
      fontFamily: {
        sans: 'var(--font-geist), sans-serif',
        display: 'var(--font-adumu), sans-serif',
      },
      fontSize: {
        // Enhanced typography scale for better readability
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.025em' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0.025em' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.025em' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0.025em' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '0.025em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '0.025em' }],
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '0.025em' }],
      },
      spacing: {
        // Enhanced spacing system for consistent layouts
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        // Enhanced shadow system for better depth
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        // Enhanced border radius for consistent rounded corners
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
