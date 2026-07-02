import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Paise } from "@backend/config/money";

/**
 * Client cart state (SPEC §5 stack: Zustand for cart/UI state), persisted to
 * localStorage. Phase 4 syncs this against the CartRepository when real
 * orders land — the line shape mirrors the domain CartItem on purpose.
 */
export interface CartLine {
  variantId: string;
  productId: string;
  slug: string;
  name: string;
  image?: string;
  /** Human summary of the chosen variant, e.g. "18k Gold · White · Size 12". */
  variantLabel?: string;
  unitPrice: Paise;
  qty: number;
  maxQty: number;
}

export interface Coupon {
  code: string;
  percentOff: number;
}

/** Mock coupons until Phase 4 wires real coupon validation (SPEC §8). */
export const MOCK_COUPONS: Record<string, Coupon> = {
  WELCOME10: { code: "WELCOME10", percentOff: 10 },
};

interface CartState {
  lines: CartLine[];
  coupon?: Coupon;
  open: boolean;
  add: (line: CartLine) => void;
  remove: (variantId: string) => void;
  setQty: (variantId: string, qty: number) => void;
  applyCoupon: (coupon?: Coupon) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      coupon: undefined,
      open: false,

      add: (line) =>
        set((s) => {
          const existing = s.lines.find((l) => l.variantId === line.variantId);
          const lines = existing
            ? s.lines.map((l) =>
                l.variantId === line.variantId
                  ? { ...l, qty: Math.min(l.qty + line.qty, l.maxQty) }
                  : l,
              )
            : [...s.lines, line];
          return { lines, open: true };
        }),

      remove: (variantId) =>
        set((s) => ({ lines: s.lines.filter((l) => l.variantId !== variantId) })),

      setQty: (variantId, qty) =>
        set((s) => ({
          lines: s.lines.map((l) =>
            l.variantId === variantId
              ? { ...l, qty: Math.max(1, Math.min(qty, l.maxQty)) }
              : l,
          ),
        })),

      applyCoupon: (coupon) => set({ coupon }),
      clear: () => set({ lines: [], coupon: undefined }),
      setOpen: (open) => set({ open }),
    }),
    {
      name: "gd-cart",
      partialize: (s) => ({ lines: s.lines, coupon: s.coupon }),
    },
  ),
);

export const cartCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty, 0);

export const cartSubtotal = (lines: CartLine[]): Paise =>
  lines.reduce((sum, l) => sum + l.unitPrice * l.qty, 0);
