import { rupeesToPaise } from "../config/money";
import type { ProductQuery, ProductSort } from "../repositories";
import type { DiamondShape, Metal, ProductType, GrowthMethod } from "../types";

export const TYPE_OPTIONS: { value: ProductType; label: string }[] = [
  { value: "ring", label: "Rings" },
  { value: "earrings", label: "Earrings" },
  { value: "necklace", label: "Necklaces" },
  { value: "pendant", label: "Pendants" },
  { value: "bracelet", label: "Bracelets" },
  { value: "loose_diamond", label: "Loose diamonds" },
];

export const SHAPE_OPTIONS: { value: DiamondShape; label: string }[] = [
  { value: "round", label: "Round" },
  { value: "oval", label: "Oval" },
  { value: "cushion", label: "Cushion" },
  { value: "princess", label: "Princess" },
  { value: "emerald", label: "Emerald" },
  { value: "pear", label: "Pear" },
];

export const CUT_OPTIONS = ["Ideal", "Excellent", "Very Good"];
export const COLOR_OPTIONS = ["D", "E", "F", "G", "H", "I"];
export const CLARITY_OPTIONS = ["FL", "IF", "VVS1", "VVS2", "VS1", "VS2"];

export const METAL_OPTIONS: { value: Metal; label: string }[] = [
  { value: "14k", label: "14k Gold" },
  { value: "18k", label: "18k Gold" },
  { value: "platinum", label: "Platinum" },
];

export const GROWTH_OPTIONS: { value: GrowthMethod; label: string }[] = [
  { value: "CVD", label: "CVD" },
  { value: "HPHT", label: "HPHT" },
];

export const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "carat_desc", label: "Carat: high to low" },
];

export type RawSearchParams = Record<string, string | string[] | undefined>;

function str(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}
function num(v: string | string[] | undefined): number | undefined {
  const s = str(v);
  if (s === undefined || s === "") return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Translate URL search params into a typed ProductQuery.
 * Price params are expressed in RUPEES in the URL (shareable) and converted to
 * paise here. `occasion` / `style` / `collection` map onto a category slug.
 */
export function searchParamsToQuery(sp: RawSearchParams, pageSize = 12): ProductQuery {
  const priceMinR = num(sp.priceMin);
  const priceMaxR = num(sp.priceMax);
  const categorySlug =
    str(sp.occasion) ?? str(sp.style) ?? str(sp.collection) ?? str(sp.category);

  return {
    type: str(sp.type) as ProductQuery["type"],
    shape: str(sp.shape) as ProductQuery["shape"],
    cut: str(sp.cut),
    color: str(sp.color),
    clarity: str(sp.clarity),
    metal: str(sp.metal) as ProductQuery["metal"],
    growthMethod: str(sp.growth) as ProductQuery["growthMethod"],
    categorySlug,
    caratMin: num(sp.caratMin),
    caratMax: num(sp.caratMax),
    priceMin: priceMinR !== undefined ? rupeesToPaise(priceMinR) : undefined,
    priceMax: priceMaxR !== undefined ? rupeesToPaise(priceMaxR) : undefined,
    search: str(sp.q),
    sort: (str(sp.sort) as ProductSort) ?? "featured",
    page: num(sp.page) ?? 1,
    pageSize,
  };
}

/** Keys that represent an active, user-removable filter (excludes sort/page). */
export const FILTER_KEYS = [
  "type",
  "shape",
  "cut",
  "color",
  "clarity",
  "metal",
  "growth",
  "occasion",
  "style",
  "collection",
  "category",
  "caratMin",
  "caratMax",
  "priceMin",
  "priceMax",
  "q",
] as const;
