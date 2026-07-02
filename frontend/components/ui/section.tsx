import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-16 sm:py-20", className)} {...props} />;
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        actionHref && "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-3", align === "center" && "items-center text-center")}>
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            {eyebrow}
          </span>
        )}
        <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">{title}</h2>
        {description && <p className="max-w-2xl text-muted-foreground">{description}</p>}
      </div>
      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-primary transition-colors hover:text-forest-700"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      )}
    </div>
  );
}
