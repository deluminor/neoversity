import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { createNote, deleteNote, fetchNotes } from "@/lib/api";
import type { NewNote } from "@/types/note";

const PER_PAGE = 12;

export function useNotes(tag?: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const initialSearch = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setUrlParams = (newPage: number, search: string) => {
    const params = new URLSearchParams(searchParams);
    if (newPage > 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }
    if (search) {
      params.set("q", search);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const updateSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setUrlParams(1, value);
  }, 400);

  const handleSearchChange = (value: string): void => {
    setSearchInput(value);
    updateSearch(value);
  };

  const handlePageChange = (newPage: number) => {
    setUrlParams(newPage, debouncedSearch);
  };

  const notesQuery = useQuery({
    queryKey: ["notes", debouncedSearch, page, tag],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search: debouncedSearch, tag }),
    placeholderData: keepPreviousData,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
      handlePageChange(1);
    },
    onError: (error) => {
      alert("Failed to create note: " + error.message);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      if (notesQuery.data?.notes.length === 1 && page > 1) {
        handlePageChange(page - 1);
      }
    },
    onError: (error) => {
      alert("Failed to delete note: " + error.message);
    }
  });

  const notes = notesQuery.data?.notes ?? [];
  const totalPages = notesQuery.data?.totalPages ?? 0;
  const hasNotes = notes.length > 0;
  const isInitialLoading = notesQuery.isLoading && !notesQuery.isPlaceholderData;

  const isRefreshing = notesQuery.isFetching && notesQuery.isPlaceholderData;
  const isFetchingMore = notesQuery.isFetching && !isInitialLoading;
  const isError = notesQuery.isError && !hasNotes;

  const isEmpty =
    notesQuery.isSuccess &&
    !notesQuery.isPlaceholderData &&
    notes.length === 0 &&
    !notesQuery.isFetching;

  const handleCreateNote = async (values: NewNote): Promise<void> => {
    await createMutation.mutateAsync(values);
  };

  const handleDeleteNote = (noteId: string): void => {
    deleteMutation.mutate(noteId);
  };

  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    if (createMutation.isPending) {
      return;
    }
    setIsModalOpen(false);
  };

  return {
    page,
    searchInput,
    debouncedSearch,
    isModalOpen,
    notes,
    totalPages,
    hasNotes,
    isInitialLoading,
    isRefreshing,
    isFetchingMore,
    isError,
    isEmpty,
    isDeleting: deleteMutation.isPending,
    handleSearchChange,
    handlePageChange,
    handleCreateNote,
    handleDeleteNote,
    handleOpenModal,
    handleCloseModal,
  };
}
