/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Work Sans'],
        secondary: ['DM Sans']
      },
      colors: {
        // Primary Color
        primary: "#C9CCF2",

        // Accent Colors (used in actions, CTAs)
        accent_primary: "#101F35",
        accent_secondary: "#D9FF97",

        // Neutral Colors
        neutral_white: "#F5F7F9",
        neutral_dark: "#ABADE8",
        neutral_light: "#CBCFF3",

        // Semantic Colors
        error: "#F43362",
        success: "#7ACC19",
        warning: "#FFD607",
        info: "#4790E5"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("daisyui")
  ],
}
