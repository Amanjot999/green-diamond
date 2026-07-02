import type { Product } from "@backend/types";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { ProductCard } from "@/components/product/product-card";

export function Bestsellers({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="Loved by our customers"
          title="Bestsellers"
          actionHref="/shop"
          actionLabel="Shop all"
        />
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
