import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        mainBlue: '#4E8DCA',
        hoverBlue: '#316191',
        plum: '#A34298',
        amber: '#FCBE22',
        orange: '#EF682A',
        pink: '#E22A69',
        card1: '#f0c8eb',
        card2: '#F6F1F7',
        card3: '#D5C6E0',
        card4: '#F8DCFF',
        footer1: '#c068b6',
        footer2: '#DFDBF6',
        footer3: '#AAA1C8',
        footer4: '#D185E4',
        orange1: '#ffedd5',
        orange2: '#fed7aa',
        pink1: '#fce7f3',
        pink2: '#fbcfe8',
        gradient1: '#5a108f',
        gradient2: '#8b2fc9',
      },
      fontFamily: {
        lazydog: ['Lazydog', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
