import Link from "next/link";
import css from "./SidebarNotes.module.css";

const categories = ["All","Todo", "Work", "Personal", "Meeting", "Shopping"];
export default function SidebarNotes() {
    return (
        <div className={css.sidebar}>
        <h2 className={css.title}>Notes</h2>
        <ul className={css.menuList}>
            {categories.map((tag) => (
            <li key={tag} className={css.menuItem}>
                <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                >
                {tag}
                </Link>
            </li>
            ))}
        </ul>
        </div>
    );
}
