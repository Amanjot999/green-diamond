import type { PaymentProvider } from "./types";

/**
 * MockPaymentProvider — used now. Lets the full order flow complete and show a
 * confirmation without any real gateway. Always "verifies" true in test mode.
 */
export class MockPaymentProvider implements PaymentProvider {
  async createOrder(input: {
    amountInPaise: number;
    currency: "INR";
    receipt: string;
    notes?: Record<string, string>;
  }) {
    return {
      providerOrderId: `mock_order_${crypto.randomUUID()}`,
      amount: input.amountInPaise,
      currency: input.currency,
    };
  }

  async verifyPayment(payload: {
    orderId: string;
    paymentId: string;
    signature: string;
  }) {
    // Test mode: any non-empty payment payload is accepted.
    return Boolean(payload.orderId && payload.paymentId);
  }

  async refund(paymentId: string, amountInPaise?: number) {
    void paymentId;
    void amountInPaise;
    return { refundId: `mock_rfnd_${crypto.randomUUID()}`, status: "processed" };
  }

  async handleWebhook(req: Request) {
    void req;
    return { event: "mock.payment.captured", status: "captured" };
  }
}
