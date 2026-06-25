import { flags } from "@/config/flags";
import { MockShippingProvider } from "./mock";
import { ShiprocketShippingProvider } from "./shiprocket";
import type { ShippingProvider } from "./types";

export type { ShippingProvider, CourierOption, TrackingEvent } from "./types";

/** Resolve the active shipping provider from the SHIPPING_PROVIDER flag. */
export function getShippingProvider(): ShippingProvider {
  switch (flags.shippingProvider) {
    case "shiprocket":
      return new ShiprocketShippingProvider();
    case "mock":
    default:
      return new MockShippingProvider();
  }
}
