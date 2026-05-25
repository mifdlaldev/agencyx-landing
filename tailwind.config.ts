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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        lime: "hsl(var(--lime))",
        dark: {
          DEFAULT: "hsl(var(--dark))",
          soft: "hsl(var(--dark-soft))",
        },
        success: "hsl(var(--success))",
        error: "hsl(var(--error))",
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 80px -50px rgba(15, 23, 42, 0.35)",
        blue: "0 28px 100px -55px rgba(30, 64, 237, 0.55)",
      },
      animation: {
        "float-slow": "float-slow 7s ease-in-out infinite",
        "beam-dash": "beam-dash 5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
