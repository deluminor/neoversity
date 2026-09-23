import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { Header } from "@/components/Header/Header";
import { SITE_URL } from "@/lib/site-url";
import { QueryProvider } from "@/providers/QueryProvider";
import { ToastProvider } from "@/providers/ToastProvider";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RentalCar — find your perfect rental car",
    template: "%s | RentalCar",
  },
  description:
    "RentalCar offers reliable and budget-friendly car rentals across Ukraine. Browse the catalog, filter by brand, price and mileage, and book a car in minutes.",
  keywords: ["car rental", "rent a car", "RentalCar", "Ukraine car rental"],
  openGraph: {
    type: "website",
    siteName: "RentalCar",
    title: "RentalCar — find your perfect rental car",
    description: "Reliable and budget-friendly rentals for any journey.",
    url: SITE_URL,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={manrope.variable}>
      <body suppressHydrationWarning>
        <QueryProvider>
          <Header />
          <main>{children}</main>
          <ToastProvider />
        </QueryProvider>
      </body>
    </html>
  );
}
