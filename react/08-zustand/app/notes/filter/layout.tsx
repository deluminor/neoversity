import css from "./LayoutNotes.module.css";

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div className={css.container}>
      {sidebar}
      <div className={css.content}>{children}</div>
    </div>
  );
}
