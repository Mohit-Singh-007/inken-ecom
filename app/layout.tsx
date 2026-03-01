import type { Metadata } from "next";
import { AR_One_Sans, Adamina, Fragment_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const fontSans = AR_One_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Adamina({
  subsets: ["latin"],
  weight: ["400"],
});

const fontMono = Fragment_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "ECOM | Modern Storefront",
  description: "High-performance ecommerce platform built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontSerif.className} ${fontMono.className} antialiased`}
      >
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
