import { BadgeCheck, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { env } from "@backend/config/env";
import { formatINR, rupeesToPaise } from "@backend/config/money";
import { cn } from "@/lib/utils/cn";

/**
 * Shipping / returns / warranty / certification reassurance row (SPEC §7.4).
 * Server component — the free-shipping threshold comes from config, not copy.
 */
export function TrustBlurbs({ className }: { className?: string }) {
  const freeOver = formatINR(rupeesToPaise(env.FREE_SHIPPING_THRESHOLD_INR));
  const items = [
    {
      Icon: Truck,
      title: "Free insured shipping",
      sub: `Fully insured delivery on orders over ${freeOver}`,
    },
    {
      Icon: RotateCcw,
      title: "30-day returns",
      sub: "Easy returns with a full refund window",
    },
    {
      Icon: ShieldCheck,
      title: "Lifetime care",
      sub: "Free prong checks, polishing & buyback programme",
    },
    {
      Icon: BadgeCheck,
      title: "Certified & conflict-free",
      sub: "Independently graded by IGI, GIA or GCAL",
    },
  ];

  return (
    <ul className={cn("grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4", className)}>
      {items.map(({ Icon, title, sub }) => (
        <li key={title} className="flex flex-col gap-2 rounded-xl border border-border bg-surface p-4">
          <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden />
          <p className="text-sm font-medium text-charcoal">{title}</p>
          <p className="text-xs leading-relaxed text-muted-foreground">{sub}</p>
        </li>
      ))}
    </ul>
  );
}
