import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    darkMode: ["class"],
    content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        red: "#FF0000",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        afacad: ["var(--font-afacad)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
