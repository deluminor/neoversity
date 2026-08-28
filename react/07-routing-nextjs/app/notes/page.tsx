import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function NotesPage() {
  redirect(ROUTES.NOTES_FILTER_ALL);
}
