"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Minus, Plus, ShieldCheck, ShoppingBag } from "lucide-react";
import type { Metal, Product, ProductVariant } from "@backend/types";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/cart-store";
import { Price } from "./price";
import { Rating } from "./rating";
import { TYPE_LABEL, capitalize, metalLabel } from "./product-labels";
import { WishlistButton } from "./wishlist-button";

type AxisKey = "metal" | "metalColor" | "ringSize" | "centerCarat";

const AXES: { key: AxisKey; label: string; format: (v: string | number) => string }[] = [
  { key: "metal", label: "Metal", format: (v) => metalLabel(v as Metal) },
  { key: "metalColor", label: "Colour", format: (v) => capitalize(String(v)) },
  { key: "ringSize", label: "Ring size", format: (v) => String(v) },
  { key: "centerCarat", label: "Centre stone", format: (v) => `${Number(v).toFixed(2)} ct` },
];

const METAL_ORDER: Metal[] = ["14k", "18k", "platinum"];
const COLOR_ORDER = ["yellow", "white", "rose"];

function axisValues(variants: ProductVariant[], key: AxisKey): (string | number)[] {
  const values = [...new Set(variants.map((v) => v[key]).filter((x) => x !== undefined))] as (
    | string
    | number
  )[];
  if (key === "metal") return values.sort((a, b) => METAL_ORDER.indexOf(a as Metal) - METAL_ORDER.indexOf(b as Metal));
  if (key === "metalColor") return values.sort((a, b) => COLOR_ORDER.indexOf(String(a)) - COLOR_ORDER.indexOf(String(b)));
  return values.sort((a, b) => Number(a) - Number(b));
}

/**
 * PDP purchase panel (SPEC §7.4): title, price, live stock, variant selectors,
 * quantity, add-to-cart/wishlist — plus the mobile sticky add-to-cart bar.
 * All tap targets ≥ 44px on touch layouts.
 */
