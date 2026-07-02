import type { Paise } from "../config/money";

/** Cart domain types (SPEC §6: Cart, CartItem). Money is paise-safe. */

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  name: string;
  slug: string;
  image?: string;
  /** Human-readable variant summary, e.g. "18k White · Size 12". */
  variantLabel?: string;
  qty: number;
  /** priceSnapshot at time of add. */
  unitPrice: Paise;
  lineTotal: Paise;
}

export interface CartTotals {
  subtotal: Paise;
  discountTotal: Paise;
  shippingTotal: Paise;
  taxTotal: Paise;
  grandTotal: Paise;
}

export interface Cart {
  id: string;
  items: CartItem[];
  couponCode?: string;
  totals: CartTotals;
}
