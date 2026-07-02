import type { Cart } from "../../types";

export interface AddItemInput {
  variantId: string;
  qty: number;
}

/**
 * CartRepository — guest (session) + logged-in cart persistence (SPEC §8).
 * In-memory mock now; Prisma-backed in Phase 3. Coupon/shipping/tax totals are
 * computed by the checkout service in Phase 4 — this layer tracks line items.
 */
export interface CartRepository {
  getCart(cartId: string): Promise<Cart | null>;
  createCart(): Promise<Cart>;
  addItem(cartId: string, input: AddItemInput): Promise<Cart>;
  updateItemQty(cartId: string, itemId: string, qty: number): Promise<Cart>;
  removeItem(cartId: string, itemId: string): Promise<Cart>;
  clear(cartId: string): Promise<Cart>;
}
