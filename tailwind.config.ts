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
      },
      fontFamily: {
        sans: 'var(--font-geist), sans-serif',
        display: 'var(--font-adumu), sans-serif',
      },
    },
  },
  plugins: [],
};

export default config;
