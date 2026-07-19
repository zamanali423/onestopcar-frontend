"use client";

import { motion } from "framer-motion";

function SkeletonCard({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="overflow-hidden rounded-2xl border border-white/6 bg-white/[0.02]"
    >
      {/* Image skeleton */}
      <div className="aspect-[4/3] shimmer bg-white/[0.03]" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-3 w-20 shimmer rounded-md bg-white/[0.03]" />
          <div className="h-3 w-16 shimmer rounded-md bg-white/[0.03]" />
        </div>
        <div className="h-4 w-full shimmer rounded-md bg-white/[0.03]" />
        <div className="h-3 w-3/4 shimmer rounded-md bg-white/[0.03]" />
        <div className="flex gap-1.5">
          <div className="h-5 w-16 shimmer rounded-md bg-white/[0.03]" />
          <div className="h-5 w-20 shimmer rounded-md bg-white/[0.03]" />
        </div>
        <div className="h-6 w-24 shimmer rounded-md bg-white/[0.03]" />
        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="h-9 shimmer rounded-xl bg-white/[0.03]" />
          <div className="h-9 shimmer rounded-xl bg-white/[0.03]" />
        </div>
      </div>
    </motion.div>
  );
}

export function LoadingWishlist() {
  return (
    <div className="space-y-5">
      {/* Toolbar skeleton */}
      <div className="flex gap-3">
        <div className="h-11 flex-1 shimmer rounded-xl bg-white/[0.03]" />
        <div className="h-11 w-32 shimmer rounded-xl bg-white/[0.03]" />
        <div className="h-11 w-28 shimmer rounded-xl bg-white/[0.03]" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}
