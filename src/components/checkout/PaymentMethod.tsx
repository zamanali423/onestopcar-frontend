"use client";

import { motion } from "framer-motion";
import { Banknote, ShieldCheck, Info } from "lucide-react";

export default function PaymentMethod() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-2xl border border-white/10 bg-[#1A1A1A]/60 backdrop-blur-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/5 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E9CC2F]/10 border border-[#E9CC2F]/20">
          <Banknote className="h-[18px] w-[18px] text-[#E9CC2F]" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Payment Method</h2>
          <p className="text-xs text-white/40">Safe & secure transactions</p>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* COD Option */}
        <motion.div
          whileHover={{ scale: 1.01, y: -1 }}
          className="relative flex items-center gap-4 rounded-xl border-2 border-[#E9CC2F]/50 bg-[#E9CC2F]/5 p-4 cursor-default shadow-[0_0_20px_rgba(233,204,47,0.08)]"
        >
          {/* Selected indicator */}
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#E9CC2F] bg-[#E9CC2F]">
            <div className="h-2 w-2 rounded-full bg-[#1A1A1A]" />
          </div>

          {/* COD Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20">
            <Banknote className="h-6 w-6 text-emerald-400" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-sm font-semibold text-white">Cash on Delivery</span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                COD
              </span>
            </div>
            <p className="text-xs text-white/50">
              Pay when your order arrives at your doorstep
            </p>
          </div>

          {/* Shield */}
          <ShieldCheck className="h-5 w-5 text-emerald-400/60 shrink-0" />

          <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-inset ring-[#E9CC2F]/20" />
        </motion.div>

        {/* COD Explanation Card */}
        <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 mt-0.5">
              <Info className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-400 mb-1">How Cash on Delivery Works</p>
              <ul className="space-y-1">
                {[
                  "Place your order and we'll confirm via call/SMS",
                  "Our courier will deliver within 2–5 business days",
                  "Pay in cash when the package arrives",
                  "Inspect the product before payment",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] text-white/50">
                    <span className="shrink-0 mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/20 text-[9px] font-bold text-blue-400">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-4 pt-2">
          {["256-bit Encryption", "SSL Secured", "100% Safe"].map((badge) => (
            <div key={badge} className="flex items-center gap-1.5 text-[10px] text-white/30">
              <ShieldCheck className="h-3 w-3 text-[#E9CC2F]/50" />
              {badge}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
