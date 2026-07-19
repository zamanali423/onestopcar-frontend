"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

export type SortOption =
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "popular"
  | "availability";

interface WishlistSortProps {
  value: SortOption;
  onChange: (v: SortOption) => void;
}

const options: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
  { value: "availability", label: "Availability" },
];

export function WishlistSort({ value, onChange }: WishlistSortProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/70 hover:text-white hover:border-white/15 transition-all whitespace-nowrap"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <ArrowUpDown className="h-4 w-4 text-white/30" />
        <span className="hidden sm:inline">{selected?.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-white/30 transition-transform ${open ? "rotate-180" : ""}`}
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
              className="absolute right-0 top-full mt-2 z-20 min-w-[200px] overflow-hidden rounded-xl border border-white/8 bg-[#1a1a1a] shadow-2xl"
              role="listbox"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors text-left ${
                    option.value === value
                      ? "bg-[#E9CC2F]/10 text-[#E9CC2F]"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  role="option"
                  aria-selected={option.value === value}
                >
                  {option.label}
                  {option.value === value && <Check className="h-3.5 w-3.5" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
