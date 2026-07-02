"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mainNav } from "./nav-data";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 hover:bg-foreground/5"
      >
        <Menu className="h-5 w-5" strokeWidth={1.5} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-charcoal/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-surface">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="font-serif text-lg text-charcoal">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 hover:bg-foreground/5"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-col px-2 py-3">
              {mainNav.map((item) =>
                item.columns ? (
                  <div key={item.label} className="border-b border-border/60">
                    <button
                      type="button"
                      onClick={() => setExpanded((k) => (k === item.label ? null : item.label))}
                      aria-expanded={expanded === item.label}
                      className="flex w-full items-center justify-between px-3 py-3.5 text-left text-foreground"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expanded === item.label && "rotate-180",
                        )}
                        strokeWidth={1.5}
                      />
                    </button>
                    {expanded === item.label && (
                      <div className="pb-3">
                        {item.columns.map((col) => (
                          <div key={col.heading} className="px-3 pb-2">
                            <p className="px-1 pb-1 pt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                              {col.heading}
                            </p>
                            <ul>
                              {col.links.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="block rounded-md px-1 py-2 text-sm text-foreground/80 hover:text-primary"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-border/60 px-3 py-3.5 text-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
