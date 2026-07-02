"use server";

import { getPaymentProvider, getShippingProvider, type CourierOption } from "@backend/services";
import { paiseAmountSchema, pincodeSchema } from "@backend/validation";

/**
 * Checkout server actions (batch 3.5) — the UI's only path to the shipping and
 * payment seams (SPEC §5). Everything stays mock-backed until Phase 7; Phase 4
 * adds real order creation on top of these calls.
 */

export async function getShippingOptions(
  pincodeRaw: string,
  subtotalRaw: number,
): Promise<{ serviceable: boolean; options: CourierOption[] }> {
  const pincode = pincodeSchema.safeParse(pincodeRaw);
  const subtotal = paiseAmountSchema.safeParse(subtotalRaw);
  if (!pincode.success || !subtotal.success) return { serviceable: false, options: [] };

  const shipping = getShippingProvider();
  const { serviceable } = await shipping.checkServiceability(pincode.data);
  if (!serviceable) return { serviceable: false, options: [] };

  const options = await shipping.getRates({
    destinationPincode: pincode.data,
    weightKg: 0.05,
    subtotal: subtotal.data,
  });
  return { serviceable: true, options };
}

export async function createMockPayment(
  amountRaw: number,
): Promise<{ ok: true; providerOrderId: string } | { ok: false; error: string }> {
  const amount = paiseAmountSchema.safeParse(amountRaw);
  if (!amount.success || amount.data <= 0) return { ok: false, error: "Invalid amount" };

  const payment = getPaymentProvider();
  const order = await payment.createOrder({
    amountInPaise: amount.data,
    currency: "INR",
    receipt: `gd_${Date.now()}`,
  });
  return { ok: true, providerOrderId: order.providerOrderId };
}

export async function verifyMockPayment(
  providerOrderId: string,
): Promise<{ verified: boolean }> {
  if (!providerOrderId) return { verified: false };
  const payment = getPaymentProvider();
  const verified = await payment.verifyPayment({
    orderId: providerOrderId,
    paymentId: `mock_pay_${providerOrderId.slice(-12)}`,
    signature: "mock-signature",
  });
  return { verified };
}
