import { NewNoteBody, Note } from "@/types/note";
import axios from "axios";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

interface Notes {
  notes: Note[];
  totalPages: number;
}
export const fetchNotes = async (
  search: string,
  page: number,
  tag: string | undefined
): Promise<Notes> => {
  const res = await axios.get<Notes>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag: tag || undefined,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const createNote = async (newNote: NewNoteBody): Promise<Note> => {
  const res = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
