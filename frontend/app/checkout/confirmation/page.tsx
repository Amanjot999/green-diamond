import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ConfirmationClient } from "@/features/checkout/confirmation-client";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your Green Diamond order confirmation.",
};

export default function ConfirmationPage() {
  return (
    <Container className="py-8 sm:py-12">
      <ConfirmationClient />
    </Container>
  );
}
