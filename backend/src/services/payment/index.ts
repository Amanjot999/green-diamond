import { flags } from "../../config/flags";
import { MockPaymentProvider } from "./mock";
import { RazorpayPaymentProvider } from "./razorpay";
import type { PaymentProvider } from "./types";

export type { PaymentProvider } from "./types";

/** Resolve the active payment provider from the PAYMENTS_PROVIDER flag. */
export function getPaymentProvider(): PaymentProvider {
  switch (flags.paymentsProvider) {
    case "razorpay":
      return new RazorpayPaymentProvider();
    case "mock":
    default:
      return new MockPaymentProvider();
  }
}
