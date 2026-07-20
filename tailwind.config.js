/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#dcfce7",
        surface: "#ffffff",
        "surface-muted": "#f2f2ef",
        line: "#d7d7d2",
        "line-strong": "#c9c9c3",
        ink: "#111827",
        "ink-muted": "#56616f",
        "equals-accent": "#5f6f52",
        "equals-accent-pressed": "#4d5c43",
      },
      borderRadius: {
        control: "0.375rem",
        panel: "0.5rem",
      },
      fontFamily: {
        numeric: ['"SFMono-Regular"', "Consolas", '"Liberation Mono"', "monospace"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "sans-serif",
        ],
      },
      maxWidth: {
        calculator: "22.5rem",
      },
      minHeight: {
        display: "4.5rem",
        key: "3.5rem",
      },
      spacing: {
        "display-x": "1rem",
        "display-y": "0.75rem",
        "key-gap": "0.5rem",
      },
    },
  },
  plugins: [],
};
