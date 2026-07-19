/**
 * Filter Store — NOT persisted (URL search-params are the source of truth for
 * shareable/bookmarkable product listings).  This store is a lightweight
 * in-memory sync layer that mirrors the URL.
 *
 * Long-term best practices:
 *  - Keep filter state serialisable so you can always round-trip to/from URL.
 *  - Use `setFilters` for bulk updates (avoids cascading re-renders when
 *    updating multiple fields together).
 */
import { create } from "zustand";

export interface FilterState {
  category: string;
  priceRange: [number, number];
  search: string;
  model: string;
  sortBy: string;
}

interface FilterStore {
  filters: FilterState;

  setCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSearch: (search: string) => void;
  setModel: (model: string) => void;
  setSortBy: (sortBy: string) => void;
  resetFilters: () => void;
  setFilters: (filters: Partial<FilterState>) => void;
}

export const DEFAULT_FILTERS: FilterState = {
  category: "all",
  priceRange: [0, 100000],
  search: "",
  model: "all",
  sortBy: "newest",
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: DEFAULT_FILTERS,

  setCategory: (category) =>
    set((s) => ({ filters: { ...s.filters, category } })),

  setPriceRange: (priceRange) =>
    set((s) => ({ filters: { ...s.filters, priceRange } })),

  setSearch: (search) =>
    set((s) => ({ filters: { ...s.filters, search } })),

  setModel: (model) =>
    set((s) => ({ filters: { ...s.filters, model } })),

  setSortBy: (sortBy) =>
    set((s) => ({ filters: { ...s.filters, sortBy } })),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  setFilters: (filters) =>
    set((s) => ({ filters: { ...s.filters, ...filters } })),
}));
