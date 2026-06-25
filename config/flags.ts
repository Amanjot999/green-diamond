import { env } from "./env";

/**
 * Feature flags that drive provider selection (SPEC §5, §9).
 * The UI and route handlers stay identical regardless of these values — only
 * the concrete service/repository implementation behind the interface changes.
 */
export type PaymentsProvider = "mock" | "razorpay";
export type ShippingProvider = "mock" | "shiprocket";
export type DataSource = "mock" | "prisma";

export interface FeatureFlags {
  paymentsProvider: PaymentsProvider;
  shippingProvider: ShippingProvider;
  dataSource: DataSource;
}

export const flags: FeatureFlags = {
  paymentsProvider: env.PAYMENTS_PROVIDER,
  shippingProvider: env.SHIPPING_PROVIDER,
  dataSource: env.DATA_SOURCE,
};
