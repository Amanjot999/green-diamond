import type { DiamondShape } from "@/types";
import { cn } from "@/lib/utils/cn";

const paths: Partial<Record<DiamondShape, React.ReactNode>> = {
  round: <circle cx="12" cy="12" r="8.5" />,
  oval: <ellipse cx="12" cy="12" rx="6" ry="9" />,
  cushion: <rect x="4" y="4" width="16" height="16" rx="5" />,
  princess: <rect x="5" y="5" width="14" height="14" />,
  emerald: <rect x="6.5" y="3.5" width="11" height="17" rx="1.5" />,
  pear: <path d="M12 3.5C8.5 8 6.5 11 6.5 14a5.5 5.5 0 0 0 11 0c0-3-2-6-5.5-10.5Z" />,
  marquise: <path d="M12 4c4 4 4 12 0 16-4-4-4-12 0-16Z" />,
  radiant: <rect x="5.5" y="5.5" width="13" height="13" rx="2" />,
  asscher: <rect x="5.5" y="5.5" width="13" height="13" rx="3" />,
  heart: <path d="M12 20S5 15.5 5 10.5A3.5 3.5 0 0 1 12 8a3.5 3.5 0 0 1 7 2.5C19 15.5 12 20 12 20Z" />,
};

export function ShapeIcon({ shape, className }: { shape: DiamondShape; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      aria-hidden
      className={cn("h-8 w-8", className)}
    >
      {paths[shape] ?? paths.round}
    </svg>
  );
}
