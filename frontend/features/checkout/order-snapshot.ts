import type { Address } from "@backend/validation";
import type { CourierOption } from "@backend/services";
import type { Paise } from "@backend/config/money";
import type { CartLine } from "@/features/cart/cart-store";

/**
 * The confirmation page's data source for batch 3.5 — a sessionStorage
 * snapshot of the just-placed MOCK order. Phase 4 replaces this with a real
 * Order created behind the repository seam.
 */
export interface OrderSnapshot {
  orderId: string;
  providerOrderId: string;
  placedAt: string;
  lines: CartLine[];
  address: Address;
  courier: CourierOption;
  totals: {
    subtotal: Paise;
    discount: Paise;
    shipping: Paise;
    total: Paise;
    gstIncluded: Paise;
    gstLabel: string;
  };
}

const KEY = "gd-last-order";

/**
 * Stamps placedAt here (outside any component render) and derives the display
 * order id from the server-generated provider order id.
 */
export function saveOrderSnapshot(snapshot: Omit<OrderSnapshot, "placedAt" | "orderId">) {
  try {
    const orderId = `GD-${snapshot.providerOrderId.replace(/[^a-z0-9]/gi, "").slice(-8).toUpperCase()}`;
    const full: OrderSnapshot = { ...snapshot, orderId, placedAt: new Date().toISOString() };
    sessionStorage.setItem(KEY, JSON.stringify(full));
  } catch {
    // Storage full/blocked — the confirmation page will show its fallback.
  }
}

export function loadOrderSnapshot(): OrderSnapshot | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as OrderSnapshot) : null;
  } catch {
    return null;
  }
}
