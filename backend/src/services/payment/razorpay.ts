import type { PaymentProvider } from "./types";

/**
 * RazorpayPaymentProvider — SKELETON. Implemented in Phase 7 (SPEC §9).
 *
 * Real flow:
 *   1. createOrder  -> Razorpay Orders API (POST /v1/orders) with amount in paise.
 *   2. frontend     -> Razorpay Checkout script renders only when
 *                      PAYMENTS_PROVIDER=razorpay; returns razorpay_payment_id +
 *                      razorpay_order_id + razorpay_signature.
 *   3. verifyPayment-> HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
 *                      compared to signature.
 *   4. webhook      -> verify X-Razorpay-Signature with RAZORPAY_WEBHOOK_SECRET,
 *                      handle payment.captured / payment.failed / refund.processed.
 *
 * Env: RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET.
 */
export class RazorpayPaymentProvider implements PaymentProvider {
  async createOrder(_input: {
    amountInPaise: number;
    currency: "INR";
    receipt: string;
    notes?: Record<string, string>;
  }): Promise<{ providerOrderId: string; amount: number; currency: string }> {
    // TODO(razorpay): call Orders API with key id/secret; return order.id, amount, currency.
    throw new Error("RazorpayPaymentProvider.createOrder not implemented (Phase 7)");
  }

  async verifyPayment(_payload: {
    orderId: string;
    paymentId: string;
    signature: string;
  }): Promise<boolean> {
    // TODO(razorpay): verify HMAC-SHA256(orderId|paymentId, KEY_SECRET) === signature.
    throw new Error("RazorpayPaymentProvider.verifyPayment not implemented (Phase 7)");
  }

  async refund(
    _paymentId: string,
    _amountInPaise?: number,
  ): Promise<{ refundId: string; status: string }> {
    // TODO(razorpay): POST /v1/payments/:id/refund.
    throw new Error("RazorpayPaymentProvider.refund not implemented (Phase 7)");
  }

  async handleWebhook(
    _req: Request,
  ): Promise<{ event: string; orderId?: string; status?: string }> {
    // TODO(razorpay): verify X-Razorpay-Signature, parse event, map to Order/Payment status.
    throw new Error("RazorpayPaymentProvider.handleWebhook not implemented (Phase 7)");
  }
}
