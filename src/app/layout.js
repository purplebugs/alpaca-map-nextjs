import { Poppins } from "next/font/google";
import "@/app/globals.css";

import Nav from "@/components/nav.js";

export const metadata = {
  title: "Alpaca Map 🦙 🗺️",
  description: "Where can I find and visit alpacas?",
};

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="flex min-h-screen flex-col justify-start bg-white py-0 overflow-scroll">
        <Nav />
        <div id="root" className="relative overflow-auto p-8 bg-brown-100">
          <div className="min-w-md mx-auto max-w-4xl p-6 bg-white rounded-xl shadow-lg gap-x-4">
            {children}
          </div>
        </div>
        <footer>
          <Nav />
        </footer>
      </body>
    </html>
  );
}
