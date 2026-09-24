import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchMovies } from "../services/movieService";
import type { Movie } from "../types/movie";

interface PageChangeEvent {
  selected: number;
}

export function useMoviesSearch() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: ({ signal }) => fetchMovies(query, page, signal),
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });

  const movies = data?.movies ?? [];
  const totalPages = data?.totalPages ?? 0;

  useEffect(() => {
    if (!isSuccess || movies.length > 0) {
      return;
    }

    toast.error("No movies found for your request.", {
      id: "empty-results",
    });
  }, [isSuccess, movies.length, query, page]);

  useEffect(() => {
    if (!isError) {
      return;
    }

    if (error instanceof Error && error.message === "Missing VITE_TMDB_TOKEN") {
      toast.error("TMDB token is missing. Add VITE_TMDB_TOKEN to .env.", {
        id: "missing-token",
      });
    }
  }, [isError, error]);

  const handleSearch = (nextQuery: string) => {
    setSelectedMovie(null);
    setPage(1);
    setQuery(nextQuery);
  };

  const handlePageChange = ({ selected }: PageChangeEvent) => {
    setSelectedMovie(null);
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  return {
    query,
    page,
    selectedMovie,
    movies,
    totalPages,
    isLoading,
    isError,
    hasResults: isSuccess && movies.length > 0,
    isEmpty: isSuccess && movies.length === 0,
    isIdle: query.length === 0,
    handleSearch,
    handlePageChange,
    handleCloseModal,
    setSelectedMovie,
  };
}
