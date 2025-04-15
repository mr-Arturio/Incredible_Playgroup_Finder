import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "../context/LanguageContext";
import HotjarTracking from "../utils/HotjarTracking";
import SWRegistration from "../components/SWRegistration"

// Initialize the font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EarlyON playgroups in Ottawa.",
  description: "Find the perfect EarlyON playgroups in Ottawa.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/lazyDog.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* Google site verification */}
        <meta
          name="google-site-verification"
          content="OMxCt92tQbDrp46CJaNuTYUDUAPnQYyuXpPNkVrHk4U"
        />
        {/* Open Graph meta tags */}
        <meta property="og:title" content="EarlyON playgroups in Ottawa." />
        <meta
          property="og:description"
          content="Find the perfect EarlyON playgroups in Ottawa."
        />
        <meta
          property="og:image"
          content="https://www.incredibleplaygroupfinder.ca/Preview_IPF.jpg"
        />
        <meta
          property="og:url"
          content="https://www.incredibleplaygroupfinder.ca/"
        />
        <meta property="og:type" content="website" />
        <meta name="apple-mobile-web-app-title" content="IPF" />

        {/* PWA Integration */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={inter.className}>
      <SWRegistration />
        <LanguageProvider>
          {children}
          <Analytics />
          <HotjarTracking />
        </LanguageProvider>
      </body>
    </html>
  );
};

export default RootLayout;
