import type { Metal, ProductType } from "@backend/types";
import { METAL_OPTIONS } from "@backend/shop/facets";

/** Shared display labels for product UI (card, quick-view, PDP). */

export const TYPE_LABEL: Record<ProductType, string> = {
  loose_diamond: "Loose diamond",
  ring: "Ring",
  earrings: "Earrings",
  necklace: "Necklace",
  pendant: "Pendant",
  bracelet: "Bracelet",
  bangle: "Bangle",
};

export const metalLabel = (m: Metal) => METAL_OPTIONS.find((o) => o.value === m)?.label ?? m;

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
