import { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useMoviesSearch } from "../../hooks/useMoviesSearch";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";

export default function App() {
  const {
    query,
    page,
    selectedMovie,
    movies,
    totalPages,
    isLoading,
    isError,
    hasResults,
    isEmpty,
    isIdle,
    handleSearch,
    handlePageChange,
    handleCloseModal,
    setSelectedMovie,
  } = useMoviesSearch();

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      <main className={css.main}>
        {isLoading ? <Loader /> : null}
        {isError ? <ErrorMessage /> : null}

        {hasResults ? (
          <>
            <MovieGrid movies={movies} onSelect={setSelectedMovie} />

            {totalPages > 1 ? (
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={handlePageChange}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
              />
            ) : null}
          </>
        ) : null}

        {isIdle ? (
          <section className={css.hero}>
            <p className={css.heroEyebrow}>CineScope</p>
            <h1 className={css.heroTitle}>Find your next film</h1>
            <p className={css.heroText}>
              Search the TMDB catalog and open rich details for any title.
            </p>
          </section>
        ) : null}

        {isEmpty ? (
          <section className={css.hero} aria-live="polite">
            <p className={css.heroEyebrow}>No matches</p>
            <h1 className={css.heroTitle}>Nothing turned up</h1>
            <p className={css.heroText}>
              No movies found for “{query}”. Try another title, year, or a
              shorter keyword.
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
