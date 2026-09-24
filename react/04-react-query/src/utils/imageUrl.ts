const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const FALLBACK_POSTER = "/no-poster.svg";

export function buildPosterUrl(path: string): string {
  if (!path) {
    return FALLBACK_POSTER;
  }

  return `${IMAGE_BASE_URL}/w500${path}`;
}

export function buildBackdropUrl(path: string): string {
  if (!path) {
    return FALLBACK_POSTER;
  }

  return `${IMAGE_BASE_URL}/original${path}`;
}
