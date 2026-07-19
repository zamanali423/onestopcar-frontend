"use client";

import { motion } from "framer-motion";

function Shimmer({ className }: { className: string }) {
  return (
    <motion.div
      className={`bg-slate-200 rounded-lg overflow-hidden relative ${className}`}
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

export default function LoadingState() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Timeline skeleton */}
      <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(16,24,40,0.08)] border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shimmer className="w-9 h-9 rounded-xl" />
          <div className="space-y-1.5">
            <Shimmer className="w-32 h-4" />
            <Shimmer className="w-24 h-3" />
          </div>
        </div>
        <div className="hidden sm:flex justify-between items-start">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <Shimmer className="w-12 h-12 rounded-full" />
              <Shimmer className="w-16 h-3" />
              <Shimmer className="w-12 h-2.5" />
            </div>
          ))}
        </div>
        <div className="sm:hidden space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Shimmer className="w-10 h-10 rounded-full flex-shrink-0" />
              <div className="space-y-1.5 flex-1">
                <Shimmer className="w-24 h-3.5" />
                <Shimmer className="w-16 h-2.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order summary skeleton */}
        <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(16,24,40,0.08)] border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shimmer className="w-9 h-9 rounded-xl" />
            <div className="space-y-1.5">
              <Shimmer className="w-28 h-4" />
              <Shimmer className="w-20 h-3" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-3.5 space-y-2">
                <Shimmer className="w-16 h-2.5" />
                <Shimmer className="w-24 h-4" />
              </div>
            ))}
          </div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-2">
              <Shimmer className="w-32 h-3.5" />
              <Shimmer className="w-20 h-3.5" />
            </div>
          ))}
        </div>

        {/* Shipping skeleton */}
        <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(16,24,40,0.08)] border border-slate-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shimmer className="w-9 h-9 rounded-xl" />
            <div className="space-y-1.5">
              <Shimmer className="w-32 h-4" />
              <Shimmer className="w-24 h-3" />
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl mb-4">
            <Shimmer className="w-12 h-12 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Shimmer className="w-24 h-3" />
              <Shimmer className="w-32 h-4" />
            </div>
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl">
                <Shimmer className="w-8 h-8 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Shimmer className="w-20 h-2.5" />
                  <Shimmer className="w-36 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products skeleton */}
      <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(16,24,40,0.08)] border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
          <Shimmer className="w-9 h-9 rounded-xl" />
          <div className="space-y-1.5">
            <Shimmer className="w-28 h-4" />
            <Shimmer className="w-20 h-3" />
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-6 flex gap-5">
              <Shimmer className="w-24 h-24 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <Shimmer className="w-16 h-2.5" />
                <Shimmer className="w-48 h-4" />
                <Shimmer className="w-24 h-3" />
                <div className="flex gap-2">
                  <Shimmer className="w-24 h-8 rounded-lg" />
                  <Shimmer className="w-24 h-8 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
