"use client";

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewNoteBody, Tags } from "../../types/note";
import { createNote } from "../../lib/api";
import { useRouter } from "next/navigation";

interface NoteForm {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export default function NoteForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newNote: NewNoteBody) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      handleCancel();
    },
  });

  const router = useRouter();
  const handleCancel = () => router.push("/notes/filter/all");

  const handleSubmit = (formData: FormData) => {
    const values: NewNoteBody = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as Tags,
    };
    mutation.mutate(values);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" className={css.input} />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
