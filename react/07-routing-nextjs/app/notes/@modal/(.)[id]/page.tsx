import { fetchNoteById } from "@/features/notes/requests/notes.datasource";
import NotePreview from "@/features/notes/components/NotePreview/NotePreview";
import ModalIntercept from "./ModalIntercept.client";

export default async function NoteModalPreview({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const resolvedParams = await params;
    const note = await fetchNoteById(resolvedParams.id);
    return (
      <ModalIntercept>
        <NotePreview note={note} />
      </ModalIntercept>
    );
  } catch (error) {
    return (
      <ModalIntercept>
        <div style={{ color: "var(--color-danger)" }}>Failed to load note.</div>
      </ModalIntercept>
    );
  }
}
