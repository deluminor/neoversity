"use client";

import { useTransition } from "react";
import { NOTE_TAGS, type NewNote } from "@/types/note";
import css from "./NoteForm.module.css";
import { useNoteStore } from "@/lib/store/noteStore";

interface NoteFormProps {
  onSubmit: (values: NewNote) => Promise<void>;
  onCancel: () => void;
}

export default function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  const { draft, setDraft } = useNoteStore();
  const [isPending, startTransition] = useTransition();

  const handleAction = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as NewNote["tag"];
    
    startTransition(async () => {
      try {
        await onSubmit({ title, content, tag });
      } catch (error) {
        console.error("Failed to submit form:", error);
      }
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({ [e.target.name]: e.target.value });
  };

  return (
    <form action={handleAction} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          placeholder="My new note"
          value={draft.title}
          onChange={handleChange}
          suppressHydrationWarning
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          placeholder="Write something useful…"
          value={draft.content}
          onChange={handleChange}
          suppressHydrationWarning
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={handleChange}
          suppressHydrationWarning
          required
        >
          {NOTE_TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending}
        >
          {isPending ? "Creating…" : "Create note"}
        </button>
      </div>
    </form>
  );
}
