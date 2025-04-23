import Providers from "@/components/Provider";
import type { Metadata } from "next";
import "./font.css";
import "./globals.css";


export const metadata: Metadata = {
  title: "act",
  description: "Alby Competency Test by Dunsin Abisuwa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Providers>
          
          {children}
        </Providers>
      </body>
    </html>
  );
}
