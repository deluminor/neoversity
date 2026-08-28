import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import css from "./Header.module.css";


export default function Header() {
  return (
    <header className={css.header}>
      <Link href={ROUTES.HOME} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link href={ROUTES.NOTES}>Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
