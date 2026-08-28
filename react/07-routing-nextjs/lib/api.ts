import axios from "axios";
import * as Yup from "yup";
import { NOTE_TAGS, type NewNote, type Note } from "@/types/note";
import { API_ROUTES } from "@/constants/routes";

const NoteSchema = Yup.object({
  id: Yup.string().required(),
  title: Yup.string().required(),
  content: Yup.string().required(),
  createdAt: Yup.string().required(),
  updatedAt: Yup.string().required(),
  tag: Yup.string().oneOf(NOTE_TAGS).required(),
});

const FetchNotesResponseSchema = Yup.object({
  notes: Yup.array().of(NoteSchema).required(),
  totalPages: Yup.number().required(),
});

const NOTEHUB_API_URL = "https://notehub-public.goit.study/api";

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const notehubClient = axios.create({
  baseURL: NOTEHUB_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const trimmedSearch = search?.trim();

  const { data } = await notehubClient.get<FetchNotesResponse>(API_ROUTES.NOTES, {
    params: {
      page,
      perPage,
      ...(trimmedSearch ? { search: trimmedSearch } : {}),
      ...(tag && tag !== "all" ? { tag } : {}),
    },
  });

  return FetchNotesResponseSchema.validateSync(data) as FetchNotesResponse;
}

export async function createNote(payload: NewNote): Promise<Note> {
  const { data } = await notehubClient.post<Note>(API_ROUTES.NOTES, payload);
  return NoteSchema.validateSync(data) as Note;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await notehubClient.delete<Note>(API_ROUTES.noteDetails(noteId));
  return NoteSchema.validateSync(data) as Note;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const { data } = await notehubClient.get<Note>(API_ROUTES.noteDetails(noteId));
  return NoteSchema.validateSync(data) as Note;
}
