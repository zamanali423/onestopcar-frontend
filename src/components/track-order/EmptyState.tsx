"use client";

import { motion } from "framer-motion";
import { PackageX, Search, ArrowRight } from "lucide-react";

interface EmptyStateProps {
  onTryAgain: () => void;
}

export default function EmptyState({ onTryAgain }: EmptyStateProps) {
  return (
    <motion.div
      className="max-w-lg mx-auto px-4 py-12 text-center"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Illustration */}
      <motion.div
        className="relative w-40 h-40 mx-auto mb-8"
        initial={{ y: 0 }}
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 border-2 border-slate-200/60" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-slate-50 to-white flex items-center justify-center shadow-inner">
          <PackageX
            size={52}
            className="text-slate-300"
            strokeWidth={1.2}
          />
        </div>
        {/* Decorative circles */}
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-100 border-2 border-red-200 flex items-center justify-center"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm">!</span>
        </motion.div>
      </motion.div>

      {/* Text */}
      <h3 className="text-2xl font-black text-[#1A1A1A] mb-3">
        Order Not Found
      </h3>
      <p className="text-slate-500 text-base leading-relaxed mb-2">
        We couldn&apos;t find an order matching those details. Please double-check
        your order number and email or phone number.
      </p>
      <p className="text-sm text-slate-400 mb-8">
        Orders may take a few minutes to appear after placement. Try again
        shortly.
      </p>

      {/* Suggestions */}
      <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 text-left mb-8 space-y-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Tips to try
        </p>
        {[
          "Check your order confirmation email for the exact order number",
          'Order numbers start with "OSC-" followed by 9 digits',
          "Make sure you&apos;re using the email or phone used at checkout",
          "New orders take a few minutes to appear in our system",
        ].map((tip, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#E9CC2F]/20 text-[#B69E24] text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p
              className="text-xs text-slate-500"
              dangerouslySetInnerHTML={{ __html: tip }}
            />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <motion.button
          type="button"
          onClick={onTryAgain}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#B69E24] to-[#E9CC2F] text-white font-bold text-sm shadow-[0_4px_16px_rgba(233,204,47,0.35)] hover:shadow-[0_6px_24px_rgba(233,204,47,0.5)] hover:-translate-y-0.5 transition-all duration-200"
          whileTap={{ scale: 0.97 }}
        >
          <Search size={16} />
          Try Again
        </motion.button>
        <motion.a
          href="/"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#1A1A1A] font-bold text-sm border border-slate-200 transition-all duration-200 hover:-translate-y-0.5"
          whileTap={{ scale: 0.97 }}
        >
          Go Shopping
          <ArrowRight size={16} />
        </motion.a>
      </div>
    </motion.div>
  );
}
