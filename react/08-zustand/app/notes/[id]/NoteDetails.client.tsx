"use client";

import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";


import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient({ id: propsId }: { id?: string }) {
  const params = useParams();
  const id = propsId || (params.id as string);

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return (
      <div className={css.centeredState}>
        <Loader />
      </div>
    );
  }

  if (isError || !note) {
    return (
      <div className={css.centeredState}>
        <ErrorMessage message="Something went wrong while fetching the note." />
      </div>
    );
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
