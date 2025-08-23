"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import { useRouter } from "next/navigation";

interface NoteDetailsClientProps {
    id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
    const router = useRouter();
    const handleClickBack = () => {
    router.back();
  };
    const { data, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;
    if (error) return <p>Something went wrong.</p>;
    if (!data) return <p>No note found.</p>;

    return (
    <Modal onClose={handleClickBack}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.tag}>{data.tag}</p>
          <p className={css.date}>Created: {data.createdAt}</p>
          <button className={css.btn} onClick={handleClickBack}>
            Back
          </button>
        </div>
      </div>
    </Modal>
  );
}