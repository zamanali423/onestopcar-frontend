"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, Grid3X3, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface EmptyWishlistProps {
  isFiltered?: boolean;
}

export function EmptyWishlist({ isFiltered = false }: EmptyWishlistProps) {
  if (isFiltered) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03]">
          <Sparkles className="h-7 w-7 text-white/20" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No results found</h3>
        <p className="text-sm text-white/40">Try adjusting your search or filters</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      {/* Animated heart */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Outer glow rings */}
        <motion.div
          className="absolute inset-0 rounded-full border border-[#E9CC2F]/10"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ margin: -20 }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-[#E9CC2F]/5"
          animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          style={{ margin: -40 }}
        />

        <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-[#E9CC2F]/15 bg-gradient-to-br from-[#E9CC2F]/10 to-[#B69E24]/5">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="h-14 w-14 text-[#E9CC2F]" fill="currentColor" />
          </motion.div>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl md:text-3xl font-bold text-white mb-3"
      >
        Your Wishlist is Empty
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="text-white/40 mb-8 max-w-sm leading-relaxed"
      >
        Save your favorite automotive accessories to purchase them later. Discover premium products tailored for your vehicle.
      </motion.p>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex flex-col sm:flex-row items-center gap-3"
      >
        <Link
          href="/shop"
          className="flex items-center gap-2 rounded-xl bg-[#E9CC2F] px-6 py-3 text-sm font-semibold text-[#1A1A1A] hover:bg-[#d4b828] transition-all hover:scale-105 active:scale-100"
        >
          <ShoppingBag className="h-4 w-4" />
          Start Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/categories"
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white/70 hover:text-white hover:border-white/20 transition-all"
        >
          <Grid3X3 className="h-4 w-4" />
          Browse Categories
        </Link>
      </motion.div>

      {/* Popular tags */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-2"
      >
        <span className="text-xs text-white/25 mr-1">Popular:</span>
        {["Carbon Fiber", "Exhaust Systems", "Alloy Wheels", "LED Lighting", "Brake Kits"].map(
          (tag) => (
            <button
              key={tag}
              className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-white/40 hover:text-white hover:border-[#E9CC2F]/30 hover:bg-[#E9CC2F]/5 transition-all"
            >
              {tag}
            </button>
          )
        )}
      </motion.div>
    </motion.div>
  );
}
