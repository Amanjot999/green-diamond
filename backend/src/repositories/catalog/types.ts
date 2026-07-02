import type {
  Category,
  CategoryKind,
  DiamondShape,
  GrowthMethod,
  Metal,
  Paginated,
  Product,
  ProductType,
} from "../../types";
import type { Paise } from "../../config/money";

export type ProductSort =
  | "newest"
  | "price_asc"
  | "price_desc"
  | "carat_desc"
  | "featured";

/** Faceted query for the shop + loose-diamond finder (SPEC §7.2, §7.3, §8). */
export interface ProductQuery {
  type?: ProductType;
  shape?: DiamondShape;
  caratMin?: number;
  caratMax?: number;
  priceMin?: Paise;
  priceMax?: Paise;
  cut?: string;
  color?: string;
  clarity?: string;
  metal?: Metal;
  growthMethod?: GrowthMethod;
  categorySlug?: string;
  featured?: boolean;
  search?: string;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
}

/**
 * CatalogRepository — data access for products & categories (SPEC §5, §8).
 * Mock-backed now; Prisma-backed in Phase 3 behind the SAME interface.
 */
export interface CatalogRepository {
  listProducts(query?: ProductQuery): Promise<Paginated<Product>>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getRelatedProducts(slug: string, limit?: number): Promise<Product[]>;
  listCategories(kind?: CategoryKind): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  /** Dedicated 4C-driven loose-diamond search (SPEC §7.3). */
  searchLooseDiamonds(query?: ProductQuery): Promise<Paginated<Product>>;
}
