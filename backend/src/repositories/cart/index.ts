import { flags } from "../../config/flags";
import { MockCartRepository } from "./mock";
import type { CartRepository } from "./types";

export type { CartRepository, AddItemInput } from "./types";

let instance: CartRepository | null = null;

/** Resolve the active cart repository from the DATA_SOURCE flag. */
export function getCartRepository(): CartRepository {
  if (instance) return instance;
  switch (flags.dataSource) {
    case "prisma":
      // TODO(phase-3): return new PrismaCartRepository();
      instance = new MockCartRepository();
      break;
    case "mock":
    default:
      instance = new MockCartRepository();
  }
  return instance;
}
