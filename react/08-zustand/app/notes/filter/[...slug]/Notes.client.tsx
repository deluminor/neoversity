"use client";

import { useNotes } from "@/hooks/useNotes";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";

export default function NotesClient({ tag }: { tag?: string }) {
  const {
    page,
    searchInput,
    debouncedSearch,
    notes,
    totalPages,
    hasNotes,
    isInitialLoading,
    isRefreshing,
    isFetchingMore,
    isError,
    isEmpty,
    isDeleting,
    handleSearchChange,
    handlePageChange,
    handleDeleteNote,
  } = useNotes(tag);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <div className={css.brand}>
          <span className={css.brandMark} aria-hidden="true" />
          <div>
            <p className={css.brandEyebrow}>Personal workspace</p>
            <h1 className={css.brandTitle}>NoteHub</h1>
          </div>
        </div>

        <SearchBox value={searchInput} onChange={handleSearchChange} />

        {totalPages > 1 ? (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        ) : null}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <main className={css.main}>
        {isInitialLoading ? <Loader /> : null}
        {isError ? (
          <ErrorMessage message="Failed to load notes. Check your token and try again." />
        ) : null}

        {isEmpty ? (
          <section className={css.empty} aria-live="polite">
            <p className={css.emptyEyebrow}>No matches</p>
            <h2 className={css.emptyTitle}>Nothing here yet</h2>
            <p className={css.emptyText}>
              {debouncedSearch
                ? `No notes found for “${debouncedSearch}”. Try another keyword.`
                : "Create your first note to start filling this space."}
            </p>
          </section>
        ) : null}

        {hasNotes ? (
          <div className={isRefreshing ? css.listRefreshing : undefined}>
            <NoteList
              notes={notes}
              onDelete={handleDeleteNote}
              isDeleting={isDeleting}
            />
          </div>
        ) : null}
        {isFetchingMore ? (
          <p className={css.subtleStatus} aria-live="polite">
            Updating…
          </p>
        ) : null}
      </main>

    </div>
  );
}
