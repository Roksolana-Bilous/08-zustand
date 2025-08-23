import { fetchNoteById } from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";

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
            <NotePreviewClient id={id}/>
        </HydrationBoundary>
    )
}

export default NoteDetails