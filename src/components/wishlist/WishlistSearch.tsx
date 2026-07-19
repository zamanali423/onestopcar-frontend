"use client";

import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useCallback } from "react";

interface WishlistSearchProps {
  value: string;
  onChange: (v: string) => void;
}

export function WishlistSearch({ value, onChange }: WishlistSearchProps) {
  const handleClear = useCallback(() => onChange(""), [onChange]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative group"
    >
      <div className="absolute inset-0 rounded-xl bg-[#E9CC2F]/0 group-focus-within:bg-[#E9CC2F]/5 transition-colors duration-300 rounded-xl pointer-events-none" />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-white/30 group-focus-within:text-[#E9CC2F]/70 transition-colors z-10" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search your wishlist..."
        aria-label="Search wishlist"
        className="w-full rounded-xl border border-white/8 bg-white/[0.03] py-3 pl-11 pr-10 text-sm text-white placeholder-white/25 outline-none focus:border-[#E9CC2F]/30 focus:ring-0 transition-colors"
        style={{ backdropFilter: "blur(12px)" }}
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white/50 hover:text-white hover:bg-white/15 transition-all"
        >
          <X className="h-3.5 w-3.5" />
        </motion.button>
      )}
    </motion.div>
  );
}
