import { flags } from "../../config/flags";
import { MockCatalogRepository } from "./mock";
import type { CatalogRepository } from "./types";

export type { CatalogRepository, ProductQuery, ProductSort } from "./types";

let instance: CatalogRepository | null = null;

/**
 * Resolve the active catalog repository from the DATA_SOURCE flag.
 * Phase 3 adds a PrismaCatalogRepository here behind the same interface.
 */
export function getCatalogRepository(): CatalogRepository {
  if (instance) return instance;
  switch (flags.dataSource) {
    case "prisma":
      // TODO(phase-3): return new PrismaCatalogRepository();
      instance = new MockCatalogRepository();
      break;
    case "mock":
    default:
      instance = new MockCatalogRepository();
  }
  return instance;
}
