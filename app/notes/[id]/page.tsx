import { fetchNoteById } from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from "next";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: NoteDetailsProps
): Promise<Metadata> {
  const { id } =  await params;

  const note = await fetchNoteById(id);
  
  return {
    title: note?.title || "Note Details - NoteHub",
    description: note?.content
      ? note.content.slice(0, 150) + (note.content.length > 150 ? "..." : "")
      : `View details for note with ID: ${id}`,
    openGraph: {
      title: note?.title || "Note Details - NoteHub",
      description: note?.content || `View details for note with ID: ${id}`,
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note?.title || "NoteHub Note",
        },
      ],
      type: "article",
    },
  };
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
};

export default NoteDetails;
