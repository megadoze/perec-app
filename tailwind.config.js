/** @type {import('tailwindcss').Config} */
export const content = [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
];
export const darkMode = "class";
export const theme = {
  extend: {
    fontFamily: {
      narrow: ["var(--font-ptsans-narrow)"],
      sans: ["var(--font-roboto-condensed)"],
      blackout: ["var(--font-blackout)"],
    },
    colors: {
      perecred: "#d41d1d",
    },
  },
};
export const plugins = [];
