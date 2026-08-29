import type { Metadata } from "next";
import CreateNote from "./CreateNote.client";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub",
    url: "https://notehub-lake.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

export default function CreateNotePage() {
  return <CreateNote />;
}
