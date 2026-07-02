"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { FilterSidebar } from "./filter-sidebar";

export function MobileFilters() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-surface px-4 text-sm font-medium text-foreground"
      >
        <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
        Filters
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-charcoal/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-surface">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="font-serif text-lg text-charcoal">Filters</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 hover:bg-foreground/5"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5">
              <FilterSidebar />
            </div>
            <div className="border-t border-border p-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-11 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-forest-700"
              >
                View results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
