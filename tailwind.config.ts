import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        assistant: ["Assistant", "serif"],
      },
      colors: {
        midnight: '#000315',
        'dark-indigo': '#1C122C',
        'dark-purple': '#2D124C',
        'lilac': '#6B6374',
        'heather-gray': '#6B6374',
        "muted": '#F1F2F6'
      },
      backgroundImage: {
        'primary': 'linear-gradient(90.66deg, #6700E9 11.53%, #D83AFF 229.96%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
