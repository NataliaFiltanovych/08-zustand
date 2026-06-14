import { Metadata } from "next";
import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

export const metadata: Metadata = {
  title: "Create New Note | Note Hub",
  description:
    "Quickly create a new note in NoteHub - the efficient app for organizing your thoughts and ideas",
  openGraph: {
    title: "Create New Note | Note Hub",
    description:
      "Quickly create a new note in NoteHub - the efficient app for organizing your thoughts and ideas",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create New Note | Note Hub",
      },
    ],
  },
};

const CreateNote = async () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
