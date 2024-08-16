import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";

import { LanguageProvider } from "../context/LanguageContext";

// Initialize the font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EarlyON Ottawa",
  description: "EarlyON playgroups in Ottawa",
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
      </head>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
};

export default RootLayout;
