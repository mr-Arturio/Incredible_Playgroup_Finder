// app/[lang]/layout.js
import { Inter } from "next/font/google";
import "../globals.css";
import "../fonts.css";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "../../context/LanguageContext";
import HotjarTracking from "../../utils/HotjarTracking";

// Initialize the font
const inter = Inter({ subsets: ["latin"] });

export default function LangLayout({ children, params }) {
  const { lang } = params;

  const canonicalUrl =
    lang === "en"
      ? "https://www.incredibleplaygroupfinder.ca/"
      : `https://www.incredibleplaygroupfinder.ca/${lang}`;

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      <LanguageProvider>
        {children}
        <Analytics />
        <HotjarTracking />
      </LanguageProvider>
    </>
  );
}
