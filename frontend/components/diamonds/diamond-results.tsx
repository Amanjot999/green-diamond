import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@backend/types";
import { Badge } from "@/components/ui/badge";
import { Price } from "@/components/product/price";
import { ShapeIcon } from "@/components/product/shape-icon";
import { capitalize } from "@/components/product/product-labels";

/**
 * Finder results (SPEC §7.3): a spec table on desktop, tappable spec cards on
 * mobile — loose diamonds sell on their grades, not their photos.
 */
export function DiamondResults({ items }: { items: Product[] }) {
  const rows = items.filter((p) => p.diamondSpec);

  return (
    <>
      {/* Desktop: spec table */}
      <div className="hidden overflow-hidden rounded-xl border border-border lg:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-sage-50/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th scope="col" className="px-4 py-3 font-medium">Diamond</th>
              <th scope="col" className="px-3 py-3 font-medium">Carat</th>
              <th scope="col" className="px-3 py-3 font-medium">Cut</th>
              <th scope="col" className="px-3 py-3 font-medium">Colour</th>
              <th scope="col" className="px-3 py-3 font-medium">Clarity</th>
              <th scope="col" className="px-3 py-3 font-medium">Cert</th>
              <th scope="col" className="px-3 py-3 font-medium">Growth</th>
              <th scope="col" className="px-3 py-3 text-right font-medium">Price</th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">View</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface">
            {rows.map((p) => {
              const spec = p.diamondSpec!;
              return (
                <tr key={p.id} className="transition-colors hover:bg-sage-50/50">
                  <td className="px-4 py-3">
                    <Link
                      href={`/products/${p.slug}`}
                      className="inline-flex items-center gap-2.5 font-medium text-charcoal hover:text-primary"
                    >
                      <ShapeIcon shape={spec.shape} className="h-6 w-6 shrink-0 text-gold-600" />
                      {capitalize(spec.shape)}
                    </Link>
                  </td>
                  <td className="px-3 py-3">{spec.caratWeight.toFixed(2)}</td>
                  <td className="px-3 py-3">{spec.cut}</td>
                  <td className="px-3 py-3">{spec.color}</td>
                  <td className="px-3 py-3">{spec.clarity}</td>
                  <td className="px-3 py-3">{spec.certLab}</td>
                  <td className="px-3 py-3">{spec.growthMethod}</td>
                  <td className="px-3 py-3 text-right">
                    <Price price={p.basePrice} compareAt={p.compareAtPrice} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/products/${p.slug}`}
                      aria-label={`View ${p.name}`}
                      className="inline-flex h-9 items-center gap-1 rounded-md border border-border px-3 text-xs font-medium text-charcoal transition-colors hover:border-primary hover:text-primary"
                    >
                      View
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: spec cards */}
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
        {rows.map((p) => {
          const spec = p.diamondSpec!;
          return (
            <li key={p.id}>
              <Link
                href={`/products/${p.slug}`}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-primary/50"
              >
                <ShapeIcon shape={spec.shape} className="mt-0.5 h-8 w-8 shrink-0 text-gold-600" />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="text-sm font-medium leading-snug text-charcoal">{p.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {spec.cut} · {spec.color} · {spec.clarity} · {spec.growthMethod}
                  </span>
                  <span className="mt-1 flex flex-wrap items-center gap-2">
                    <Price price={p.basePrice} compareAt={p.compareAtPrice} />
                    <Badge variant="outline">{spec.certLab} certified</Badge>
                  </span>
                </span>
                <ArrowRight
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
