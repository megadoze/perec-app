/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        narrow: ["var(--font-ptsans-narrow)"],
        sans: ["var(--font-roboto-condensed)"],
      },
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// export const content = [
//   "./app/**/*.{js,ts,jsx,tsx,mdx}",
//   "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//   "./components/**/*.{js,ts,jsx,tsx,mdx}",

//   // Or if using `src` directory:
//   "./src/**/*.{js,ts,jsx,tsx,mdx}",
// ];
// export const theme = {
//   extend: {
//     fontFamily: {
//       narrow: ["var(--font-ptsans-narrow)"], // заголовки
//       // narrow: ["var(--font-roboto-condensed)"],
//       // sans: ["var(--font-open-sans)"],
//       // sans: ["var(--font-ptsans-narrow)"], // заголовки
//       sans: ["var(--font-roboto-condensed)"],
//       // sans: ["var(--font-ptsans)"], // основной текст
//     },
//   },
// };
// export const plugins = [];
