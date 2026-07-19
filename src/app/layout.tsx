// src/app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "One Stop Car – Premium Car Accessories in Pakistan",
  description:
    "Pakistan's most trusted car accessories store. Shop sun shades, seat covers, floor mats, PPF protection, car detailing services, and more. Nationwide delivery.",
  keywords: "car accessories Pakistan, sun shades, seat covers, floor mats, PPF film, car detailing Gujranwala, Best car led's in Pakistan, Best car accessories in Pakistan, Car led in Pakistan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-[#1A1A1A]">
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}