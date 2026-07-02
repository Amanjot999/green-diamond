"use client";

import { ShoppingBag } from "lucide-react";
import { useMounted } from "@/lib/use-mounted";
import { CartDrawer } from "./cart-drawer";
import { cartCount, useCart } from "./cart-store";

/**
 * Header bag button + count badge. The count renders only after mount so the
 * server HTML (which can't know localStorage) never mismatches on hydration.
 */
export function CartTrigger() {
  const { lines, setOpen } = useCart();
  const mounted = useMounted();
  const count = mounted ? cartCount(lines) : 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={count > 0 ? `Open bag, ${count} item${count === 1 ? "" : "s"}` : "Open bag"}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-primary"
      >
        <ShoppingBag className="h-5 w-5" strokeWidth={1.5} aria-hidden />
        {count > 0 && (
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground"
          >
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>
      <CartDrawer />
    </>
  );
}
