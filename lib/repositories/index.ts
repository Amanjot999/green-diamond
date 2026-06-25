/**
 * Repository layer barrel (SPEC §5). Data access lives behind these accessors;
 * swap mock → Prisma via DATA_SOURCE with no change to callers.
 */
export {
  getCatalogRepository,
  type CatalogRepository,
  type ProductQuery,
  type ProductSort,
} from "./catalog";
export { getCartRepository, type CartRepository, type AddItemInput } from "./cart";
