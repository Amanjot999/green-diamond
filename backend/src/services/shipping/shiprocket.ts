import type { CourierOption, ShippingProvider, TrackingEvent } from "./types";

/**
 * ShiprocketShippingProvider — SKELETON. Implemented in Phase 7 (SPEC §9).
 *
 * Real flow:
 *   - auth         -> POST /v1/external/auth/login (email+password) → bearer token
 *                     (or use SHIPROCKET_API_TOKEN directly), cache until expiry.
 *   - serviceability-> GET /v1/external/courier/serviceability with pickup+delivery PIN.
 *   - createShipment-> POST /v1/external/orders/create/adhoc, then assign AWB.
 *   - tracking     -> GET /v1/external/courier/track/awb/:awb, plus a tracking webhook.
 *
 * Env: SHIPROCKET_EMAIL, SHIPROCKET_PASSWORD (or SHIPROCKET_API_TOKEN),
 *      SHIPROCKET_CHANNEL_ID, SHIPROCKET_PICKUP_LOCATION.
 */
export class ShiprocketShippingProvider implements ShippingProvider {
  async checkServiceability(
    _pincode: string,
  ): Promise<{ serviceable: boolean; couriers?: CourierOption[] }> {
    // TODO(shiprocket): call courier/serviceability with pickup + delivery PIN.
    throw new Error("ShiprocketShippingProvider.checkServiceability not implemented (Phase 7)");
  }

  async getRates(_input: {
    destinationPincode: string;
    weightKg: number;
    subtotal: number;
  }): Promise<CourierOption[]> {
    // TODO(shiprocket): map serviceability response to rate options.
    throw new Error("ShiprocketShippingProvider.getRates not implemented (Phase 7)");
  }

  async createShipment(_orderId: string): Promise<{
    shiprocketOrderId: string;
    awbCode: string;
    courier: string;
    trackingUrl: string;
    label?: string;
  }> {
    // TODO(shiprocket): create adhoc order, assign AWB, return tracking URL + label.
    throw new Error("ShiprocketShippingProvider.createShipment not implemented (Phase 7)");
  }

  async getTracking(_awbCode: string): Promise<{
    status: string;
    events: TrackingEvent[];
    estimatedDelivery?: string;
  }> {
    // TODO(shiprocket): GET courier/track/awb/:awb and normalise events.
    throw new Error("ShiprocketShippingProvider.getTracking not implemented (Phase 7)");
  }

  async cancelShipment(_awbCode: string): Promise<{ cancelled: boolean }> {
    // TODO(shiprocket): POST orders/cancel for the shipment.
    throw new Error("ShiprocketShippingProvider.cancelShipment not implemented (Phase 7)");
  }
}
