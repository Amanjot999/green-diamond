"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import type { Metal, Product, ProductType } from "@/types";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { METAL_OPTIONS } from "@/lib/shop/facets";
import { Price } from "./price";
import { Rating } from "./rating";
import { ShapeIcon } from "./shape-icon";
import { WishlistButton } from "./wishlist-button";

const TYPE_LABEL: Record<ProductType, string> = {
  loose_diamond: "Loose diamond",
  ring: "Ring",
  earrings: "Earrings",
  necklace: "Necklace",
  pendant: "Pendant",
  bracelet: "Bracelet",
  bangle: "Bangle",
};

const metalLabel = (m: Metal) => METAL_OPTIONS.find((o) => o.value === m)?.label ?? m;
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Quick-view modal (SPEC §3, §7.2) — preview a product without leaving the
 * listing. Renders the hover/focus trigger over the product card image plus
 * the dialog itself. Add-to-cart lives on the PDP, so the primary action links
 * through to full details.
 */
export function QuickView({ product, className }: { product: Product; className?: string }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  const media = product.media[0];
  const spec = product.diamondSpec;
  const onSale =
    product.compareAtPrice !== undefined && product.compareAtPrice > product.basePrice;
  const savePct = onSale
    ? Math.round((1 - product.basePrice / (product.compareAtPrice as number)) * 100)
    : 0;

  const metals = Array.from(
    new Set(product.variants.map((v) => v.metal).filter((m): m is Metal => Boolean(m))),
  );

  const specs = spec
    ? [
        { label: "Shape", value: capitalize(spec.shape) },
        { label: "Carat", value: `${spec.caratWeight.toFixed(2)} ct` },
        { label: "Cut", value: spec.cut },
        { label: "Colour", value: spec.color },
        { label: "Clarity", value: spec.clarity },
        { label: "Grown by", value: spec.growthMethod },
      ]
    : [];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Quick view: ${product.name}`}
        aria-haspopup="dialog"
        className={cn(
          "absolute inset-x-3 bottom-3 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-surface/95 text-sm font-medium text-charcoal shadow-sm backdrop-blur transition-all duration-300 ease-luxe",
          "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100",
          className,
        )}
      >
        <Eye className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        Quick view
      </button>

      <Modal open={open} onClose={() => setOpen(false)} labelledBy={titleId} className="max-w-3xl">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="relative aspect-square w-full bg-sage-50 sm:aspect-auto">
            <Image
              src={media?.url ?? "/images/placeholder.svg"}
              alt={media?.alt ?? product.name}
              fill
              sizes="(max-width: 640px) 100vw, 384px"
              className="object-cover"
            />
            {onSale && (
              <Badge variant="gold" className="absolute left-3 top-3">
                Save {savePct}%
              </Badge>
            )}
          </div>

          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <div className="flex flex-col gap-2">
              <Badge variant="outline" className="self-start">
                {TYPE_LABEL[product.type]}
              </Badge>
              <h2 id={titleId} className="font-serif text-2xl leading-snug text-charcoal">
                {product.name}
              </h2>
              <Rating value={product.rating} count={product.reviewCount} />
              <Price price={product.basePrice} compareAt={product.compareAtPrice} className="text-lg" />
            </div>

            <p className="line-clamp-3 text-sm text-muted-foreground">{product.description}</p>

            {spec && (
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg border border-border bg-sage-50/60 p-4">
                <div className="col-span-2 flex items-center gap-2 text-charcoal">
                  <ShapeIcon shape={spec.shape} className="h-6 w-6 text-primary" />
                  <span className="text-sm font-medium">
                    {capitalize(spec.shape)} · {spec.caratWeight.toFixed(2)} ct
                  </span>
                </div>
                {specs.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      {s.label}
                    </dt>
                    <dd className="text-sm text-charcoal">{s.value}</dd>
                  </div>
                ))}
                <p className="col-span-2 text-xs text-muted-foreground">
                  {spec.certLab} certified · {spec.certNumber}
                </p>
              </dl>
            )}

            {metals.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">Metal</span>
                {metals.map((m) => (
                  <Badge key={m} variant="outline">
                    {metalLabel(m)}
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-2 flex items-center gap-3">
              <Link
                href={`/products/${product.slug}`}
                className={cn(buttonVariants({ size: "md" }), "flex-1")}
                onClick={() => setOpen(false)}
              >
                View full details
              </Link>
              <WishlistButton
                productId={product.id}
                className="h-11 w-11 border border-border bg-surface"
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
