/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: [
          "Albert Sans",
          "Futura",
          "Century Gothic",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-fg)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
        card: "var(--color-bg)",
        accent: {
          DEFAULT: "var(--color-accent)",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
