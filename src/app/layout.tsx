import Providers from "@/components/Provider";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./font.css";
import "./globals.css";
// import {
//   init
// } from "@getalby/bitcoin-connect-react";


// // Initialize Bitcoin Connect
// init({
//   appName: "Alby Competency Test - act", 
// })

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
          <Toaster
            toastOptions={{
              className: "",
              style: {
                border: `1px solid #AC6AFF`,
                padding: "16px",
                color: "#AC6AFF",
                backgroundColor: "#FFC876",
                borderRadius: "8px",
                fontFamily: "Arial, sans-serif",
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
