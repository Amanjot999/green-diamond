"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Wishlist toggle. Local state for now — Phase 2/4 wires this to the real
 * wishlist repository/account.
 */
export function WishlistButton({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      data-product-id={productId}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      onClick={() => setActive((v) => !v)}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface/85 backdrop-blur transition-colors hover:bg-surface",
        className,
      )}
    >
      <Heart
        className={cn("h-4 w-4 transition-colors", active ? "fill-destructive text-destructive" : "text-foreground/70")}
        strokeWidth={1.5}
      />
    </button>
  );
}
