export const dynamic = "force-dynamic";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  
  let title = "Note Details";
  let description = "Details of a note in NoteHub";

  try {
    const note = await fetchNoteById(id);
    title = note.title || title;
    description = note.content ? note.content.substring(0, 160) : description;
  } catch (error) {
    console.error("Error fetching note for metadata", error);
  }

  return {
    title: `${title} | NoteHub`,
    description,
    openGraph: {
      title: `${title} | NoteHub`,
      description,
      url: `https://notehub-lake.vercel.app/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
