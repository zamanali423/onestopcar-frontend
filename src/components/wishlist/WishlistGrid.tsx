"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WishlistCard } from "./WishlistCard";
import { WishlistSearch } from "./WishlistSearch";
import { WishlistSort, type SortOption } from "./WishlistSort";
import { WishlistFilters, type WishlistFiltersState } from "./WishlistFilters";
import { EmptyWishlist } from "./EmptyWishlist";
import { LoadingWishlist } from "./LoadingWishlist";
import type { Product } from "@/lib/mock/products";
import { useMemo, useState } from "react";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";

// Extend Product type for wishlist-specific properties
interface WishlistProduct extends Product {
  addedToWishlistAt?: number; // timestamp
}

interface WishlistGridProps {
  items: WishlistProduct[];
  isLoading: boolean;
  onQuickView: (product: WishlistProduct) => void;
  onShare: (product: WishlistProduct) => void;
  onCompare: (product: WishlistProduct) => void;
}

export function WishlistGrid({
  items,
  isLoading,
  onQuickView,
  onShare,
  onCompare,
}: WishlistGridProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [filters, setFilters] = useState<WishlistFiltersState>({
    categories: [],
    brands: [],
    availability: "all",
    maxPrice: 10000,
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extract available categories from items
  const categories = useMemo(
    () => [...new Set(items.map((i) => i.category))],
    [items]
  );

  // Extract available models/styles as brands (since Product doesn't have brand)
  const brands = useMemo(
    () => [...new Set(items.flatMap((i) => i.styles || []))],
    [items]
  );

  const filteredItems = useMemo(() => {
    let result = [...items];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.model.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((i) => filters.categories.includes(i.category));
    }

    // Brand/Model filter - using model as brand since Product doesn't have brand
    if (filters.brands.length > 0) {
      result = result.filter((i) => filters.brands.includes(i.model));
    }

    // Availability filter
    if (filters.availability === "in-stock") {
      result = result.filter((i) => i.stock > 0);
    } else if (filters.availability === "out-of-stock") {
      result = result.filter((i) => i.stock <= 0);
    }

    // Price filter
    result = result.filter((i) => i.price <= filters.maxPrice);

    // Sort
    switch (sort) {
      case "newest":
        result.sort((a, b) => (b.addedToWishlistAt ?? 0) - (a.addedToWishlistAt ?? 0));
        break;
      case "oldest":
        result.sort((a, b) => (a.addedToWishlistAt ?? 0) - (b.addedToWishlistAt ?? 0));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case "availability":
        result.sort((a, b) => (b.stock > 0 ? 1 : 0) - (a.stock > 0 ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [items, search, sort, filters]);

  if (isLoading) return <LoadingWishlist />;

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
      >
        <div className="flex-1">
          <WishlistSearch value={search} onChange={setSearch} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <WishlistSort value={sort} onChange={setSort} />
          <WishlistFilters
            filters={filters}
            onChange={setFilters}
            availableCategories={categories}
            availableBrands={brands}
          />
          {/* View mode */}
          <div className="flex rounded-xl border border-white/8 overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`flex h-11 w-11 items-center justify-center transition-colors ${viewMode === "grid"
                  ? "bg-[#E9CC2F]/15 text-[#E9CC2F]"
                  : "bg-white/[0.03] text-white/30 hover:text-white"
                }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={`flex h-11 w-11 items-center justify-center border-l border-white/8 transition-colors ${viewMode === "list"
                  ? "bg-[#E9CC2F]/15 text-[#E9CC2F]"
                  : "bg-white/[0.03] text-white/30 hover:text-white"
                }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Result count */}
      <AnimatePresence mode="wait">
        {search && (
          <motion.p
            key={`count-${filteredItems.length}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-white/40"
          >
            {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""} for &quot;{search}&quot;
          </motion.p>
        )}
      </AnimatePresence>

      {/* Grid / Empty */}
      {filteredItems.length === 0 ? (
        <EmptyWishlist
          isFiltered={search.length > 0 || filters.categories.length > 0 || filters.brands.length > 0}
        />
      ) : (
        <motion.div
          layout
          className={`grid gap-4 ${viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
            }`}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((product, i) => (
              <WishlistCard
                key={product.id}
                product={product}
                index={i}
                onQuickView={onQuickView}
                onShare={onShare}
                onCompare={onCompare}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}