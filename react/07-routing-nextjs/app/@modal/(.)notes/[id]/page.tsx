import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import type { Note } from "@/types/note";
import NotePreviewClient from "./NotePreview.client";

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
    <NotePreviewClient>
      {note ? (
        <NotePreview note={note} />
      ) : (
        <div style={{ color: "var(--color-danger)" }}>Failed to load note.</div>
      )}
    </NotePreviewClient>
  );
}
