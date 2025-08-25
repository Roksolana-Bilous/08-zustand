import { fetchNoteById } from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type NoteDetailsProps = {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Note Details - NoteHub`,
    description: `View details for note with ID: ${id}`,
    openGraph: {
      title: `Note Details - NoteHub`,
      description: `View details for note with ID: ${id}`,
      url: `https://notehub.com/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub title",
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
