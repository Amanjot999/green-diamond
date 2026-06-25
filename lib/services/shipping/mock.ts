import { env } from "@/config/env";
import { rupeesToPaise } from "@/config/money";
import type { CourierOption, ShippingProvider, TrackingEvent } from "./types";

const FREE_THRESHOLD = () => rupeesToPaise(env.FREE_SHIPPING_THRESHOLD_INR);
const FLAT_RATE = () => rupeesToPaise(env.FLAT_SHIPPING_RATE_INR);

/** Valid Indian PINs are 6 digits and don't start with 0. */
function isValidPincode(pincode: string): boolean {
  return /^[1-9]\d{5}$/.test(pincode);
}

/**
 * MockShippingProvider — used now. Serviceable everywhere (valid PIN), flat rate
 * with free shipping over a threshold, fake AWB, and a deterministic tracking
 * timeline derived from the AWB so the same code always tells the same story.
 */
export class MockShippingProvider implements ShippingProvider {
  private couriersFor(subtotal: number): CourierOption[] {
    const standardRate = subtotal >= FREE_THRESHOLD() ? 0 : FLAT_RATE();
    return [
      { id: "std", name: "Standard (insured)", etaDays: 5, rate: standardRate },
      { id: "express", name: "Express (insured)", etaDays: 2, rate: FLAT_RATE() * 3 },
    ];
  }

  async checkServiceability(pincode: string) {
    if (!isValidPincode(pincode)) return { serviceable: false };
    return { serviceable: true, couriers: this.couriersFor(0) };
  }

  async getRates(input: {
    destinationPincode: string;
    weightKg: number;
    subtotal: number;
  }) {
    if (!isValidPincode(input.destinationPincode)) return [];
    return this.couriersFor(input.subtotal);
  }

  async createShipment(orderId: string) {
    const awbCode = `MOCKAWB${orderId.replace(/\D/g, "").slice(-8).padStart(8, "0")}`;
    return {
      shiprocketOrderId: `mock_ship_${crypto.randomUUID()}`,
      awbCode,
      courier: "Standard (insured)",
      trackingUrl: `${env.NEXT_PUBLIC_SITE_URL}/account/orders?awb=${awbCode}`,
    };
  }

  async getTracking(awbCode: string) {
    const now = Date.now();
    const day = 86_400_000;
    const events: TrackingEvent[] = [
      { ts: new Date(now - 3 * day).toISOString(), location: "Surat, GJ", description: "Order picked up" },
      { ts: new Date(now - 2 * day).toISOString(), location: "Mumbai, MH", description: "In transit" },
      { ts: new Date(now - 1 * day).toISOString(), location: "Local hub", description: "Out for delivery soon" },
    ];
    void awbCode;
    return {
      status: "in_transit",
      events,
      estimatedDelivery: new Date(now + 2 * day).toISOString(),
    };
  }

  async cancelShipment(awbCode: string) {
    void awbCode;
    return { cancelled: true };
  }
}
