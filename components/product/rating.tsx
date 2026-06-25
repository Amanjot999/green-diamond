import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Rating({
  value,
  count,
  className,
}: {
  value?: number;
  count?: number;
  className?: string;
}) {
  if (value === undefined) return null;
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs text-muted-foreground", className)}>
      <Star className="h-3.5 w-3.5 fill-gold-500 text-gold-500" strokeWidth={1.5} />
      <span className="font-medium text-foreground">{value.toFixed(1)}</span>
      {count !== undefined && <span>({count})</span>}
    </span>
  );
}
