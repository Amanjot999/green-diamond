"use client";

import { X } from "lucide-react";
import { formatINR, rupeesToPaise } from "@backend/config/money";
import {
  CLARITY_OPTIONS,
  COLOR_OPTIONS,
  CUT_OPTIONS,
  FILTER_KEYS,
  GROWTH_OPTIONS,
  METAL_OPTIONS,
  SHAPE_OPTIONS,
  TYPE_OPTIONS,
} from "@backend/shop/facets";
import { useShopParams } from "./use-shop-params";

function labelFor(key: string, value: string): string {
  switch (key) {
    case "type":
      return TYPE_OPTIONS.find((o) => o.value === value)?.label ?? value;
    case "shape":
      return SHAPE_OPTIONS.find((o) => o.value === value)?.label ?? value;
    case "metal":
      return METAL_OPTIONS.find((o) => o.value === value)?.label ?? value;
    case "growth":
      return GROWTH_OPTIONS.find((o) => o.value === value)?.label ?? value;
    case "cut":
      return CUT_OPTIONS.includes(value) ? `Cut: ${value}` : value;
    case "color":
      return COLOR_OPTIONS.includes(value) ? `Colour: ${value}` : value;
    case "clarity":
      return CLARITY_OPTIONS.includes(value) ? `Clarity: ${value}` : value;
    case "priceMin":
      return `From ${formatINR(rupeesToPaise(Number(value)))}`;
    case "priceMax":
      return `Up to ${formatINR(rupeesToPaise(Number(value)))}`;
    case "caratMin":
      return `From ${value}ct`;
    case "caratMax":
      return `Up to ${value}ct`;
    case "q":
      return `“${value}”`;
    default:
      return value.replace(/-/g, " ");
  }
}

export function ActiveFilters() {
  const { searchParams, setParam, clearAll } = useShopParams();
  const active = FILTER_KEYS.flatMap((key) => {
    const value = searchParams.get(key);
    return value ? [{ key, value }] : [];
  });
  if (active.length === 0) return null;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      {active.map(({ key, value }) => (
        <button
          key={key}
          type="button"
          onClick={() => setParam(key, null)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-foreground/80 hover:border-primary hover:text-primary"
        >
          {labelFor(key, value)}
          <X className="h-3 w-3" strokeWidth={2} />
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="text-xs font-medium text-primary underline-offset-4 hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
