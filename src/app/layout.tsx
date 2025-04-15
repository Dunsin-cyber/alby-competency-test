import Providers from "@/components/Provider";
import type { Metadata } from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
      </Head>
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
