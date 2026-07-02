import type { Metadata } from "next";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { getCatalogRepository } from "@backend/repositories";
import { searchParamsToQuery, type RawSearchParams } from "@backend/shop/facets";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { ActiveFilters } from "@/components/shop/active-filters";
import { Pagination } from "@/components/shop/pagination";
import { SortSelect } from "@/components/shop/sort-select";
import { DiamondResults } from "@/components/diamonds/diamond-results";
import { FinderFilters } from "@/components/diamonds/finder-filters";
import { FourCs } from "@/components/product/four-cs";

export const metadata: Metadata = {
  title: "Loose lab-grown diamonds — 4C finder",
  description:
    "Search certified loose lab-grown diamonds by shape, carat, cut, colour, clarity, price, certificate and growth method.",
};

/** Loose-diamond 4C finder — SPEC §7.3 (batch 3.4), mock-backed. */
export default async function DiamondsPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const sp = await searchParams;
  const query = searchParamsToQuery(sp);
  const catalog = getCatalogRepository();
  const { items, total, page, totalPages } = await catalog.searchLooseDiamonds(query);

  return (
    <Container className="py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Loose diamonds" }]} />

      <div className="mt-5 flex flex-col gap-2">
        <h1 className="font-serif text-4xl text-charcoal sm:text-5xl">Find your diamond</h1>
        <p className="max-w-xl text-muted-foreground">
          Search certified lab-grown stones by the 4Cs — every one independently graded, every
          certificate verifiable.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[17rem_1fr] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            <FinderFilters />
          </div>
        </aside>

        <div>
          {/* Mobile: collapsible filter panel */}
          <details className="group mb-5 rounded-xl border border-border bg-surface lg:hidden">
            <summary className="flex h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 [&::-webkit-details-marker]:hidden">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-charcoal">
                <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                Filter diamonds
              </span>
              <ChevronDown
                className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
                strokeWidth={1.5}
                aria-hidden
              />
            </summary>
            <div className="border-t border-border p-4">
              <FinderFilters />
            </div>
          </details>

          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">
              {total} {total === 1 ? "diamond" : "diamonds"}
            </p>
            <SortSelect />
          </div>

          <div className="pt-6">
            <ActiveFilters />
            {items.length === 0 ? (
              <EmptyState
                title="No diamonds match"
                description="Try widening your carat or price range, or clearing a grade filter."
                actionHref="/diamonds"
                actionLabel="Clear filters"
              />
            ) : (
              <DiamondResults items={items} />
            )}
            <Pagination page={page} totalPages={totalPages} />
          </div>
        </div>
      </div>

      <FourCs />
    </Container>
  );
}
