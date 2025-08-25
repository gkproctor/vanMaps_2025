import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0FB5BA", 800: "#0A7E84" },
        accent: "#FF6B6B",
        sand: { 50: "#F4EDE4" },
        slate: { 900: "#0B1220", 600: "#475569" }
      }
    }
  },
  plugins: [typography]
}
export default config
