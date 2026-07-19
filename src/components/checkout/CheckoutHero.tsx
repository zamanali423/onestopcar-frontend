"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import CheckoutProgress from "./CheckoutProgress";

export default function CheckoutHero() {
  return (
    <div className="relative pt-24 pb-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E9CC2F]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E9CC2F]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1.5 text-xs sm:text-sm mb-8"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="flex items-center gap-1 text-white/40 hover:text-white transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/20" />
          <Link
            href="/cart"
            className="text-white/40 hover:text-white transition-colors"
          >
            Cart
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/20" />
          <span className="text-[#E9CC2F] font-medium">Checkout</span>
        </motion.nav>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
            Secure{" "}
            <span className="text-[#E9CC2F]">Checkout</span>
          </h1>
          <p className="text-sm sm:text-base text-white/40 max-w-md mx-auto">
            Complete your order in just a few steps. Free shipping across Pakistan.
          </p>
        </motion.div>

        {/* Progress */}
        <CheckoutProgress currentStep={2} />
      </div>
    </div>
  );
}
