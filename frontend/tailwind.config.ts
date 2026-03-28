import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#dbe4f0",
        input: "#dbe4f0",
        ring: "#006bff",
        background: "#f7faff",
        foreground: "#0f2747",
        primary: {
          DEFAULT: "#006bff",
          foreground: "#ffffff"
        },
        secondary: {
          DEFAULT: "#eff5ff",
          foreground: "#1d4f91"
        }
      },
      boxShadow: {
        soft: "0 24px 60px rgba(15, 39, 71, 0.08)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top right, rgba(0,107,255,0.18), transparent 30%), radial-gradient(circle at bottom left, rgba(87, 160, 255, 0.15), transparent 35%)"
      }
    }
  },
  plugins: []
};

export default config;

