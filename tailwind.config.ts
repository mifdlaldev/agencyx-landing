import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "hsl(var(--canvas))",
        surface: "hsl(var(--surface))",
        ink: "hsl(var(--ink))",
        muted: "hsl(var(--muted))",
        line: "hsl(var(--line))",
        brand: {
          DEFAULT: "hsl(var(--brand))",
          ink: "hsl(var(--brand-ink))",
          soft: "hsl(var(--brand-soft))",
        },
        ember: "hsl(var(--ember))",
      },
      boxShadow: {
        glow: "0 24px 80px -30px hsl(var(--brand) / 0.55)",
        lift: "0 18px 50px -30px hsl(220 40% 4% / 0.45)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, hsl(var(--ink) / 0.10) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

export default config;
