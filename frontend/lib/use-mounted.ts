"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Hydration gate without setState-in-effect: false during SSR and the first
 * client render (so markup matches the server), true afterwards. Use to defer
 * localStorage/sessionStorage-derived UI (cart badge, persisted bag).
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
