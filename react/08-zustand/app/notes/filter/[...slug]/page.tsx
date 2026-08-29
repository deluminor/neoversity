export const dynamic = "force-dynamic";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const tagParam = resolvedParams.slug[0];
  const tag = tagParam === "all" ? "All Notes" : `${tagParam} Notes`;

  return {
    title: `${tag} | NoteHub`,
    description: `Browse ${tag.toLowerCase()} in NoteHub`,
    openGraph: {
      title: `${tag} | NoteHub`,
      description: `Browse ${tag.toLowerCase()} in NoteHub`,
      url: `https://notehub-lake.vercel.app/notes/filter/${tagParam}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default async function TagFilteredNotesPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const queryClient = new QueryClient();
  const tagParam = resolvedParams.slug[0];
  const tag = tagParam === "all" ? undefined : tagParam;

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
