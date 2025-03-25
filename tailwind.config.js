/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      screens: {
        xs: "480px", // Add extra small breakpoint
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "rgb-blur": "rgb-effect 4s linear infinite",
        float: "float 5s ease-in-out infinite",
      },
      keyframes: {
        "rgb-effect": {
          "0%": {
            transform: "rotate(0deg)",
            boxShadow:
              "0 0 10px 4px rgba(255, 0, 0, 0.6), 0 0 20px 8px rgba(0, 255, 0, 0.6), 0 0 30px 12px rgba(0, 0, 255, 0.6)",
          },
          "50%": {
            transform: "rotate(180deg)",
            boxShadow:
              "0 0 15px 6px rgba(0, 255, 0, 0.6), 0 0 25px 10px rgba(0, 0, 255, 0.6), 0 0 35px 14px rgba(255, 0, 0, 0.6)",
          },
          "100%": {
            transform: "rotate(360deg)",
            boxShadow:
              "0 0 10px 4px rgba(255, 0, 0, 0.6), 0 0 20px 8px rgba(0, 255, 0, 0.6), 0 0 30px 12px rgba(0, 0, 255, 0.6)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        rgb: "0 0 10px 4px rgba(255, 0, 0, 0.6), 0 0 20px 8px rgba(0, 255, 0, 0.6), 0 0 30px 12px rgba(0, 0, 255, 0.6)",
        "3d": "0 10px 30px -15px rgba(0, 0, 0, 0.3)",
        "3d-dark": "0 10px 30px -15px rgba(0, 0, 0, 0.7)",
      },
      colors: {
        primary: {
          light: "#3B82F6", // blue-500
          dark: "#60A5FA", // blue-400
        },
        secondary: {
          light: "#2DD4BF", // teal-400
          dark: "#5EEAD4", // teal-300
        },
        background: {
          light: "#FFFFFF",
          dark: "#121212",
        },
        surface: {
          light: "#F9FAFB",
          dark: "#1F2937",
        },
        // Additional gradient colors
        gradient: {
          start: "#3B82F6", // blue-500
          end: "#2DD4BF", // teal-400
          "dark-start": "#60A5FA", // blue-400
          "dark-end": "#5EEAD4", // teal-300
        },
      },
    },
  },
  plugins: [],
};
