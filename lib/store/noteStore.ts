import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreateNoteDto } from "@/lib/api";

const initialDraft: CreateNoteDto = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteDraftStore {
  draft: CreateNoteDto;
  setDraft: (note: Partial<CreateNoteDto>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);

