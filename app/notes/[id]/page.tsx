import { fetchNoteById } from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";
export async function generateMetadata({ params }: { params: { id: string[] } }): Promise<Metadata> {
    const { id } = params;
    return {
        title: `Note Details - NoteHub`,
        description: `View details for note with ID: ${id[0]}`,
        openGraph: {
            title: `Note Details - NoteHub`,
            description: `View details for note with ID: ${id[0]}`,
            url: `https://notehub.com/notes/${id[0]}`,
            images: [
                {
                    url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
                    width: 1200,
                    height: 630,
                    alt:"NoteHub title",
                },
            ],
            type: 'article',
        },
    };
}
type NoteDetailsProps = {
    params: Promise<{ id: string }>;
}
const NoteDetails = async ({ params }: NoteDetailsProps) => {
    const { id } = await params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient id={id}/>
        </HydrationBoundary>
    )
}

export default NoteDetails