import "@/app/globals.css";
import { Inter } from "next/font/google";
import Nav from "@/components/nav.js";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alpaca Map 🦙 🗺️",
  description: "Where can I find and visit alpacas?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Nav />
        </nav>
        {children}
        <footer>
          <Nav />
        </footer>
      </body>
    </html>
  );
}
