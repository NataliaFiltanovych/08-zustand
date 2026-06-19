import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === "all" ? "All notes" : slug[0];

  return {
    title: `Note - ${tag}`,
    description: `Browse notes tagged with ${tag}. NoteHub allows you to filter and view notes based on specific tags for better organization`,
    openGraph: {
      title: `Note - ${tag}`,
      description: `Browse notes tagged with ${tag}. NoteHub allows you to filter and view notes based on specific tags for better organization`,
      url: `https://08-zustand-blue-nu.vercel.app/notes/filter/all`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes - ${tag} | NoteNub`,
        },
      ],
      type: "article",
    },
  };
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
