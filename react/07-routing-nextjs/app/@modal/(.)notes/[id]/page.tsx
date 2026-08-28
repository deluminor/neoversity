import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import type { Note } from "@/types/note";
import ModalIntercept from "./ModalIntercept.client";

export default async function NoteModalPreview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let note: Note | null = null;

  try {
    note = await fetchNoteById(id);
  } catch {
    note = null;
  }

  return (
    <ModalIntercept>
      {note ? (
        <NotePreview note={note} />
      ) : (
        <div style={{ color: "var(--color-danger)" }}>Failed to load note.</div>
      )}
    </ModalIntercept>
  );
}
