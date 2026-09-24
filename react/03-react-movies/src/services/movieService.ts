import axios from "axios";
import type { Movie } from "../types/movie";

const TMDB_API_URL = "https://api.themoviedb.org/3/search/movie";

interface TmdbMovie {
  id: number;
  poster_path: string | null;
  backdrop_path: string | null;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface FetchMoviesResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

function normalizeMovie(movie: TmdbMovie): Movie {
  return {
    id: movie.id,
    poster_path: movie.poster_path ?? "",
    backdrop_path: movie.backdrop_path ?? "",
    title: movie.title,
    overview: movie.overview,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  };
}

export function isAbortError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.code === "ERR_CANCELED";
}

export async function fetchMovies(
  query: string,
  signal?: AbortSignal,
): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error("Missing VITE_TMDB_TOKEN");
  }

  const { data } = await axios.get<FetchMoviesResponse>(TMDB_API_URL, {
    signal,
    params: {
      query,
      include_adult: false,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.results.map(normalizeMovie);
}
