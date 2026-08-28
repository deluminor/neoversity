export const dynamic = "force-dynamic";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/features/notes/requests/notes.datasource";
import NotesClient from "../../Notes.client";

export default async function TagFilteredNotesPage({
  params,
}: {
  params: Promise<{ tag: string[] }>;
}) {
  const resolvedParams = await params;
  const queryClient = new QueryClient();
  const tagParam = resolvedParams.tag[0];
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
