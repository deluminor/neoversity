import Link from "next/link";
import { ROUTES } from "@/constants/routes";

import type { Note } from "@/features/notes/types";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (noteId: string) => void;
  isDeleting?: boolean;
}

export default function NoteList({
  notes,
  onDelete,
  isDeleting = false,
}: NoteListProps) {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <Link href={ROUTES.noteDetails(note.id)} className={css.viewLink} aria-label="View details">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </Link>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              type="button"
              className={css.button}
              onClick={() => onDelete(note.id)}
              disabled={isDeleting}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
