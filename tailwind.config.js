/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    fontFamily: {
      narrow: ["var(--font-ptsans-narrow)"],
      sans: ["var(--font-roboto-condensed)"],
      blackout: ['"Blackout 2AM"', "sans-serif"],
    },
    colors: {
      perecred: "#d41d1d",
    },
  },
};
export const plugins = [];
