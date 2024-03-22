import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";

// Initialize the font
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EarlyON Ottawa",
  description: "EarlyON playgroups in Ottawa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
