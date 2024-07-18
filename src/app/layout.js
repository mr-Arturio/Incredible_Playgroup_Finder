import { Inter } from "next/font/google";
import "./globals.css";
import "./fonts.css";
import { Footer } from "../components/Footer";
// import Navbar from "../components/Navbar";
import { LanguageProvider } from '../context/LanguageContext'; 

// Initialize the font
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EarlyON Ottawa',
  description: 'EarlyON playgroups in Ottawa',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {/* <Navbar /> */}
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
};

export default RootLayout;
