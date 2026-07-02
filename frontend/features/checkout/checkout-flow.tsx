"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, CreditCard, Info, ShieldCheck, Truck } from "lucide-react";
import type { Address } from "@backend/validation";
import type { CourierOption } from "@backend/services";
import { clampDiscount, formatINR, percentOf } from "@backend/config/money";
import { getTaxRule } from "@backend/config/tax";
import { cn } from "@/lib/utils/cn";
import { useMounted } from "@/lib/use-mounted";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cartSubtotal, useCart } from "@/features/cart/cart-store";
import {
  createMockPayment,
  getShippingOptions,
  verifyMockPayment,
} from "@/app/checkout/actions";
import { AddressForm } from "./address-form";
import { saveOrderSnapshot } from "./order-snapshot";

type StepKey = "address" | "shipping" | "review" | "payment";

const STEPS: { key: StepKey; label: string }[] = [
  { key: "address", label: "Address" },
  { key: "shipping", label: "Shipping" },
  { key: "review", label: "Review" },
  { key: "payment", label: "Payment" },
];

/**
 * Multi-step checkout UI (SPEC §7.6, batch 3.5) — mock-backed end to end:
 * pincode serviceability + rates via ShippingProvider, payment via
 * PaymentProvider. Phase 4 adds real order creation; Phase 7 flips providers.
 */
