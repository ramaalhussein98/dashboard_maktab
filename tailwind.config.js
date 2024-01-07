/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }
      },
      colors: {
        primary: "#000",
        mainColor: "#c80000",
        primaryBackgroundOpacity: "rgba(200,0,0, .05)",
        dashPageColor: "#f9f9f9",
        mainBorder: "1px solid rgb(238, 238, 238)",
      },
      boxShadow: {
        custom: "rgba(0, 0, 0, 0.16) 0px 1px 2px", // Define a custom shadow variant
        customTwo: "rgba(0, 0, 0, 0.05) 0px 2px 4px",
      },
      borderWidth: {
        custom: "1px", // Define a custom border width
      },
      borderColor: {
        custom: "rgb(238, 238, 238)", // Define a custom border color
      },
    },
  },
  plugins: [],
};
