export const ROUTES = {
  HOME: "/",
  NOTES_FILTER_ALL: "/notes/filter/all",
  noteDetails: (id: string) => `/notes/${id}`,
} as const;

export const API_ROUTES = {
  NOTES: "/notes",
  noteDetails: (id: string) => `/notes/${id}`,
} as const;
