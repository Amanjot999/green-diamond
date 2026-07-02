"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** Shared helpers for reading/updating the shop's filter & sort URL state. */
export function useShopParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setParam(key: string, value?: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === undefined || value === null || value === "") params.delete(key);
    else params.set(key, value);
    params.delete("page"); // any filter/sort change returns to page 1
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function setMany(updates: Record<string, string | null | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value === undefined || value === null || value === "") params.delete(key);
      else params.set(key, value);
    }
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function toggleParam(key: string, value: string) {
    setParam(key, searchParams.get(key) === value ? null : value);
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  return { searchParams, setParam, setMany, toggleParam, clearAll, pathname };
}
