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
    <html lang={lang}>
      <head>
        <link rel="canonical" href={canonicalUrl} />
        <link
          rel="preload"
          href="/fonts/lazyDog.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link rel="preload" as="image" href="/Background1.svg" />
        <meta
          name="google-site-verification"
          content="OMxCt92tQbDrp46CJaNuTYUDUAPnQYyuXpPNkVrHk4U"
        />
        <meta property="og:title" content="EarlyON playgroups in Ottawa." />
        <meta
          property="og:description"
          content="Find the perfect EarlyON playgroups in Ottawa."
        />
        <meta
          property="og:image"
          content="https://www.incredibleplaygroupfinder.ca/Preview_IPF.jpg"
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          <Analytics />
          <HotjarTracking />
        </LanguageProvider>
      </body>
    </html>
  );
}
