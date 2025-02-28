import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        assistant: ["Assistant", "san-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        midnight: '#000315',
        'dark-indigo': '#1C122C',
        'dark-purple': '#2D124C',
        'navy-blue': '#202543',
        'lilac': '#6B6374',
        'heather-gray': '#6B6374',
        'light-gray': '#9B9EAC',
        "gray-overlay": '#F1F2F6',
      },
      backgroundImage: {
        pattern: 'url("/images/background-ui.avif")',
        'primary': 'linear-gradient(90.66deg, #6700E9 11.53%, #D83AFF 229.96%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
