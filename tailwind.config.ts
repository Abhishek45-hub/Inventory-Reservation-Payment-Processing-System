import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070d",
        panel: "#0a101c",
        mint: "#47f5c8",
        cobalt: "#3b82f6",
        amberline: "#f9c56a",
        risk: "#ff5c7a"
      },
      boxShadow: {
        glow: "0 0 42px rgba(71, 245, 200, 0.18)",
        cobalt: "0 0 50px rgba(59, 130, 246, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
