import type { Paise } from "@/config/money";

/** Catalog domain types (SPEC §6: Product, ProductVariant, DiamondSpec, Media, Category). */

export type DiamondShape =
  | "round"
  | "princess"
  | "cushion"
  | "oval"
  | "emerald"
  | "pear"
  | "marquise"
  | "radiant"
  | "asscher"
  | "heart";

export type ProductType =
  | "loose_diamond"
  | "ring"
  | "earrings"
  | "necklace"
  | "pendant"
  | "bracelet"
  | "bangle";

export type GrowthMethod = "CVD" | "HPHT";
export type CertLab = "IGI" | "GIA" | "GCAL";
export type Metal = "14k" | "18k" | "platinum";
export type MetalColor = "yellow" | "white" | "rose";
export type ProductStatus = "draft" | "active" | "archived";
export type CategoryKind = "shape" | "style" | "metal" | "occasion" | "collection";

export interface DiamondSpec {
  shape: DiamondShape;
  caratWeight: number;
  cut: string;
  color: string;
  clarity: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  measurements: string;
  depthPct?: number;
  tablePct?: number;
  growthMethod: GrowthMethod;
  certLab: CertLab;
  certNumber: string;
  certUrl?: string;
}

export interface MediaItem {
  id: string;
  url: string;
  alt: string;
  type: "image" | "video" | "view360";
  position: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  metal?: Metal;
  metalColor?: MetalColor;
  ringSize?: string;
  centerCarat?: number;
  price: Paise;
  sku: string;
  stock: number;
  lowStockThreshold: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  kind: CategoryKind;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  sku: string;
  type: ProductType;
  basePrice: Paise;
  compareAtPrice?: Paise;
  currency: "INR";
  status: ProductStatus;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  categorySlugs: string[];
  media: MediaItem[];
  variants: ProductVariant[];
  diamondSpec?: DiamondSpec;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
}
