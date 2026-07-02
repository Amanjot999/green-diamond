import { cn } from "@/lib/utils/cn";

/** Text input primitive — 44px touch target, brand focus ring. */
export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-primary disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
