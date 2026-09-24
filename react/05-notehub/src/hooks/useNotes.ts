import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { createNote, deleteNote, fetchNotes } from "../services/noteService";
import type { NewNote } from "../types/note";

const PER_PAGE = 12;

export function useNotes() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value);
    setPage(1);
  }, 400);

  const handleSearchChange = (value: string): void => {
    setSearchInput(value);
    updateSearch(value);
  };

  const notesQuery = useQuery({
    queryKey: ["notes", debouncedSearch, page],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch,
      }),
    placeholderData: keepPreviousData,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsModalOpen(false);
      setPage(1);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const notes = notesQuery.data?.notes ?? [];
  const totalPages = notesQuery.data?.totalPages ?? 0;
  const hasNotes = notes.length > 0;
  const isInitialLoading =
    notesQuery.isLoading && !notesQuery.isPlaceholderData;

  const isRefreshing = notesQuery.isFetching && notesQuery.isPlaceholderData;
  const isFetchingMore = notesQuery.isFetching && !isInitialLoading;
  const isError = notesQuery.isError && !hasNotes;

  const isEmpty =
    notesQuery.isSuccess &&
    !notesQuery.isPlaceholderData &&
    notes.length === 0 &&
    !notesQuery.isFetching;

  useEffect(() => {
    if (
      notesQuery.isSuccess &&
      !notesQuery.isPlaceholderData &&
      notes.length === 0 &&
      page > 1 &&
      !notesQuery.isFetching
    ) {
      setPage((currentPage) => Math.max(1, currentPage - 1));
    }
  }, [
    notes.length,
    notesQuery.isFetching,
    notesQuery.isPlaceholderData,
    notesQuery.isSuccess,
    page,
  ]);

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
    handlePageChange: setPage,
    handleCreateNote,
    handleDeleteNote,
    handleOpenModal,
    handleCloseModal,
  };
}
