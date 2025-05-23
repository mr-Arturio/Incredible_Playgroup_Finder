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
        "frame-pattern": "url('/Background1.svg')",
      },
      colors: {
        mainBlue: "#4E8DCA",
        hoverBlue: "#316191",
        plum: "#A34298",
        amber: "#FCBE22",
        reset: "#EF682A",
        resetHover: "#D95D25",
        cardBody: "#dbeafe",
        cardFooter: "#93c5fd",
        gradient1: "#5a108f",
        gradient2: "#8b2fc9",
        gradient3: "#ff7e5f",
        navText: "rgb(64,0,128)",
        navTextHover: "rgb(163,66,152)",
        introText: "#E22A69",
      },
      fontFamily: {
        lazydog: ["Lazydog", "cursive"],
      },
      fontSize: {
        xxs: "0.625rem",
      },
      rotate: {
        "17": "17deg",
      },
    },
  },
  plugins: [],
};
export default config;
