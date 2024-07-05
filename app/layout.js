import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "DocEasy | Reach Doctors Easily",
  description: "DocEasy, Finding Doctors made Easy!",
};

export default async function RootLayout({ children }) {
  // Fetch user data server-side
  const session = await getKindeServerSession();
  const user = session.isAuthenticated ? await session.getUser() : null;

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <div className="md:px-30">
          <Header user = {user}/>
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  );
}
