import { useCallback, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchMovies, isAbortError } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";

type SearchState =
  | { status: "idle" }
  | { status: "loading"; query: string }
  | { status: "error"; query: string }
  | { status: "empty"; query: string }
  | { status: "ready"; query: string; movies: Movie[] };

export default function App() {
  const [searchState, setSearchState] = useState<SearchState>({
    status: "idle",
  });
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  const handleSearch = async (query: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setSelectedMovie(null);
    setSearchState({ status: "loading", query });

    try {
      const results = await fetchMovies(query, controller.signal);

      if (controller.signal.aborted) {
        return;
      }

      if (results.length === 0) {
        toast.error("No movies found for your request.", {
          id: "empty-results",
        });
        setSearchState({ status: "empty", query });
        return;
      }

      setSearchState({ status: "ready", query, movies: results });
    } catch (error) {
      if (isAbortError(error) || controller.signal.aborted) {
        return;
      }

      console.error(error);

      if (
        error instanceof Error &&
        error.message === "Missing VITE_TMDB_TOKEN"
      ) {
        toast.error("TMDB token is missing. Add VITE_TMDB_TOKEN to .env.", {
          id: "missing-token",
        });
      }

      setSearchState({ status: "error", query });
    }
  };

  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      <main className={css.main}>
        {searchState.status === "loading" ? <Loader /> : null}
        {searchState.status === "error" ? <ErrorMessage /> : null}
        {searchState.status === "ready" ? (
          <MovieGrid movies={searchState.movies} onSelect={setSelectedMovie} />
        ) : null}

        {searchState.status === "idle" ? (
          <section className={css.hero}>
            <p className={css.heroEyebrow}>CineScope</p>
            <h1 className={css.heroTitle}>Find your next film</h1>
            <p className={css.heroText}>
              Search the TMDB catalog and open rich details for any title.
            </p>
          </section>
        ) : null}

        {searchState.status === "empty" ? (
          <section className={css.hero} aria-live="polite">
            <p className={css.heroEyebrow}>No matches</p>
            <h1 className={css.heroTitle}>Nothing turned up</h1>
            <p className={css.heroText}>
              No movies found for “{searchState.query}”. Try another title,
              year, or a shorter keyword.
            </p>
          </section>
        ) : null}
      </main>

      {selectedMovie ? (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      ) : null}

      <Toaster
        position="bottom-right"
        gutter={12}
        toastOptions={{
          className: "cinema-toast",
          duration: 3200,
          error: {
            iconTheme: {
              primary: "#d7b37a",
              secondary: "#101218",
            },
          },
        }}
      />
    </div>
  );
}
