/**
 * Wishlist Store — persisted in localStorage.
 *
 * Long-term best practices:
 *  - WishlistItem carries price & image so the wishlist page can render
 *    without a second product fetch.
 *  - isInWishlist is a stable selector, safe to call inside renders.
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  slug?: string;
}

interface WishlistStore {
  items: WishlistItem[];

  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: WishlistItem) => void;
  clearWishlist: () => void;

  // Selectors
  isInWishlist: (id: string) => boolean;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => ({
          items: state.items.some((i) => i.id === item.id)
            ? state.items
            : [...state.items, item],
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      toggleItem: (item) => {
        const exists = get().items.some((i) => i.id === item.id);
        if (exists) {
          set((state) => ({ items: state.items.filter((i) => i.id !== item.id) }));
        } else {
          set((state) => ({ items: [...state.items, item] }));
        }
      },

      clearWishlist: () => set({ items: [] }),

      isInWishlist: (id) => get().items.some((i) => i.id === id),

      getCount: () => get().items.length,
    }),
    {
      name: "wishlist-storage",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
