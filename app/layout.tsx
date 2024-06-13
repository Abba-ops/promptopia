import Provider from "@/components/Provider";
import Nav from "@/components/Nav";
import { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description:
    "Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
