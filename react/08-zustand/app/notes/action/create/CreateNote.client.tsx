"use client";

import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./page.module.css";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import type { NewNote } from "@/types/note";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateNote() {
  const router = useRouter();
  const clearDraft = useNoteStore((state) => state.clearDraft);
  const queryClient = useQueryClient();

  const handleSubmit = async (values: NewNote) => {
    await createNote(values);
    clearDraft();
    await queryClient.invalidateQueries({ queryKey: ["notes"] });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </main>
  );
}
