"use client";

import { useParams } from "next/navigation";
import css from "./NoteDetailsClient.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

const NoteDetailsClient = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
        </div>
        <p className={css.tag}>{note?.tag}</p>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>
          Created: {new Date(note?.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
