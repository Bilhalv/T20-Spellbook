/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bg-t20": "url('/bgT20.jpg')",
        "magia_arcana": "url('/magias/classificacao/arcana.png')", 
        "magia_divina": "url('/magias/classificacao/divina.png')", 
        "magia_universal": "url('/magias/classificacao/universal.png')", 
      },
      screens: {
        desktop: "1024px",
      },
      fontFamily: {
        tormenta: ["tormenta", "sans-serif"],
        'poppins': ['Poppins', 'sans-serif'],
      },
      keyframes: {
        "fade-in-left": {
          "0%": { opacity: "0", transform: "translateX(-100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-out-left": {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(-100%)" },
        },
      },
      animation: {
        "fade-in-left": "fade-in-left 0.2s ease-in",
        "fade-out-left": "fade-out-left 0.2s ease-out",
      },
    },
  },
  plugins: [],
}