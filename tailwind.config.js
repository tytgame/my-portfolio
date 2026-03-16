/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        "surface-light": "#f9fafb",
        "border-light": "#e5e7eb",
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans KR', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
      },
    },
  },
  plugins: [],
};
