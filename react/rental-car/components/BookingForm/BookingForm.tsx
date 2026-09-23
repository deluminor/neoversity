"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useId } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/Button/Button";
import { Loader } from "@/components/Loader/Loader";
import { TextArea } from "@/components/TextField/TextArea";
import { TextField } from "@/components/TextField/TextField";
import { toUserMessage } from "@/lib/api/api-error";
import { createBookingRequest } from "@/lib/api/bookings";
import { BookingFormSchema } from "@/lib/schemas/booking.schema";
import type { BookingFormValues } from "@/types/booking";

import styles from "./BookingForm.module.css";

interface BookingFormProps {
  carId: string;
}

const defaultValues: BookingFormValues = { name: "", email: "", comment: "" };
const BOOKING_SUCCESS_MESSAGE = "Booking request sent. We will contact you shortly.";

export function BookingForm({ carId }: BookingFormProps) {
  const fieldId = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: BookingFormValues) => createBookingRequest(carId, values),
    onSuccess: (response) => {
      toast.success(response.message ?? BOOKING_SUCCESS_MESSAGE);
      reset(defaultValues);
    },
    onError: (error: Error) => {
      toast.error(toUserMessage(error));
    },
  });

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Book your car now</h2>
      <p className={styles.subtitle}>Stay connected! We are always ready to help you.</p>
      <form className={styles.form} noValidate onSubmit={handleSubmit((values) => mutate(values))}>
        <TextField
          id={`${fieldId}-name`}
          label="Name*"
          placeholder="Name*"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <TextField
          id={`${fieldId}-email`}
          label="Email*"
          type="email"
          placeholder="Email*"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <TextArea
          id={`${fieldId}-comment`}
          label="Comment"
          placeholder="Comment"
          rows={4}
          error={errors.comment?.message}
          {...register("comment")}
        />
        <Button
          type="submit"
          fullWidth
          className={styles.submit}
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? <Loader size={18} thickness={2} /> : null}
          Send
        </Button>
      </form>
    </section>
  );
}
