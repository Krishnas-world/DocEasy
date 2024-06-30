import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "DocEasy | Reach Doctors Easily",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="md:px-30">
          <Header />
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  );
}
