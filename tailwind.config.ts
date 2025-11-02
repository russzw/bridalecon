import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          900: '#4B0082',
          800: '#8A2BE2',
          700: '#D8BFD8',
          600: '#E6E6FA',
        },
        lilac: {
          300: '#D8BFD8',
          200: '#E6E6FA',
        },
        black: '#000000',
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
