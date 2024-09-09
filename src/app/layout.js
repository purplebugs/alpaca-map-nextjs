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
      <body>
        <div id="root">
          <nav>
            <Nav />
          </nav>
          {children}
          <footer>
            <Nav />
          </footer>
        </div>
      </body>
    </html>
  );
}
