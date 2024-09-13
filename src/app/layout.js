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
      <body className="relative flex min-h-screen flex-col justify-start bg-white py-0">
        <Nav />
        <div
          id="root"
          className="relative bg-brown-100 mx-2 mb-8 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10"
        >
          {children}
        </div>
        <footer>
          <Nav />
        </footer>
      </body>
    </html>
  );
}
