import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import { BookingForm } from "@/components/BookingForm/BookingForm";
import { CarDetailsCard } from "@/components/CarDetails/CarDetailsCard";
import { CarImage } from "@/components/CarImage/CarImage";
import { Container } from "@/components/Container/Container";
import { CAR_DETAILS_IMAGE_RATIO } from "@/constants/layout";
import { ROUTES } from "@/constants/routes";
import { isNotFoundError } from "@/lib/api/api-error";
import { fetchCarById } from "@/lib/api/cars";
import { formatCarTitle } from "@/lib/utils/format";
import type { Car } from "@/types/car";

import styles from "./CarDetailsPage.module.css";

const getCar = cache(async (carId: string): Promise<Car | null> => {
  try {
    return await fetchCarById(carId);
  } catch (error) {
    if (isNotFoundError(error)) return null;
    throw error;
  }
});

export async function generateMetadata({
  params,
}: PageProps<"/catalog/[carId]">): Promise<Metadata> {
  const { carId } = await params;
  const car = await getCar(carId);

  if (!car) return { title: "Car not found" };

  const title = formatCarTitle(car.brand, car.model, car.year);

  return {
    title,
    description: car.description || `Rent ${title} with RentalCar.`,
    alternates: { canonical: ROUTES.car(car.id) },
    openGraph: {
      title,
      description: car.description || `Rent ${title} with RentalCar.`,
      images: car.img ? [{ url: car.img }] : undefined,
    },
  };
}

export default async function CarDetailsPage({ params }: PageProps<"/catalog/[carId]">) {
  const { carId } = await params;
  const car = await getCar(carId);

  if (!car) notFound();

  const title = formatCarTitle(car.brand, car.model, car.year);

  return (
    <Container className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.details}>
          <CarDetailsCard car={car} />
        </div>
        <div className={styles.media}>
          <CarImage
            src={car.img}
            alt={title}
            sizes="640px"
            ratio={CAR_DETAILS_IMAGE_RATIO}
            priority
          />
          <BookingForm carId={car.id} />
        </div>
      </div>
    </Container>
  );
}
