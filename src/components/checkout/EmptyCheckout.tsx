"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, Home, Zap } from "lucide-react";

export default function EmptyCheckout() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="text-center max-w-md mx-auto">
        {/* Animated bag icon */}
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center"
        >
          {/* Glow rings */}
          <motion.div
            className="absolute inset-0 rounded-full bg-[#E9CC2F]/10"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-4 rounded-full bg-[#E9CC2F]/10"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#E9CC2F]/20 bg-gradient-to-br from-[#E9CC2F]/10 to-transparent">
            <ShoppingBag className="h-10 w-10 text-[#E9CC2F]" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-white mb-3">Your cart is empty</h2>
          <p className="text-white/50 text-base mb-8 leading-relaxed">
            Looks like you haven&apos;t added any automotive accessories yet.
            Explore our premium collection and find your perfect upgrade.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl bg-[#E9CC2F] px-6 py-3.5 text-sm font-bold text-[#1A1A1A] shadow-[0_4px_20px_rgba(233,204,47,0.3)] hover:shadow-[0_8px_30px_rgba(233,204,47,0.4)] transition-all cursor-pointer"
            >
              <Zap className="h-4 w-4 fill-[#1A1A1A]" />
              Continue Shopping
            </motion.div>
          </Link>

          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <Home className="h-4 w-4" />
              Go Home
            </motion.div>
          </Link>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
