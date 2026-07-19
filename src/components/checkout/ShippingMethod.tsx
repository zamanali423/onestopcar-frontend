"use client";

import { motion } from "framer-motion";
import { Truck, Package, Clock, CheckCircle2 } from "lucide-react";

export default function ShippingMethod() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="rounded-2xl border border-white/10 bg-[#1A1A1A]/60 backdrop-blur-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/5 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E9CC2F]/10 border border-[#E9CC2F]/20">
          <Truck className="h-[18px] w-[18px] text-[#E9CC2F]" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">Shipping Method</h2>
          <p className="text-xs text-white/40">Delivery options for Pakistan</p>
        </div>
      </div>

      <div className="p-6">
        {/* Shipping Option */}
        <motion.div
          whileHover={{ scale: 1.01, y: -1 }}
          className="relative flex items-center gap-4 rounded-xl border-2 border-[#E9CC2F]/50 bg-[#E9CC2F]/5 p-4 cursor-default shadow-[0_0_20px_rgba(233,204,47,0.08)]"
        >
          {/* Selected indicator */}
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#E9CC2F] bg-[#E9CC2F]">
            <div className="h-2 w-2 rounded-full bg-[#1A1A1A]" />
          </div>

          {/* Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#E9CC2F]/20 to-[#B69E24]/10 border border-[#E9CC2F]/20">
            <Package className="h-6 w-6 text-[#E9CC2F]" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-sm font-semibold text-white">Free Standard Shipping</span>
              <span className="inline-flex items-center rounded-full bg-[#E9CC2F] px-2.5 py-0.5 text-[10px] font-bold text-[#1A1A1A] uppercase tracking-wider">
                FREE
              </span>
            </div>
            <p className="text-xs text-white/50 mb-2">
              Free delivery across Pakistan via TCS, Leopards & BlueEx
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[#E9CC2F]/80">
              <Clock className="h-3.5 w-3.5" />
              <span>2–5 Business Days</span>
            </div>
          </div>

          {/* Price */}
          <div className="shrink-0 text-right">
            <p className="text-lg font-bold text-[#E9CC2F]">FREE</p>
            <p className="text-[10px] text-white/30 line-through">Rs. 250</p>
          </div>

          {/* Glow */}
          <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-inset ring-[#E9CC2F]/20" />
        </motion.div>

        {/* Benefits row */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { icon: CheckCircle2, text: "No Hidden Fees" },
            { icon: Package, text: "Tracked Delivery" },
            { icon: Clock, text: "On-Time Guarantee" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex flex-col items-center gap-1.5 rounded-xl bg-white/3 border border-white/5 p-3 text-center"
            >
              <Icon className="h-4 w-4 text-[#E9CC2F]" />
              <span className="text-[10px] text-white/50 leading-tight">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
