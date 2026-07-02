"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Info, Package } from "lucide-react";
import { formatINR } from "@backend/config/money";
import { cn } from "@/lib/utils/cn";
import { useMounted } from "@/lib/use-mounted";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { loadOrderSnapshot } from "./order-snapshot";

export function ConfirmationClient() {
  const mounted = useMounted();
  const order = useMemo(() => (mounted ? loadOrderSnapshot() : "loading"), [mounted]);

  if (order === "loading") {
    return <div className="mt-8 h-40 animate-pulse rounded-xl bg-sage-100" aria-hidden />;
  }

  if (!order) {
    return (
      <div className="mt-4">
        <EmptyState
          title="No recent order found"
          description="Place an order and its confirmation will appear here."
          actionHref="/shop"
          actionLabel="Explore the collection"
        />
      </div>
    );
  }

  const placed = new Date(order.placedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mt-8 max-w-2xl">
      <div className="flex flex-col items-start gap-3">
        <CheckCircle2 className="h-12 w-12 text-success" strokeWidth={1.5} aria-hidden />
        <h1 className="font-serif text-4xl text-charcoal sm:text-5xl">Order confirmed</h1>
        <p className="text-muted-foreground">
          Thank you, {order.address.fullName.split(" ")[0]} — order{" "}
          <span className="font-medium text-charcoal">{order.orderId}</span> was placed on {placed}.
          A confirmation email is on its way to {order.address.email}.
        </p>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-gold-300/60 bg-gold-200/20 p-4 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" strokeWidth={1.5} aria-hidden />
        <p className="text-muted-foreground">
          This is a <span className="font-medium text-charcoal">mock order</span> — payments and
          fulfilment run on mock providers until Phases 4–7 wire the real ones. Nothing was charged.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface">
        <ul className="divide-y divide-border px-5">
          {order.lines.map((l) => (
            <li key={l.variantId} className="flex items-center gap-3 py-4 text-sm">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-sage-50">
                <Image src={l.image ?? "/images/placeholder.svg"} alt="" fill sizes="56px" className="object-cover" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-charcoal">{l.name}</span>
                <span className="text-xs text-muted-foreground">
                  {l.variantLabel ? `${l.variantLabel} · ` : ""}Qty {l.qty}
                </span>
              </span>
              <span className="text-charcoal">{formatINR(l.unitPrice * l.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="flex flex-col gap-1.5 border-t border-border px-5 py-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Subtotal (incl. taxes)</dt>
            <dd>{formatINR(order.totals.subtotal)}</dd>
          </div>
          {order.totals.discount > 0 && (
            <div className="flex justify-between text-success">
              <dt>Discount</dt>
              <dd>−{formatINR(order.totals.discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Shipping ({order.courier.name})</dt>
            <dd>{order.totals.shipping === 0 ? "Free" : formatINR(order.totals.shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-border pt-2 text-base font-medium text-charcoal">
            <dt>Total paid</dt>
            <dd>{formatINR(order.totals.total)}</dd>
          </div>
          <p className="text-xs text-muted-foreground">
            Includes {formatINR(order.totals.gstIncluded)} {order.totals.gstLabel}
          </p>
        </dl>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-5 text-sm">
        <h2 className="inline-flex items-center gap-2 font-medium text-charcoal">
          <Package className="h-4 w-4 text-primary" strokeWidth={1.5} aria-hidden />
          Delivery
        </h2>
        <p className="mt-2 text-muted-foreground">
          {order.address.line1}
          {order.address.line2 ? `, ${order.address.line2}` : ""}, {order.address.city},{" "}
          {order.address.state} — {order.address.pincode}
          <br />
          {order.courier.name} · arrives in ~{order.courier.etaDays} day
          {order.courier.etaDays === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/shop" className={cn(buttonVariants({ size: "lg" }), "h-12")}>
          Continue shopping
        </Link>
        <Link href="/" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12")}>
          Back to home
        </Link>
      </div>
    </div>
  );
}
