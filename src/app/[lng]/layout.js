import { Inter } from "next/font/google";
import "../globals.css";
import { Footer } from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { dir } from "i18next";
import { languages } from "../i18n/settings";

// Generate static parameters for all languages
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

// Initialize the font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EarlyON Ottawa",
  description: "EarlyON playgroups in Ottawa",
};

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
