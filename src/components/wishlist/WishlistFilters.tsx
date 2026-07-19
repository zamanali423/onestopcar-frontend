"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown, X, Check } from "lucide-react";
import { useState } from "react";

export interface WishlistFiltersState {
  categories: string[];
  brands: string[];
  availability: "all" | "in-stock" | "out-of-stock";
  maxPrice: number;
}

interface WishlistFiltersProps {
  filters: WishlistFiltersState;
  onChange: (f: WishlistFiltersState) => void;
  availableCategories: string[];
  availableBrands: string[];
}

export function WishlistFilters({
  filters,
  onChange,
  availableCategories,
  availableBrands,
}: WishlistFiltersProps) {
  const [open, setOpen] = useState(false);

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    (filters.availability !== "all" ? 1 : 0);

  const toggleCategory = (cat: string) => {
    const cats = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: cats });
  };

  const toggleBrand = (brand: string) => {
    const brands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands });
  };

  const clearAll = () =>
    onChange({ categories: [], brands: [], availability: "all", maxPrice: 10000 });

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm transition-all whitespace-nowrap ${
          activeCount > 0
            ? "border-[#E9CC2F]/40 bg-[#E9CC2F]/8 text-[#E9CC2F]"
            : "border-white/8 bg-white/[0.03] text-white/70 hover:text-white hover:border-white/15"
        }`}
        aria-expanded={open}
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span className="hidden sm:inline">Filters</span>
        {activeCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E9CC2F] text-[10px] font-bold text-[#1A1A1A]">
            {activeCount}
          </span>
        )}
        <ChevronDown
          className={`h-3.5 w-3.5 opacity-50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 z-20 w-72 overflow-hidden rounded-xl border border-white/8 bg-[#1a1a1a] shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
                <span className="text-sm font-semibold text-white">Filters</span>
                {activeCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1 text-xs text-[#E9CC2F] hover:text-[#f5e06a] transition-colors"
                  >
                    <X className="h-3 w-3" />
                    Clear all
                  </button>
                )}
              </div>

              <div className="p-4 space-y-5 max-h-80 overflow-y-auto">
                {/* Availability */}
                <div>
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                    Availability
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(["all", "in-stock", "out-of-stock"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => onChange({ ...filters, availability: opt })}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          filters.availability === opt
                            ? "bg-[#E9CC2F]/15 text-[#E9CC2F] border border-[#E9CC2F]/30"
                            : "bg-white/5 text-white/50 border border-white/8 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {opt === "all" ? "All" : opt === "in-stock" ? "In Stock" : "Out of Stock"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                {availableCategories.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                      Category
                    </p>
                    <div className="space-y-1">
                      {availableCategories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => toggleCategory(cat)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                        >
                          <span
                            className={filters.categories.includes(cat) ? "text-[#E9CC2F]" : "text-white/60"}
                          >
                            {cat}
                          </span>
                          {filters.categories.includes(cat) && (
                            <Check className="h-3.5 w-3.5 text-[#E9CC2F]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Brands */}
                {availableBrands.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                      Brand
                    </p>
                    <div className="space-y-1">
                      {availableBrands.map((brand) => (
                        <button
                          key={brand}
                          onClick={() => toggleBrand(brand)}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-white/5 transition-colors"
                        >
                          <span
                            className={filters.brands.includes(brand) ? "text-[#E9CC2F]" : "text-white/60"}
                          >
                            {brand}
                          </span>
                          {filters.brands.includes(brand) && (
                            <Check className="h-3.5 w-3.5 text-[#E9CC2F]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
