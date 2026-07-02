import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCatalogRepository } from "@backend/repositories";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { FourCs } from "@/components/product/four-cs";
import { Gallery } from "@/components/product/gallery";
import { ProductCard } from "@/components/product/product-card";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { Reviews } from "@/components/product/reviews";
import { SpecTable } from "@/components/product/spec-table";
import { TrustBlurbs } from "@/components/product/trust-blurbs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCatalogRepository().getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.seoTitle ?? product.name,
    description: product.seoDescription ?? product.description,
  };
}

/** Product detail page — SPEC §7.4 (batch 3.3), mock-backed. */
export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const catalog = getCatalogRepository();
  const product = await catalog.getProductBySlug(slug);
  if (!product || product.status !== "active") notFound();

  const [related, reviews] = await Promise.all([
    catalog.getRelatedProducts(slug, 4),
    catalog.getProductReviews(product.id),
  ]);

  return (
    // Bottom padding on mobile clears the sticky add-to-cart bar.
    <Container className="pb-28 pt-6 sm:pt-8 lg:pb-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <Gallery media={product.media} productName={product.name} />
        <PurchasePanel product={product} />
      </div>

      <TrustBlurbs className="mt-12" />

      <div
        className={
          product.diamondSpec
            ? "mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-14"
            : "mt-12 lg:mt-16"
        }
      >
        {product.diamondSpec && <SpecTable spec={product.diamondSpec} />}
        <FourCs spec={product.diamondSpec} />
      </div>

      <Reviews
        rating={product.rating}
        count={product.reviewCount}
        reviews={reviews}
        className="mt-14 lg:mt-20"
      />

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-14 lg:mt-20">
          <h2 id="related-heading" className="font-serif text-2xl text-charcoal sm:text-3xl">
            You may also love
          </h2>
          {/* Horizontal snap-scroll on mobile, grid on desktop */}
          <div className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:overflow-visible lg:px-0 lg:pb-0">
            {related.map((p) => (
              <div key={p.id} className="w-[72vw] max-w-72 shrink-0 snap-start sm:w-64 lg:w-auto lg:max-w-none">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </Container>
  );
}
