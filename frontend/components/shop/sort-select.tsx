"use client";

import { SORT_OPTIONS } from "@backend/shop/facets";
import { useShopParams } from "./use-shop-params";

export function SortSelect() {
  const { searchParams, setParam } = useShopParams();
  const current = searchParams.get("sort") ?? "featured";
  return (
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="hidden sm:inline">Sort</span>
      <select
        value={current}
        onChange={(e) => setParam("sort", e.target.value)}
        className="h-10 rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none focus-visible:border-primary"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
