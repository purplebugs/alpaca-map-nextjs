import "@/app/globals.css";

import Nav from "@/components/nav.js";

export const metadata = {
  title: "Alpaca Map 🦙 🗺️",
  description: "Where can I find and visit alpacas?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
