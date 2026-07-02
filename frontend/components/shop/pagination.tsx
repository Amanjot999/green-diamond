"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  if (totalPages <= 1) return null;

  function href(p: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    return `${pathname}?${params.toString()}`;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-1">
      <Link
        href={href(Math.max(1, page - 1))}
        aria-label="Previous page"
        aria-disabled={page === 1}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground/80 hover:border-primary hover:text-primary",
          page === 1 && "pointer-events-none opacity-40",
        )}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
      </Link>
      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn(
            "inline-flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm",
            p === page
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-foreground/80 hover:border-primary hover:text-primary",
          )}
        >
          {p}
        </Link>
      ))}
      <Link
        href={href(Math.min(totalPages, page + 1))}
        aria-label="Next page"
        aria-disabled={page === totalPages}
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground/80 hover:border-primary hover:text-primary",
          page === totalPages && "pointer-events-none opacity-40",
        )}
      >
        <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
      </Link>
    </nav>
  );
}
