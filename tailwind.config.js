/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        ubuntu: "linear-gradient(135deg, #2C001E 0%, #5E2750 50%, #77216F 100%)",
      },
      colors: {
        "ubuntu-text-muted": "#7a7a7a",
        "ubuntu-black": "#2C001E",
        "ubuntu-gray-dark": "#1a0e16",
        "ubuntu-border": "#5E2750",
        "ubuntu-gray": "#E6E6E6",
        "ubuntu-white": "#FFFFFF",
        "ubuntu-red": "#DD4814",
        "ubuntu-red-dark": "#C73E0A",
        "ubuntu-orange": "#E95420",
        "ubuntu-orange-dark": "#D34615",
        "ubuntu-yellow": "#F7B731",
        "ubuntu-yellow-dark": "#F5A623",
        "ubuntu-green": "#38B44A",
        "ubuntu-green-dark": "#2D8F3F",
        "ubuntu-cyan": "#17A2B8",
        "ubuntu-cyan-dark": "#138496",
        "ubuntu-blue": "#0073E6",
        "ubuntu-blue-dark": "#0056B3",
        "ubuntu-blue-bg": "#0073E6",
        "ubuntu-purple": "#77216F",
        "ubuntu-purple-dark": "#5E2750",
      },
      fontFamily: {
        "fira-code": ["Fira Code", "monospace"],
        segoe: "Segoe UI",
      },
      keyframes: {
        blink: {
          "0%": { opacity: 1 },
          "48%": { opacity: 1 },
          "50%": { opacity: 0 },
          "99%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        blink: "blink 1.5s linear infinite",
      },
      boxShadow: {
        "5xl": "0 10px 30px 0 rgba(0, 0, 0, 0.75)",
        terminal: "0 0 0 2px rgba(0, 0, 0, 0.16)",
      },
    },
  },
  plugins: [],
};
