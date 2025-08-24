// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { CreateNote } from "../../lib/api";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNoteStore } from "@/lib/store/noteStore";
// import css from "../NoteForm/NoteForm.module.css";
// import type { NoteTag } from "../../types/note";

// const validationSchema = Yup.object({
//   title: Yup.string().min(3).max(50).required(),
//   content: Yup.string().max(500),
//   tag: Yup.mixed<NoteTag>().oneOf([
//     "Todo",
//     "Work",
//     "Personal",
//     "Meeting",
//     "Shopping",
//   ]),
// });

// interface NoteFormProps {
//   onClose: () => void;
// }

// export default function NoteForm({ onClose }: NoteFormProps) {
//   const queryClient = useQueryClient();
//   const { draft, setDraft, clearDraft } = useNoteStore();

//   const mutation = useMutation({
//     mutationFn: CreateNote,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notes"] });
//       clearDraft(); // очищаємо чернетку після створення
//       onClose();
//     },
//   });

//   return (
//     <Formik
//       initialValues={draft}
//       enableReinitialize
//       validationSchema={validationSchema}
//       onSubmit={(values) =>
//         mutation.mutate({ ...values, tag: values.tag as NoteTag })
//       }
//     >
//       {({ values }) => (
//         <Form className={css.form}>
//           <div className={css.formGroup}>
//             <label htmlFor="title">Title</label>
//             <Field
//               type="text"
//               name="title"
//               className={css.input}
//               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                 setDraft({ title: e.target.value });
//                 values.title = e.target.value;
//               }}
//             />
//             <ErrorMessage name="title" component="span" className={css.error} />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="content">Content</label>
//             <Field
//               as="textarea"
//               name="content"
//               rows={8}
//               className={css.textarea}
//               onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
//                 setDraft({ content: e.target.value });
//                 values.content = e.target.value;
//               }}
//             />
//             <ErrorMessage
//               name="content"
//               component="span"
//               className={css.error}
//             />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="tag">Tag</label>
//             <Field
//               as="select"
//               name="tag"
//               className={css.select}
//               onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
//                 setDraft({ tag: e.target.value as NoteTag });
//                 values.tag = e.target.value as NoteTag;
//               }}
//             >
//               <option value="Todo">Todo</option>
//               <option value="Work">Work</option>
//               <option value="Personal">Personal</option>
//               <option value="Meeting">Meeting</option>
//               <option value="Shopping">Shopping</option>
//             </Field>
//             <ErrorMessage name="tag" component="span" className={css.error} />
//           </div>

//           <div className={css.actions}>
//             <button
//               type="button"
//               className={css.cancelButton}
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button type="submit" className={css.submitButton}>
//               Create note
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// }


"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import type { NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [localDraft, setLocalDraft] = useState(draft);

  const mutation = useMutation({
    mutationFn: CreateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      onClose();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLocalDraft((prev) => ({ ...prev, [name]: value }));
    setDraft({ [name]: value } as Partial<typeof draft>);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      title: localDraft.title,
      content: localDraft.content,
      tag: localDraft.tag as NoteTag,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className={css.input}
          value={localDraft.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          rows={8}
          className={css.textarea}
          value={localDraft.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          name="tag"
          id="tag"
          className={css.select}
          value={localDraft.tag}
          onChange={handleChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={onClose}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
