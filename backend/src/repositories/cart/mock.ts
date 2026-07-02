import { sumPaise } from "../../config/money";
import type { Cart, CartItem, Product, ProductVariant } from "../../types";
import { mockProducts } from "../mock-data/catalog";
import type { AddItemInput, CartRepository } from "./types";

/** Process-local cart store (mock only). */
const carts = new Map<string, Cart>();

function findVariant(variantId: string): { product: Product; variant: ProductVariant } | null {
  for (const product of mockProducts) {
    const variant = product.variants.find((v) => v.id === variantId);
    if (variant) return { product, variant };
  }
  return null;
}

function variantLabel(v: ProductVariant): string | undefined {
  const parts: string[] = [];
  if (v.metal) parts.push(v.metal);
  if (v.metalColor) parts.push(v.metalColor[0].toUpperCase() + v.metalColor.slice(1));
  if (v.ringSize) parts.push(`Size ${v.ringSize}`);
  return parts.length ? parts.join(" · ") : undefined;
}

function recalc(cart: Cart): Cart {
  for (const item of cart.items) item.lineTotal = item.unitPrice * item.qty;
  const subtotal = sumPaise(cart.items.map((i) => i.lineTotal));
  cart.totals = {
    subtotal,
    discountTotal: 0,
    shippingTotal: 0,
    taxTotal: 0,
    grandTotal: subtotal,
  };
  return cart;
}

function emptyCart(id: string): Cart {
  return recalc({ id, items: [], totals: { subtotal: 0, discountTotal: 0, shippingTotal: 0, taxTotal: 0, grandTotal: 0 } });
}

export class MockCartRepository implements CartRepository {
  async getCart(cartId: string): Promise<Cart | null> {
    return carts.get(cartId) ?? null;
  }

  async createCart(): Promise<Cart> {
    const cart = emptyCart(crypto.randomUUID());
    carts.set(cart.id, cart);
    return cart;
  }

  async addItem(cartId: string, input: AddItemInput): Promise<Cart> {
    const cart = carts.get(cartId) ?? emptyCart(cartId);
    const found = findVariant(input.variantId);
    if (!found) throw new Error(`Unknown variant: ${input.variantId}`);
    const { product, variant } = found;

    const existing = cart.items.find((i) => i.variantId === variant.id);
    if (existing) {
      existing.qty += input.qty;
    } else {
      const item: CartItem = {
        id: crypto.randomUUID(),
        variantId: variant.id,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        image: product.media[0]?.url,
        variantLabel: variantLabel(variant),
        qty: input.qty,
        unitPrice: variant.price,
        lineTotal: variant.price * input.qty,
      };
      cart.items.push(item);
    }

    carts.set(cartId, recalc(cart));
    return cart;
  }

  async updateItemQty(cartId: string, itemId: string, qty: number): Promise<Cart> {
    const cart = carts.get(cartId) ?? emptyCart(cartId);
    const item = cart.items.find((i) => i.id === itemId);
    if (item) {
      if (qty <= 0) cart.items = cart.items.filter((i) => i.id !== itemId);
      else item.qty = qty;
    }
    carts.set(cartId, recalc(cart));
    return cart;
  }

  async removeItem(cartId: string, itemId: string): Promise<Cart> {
    const cart = carts.get(cartId) ?? emptyCart(cartId);
    cart.items = cart.items.filter((i) => i.id !== itemId);
    carts.set(cartId, recalc(cart));
    return cart;
  }

  async clear(cartId: string): Promise<Cart> {
    const cart = emptyCart(cartId);
    carts.set(cartId, cart);
    return cart;
  }
}
