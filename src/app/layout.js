import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "../context/LanguageContext";
import HotjarTracking from "../utils/HotjarTracking";

// Initialize the font with display: swap for better performance
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "EarlyON playgroups in Ottawa.",
  description: "Find the perfect EarlyON playgroups in Ottawa.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        {/* Preload font */}
        <link
          rel="preload"
          href="/fonts/lazyDog.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        {/* Preload LCP background image with high priority */}
        <link rel="preload" as="image" href="/Background1.svg" fetchPriority="high" />
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
      </head>
      <body className={inter.className}>
        {/* Hidden LCP image with high priority for early discovery */}
        <img
          src="/Background1.svg"
          alt=""
          fetchPriority="high"
          style={{ position: "absolute", width: 0, height: 0, opacity: 0 }}
          aria-hidden="true"
        />
        <LanguageProvider>
          {children}
          <Analytics />
          {/*<HotjarTracking />*/}
        </LanguageProvider>
      </body>
    </html>
  );
};

export default RootLayout;
