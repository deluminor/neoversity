import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { ROUTES } from "@/constants/routes";
import { draftToFilters, filtersToDraft, serializeCarFilters } from "@/lib/utils/car-filters";
import type { CarFilters, CarFiltersDraft } from "@/types/filters";
const EMPTY_DRAFT: CarFiltersDraft = filtersToDraft({});

export function useCarFilters(appliedFilters: CarFilters) {
  const router = useRouter();
  const appliedQuery = serializeCarFilters(appliedFilters);
  const [syncedQuery, setSyncedQuery] = useState(appliedQuery);
  const [draft, setDraft] = useState<CarFiltersDraft>(() => filtersToDraft(appliedFilters));
  const [isPendingNav, startTransition] = useTransition();

  if (appliedQuery !== syncedQuery) {
    setSyncedQuery(appliedQuery);
    setDraft(filtersToDraft(appliedFilters));
  }

  const setField = <TField extends keyof CarFiltersDraft>(
    field: TField,
    value: CarFiltersDraft[TField],
  ) => {
    setDraft((previous) => ({ ...previous, [field]: value }));
  };

  const search = () => {
    const query = serializeCarFilters(draftToFilters(draft));

    startTransition(() => {
      router.push(query ? `${ROUTES.catalog}?${query}` : ROUTES.catalog, { scroll: false });
    });
  };

  const reset = () => {
    setDraft(EMPTY_DRAFT);
    startTransition(() => {
      router.push(ROUTES.catalog, { scroll: false });
    });
  };

  const isDirty = appliedQuery !== "" || Object.values(draft).some((value) => value !== "");

  return { draft, isDirty, isPendingNav, setField, search, reset };
}
