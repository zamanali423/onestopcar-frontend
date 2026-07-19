"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Truck,
  Tag,
  ChevronDown,
  Loader2,
  ArrowRight,
  Shield,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPKR, getEstimatedDelivery } from "@/lib/utils";
import CartProducts from "./CartProducts";
import CouponCard from "./CouponCard";

interface OrderSummaryProps {
  isSubmitting: boolean;
  onSubmit: () => void;
}

export default function OrderSummary({ isSubmitting, onSubmit }: OrderSummaryProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(true);

  const cartItems = useCartStore((state) => state.items);

  const couponCode = useCartStore((state) => state.couponCode);
  const couponDiscount = useCartStore((state) => state.couponDiscount);

  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const getTotal = useCartStore((state) => state.getTotal);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const subtotal = getSubtotal();
  const total = getTotal();
  const totalItems = getTotalItems();
  const savings =
    cartItems.reduce((acc, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return (
          acc +
          (item.originalPrice - item.price) * item.quantity
        );
      }
      return acc;
    }, 0) + couponDiscount;

  return (
    <div className="space-y-4">
      {/* Main Summary Card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-2xl border border-white/10 bg-[#1A1A1A]/80 backdrop-blur-sm overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E9CC2F]/10 border border-[#E9CC2F]/20">
              <ShoppingBag className="h-4 w-4 text-[#E9CC2F]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Order Summary</p>
              <p className="text-[10px] text-white/40">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
            </div>
          </div>

          {/* Mobile toggle */}
          <motion.button
            type="button"
            onClick={() => setIsProductsOpen(!isProductsOpen)}
            className="lg:hidden flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            aria-expanded={isProductsOpen}
          >
            <span>{isProductsOpen ? "Hide" : "Show"} items</span>
            <motion.div animate={{ rotate: isProductsOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.button>
        </div>

        {/* Products - always visible on desktop, collapsible on mobile */}
        <AnimatePresence>
          {isProductsOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="p-4 border-b border-white/5">
                <CartProducts />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Always visible on desktop */}
        <div className="hidden lg:block">
          <div className="p-4 border-b border-white/5">
            <CartProducts />
          </div>
        </div>

        {/* Coupon */}
        <div className="p-4 border-b border-white/5">
          <CouponCard />
        </div>

        {/* Totals */}
        <div className="p-5 space-y-3">
          {/* Subtotal */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50">Subtotal ({totalItems} items)</span>
            <span className="font-medium text-white">{formatPKR(subtotal)}</span>
          </div>

          {/* Shipping */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-white/50">
              <Truck className="h-3.5 w-3.5" />
              <span>Shipping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-[#E9CC2F]/15 px-2 py-0.5 text-[10px] font-bold text-[#E9CC2F] uppercase">
                FREE
              </span>
            </div>
          </div>

          {/* Coupon Discount */}
          <AnimatePresence>
            {couponCode && couponDiscount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <Tag className="h-3.5 w-3.5" />
                  <span>Coupon ({couponCode})</span>
                </div>
                <span className="font-medium text-emerald-400">
                  -{formatPKR(couponDiscount)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="h-px bg-white/5" />

          {/* Grand Total */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Grand Total</p>
              <p className="text-[10px] text-white/30">Inclusive of all taxes</p>
            </div>
            <motion.div
              key={total}
              initial={{ scale: 1.1, color: "#E9CC2F" }}
              animate={{ scale: 1, color: "#E9CC2F" }}
              className="text-xl font-bold text-[#E9CC2F]"
            >
              {formatPKR(total)}
            </motion.div>
          </div>

          {/* Savings */}
          {savings > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-2"
            >
              <span className="text-xs text-emerald-400">🎉 Total Savings</span>
              <span className="text-xs font-bold text-emerald-400">{formatPKR(savings)}</span>
            </motion.div>
          )}

          {/* Estimated Delivery */}
          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/3 px-3 py-2">
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Clock className="h-3.5 w-3.5" />
              <span>Estimated Delivery</span>
            </div>
            <span className="text-xs font-semibold text-white">{getEstimatedDelivery()}</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="px-5 pb-5">
          <motion.button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting || cartItems.length === 0}
            whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            className="relative w-full overflow-hidden rounded-xl bg-[#E9CC2F] px-6 py-4 text-base font-bold text-[#1A1A1A] shadow-[0_4px_20px_rgba(233,204,47,0.3)] transition-all duration-300 hover:bg-[#B69E24] hover:shadow-[0_8px_30px_rgba(233,204,47,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Place your order"
          >
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Placing Order...</span>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Shield className="h-4.5 w-4.5" style={{ height: "18px", width: "18px" }} />
                  <span>Place Order Securely</span>
                  <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" style={{ height: "18px", width: "18px" }} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ripple shimmer */}
            {!isSubmitting && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
            )}
          </motion.button>

          {/* Security note */}
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-white/30">
            <Shield className="h-3 w-3 text-[#E9CC2F]/50" />
            Secured checkout — Cash on Delivery, No card required
          </p>
        </div>
      </motion.div>

      {/* Delivery Benefits */}
      <DeliveryBenefits />
    </div>
  );
}

function DeliveryBenefits() {
  const benefits = [
    { emoji: "🚚", title: "Free Shipping", desc: "Across all of Pakistan" },
    { emoji: "💰", title: "Cash on Delivery", desc: "Pay when it arrives" },
    { emoji: "✅", title: "Quality Guarantee", desc: "100% authentic products" },
    { emoji: "↩️", title: "Easy Returns", desc: "7-day hassle-free returns" },
    { emoji: "📞", title: "24/7 Support", desc: "Always here to help" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl border border-white/10 bg-[#1A1A1A]/60 p-4"
    >
      <p className="mb-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
        Why Shop With Us
      </p>
      <div className="grid grid-cols-1 gap-2">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.06 }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-white/3 transition-colors cursor-default"
          >
            <span className="text-base shrink-0">{b.emoji}</span>
            <div>
              <p className="text-xs font-semibold text-white">{b.title}</p>
              <p className="text-[10px] text-white/40">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="mt-4 pt-4 border-t border-white/5">
        <p className="mb-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
          Trust & Security
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: "🔒", label: "100% Secure" },
            { icon: "💎", label: "Premium Quality" },
            { icon: "⚡", label: "Fast Delivery" },
            { icon: "✓", label: "Verified Store" },
          ].map((badge) => (
            <motion.div
              key={badge.label}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/3 px-3 py-2"
            >
              <span className="text-sm">{badge.icon}</span>
              <span className="text-[10px] font-medium text-white/50">{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
