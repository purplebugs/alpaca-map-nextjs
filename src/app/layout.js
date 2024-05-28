import { Inter } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Alpaca Map 🦙 🗺️",
  description: "Where can I find and visit alpacas?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>My navigation</nav>
        {children}
        <footer>My footer</footer>
      </body>
    </html>
  );
}
