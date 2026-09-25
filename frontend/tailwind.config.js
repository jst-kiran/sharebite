/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#1B4332",
          light: "#2D6A4F",
          dark: "#122E22",
        },
        fern: "#40704A",
        wheat: {
          DEFAULT: "#D4A72C",
          light: "#E8C766",
        },
        paper: "#FBF9F4",
        stone: "#EFEAE0",
        ink: "#1C1F1B",
        clay: "#8C6E4B",
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "leaf-vein": "radial-gradient(circle at 1px 1px, rgba(27,67,50,0.12) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
}
