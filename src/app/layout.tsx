import Providers from "@/components/Provider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import "./globals.css";



// Secondary: Roboto (clean body text)
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["400", "500", "700"], // Multiple weights
  display: "swap",
});
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
        <link
          href="https://fonts.googleapis.com/css2?family=Winky+Rough&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        className={` ${roboto.variable}  antialiased`}
      >
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