export function CheckoutFlow({ gstRatePercent }: { gstRatePercent: number }) {
  const router = useRouter();
  const { lines, coupon, clear } = useCart();
  const mounted = useMounted();

  const [step, setStep] = useState<StepKey>("address");
  const [address, setAddress] = useState<Address | undefined>();
  const [checking, setChecking] = useState(false);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [options, setOptions] = useState<CourierOption[]>([]);
  const [courierId, setCourierId] = useState<string | undefined>();
  const [payState, setPayState] = useState<"idle" | "processing" | "failed" | "done">("idle");

  const subtotal = cartSubtotal(lines);
  const discount = coupon ? clampDiscount(percentOf(subtotal, coupon.percentOff), subtotal) : 0;
  const goodsTotal = subtotal - discount;
  const courier = options.find((o) => o.id === courierId);
  const total = goodsTotal + (courier?.rate ?? 0);
  const taxRule = getTaxRule(gstRatePercent);
  // Prices are tax-inclusive (as shown on the PDP): surface the included share.
  const gstIncluded = Math.round((goodsTotal * taxRule.ratePercent) / (100 + taxRule.ratePercent));

  if (!mounted) {
    return <div className="mt-8 h-64 animate-pulse rounded-xl bg-sage-100" aria-hidden />;
  }

  if (lines.length === 0 && payState !== "done") {
    return (
      <div className="mt-4">
        <EmptyState
          title="Nothing to check out"
          description="Your bag is empty — add a piece you love first."
          actionHref="/shop"
          actionLabel="Explore the collection"
        />
      </div>
    );
  }

  if (payState === "done") {
    return (
      <div className="mt-16 flex flex-col items-center gap-3 text-center" role="status">
        <Check className="h-10 w-10 text-success" strokeWidth={1.5} aria-hidden />
        <p className="text-lg text-charcoal">Payment confirmed — preparing your order…</p>
      </div>
    );
  }

  async function handleAddress(a: Address) {
    setChecking(true);
    setServiceError(null);
    const res = await getShippingOptions(a.pincode, goodsTotal);
    setChecking(false);
    if (!res.serviceable || res.options.length === 0) {
      setServiceError(
        `We can't deliver to PIN ${a.pincode} yet. Double-check the code or try another address.`,
      );
      return;
    }
    setAddress(a);
    setOptions(res.options);
    setCourierId(res.options[0].id);
    setStep("shipping");
  }

  async function pay() {
    if (!address || !courier) return;
    setPayState("processing");
    const created = await createMockPayment(total);
    if (!created.ok) {
      setPayState("failed");
      return;
    }
    const { verified } = await verifyMockPayment(created.providerOrderId);
    if (!verified) {
      setPayState("failed");
      return;
    }
    saveOrderSnapshot({
      providerOrderId: created.providerOrderId,
      lines,
      address,
      courier,
      totals: {
        subtotal,
        discount,
        shipping: courier.rate,
        total,
        gstIncluded,
        gstLabel: taxRule.label,
      },
    });
    setPayState("done");
    router.push("/checkout/confirmation");
    clear();
  }

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  const summary = (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h2 className="font-serif text-lg text-charcoal">Order summary</h2>
      <ul className="mt-3 flex flex-col gap-3">
        {lines.map((l) => (
          <li key={l.variantId} className="flex items-center gap-3 text-sm">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-sage-50">
              <Image src={l.image ?? "/images/placeholder.svg"} alt="" fill sizes="48px" className="object-cover" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-charcoal">{l.name}</span>
              <span className="text-xs text-muted-foreground">Qty {l.qty}</span>
            </span>
            <span className="text-charcoal">{formatINR(l.unitPrice * l.qty)}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-4 flex flex-col gap-1.5 border-t border-border pt-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal (incl. taxes)</dt>
          <dd>{formatINR(subtotal)}</dd>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-success">
            <dt>{coupon?.code}</dt>
            <dd>−{formatINR(discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Shipping</dt>
          <dd>{courier ? (courier.rate === 0 ? "Free" : formatINR(courier.rate)) : "—"}</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-2 text-base font-medium text-charcoal">
          <dt>Total</dt>
          <dd>{formatINR(total)}</dd>
        </div>
        <p className="text-xs text-muted-foreground">
          Includes {formatINR(gstIncluded)} {taxRule.label}
        </p>
      </dl>
    </div>
  );

  return (
    <div className="mt-8">
      {/* Stepper */}
      <ol className="flex items-center gap-2 sm:gap-3" aria-label="Checkout steps">
        {STEPS.map((s, i) => {
          const state = i < stepIndex ? "done" : i === stepIndex ? "current" : "todo";
          return (
            <li key={s.key} className="flex items-center gap-2 sm:gap-3" aria-current={state === "current" ? "step" : undefined}>
              <span
                className={cn(
                  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                  state === "done" && "border-success bg-success text-primary-foreground",
                  state === "current" && "border-primary bg-primary text-primary-foreground",
                  state === "todo" && "border-border text-muted-foreground",
                )}
                aria-hidden
              >
                {state === "done" ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "text-xs sm:text-sm",
                  state === "current" ? "font-medium text-charcoal" : "text-muted-foreground",
                  state !== "current" && "hidden sm:inline",
                )}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && <span className="h-px w-4 bg-border sm:w-8" aria-hidden />}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
        <div>
          {step === "address" && (
            <section aria-label="Delivery address">
              {serviceError && (
                <p role="alert" className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {serviceError}
                </p>
              )}
              <AddressForm initial={address} submitting={checking} onSubmit={handleAddress} />
            </section>
          )}

          {step === "shipping" && (
            <section aria-label="Shipping method" className="flex flex-col gap-4">
              <fieldset>
                <legend className="text-sm text-muted-foreground">
                  Delivering to <span className="font-medium text-charcoal">{address?.pincode}</span> —
                  choose a fully insured service:
                </legend>
                <div className="mt-3 flex flex-col gap-3">
                  {options.map((o) => (
                    <label
                      key={o.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors",
                        courierId === o.id ? "border-primary bg-primary/5" : "border-border bg-surface hover:border-primary/40",
                      )}
                    >
                      <input
                        type="radio"
                        name="courier"
                        value={o.id}
                        checked={courierId === o.id}
                        onChange={() => setCourierId(o.id)}
                        className="h-4 w-4 accent-[var(--color-primary)]"
                      />
                      <Truck className="h-5 w-5 text-primary" strokeWidth={1.5} aria-hidden />
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-charcoal">{o.name}</span>
                        <span className="text-xs text-muted-foreground">
                          Arrives in ~{o.etaDays} day{o.etaDays === 1 ? "" : "s"}
                        </span>
                      </span>
                      <span className="text-sm font-medium text-charcoal">
                        {o.rate === 0 ? "Free" : formatINR(o.rate)}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="md" onClick={() => setStep("address")}>
                  <ChevronLeft className="h-4 w-4" aria-hidden /> Back
                </Button>
                <Button size="lg" className="h-12 flex-1 sm:flex-none sm:px-10" onClick={() => setStep("review")}>
                  Continue to review
                </Button>
              </div>
            </section>
          )}

          {step === "review" && address && courier && (
            <section aria-label="Review order" className="flex flex-col gap-4">
              <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
                <h3 className="text-sm font-medium text-charcoal">Deliver to</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {address.fullName} · {address.phone}
                  <br />
                  {address.line1}
                  {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} —{" "}
                  {address.pincode}
                </p>
                <button
                  type="button"
                  onClick={() => setStep("address")}
                  className="mt-2 text-xs font-medium text-primary underline-offset-4 hover:underline"
                >
                  Edit address
                </button>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4 sm:p-5">
                <h3 className="text-sm font-medium text-charcoal">Shipping</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {courier.name} · ~{courier.etaDays} days ·{" "}
                  {courier.rate === 0 ? "Free" : formatINR(courier.rate)}
                </p>
                <button
                  type="button"
                  onClick={() => setStep("shipping")}
                  className="mt-2 text-xs font-medium text-primary underline-offset-4 hover:underline"
                >
                  Change
                </button>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="md" onClick={() => setStep("shipping")}>
                  <ChevronLeft className="h-4 w-4" aria-hidden /> Back
                </Button>
                <Button size="lg" className="h-12 flex-1 sm:flex-none sm:px-10" onClick={() => setStep("payment")}>
                  Continue to payment
                </Button>
              </div>
            </section>
          )}

          {step === "payment" && (
            <section aria-label="Payment" className="flex flex-col gap-4">
              <div className="flex items-start gap-3 rounded-xl border border-gold-300/60 bg-gold-200/20 p-4 text-sm">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" strokeWidth={1.5} aria-hidden />
                <p className="text-muted-foreground">
                  Payments run on the <span className="font-medium text-charcoal">mock provider</span> for
                  now — no money moves. Razorpay is wired in Phase 7 behind the same button.
                </p>
              </div>
              {payState === "failed" && (
                <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  The mock payment did not go through. Try again.
                </p>
              )}
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="md" onClick={() => setStep("review")} disabled={payState === "processing"}>
                  <ChevronLeft className="h-4 w-4" aria-hidden /> Back
                </Button>
                <Button
                  size="lg"
                  onClick={pay}
                  disabled={payState === "processing"}
                  className="h-12 flex-1 sm:flex-none sm:px-10"
                >
                  <CreditCard className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  {payState === "processing" ? "Processing…" : `Pay ${formatINR(total)}`}
                </Button>
              </div>
              <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" strokeWidth={1.5} aria-hidden />
                256-bit encrypted · full refund window per our returns policy
              </p>
            </section>
          )}
        </div>

        <aside aria-label="Order summary">{summary}</aside>
      </div>
    </div>
  );
}
