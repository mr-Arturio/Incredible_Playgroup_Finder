import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import { Analytics } from "@vercel/analytics/react";
import { LanguageProvider } from "../context/LanguageContext";
import HotjarTracking from "../utils/HotjarTracking";

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
        {/* Google site veriffication */}
        <meta name="google-site-verification" content="OMxCt92tQbDrp46CJaNuTYUDUAPnQYyuXpPNkVrHk4U" />
        {/* Open Graph meta tags */}
        <meta property="og:title" content="EarlyON playgroups in Ottawa." />
        <meta
          property="og:description"
          content="Find the perfect EarlyON playgroups in Ottawa."
        />
        <meta
          property="og:image"
          content="https://www.incredibleplaygroupfinder.ca/Preview_img.png"
        />
        <meta
          property="og:url"
          content="https://www.incredibleplaygroupfinder.ca/"
        />
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
};

export default RootLayout;
