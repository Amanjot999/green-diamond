"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatINR } from "@backend/config/money";
import { cn } from "@/lib/utils/cn";
import { useCart, type CartLine } from "./cart-store";

/** One cart row — compact in the drawer, roomier on the cart page. */
export function CartLineItem({
  line,
  onNavigate,
  className,
}: {
  line: CartLine;
  /** Called when the product link is followed (e.g. to close the drawer). */
  onNavigate?: () => void;
  className?: string;
}) {
  const { setQty, remove } = useCart();

  return (
    <div className={cn("flex gap-3 py-4", className)}>
      <Link
        href={`/products/${line.slug}`}
        onClick={onNavigate}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-sage-50"
        aria-label={line.name}
      >
        <Image
          src={line.image ?? "/images/placeholder.svg"}
          alt=""
          fill
          sizes="80px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${line.slug}`}
            onClick={onNavigate}
            className="text-sm font-medium leading-snug text-charcoal hover:text-primary"
          >
            {line.name}
          </Link>
          <button
            type="button"
            onClick={() => remove(line.variantId)}
            aria-label={`Remove ${line.name} from bag`}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.5} aria-hidden />
          </button>
        </div>

        {line.variantLabel && (
          <p className="text-xs text-muted-foreground">{line.variantLabel}</p>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          <div
            className="inline-flex items-center rounded-md border border-border"
            role="group"
            aria-label={`Quantity of ${line.name}`}
          >
            <button
              type="button"
              onClick={() => setQty(line.variantId, line.qty - 1)}
              disabled={line.qty <= 1}
              aria-label="Decrease quantity"
              className="inline-flex h-9 w-9 items-center justify-center text-charcoal transition-colors hover:bg-foreground/5 disabled:opacity-40"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden />
            </button>
            <span className="w-8 text-center text-sm" aria-live="polite">
              {line.qty}
            </span>
            <button
              type="button"
              onClick={() => setQty(line.variantId, line.qty + 1)}
              disabled={line.qty >= line.maxQty}
              aria-label="Increase quantity"
              className="inline-flex h-9 w-9 items-center justify-center text-charcoal transition-colors hover:bg-foreground/5 disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
          <p className="text-sm font-medium text-charcoal">
            {formatINR(line.unitPrice * line.qty)}
          </p>
        </div>
      </div>
    </div>
  );
}
