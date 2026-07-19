/**
 * Store barrel — single import point for all Zustand stores.
 *
 * ⚠️  Do NOT call multiple stores inside a single component via useStore()
 *     façade (the old anti-pattern below).  Instead, import the individual
 *     store hooks directly so React can scope re-renders correctly:
 *
 *       import { useCartStore }     from "@/store";
 *       import { useWishlistStore } from "@/store";
 *       import { useFilterStore }   from "@/store";
 *
 * The façade is kept ONLY for gradual migration of legacy call sites.
 */
export { useCartStore } from "./cartStore";
export type { CartItem } from "./cartStore";

export { useWishlistStore } from "./wishlistStore";
export type { WishlistItem } from "./wishlistStore";

export { useFilterStore, DEFAULT_FILTERS } from "./filterStore";
export type { FilterState } from "./filterStore";
