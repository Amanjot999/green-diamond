import type { Metadata } from "next";
import { getCatalogRepository } from "@backend/repositories";
import { searchParamsToQuery, type RawSearchParams } from "@backend/shop/facets";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductCard } from "@/components/product/product-card";
import { ActiveFilters } from "@/components/shop/active-filters";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { MobileFilters } from "@/components/shop/mobile-filters";
import { Pagination } from "@/components/shop/pagination";
import { SortSelect } from "@/components/shop/sort-select";

export const metadata: Metadata = {
  title: "Shop lab-grown diamond jewellery",
  description:
    "Browse certified lab-grown diamond rings, earrings, necklaces and loose stones. Filter by shape, carat, cut, colour, clarity, metal and price.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const sp = await searchParams;
  const query = searchParamsToQuery(sp);
  const catalog = getCatalogRepository();
  const { items, total, page, totalPages } = await catalog.listProducts(query);

  return (
    <Container className="py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />

      <div className="mt-5 flex flex-col gap-2">
        <h1 className="font-serif text-4xl text-charcoal sm:text-5xl">Fine jewellery &amp; diamonds</h1>
        <p className="max-w-xl text-muted-foreground">
          Lab-grown, independently certified, and crafted to last a lifetime.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            <FilterSidebar />
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">
              {total} {total === 1 ? "piece" : "pieces"}
            </p>
            <div className="flex items-center gap-3">
              <MobileFilters />
              <SortSelect />
            </div>
          </div>

          <div className="pt-6">
            <ActiveFilters />
            {items.length === 0 ? (
              <EmptyState
                title="No matching pieces"
                description="Try removing a filter or widening your price or carat range."
                actionHref="/shop"
                actionLabel="Clear filters"
              />
            ) : (
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            <Pagination page={page} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </Container>
  );
}
