"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  ArrowRight,
  Tag,
  Package,
  TrendingDown,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "@/lib/toast";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/lib/mock/products";
import { formatPKR } from "@/lib/utils";

interface WishlistSummaryProps {
  items: Product[];
}

export function WishlistSummary({ items }: WishlistSummaryProps) {
  const [isMovingAll, setIsMovingAll] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const clearWishlist = useWishlistStore((s) => s.clearWishlist);
  const addToCart = useCartStore((s) => s.addItem);

  const availableItems = items.filter((i) => i.stock > 0);
  const totalValue = items.reduce((sum, i) => sum + i.price, 0);
  const originalValue = items.reduce((sum, i) => sum + (i.originalPrice ?? 0), 0);
  const savings = originalValue - totalValue;
  const couponDiscount = couponApplied ? totalValue * 0.05 : 0;
  const finalTotal = totalValue - couponDiscount;

  const handleMoveAllToCart = async () => {
    if (availableItems.length === 0) return;
    setIsMovingAll(true);
    await new Promise((r) => setTimeout(r, 800));
    availableItems.forEach((product) => addToCart({
      id: product.id,
      title: product.name,
      image: product.image,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice
    }));
    availableItems.forEach((p) => useWishlistStore.getState().removeItem(p.id));
    setIsMovingAll(false);
    toast(`${availableItems.length} items moved to cart! All available products added`, "success");
  };

  const handleClearWishlist = async () => {
    setIsClearing(true);
    await new Promise((r) => setTimeout(r, 400));
    clearWishlist();
    setIsClearing(false);
    toast("Wishlist cleared", "success");
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === "One Stop Car5" || couponCode.toUpperCase() === "SAVE5") {
      setCouponApplied(true);
      toast(`Coupon applied! 5% discount Code "${couponCode.toUpperCase()}" activated`, "success");
    } else {
      toast("Invalid coupon code Please check and try again", "error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="sticky top-24"
    >
      {/* Main summary card */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-5"
        style={{ backdropFilter: "blur(20px)" }}
      >
        {/* Top glow */}
        <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[#E9CC2F]/8 blur-2xl pointer-events-none" />

        <h3 className="mb-5 text-base font-bold text-white relative">
          Wishlist Summary
        </h3>

        {/* Stats rows */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Package className="h-4 w-4" />
              <span>Products Saved</span>
            </div>
            <span className="text-sm font-semibold text-white">{items.length}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Available Now</span>
            </div>
            <span className="text-sm font-semibold text-emerald-400">{availableItems.length}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <TrendingDown className="h-4 w-4 text-red-400" />
              <span>Potential Savings</span>
            </div>
            <span className="text-sm font-semibold text-red-400">
              -{formatPKR(savings)}
            </span>
          </div>

          <div className="h-px bg-white/6" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-white/50">Subtotal</span>
            <span className="text-sm text-white/70">{formatPKR(originalValue)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-white/50">Discounts</span>
            <span className="text-sm text-emerald-400">-{formatPKR(savings)}</span>
          </div>

          {couponApplied && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#E9CC2F]/70">Coupon (5%)</span>
              <span className="text-sm text-[#E9CC2F]">-{formatPKR(couponDiscount)}</span>
            </div>
          )}

          <div className="h-px bg-white/6" />

          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-white">Estimated Total</span>
            <span className="text-xl font-bold text-[#E9CC2F]">
              {formatPKR(finalTotal)}
            </span>
          </div>
        </div>

        {/* Coupon */}
        <div className="mb-5">
          <label className="text-xs text-white/40 mb-1.5 block">
            <Tag className="h-3 w-3 inline mr-1" />
            Coupon Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="e.g. One Stop Car5"
              disabled={couponApplied}
              className="flex-1 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-[#E9CC2F]/30 transition-colors disabled:opacity-40"
              onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
            />
            <button
              onClick={handleApplyCoupon}
              disabled={couponApplied || !couponCode.trim()}
              className="rounded-xl bg-[#E9CC2F]/15 border border-[#E9CC2F]/20 px-3 py-2 text-xs font-semibold text-[#E9CC2F] hover:bg-[#E9CC2F]/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {couponApplied ? "✓" : "Apply"}
            </button>
          </div>
          {couponApplied && (
            <p className="mt-1.5 text-[11px] text-emerald-400">✓ One Stop Car5 applied — 5% off!</p>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="space-y-2.5">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleMoveAllToCart}
            disabled={availableItems.length === 0 || isMovingAll}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#E9CC2F] py-3.5 text-sm font-bold text-[#1A1A1A] hover:bg-[#d4b828] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isMovingAll ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 rounded-full border-2 border-[#1A1A1A] border-t-transparent"
                />
                Moving to Cart...
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                Move All to Cart
                {availableItems.length > 0 && (
                  <span className="rounded-full bg-[#1A1A1A]/20 px-1.5 py-0.5 text-xs">
                    {availableItems.length}
                  </span>
                )}
              </>
            )}
          </motion.button>

          <Link
            href="/shop"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-semibold text-white/70 hover:text-white hover:border-white/20 transition-all"
          >
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            onClick={handleClearWishlist}
            disabled={items.length === 0 || isClearing}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-medium text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isClearing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="h-3.5 w-3.5 rounded-full border-2 border-red-400 border-t-transparent"
              />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
            Clear Wishlist
          </button>
        </div>
      </div>

      {/* Security badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-3 rounded-xl border border-white/6 bg-white/[0.02] p-4"
      >
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "🔒", label: "Secure Checkout" },
            { icon: "🚚", label: "Free Shipping" },
            { icon: "↩️", label: "Easy Returns" },
            { icon: "⭐", label: "Premium Quality" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-base">{item.icon}</span>
              <span className="text-[11px] text-white/30">{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
