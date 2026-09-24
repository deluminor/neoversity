import type { Metadata } from "next";

import { Hero } from "@/components/Hero/Hero";

export const metadata: Metadata = {
  title: "RentalCar — find your perfect rental car",
  description:
    "Reliable and budget-friendly car rentals for any journey. Browse the RentalCar catalog and book your car in minutes.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <Hero />;
}
