import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { Metadata } from "next";

interface NotesProps {
    params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: NotesProps): Promise<Metadata> {
  const {slug} =  await params;
const tag = slug?.[0] && slug[0] !== "all" ? slug[0] : undefined;         

  const title =
    tag === "all"
      ? "All Notes - NoteHub"
      : `Notes filtered by "${tag}" - NoteHub`;

  const description =
    tag === "all"
      ? "Browse all your notes efficiently in NoteHub."
      : `View notes filtered by "${tag}" to manage them more effectively.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${tag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
  };
}

export default async function Notes({ params }: NotesProps) {
  const {slug} =  await params;
  const tag = slug?.[0] && slug[0] !== "all" ? slug[0] : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { tag }],
    queryFn: () => fetchNotes({ tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
