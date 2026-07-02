import { cn } from "@/lib/utils/cn";

/** Centered content wrapper with the site's standard horizontal gutters. */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />
  );
}
