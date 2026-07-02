/**
 * PaymentProvider — the typed seam for payment capture (SPEC §9).
 *
 * UI and route handlers depend ONLY on this interface. `MockPaymentProvider`
 * backs it today; `RazorpayPaymentProvider` is filled in Phase 7. Switching is
 * a feature-flag change (`PAYMENTS_PROVIDER`) with no UI rework.
 *
 * Amounts are integer paise (SPEC §10).
 */
export interface PaymentProvider {
  createOrder(input: {
    amountInPaise: number;
    currency: "INR";
    receipt: string;
    notes?: Record<string, string>;
  }): Promise<{ providerOrderId: string; amount: number; currency: string }>;

  verifyPayment(payload: {
    orderId: string;
    paymentId: string;
    signature: string;
  }): Promise<boolean>;

  refund(
    paymentId: string,
    amountInPaise?: number,
  ): Promise<{ refundId: string; status: string }>;

  handleWebhook(
    req: Request,
  ): Promise<{ event: string; orderId?: string; status?: string }>;
}
