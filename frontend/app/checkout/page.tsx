import type { Metadata } from "next";
import { env } from "@backend/config/env";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { CheckoutFlow } from "@/features/checkout/checkout-flow";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure checkout — address, insured shipping, and payment.",
};

/** Multi-step checkout (SPEC §7.6, batch 3.5) — mock providers behind the seams. */
export default function CheckoutPage() {
  return (
    <Container className="py-8 sm:py-12">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Bag", href: "/cart" }, { label: "Checkout" }]}
      />
      <h1 className="mt-5 font-serif text-4xl text-charcoal sm:text-5xl">Checkout</h1>
      {/* GST is a configurable rule (SPEC §10) — the rate comes from server env. */}
      <CheckoutFlow gstRatePercent={env.GST_RATE_PERCENT} />
    </Container>
  );
}
