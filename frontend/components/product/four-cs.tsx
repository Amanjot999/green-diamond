import { ChevronDown } from "lucide-react";
import type { DiamondSpec } from "@backend/types";

/**
 * 4C mini-explainers (SPEC §7.4) — native <details> accordions so they are
 * keyboard-accessible with zero client JS. Full guide ships with the
 * Education page (batch 3.6).
 */
export function FourCs({ spec }: { spec?: DiamondSpec }) {
  const items = [
    {
      name: "Cut",
      current: spec?.cut,
      blurb:
        "Cut is the biggest driver of sparkle — how precisely the facets are angled decides how much light returns to your eye. Ideal and Excellent cuts return the most.",
    },
    {
      name: "Colour",
      current: spec?.color,
      blurb:
        "Graded from D (completely colourless) downwards. D–F stones are icy white; G–H look identical to most eyes at a noticeably lower price.",
    },
    {
      name: "Clarity",
      current: spec?.clarity,
      blurb:
        "Measures internal characteristics under 10× magnification. VS2 and above are “eye-clean” — any inclusions are invisible without a jeweller's loupe.",
    },
    {
      name: "Carat",
      current: spec ? `${spec.caratWeight.toFixed(2)} ct` : undefined,
      blurb:
        "Carat is weight (0.2 g), not size. Shape and cut change how large a stone looks — elongated shapes like oval and emerald wear bigger than their weight.",
    },
  ];

  return (
    <section aria-labelledby="fourcs-heading">
      <h2 id="fourcs-heading" className="font-serif text-2xl text-charcoal sm:text-3xl">
        Know the 4Cs
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        The four grades that define every diamond — lab-grown or mined.
      </p>

      <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-surface">
        {items.map((item) => (
          <details key={item.name} className="group">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 sm:px-5 [&::-webkit-details-marker]:hidden">
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-sm font-medium text-charcoal">{item.name}</span>
                {item.current && (
                  <span className="text-xs text-muted-foreground">
                    This stone: <span className="font-medium text-primary">{item.current}</span>
                  </span>
                )}
              </span>
              <ChevronDown
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                strokeWidth={1.5}
                aria-hidden
              />
            </summary>
            <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-5">
              {item.blurb}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
