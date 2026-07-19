"use client";

import { motion } from "framer-motion";

function Skeleton({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      className={`rounded-lg bg-white/5 ${className ?? ""}`}
    />
  );
}

export default function LoadingCheckout() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] pt-24 pb-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-2" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-2" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Title skeleton */}
        <div className="text-center mb-10">
          <Skeleton className="h-10 w-64 mx-auto mb-3" />
          <Skeleton className="h-4 w-80 mx-auto" />
        </div>

        {/* Progress skeleton */}
        <div className="flex items-center justify-center gap-8 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 xl:gap-8">
          {/* Left */}
          <div className="space-y-6">
            {[1, 2, 3].map((card) => (
              <div
                key={card}
                className="rounded-2xl border border-white/8 bg-[#1A1A1A]/60 p-6"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-6">
                  <Skeleton className="h-9 w-9 rounded-xl" />
                  <div>
                    <Skeleton className="h-4 w-40 mb-1.5" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
                {/* Fields */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Skeleton className="h-12 rounded-xl" />
                  <Skeleton className="h-12 rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Skeleton className="h-12 rounded-xl" />
                  <Skeleton className="h-12 rounded-xl" />
                </div>
                <Skeleton className="h-12 rounded-xl mb-4" />
                <Skeleton className="h-20 rounded-xl" />
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/8 bg-[#1A1A1A]/60 p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-4 w-32" />
              </div>
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-3 mb-3">
                  <Skeleton className="h-16 w-16 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))}
              <div className="space-y-2 mt-4 pt-4 border-t border-white/5">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
              <Skeleton className="h-14 w-full rounded-xl mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
