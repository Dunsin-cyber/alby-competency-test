import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACT",
  description: "Alby Competency Test by Dunsin Abisuwa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>

          <Toaster toastOptions={{
            className: "",
            style: {
              border: `1px solid #AC6AFF`,
              padding: "16px",
              color: "#AC6AFF",
              backgroundColor: "#FFC876",
              borderRadius: "8px",
              fontFamily: "Arial, sans-serif",
            },
          }} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
