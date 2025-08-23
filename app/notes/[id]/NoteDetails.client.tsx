"use client"

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetails.module.css"

interface NoteDetailsClientProps {
    id: string;
}

export default function NoteDetailsClient({id}: NoteDetailsClientProps) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error) return <p>Something went wrong.</p>;
    if (!data) return <p>No note found.</p>;

    return (
    <div className={css.container}>
	    <div className={css.item}>
	        <div className={css.header}>
	            <h2>{data.title}</h2>
	        </div>
	    <p className={css.content}>{data.content}</p>
	    <p className={css.date}>{data.createdAt}</p>
	    </div>
    </div>
    )
}