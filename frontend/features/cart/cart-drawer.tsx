"use client";

import { useId } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { formatINR } from "@backend/config/money";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { CartLineItem } from "./cart-line-item";
import { cartCount, cartSubtotal, useCart } from "./cart-store";

/** Slide-over bag (SPEC §7.5) — opens on add-to-bag and from the header. */
export function CartDrawer() {
  const { lines, open, setOpen } = useCart();
  const titleId = useId();
  const close = () => setOpen(false);

  return (
    <Modal open={open} onClose={close} labelledBy={titleId} side="right">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 id={titleId} className="font-serif text-xl text-charcoal">
            Your bag{lines.length > 0 && ` (${cartCount(lines)})`}
          </h2>
          {/* Modal renders its own close button in the top-right corner. */}
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground/50" strokeWidth={1} aria-hidden />
            <p className="text-sm text-muted-foreground">
              Your bag is empty. Certified lab-grown brilliance awaits.
            </p>
            <Link
              href="/shop"
              onClick={close}
              className={cn(buttonVariants({ variant: "outline", size: "md" }))}
            >
              Explore the collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {lines.map((line) => (
                <CartLineItem key={line.variantId} line={line} onNavigate={close} />
              ))}
            </div>

            <div className="border-t border-border px-5 py-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal (incl. taxes)</span>
                <span className="font-medium text-charcoal">{formatINR(cartSubtotal(lines))}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Shipping calculated at checkout.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href="/cart"
                  onClick={close}
                  className={cn(buttonVariants({ variant: "outline", size: "md" }), "h-12")}
                >
                  View bag
                </Link>
                <Link
                  href="/checkout"
                  onClick={close}
                  className={cn(buttonVariants({ size: "md" }), "h-12")}
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
