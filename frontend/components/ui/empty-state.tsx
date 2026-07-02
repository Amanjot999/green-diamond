import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "./button";

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
  icon,
  className,
}: {
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-16 text-center",
        className,
      )}
    >
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h2 className="font-serif text-2xl text-charcoal">{title}</h2>
      {description && <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {actionHref && actionLabel && (
        <Link href={actionHref} className={cn(buttonVariants({ size: "md" }), "mt-6")}>
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
