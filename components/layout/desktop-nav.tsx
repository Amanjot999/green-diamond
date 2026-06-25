import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { mainNav } from "./nav-data";

/** CSS-only mega-menu (reveals on hover and keyboard focus-within — no JS). */
export function DesktopNav() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-7 text-sm">
        {mainNav.map((item) => (
          <li key={item.label} className="group relative">
            <Link
              href={item.href}
              className="inline-flex items-center gap-1 py-5 text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
              {item.columns && (
                <ChevronDown
                  className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180"
                  strokeWidth={1.5}
                />
              )}
            </Link>

            {item.columns && (
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="flex gap-10 rounded-xl border border-border bg-surface p-7 shadow-elevated">
                  {item.columns.map((col) => (
                    <div key={col.heading} className="min-w-[9rem]">
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        {col.heading}
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              className="whitespace-nowrap text-sm text-foreground/80 transition-colors hover:text-primary"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
