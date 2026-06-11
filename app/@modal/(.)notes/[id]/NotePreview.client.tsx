"use client";

import css from "./NotePreview.client.module.css";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import Modal from "@/components/Modal/Modal";

type NotePreviewClientProps = Record<string, never>;

export default function NotePreviewClient({}: NotePreviewClientProps) {
  const { id } = useParams() as { id: string };
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error || !note) return <div>Error loading note</div>;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>

          <p className={css.content}>{note.content}</p>
          <p className={css.tag}>Tag: {note.tag}</p>
          <p className={css.date}>
            Created at: {new Date(note.createdAt).toLocaleDateString()}
          </p>

          <button className={css.backBtn} onClick={() => router.back()}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
