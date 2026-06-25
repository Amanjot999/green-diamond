import type { Category, CategoryKind, Paginated, Product } from "@/types";
import { mockCategories, mockProducts } from "../mock-data/catalog";
import type { CatalogRepository, ProductQuery, ProductSort } from "./types";

function paginate<T>(items: T[], page = 1, pageSize = 12): Paginated<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

function matches(product: Product, q: ProductQuery): boolean {
  if (q.type && product.type !== q.type) return false;
  if (q.categorySlug && !product.categorySlugs.includes(q.categorySlug)) return false;
  if (q.featured !== undefined && product.featured !== q.featured) return false;
  if (q.priceMin !== undefined && product.basePrice < q.priceMin) return false;
  if (q.priceMax !== undefined && product.basePrice > q.priceMax) return false;
  if (q.metal && !product.variants.some((v) => v.metal === q.metal)) return false;

  if (q.search) {
    const hay = `${product.name} ${product.description} ${product.sku}`.toLowerCase();
    if (!hay.includes(q.search.toLowerCase())) return false;
  }

  const spec = product.diamondSpec;
  if (q.shape && spec?.shape !== q.shape) return false;
  if (q.cut && spec?.cut !== q.cut) return false;
  if (q.color && spec?.color !== q.color) return false;
  if (q.clarity && spec?.clarity !== q.clarity) return false;
  if (q.growthMethod && spec?.growthMethod !== q.growthMethod) return false;
  if (q.caratMin !== undefined && (spec?.caratWeight ?? 0) < q.caratMin) return false;
  if (q.caratMax !== undefined && (spec?.caratWeight ?? Infinity) > q.caratMax) return false;

  return true;
}

function sortProducts(items: Product[], sort: ProductSort = "featured"): Product[] {
  const sorted = [...items];
  switch (sort) {
    case "price_asc":
      return sorted.sort((a, b) => a.basePrice - b.basePrice);
    case "price_desc":
      return sorted.sort((a, b) => b.basePrice - a.basePrice);
    case "carat_desc":
      return sorted.sort(
        (a, b) => (b.diamondSpec?.caratWeight ?? 0) - (a.diamondSpec?.caratWeight ?? 0),
      );
    case "newest":
      return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "featured":
    default:
      return sorted.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.createdAt.localeCompare(a.createdAt),
      );
  }
}

/** In-memory CatalogRepository over the seed catalogue. */
export class MockCatalogRepository implements CatalogRepository {
  async listProducts(query: ProductQuery = {}): Promise<Paginated<Product>> {
    const filtered = mockProducts
      .filter((p) => p.status === "active")
      .filter((p) => matches(p, query));
    const sorted = sortProducts(filtered, query.sort);
    return paginate(sorted, query.page, query.pageSize);
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return mockProducts.find((p) => p.slug === slug) ?? null;
  }

  async getRelatedProducts(slug: string, limit = 4): Promise<Product[]> {
    const product = await this.getProductBySlug(slug);
    if (!product) return [];
    return mockProducts
      .filter((p) => p.slug !== slug && p.status === "active")
      .filter((p) => p.categorySlugs.some((c) => product.categorySlugs.includes(c)) || p.type === product.type)
      .slice(0, limit);
  }

  async listCategories(kind?: CategoryKind): Promise<Category[]> {
    return kind ? mockCategories.filter((c) => c.kind === kind) : mockCategories;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return mockCategories.find((c) => c.slug === slug) ?? null;
  }

  async searchLooseDiamonds(query: ProductQuery = {}): Promise<Paginated<Product>> {
    return this.listProducts({ ...query, type: "loose_diamond" });
  }
}
