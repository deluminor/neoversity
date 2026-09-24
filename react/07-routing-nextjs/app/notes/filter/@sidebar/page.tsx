"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./SidebarNotes.module.css";

const TAGS = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping"
];

export default function SidebarNotes() {
  const pathname = usePathname();

  const getHref = (tag: string) => `/notes/filter/${tag}`;

  return (
    <aside className={css.sidebar}>
      <h2 className={css.title}>Filter by tag</h2>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link
            href="/notes/filter/all"
            className={`${css.menuLink} ${pathname === "/notes/filter/all" ? css.active : ""}`}
          >
            All notes
          </Link>
        </li>
        {TAGS.map((tag) => {
          const href = getHref(tag);
          const isActive = pathname === href;
          return (
            <li key={tag} className={css.menuItem}>
              <Link href={href} className={`${css.menuLink} ${isActive ? css.active : ""}`}>
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
