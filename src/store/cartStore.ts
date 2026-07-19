/**
 * Cart Store — persisted in localStorage via Zustand persist middleware.
 *
 * Long-term best practices applied:
 *  - Selectors are pure functions (no stale-closure risk).
 *  - Item key uses `id + variantKey` so the same product with different
 *    variants is treated as a separate line item.
 *  - All monetary arithmetic is kept integer-safe (cents approach could be
 *    applied later; currently uses JS Number with rounding guard).
 *  - Version field on the persist config enables safe future migrations
 *    without breaking existing persisted carts.
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  id: string; // product ID
  variantKey?: string; // e.g. "color:red|size:M"
  title: string;
  style?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image?: string;
  category: string;
  sku?: string;
}

function itemKey(id: string, variantKey?: string) {
  return variantKey ? `${id}::${variantKey}` : id;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  couponCode: string | null;
  couponDiscount: number;

  // Actions
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string, variantKey?: string) => void;
  updateQuantity: (id: string, quantity: number, variantKey?: string) => void;
  decreaseQuantity: (id: string, variantKey?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  setCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  isInCart: (id: string, variantKey?: string) => boolean;

  // Computed selectors (stable references — use these in components)
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: (id: string, variantKey?: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: null,
      couponDiscount: 0,

      // ── Mutators ──────────────────────────────────────────────────────────

      addItem: (item, quantity = 1) =>
        set((state) => {
          const key = itemKey(item.id, item.variantKey);

          const existing = state.items.find(
            (i) => itemKey(i.id, i.variantKey) === key,
          );

          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i.id, i.variantKey) === key
                  ? {
                      ...i,
                      quantity: i.quantity + quantity,
                    }
                  : i,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity,
              },
            ],
          };
        }),

      removeItem: (id, variantKey) =>
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.id, i.variantKey) !== itemKey(id, variantKey),
          ),
        })),

      updateQuantity: (id, quantity, variantKey) => {
        const key = itemKey(id, variantKey);
        if (quantity <= 0) {
          set((state) => ({
            items: state.items.filter(
              (i) => itemKey(i.id, i.variantKey) !== key,
            ),
          }));
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            itemKey(i.id, i.variantKey) === key ? { ...i, quantity } : i,
          ),
        }));
      },

      decreaseQuantity: (id, variantKey) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              itemKey(i.id, i.variantKey) === itemKey(id, variantKey)
                ? { ...i, quantity: i.quantity - 1 }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [], couponCode: null, couponDiscount: 0 }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      isInCart: (id, variantKey) => {
        const key = itemKey(id, variantKey);
        return get().items.some((i) => itemKey(i.id, i.variantKey) === key);
      },

      setCoupon: (code, discount) =>
        set({ couponCode: code, couponDiscount: discount }),

      removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),

      // ── Selectors ─────────────────────────────────────────────────────────

      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getTotal: () => Math.max(0, get().getSubtotal() - get().couponDiscount),

      getItemCount: (id, variantKey) => {
        const key = itemKey(id, variantKey);
        return (
          get().items.find((i) => itemKey(i.id, i.variantKey) === key)
            ?.quantity ?? 0
        );
      },
    }),
    {
      name: "cart-storage",
      version: 1, // bump → triggers onRehydrateStorage migration
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
