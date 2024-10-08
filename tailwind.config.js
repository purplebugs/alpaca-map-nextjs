/** @type {import('tailwindcss').Config} */

export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  colors: {
    current: "currentColor",
    inherit: "inherit",
    transparent: "transparent",
    blue: "#3d78ce",
    "blue-dark": "#285dab",
    pink: "#ed87a1",
    "black-almost": "#333333",
    brown: {
      50: "#fdf8f6",
      100: "#f2e8e5",
      200: "#eaddd7",
      300: "#e0cec7",
      400: "#d2bab0",
      500: "#bfa094",
      600: "#a18072",
      700: "#977669",
      800: "#846358",
      900: "#43302b",
    },
    white: "#ffffff",
    yellow: "#edbb34",
  },
  extend: {
    fontFamily: {
      sans: ["var(--font-poppins)", "ui-sans-serif"],
      serif: ["ui-serif"],
      mono: ["ui-monospace"],
    },
  },
};
export const plugins = [];
