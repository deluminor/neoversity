import axios from "axios";
import type { NewNote, Note } from "../types/note";

const NOTEHUB_API_URL = "https://notehub-public.goit.study/api";

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const notehubClient = axios.create({
  baseURL: NOTEHUB_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const trimmedSearch = search?.trim();

  const { data } = await notehubClient.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(trimmedSearch ? { search: trimmedSearch } : {}),
    },
  });

  return data;
}

export async function createNote(payload: NewNote): Promise<Note> {
  const { data } = await notehubClient.post<Note>("/notes", payload);
  return data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await notehubClient.delete<Note>(`/notes/${noteId}`);
  return data;
}