export function PurchasePanel({ product }: { product: Product }) {
  const addLine = useCart((s) => s.add);
  const [variantId, setVariantId] = useState(
    () => (product.variants.find((v) => v.stock > 0) ?? product.variants[0])?.id,
  );
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (addedTimer.current) clearTimeout(addedTimer.current);
  }, []);

  const axes = useMemo(
    () =>
      AXES.map((axis) => ({ ...axis, values: axisValues(product.variants, axis.key) })).filter(
        (axis) => axis.values.length > 0,
      ),
    [product.variants],
  );

  function pick(key: AxisKey, value: string | number) {
    const candidates = product.variants.filter((v) => v[key] === value);
    const others = axes.map((a) => a.key).filter((k) => k !== key);
    const score = (v: ProductVariant) =>
      others.reduce((s, k) => s + (v[k] === variant?.[k] ? 1 : 0), 0) + (v.stock > 0 ? 0.5 : 0);
    const best = [...candidates].sort((a, b) => score(b) - score(a))[0];
    if (best) {
      setVariantId(best.id);
      setQty(1);
      setAdded(false);
    }
  }

  if (!variant) return null;

  const outOfStock = variant.stock === 0;
  const lowStock = !outOfStock && variant.stock <= variant.lowStockThreshold;
  const oneOfAKind = product.type === "loose_diamond" && variant.stock === 1;
  const maxQty = Math.min(variant.stock, 8);
  const compareAt =
    product.compareAtPrice !== undefined && product.compareAtPrice > variant.price
      ? product.compareAtPrice
      : undefined;

  function addToBag() {
    if (outOfStock) return;
    const variantLabel = [
      variant.metal !== undefined ? metalLabel(variant.metal) : undefined,
      variant.metalColor !== undefined ? capitalize(variant.metalColor) : undefined,
      variant.ringSize !== undefined ? `Size ${variant.ringSize}` : undefined,
      variant.centerCarat !== undefined ? `${variant.centerCarat.toFixed(2)} ct` : undefined,
    ]
      .filter(Boolean)
      .join(" · ");
    addLine({
      variantId: variant.id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.media[0]?.url,
      variantLabel: variantLabel || undefined,
      unitPrice: variant.price,
      qty,
      maxQty,
    });
    setAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 2200);
  }

  const ctaLabel = outOfStock ? "Out of stock" : added ? "Added to bag" : "Add to bag";
  const CtaIcon = added ? Check : ShoppingBag;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2.5">
        <Badge variant="outline" className="self-start">
          {TYPE_LABEL[product.type]}
        </Badge>
        <h1 className="font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
          {product.name}
        </h1>
        <Rating value={product.rating} count={product.reviewCount} />
        <div className="flex flex-wrap items-center gap-3">
          <Price price={variant.price} compareAt={compareAt} className="text-2xl" />
          {outOfStock ? (
            <Badge variant="outline" className="border-destructive/40 text-destructive">
              Out of stock
            </Badge>
          ) : oneOfAKind ? (
            <Badge variant="gold">One of a kind — only 1 available</Badge>
          ) : lowStock ? (
            <Badge variant="gold">Only {variant.stock} left</Badge>
          ) : (
            <Badge variant="outline" className="border-success/40 text-success">
              In stock
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Inclusive of all taxes · SKU {variant.sku}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

      {axes.map((axis) => (
        <fieldset key={axis.key}>
          <legend className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {axis.label}
            {": "}
            <span className="normal-case text-charcoal">
              {variant[axis.key] !== undefined ? axis.format(variant[axis.key] as string | number) : "—"}
            </span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {axis.values.map((value) => {
              const selected = variant[axis.key] === value;
              const anyInStock = product.variants.some((v) => v[axis.key] === value && v.stock > 0);
              return (
                <button
                  key={String(value)}
                  type="button"
                  onClick={() => pick(axis.key, value)}
                  aria-pressed={selected}
                  className={cn(
                    "inline-flex h-11 min-w-11 items-center justify-center rounded-md border px-4 text-sm transition-colors",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-surface text-charcoal hover:border-primary/50",
                    !anyInStock && "text-muted-foreground/60 line-through",
                  )}
                >
                  {axis.format(value)}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="flex items-center gap-3">
        {maxQty > 1 && (
          <div className="inline-flex items-center rounded-md border border-border" role="group" aria-label="Quantity">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
              className="inline-flex h-11 w-11 items-center justify-center text-charcoal transition-colors hover:bg-foreground/5 disabled:opacity-40"
            >
              <Minus className="h-4 w-4" aria-hidden />
            </button>
            <span className="w-10 text-center text-sm font-medium" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(maxQty, q + 1))}
              disabled={qty >= maxQty}
              aria-label="Increase quantity"
              className="inline-flex h-11 w-11 items-center justify-center text-charcoal transition-colors hover:bg-foreground/5 disabled:opacity-40"
            >
              <Plus className="h-4 w-4" aria-hidden />
            </button>
          </div>
        )}

        <Button
          size="lg"
          onClick={addToBag}
          disabled={outOfStock}
          className={cn("h-12 flex-1 text-base", added && "bg-success hover:bg-success")}
        >
          <CtaIcon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
          {ctaLabel}
        </Button>
        <WishlistButton
          productId={product.id}
          className="h-12 w-12 border border-border bg-surface"
        />
      </div>
      <span role="status" aria-live="polite" className="sr-only">
        {added ? "Added to bag" : ""}
      </span>

      <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-primary" strokeWidth={1.5} aria-hidden />
        Independently certified lab-grown diamond · IGI / GIA / GCAL
      </p>

      {/* Sticky add-to-cart on mobile (SPEC §7.4) */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted-foreground">{product.name}</p>
            <Price price={variant.price} compareAt={compareAt} className="text-base" />
          </div>
          <Button
            size="lg"
            onClick={addToBag}
            disabled={outOfStock}
            className={cn("h-12 shrink-0 px-6", added && "bg-success hover:bg-success")}
          >
            <CtaIcon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
