"use client";

import { useState } from "react";
import Link from "next/link";
import { TicketPercent, X } from "lucide-react";
import { clampDiscount, formatINR, percentOf } from "@backend/config/money";
import { cn } from "@/lib/utils/cn";
import { useMounted } from "@/lib/use-mounted";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { CartLineItem } from "./cart-line-item";
import { MOCK_COUPONS, cartSubtotal, useCart } from "./cart-store";

export function CartPageClient() {
  const { lines, coupon, applyCoupon } = useCart();
  const mounted = useMounted();
  const [code, setCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  // Until the persisted store hydrates, render a stable skeleton.
  if (!mounted) {
    return <div className="mt-8 h-40 animate-pulse rounded-xl bg-sage-100" aria-hidden />;
  }

  if (lines.length === 0) {
    return (
      <div className="mt-4">
        <EmptyState
          title="Your bag is empty"
          description="Explore certified lab-grown diamonds and fine jewellery."
          actionHref="/shop"
          actionLabel="Explore the collection"
        />
      </div>
    );
  }

  const subtotal = cartSubtotal(lines);
  const discount = coupon
    ? clampDiscount(percentOf(subtotal, coupon.percentOff), subtotal)
    : 0;
  const goodsTotal = subtotal - discount;

  function submitCoupon(e: React.FormEvent) {
    e.preventDefault();
    const found = MOCK_COUPONS[code.trim().toUpperCase()];
    if (!found) {
      setCouponError("That code isn't valid. Try WELCOME10.");
      return;
    }
    setCouponError(null);
    setCode("");
    applyCoupon(found);
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
      <div className="divide-y divide-border">
        {lines.map((line) => (
          <CartLineItem key={line.variantId} line={line} />
        ))}
      </div>

      <aside aria-label="Order summary">
        <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
          <h2 className="font-serif text-xl text-charcoal">Summary</h2>

          <dl className="mt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal (incl. taxes)</dt>
              <dd className="text-charcoal">{formatINR(subtotal)}</dd>
            </div>
            {coupon && (
              <div className="flex justify-between">
                <dt className="inline-flex items-center gap-1.5 text-success">
                  {coupon.code} ({coupon.percentOff}% off)
                  <button
                    type="button"
                    onClick={() => applyCoupon(undefined)}
                    aria-label={`Remove coupon ${coupon.code}`}
                    className="inline-flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden />
                  </button>
                </dt>
                <dd className="text-success">−{formatINR(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="text-muted-foreground">Calculated at checkout</dd>
            </div>
            <div className="mt-2 flex justify-between border-t border-border pt-3 text-base font-medium">
              <dt className="text-charcoal">Total</dt>
              <dd className="text-charcoal">{formatINR(goodsTotal)}</dd>
            </div>
          </dl>

          {!coupon && (
            <form onSubmit={submitCoupon} className="mt-4">
              <label
                htmlFor="coupon"
                className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground"
              >
                <TicketPercent className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                Coupon code
              </label>
              <div className="mt-1.5 flex gap-2">
                <Input
                  id="coupon"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="WELCOME10"
                  aria-invalid={couponError !== null}
                  aria-describedby={couponError ? "coupon-error" : undefined}
                />
                <button
                  type="submit"
                  className={cn(buttonVariants({ variant: "outline", size: "md" }), "h-11 shrink-0")}
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p id="coupon-error" role="alert" className="mt-1.5 text-xs text-destructive">
                  {couponError}
                </p>
              )}
            </form>
          )}

          <Link
            href="/checkout"
            className={cn(buttonVariants({ size: "lg" }), "mt-5 h-12 w-full")}
          >
            Proceed to checkout
          </Link>
          <Link
            href="/shop"
            className="mt-3 block text-center text-sm text-primary underline-offset-4 hover:underline"
          >
            Continue shopping
          </Link>
        </div>
      </aside>
    </div>
  );
}
