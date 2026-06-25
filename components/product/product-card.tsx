import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Price } from "./price";
import { QuickView } from "./quick-view";
import { Rating } from "./rating";
import { WishlistButton } from "./wishlist-button";

export function ProductCard({ product }: { product: Product }) {
  const media = product.media[0];
  const onSale = product.compareAtPrice !== undefined && product.compareAtPrice > product.basePrice;
  const savePct = onSale
    ? Math.round((1 - product.basePrice / (product.compareAtPrice as number)) * 100)
    : 0;

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-sage-50">
        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          <Image
            src={media?.url ?? "/images/placeholder.svg"}
            alt={media?.alt ?? product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
          />
        </Link>
        {onSale && (
          <Badge variant="gold" className="absolute left-3 top-3">
            Save {savePct}%
          </Badge>
        )}
        <WishlistButton productId={product.id} className="absolute right-3 top-3" />
        <QuickView product={product} />
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <Rating value={product.rating} count={product.reviewCount} />
        <h3 className="font-serif text-lg leading-snug">
          <Link href={`/products/${product.slug}`} className="text-charcoal transition-colors hover:text-primary">
            {product.name}
          </Link>
        </h3>
        <Price price={product.basePrice} compareAt={product.compareAtPrice} />
      </div>
    </article>
  );
}
