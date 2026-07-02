import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { CartPageClient } from "@/features/cart/cart-page-client";

export const metadata: Metadata = {
  title: "Your bag",
  description: "Review your lab-grown diamond pieces before checkout.",
};

/** Cart page (SPEC §7.5, batch 3.5) — client-rendered from the persisted bag. */
export default function CartPage() {
  return (
    <Container className="py-8 sm:py-12">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Bag" }]} />
      <h1 className="mt-5 font-serif text-4xl text-charcoal sm:text-5xl">Your bag</h1>
      <CartPageClient />
    </Container>
  );
}
