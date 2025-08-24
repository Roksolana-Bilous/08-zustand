import css from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "Sorry, the page you are looking for does not exist.",
  openGraph: {
      title: "404 - Page not found",
      description:"Sorry, the page you are looking for does not exist.",
      url: `https://notehub.com/notes/`,
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
export default function NotFoundPage () {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};
