import type { Note } from "@/features/notes/types";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  return (
    <div className={css.preview}>
      <header className={css.header}>
        <h2 className={css.title}>{note.title}</h2>
        <span className={css.date}>
          {new Date(note.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </span>
      </header>
      
      <div className={css.content}>{note.content}</div>
      
      
      {note.tag && (
        <div className={css.tags}>
          <span className={css.tag}>{note.tag}</span>
        </div>
      )}
    </div>
  );
}
