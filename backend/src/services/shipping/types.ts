/**
 * ShippingProvider — the typed seam for shipping/fulfilment (SPEC §9).
 *
 * `MockShippingProvider` backs it today; `ShiprocketShippingProvider` is filled
 * in Phase 7. Switching is a feature-flag change (`SHIPPING_PROVIDER`).
 *
 * Monetary fields (`rate`, `subtotal`) are integer paise (SPEC §10).
 */
export interface CourierOption {
  id: string;
  name: string;
  etaDays: number;
  rate: number;
}

export interface TrackingEvent {
  ts: string;
  location?: string;
  description: string;
}

export interface ShippingProvider {
  checkServiceability(
    pincode: string,
  ): Promise<{ serviceable: boolean; couriers?: CourierOption[] }>;

  getRates(input: {
    destinationPincode: string;
    weightKg: number;
    subtotal: number;
  }): Promise<CourierOption[]>;

  createShipment(orderId: string): Promise<{
    shiprocketOrderId: string;
    awbCode: string;
    courier: string;
    trackingUrl: string;
    label?: string;
  }>;

  getTracking(awbCode: string): Promise<{
    status: string;
    events: TrackingEvent[];
    estimatedDelivery?: string;
  }>;

  cancelShipment(awbCode: string): Promise<{ cancelled: boolean }>;
}
