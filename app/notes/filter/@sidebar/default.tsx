import Link from "next/link";
import css from "./SidebarNotes.module.css";

const SidebarNotes = () => {
  const tags = ["All notes", "Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            className={css.menuLink}
            href={
              tag === "All notes" ? "/notes/filter/all" : `/notes/filter/${tag}`
            }
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
