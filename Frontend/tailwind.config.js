/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-light": `4px 4px 10px
                                 rgba(0, 0, 0, 0.1)`,
        "custom-dark": `6px 6px 15px
                                rgba(0, 0, 0, 0.3)`,
        "custom-color": `5px 5px 20px
                                 rgba(34, 60, 80, 0.7)`,
      },
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      colors: {
        blue: {
          50: "#DFDFF0",
          75: "#DFDFF2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
        },
        violet: {
          300: "#5724FF",
        },
        yellow: {
          100: "#8E983F",
          300: "#EDFF66",
        },
      },
    },
  },
  plugins: [],
};
