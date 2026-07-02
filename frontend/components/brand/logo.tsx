import Link from "next/link";
import { cn } from "@/lib/utils/cn";

/** Green Diamond wordmark with a hairline diamond glyph. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Green Diamond — home"
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 3 L20 9 L12 21 L4 9 Z M4 9 H20 M12 3 L8.5 9 L12 21 M12 3 L15.5 9 L12 21"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
          className="text-accent"
        />
      </svg>
      <span className="font-serif text-xl tracking-wide text-charcoal">Green Diamond</span>
    </Link>
  );
}
