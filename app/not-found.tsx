import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "This page does not exist or has been moved",
  openGraph: {
    title: "Note Hub",
    description:
      "A simple and efficient app for creating and organizing your notes",
    url: "https://notehub.com/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: '"Note Hub - A simple and efficient app for creating and organizing your notes',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
