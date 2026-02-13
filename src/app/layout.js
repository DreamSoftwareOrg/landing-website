import { Space_Grotesk, Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: '--font-main' });
const cairo = Cairo({ subsets: ["arabic"], weight: ["300", "400", "500", "600", "700"], variable: '--font-ar' });

export const metadata = {
  title: "DreamSoftware | Future of Software",
  description: "Empowering businesses with bespoke software solutions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${spaceGrotesk.variable} ${cairo.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            <div id="app">
              <Navbar />
              {children}
              <Footer />
              <CursorGlow />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
