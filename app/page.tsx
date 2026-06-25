import { getCatalogRepository } from "@/lib/repositories";
import { Hero } from "@/components/home/hero";
import { CertLogos } from "@/components/home/cert-logos";
import { ShopByShape } from "@/components/home/shop-by-shape";
import { FeaturedCollections } from "@/components/home/featured-collections";
import { Bestsellers } from "@/components/home/bestsellers";
import { DualTeaser } from "@/components/home/dual-teaser";
import { Testimonials } from "@/components/home/testimonials";
import { NewsletterCta } from "@/components/home/newsletter-cta";

export default async function Home() {
  const catalog = getCatalogRepository();
  const { items: bestsellers } = await catalog.listProducts({ featured: true, pageSize: 4 });

  return (
    <>
      <Hero />
      <CertLogos />
      <ShopByShape />
      <FeaturedCollections />
      <Bestsellers products={bestsellers} />
      <DualTeaser />
      <Testimonials />
      <NewsletterCta />
    </>
  );
}
