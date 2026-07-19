"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Eye,
  Star,
  Truck,
  Shield,
  Share2,
  GitCompare,
  Zap,
  CheckCircle2,
  XCircle,
  BadgePercent,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { toast } from "@/lib/toast";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/lib/mock/products";
import { cn, formatPKR } from "@/lib/utils";

interface WishlistCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onShare: (product: Product) => void;
  onCompare: (product: Product) => void;
  index: number;
}

export function WishlistCard({
  product,
  onQuickView,
  onShare,
  onCompare,
  index,
}: WishlistCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const addToCart = useCartStore((s) => s.addItem);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const isInCart = useCartStore((s) => s.isInCart(product.id));

  const discount = product.discount ?? 0;

  const handleAddToCart = useCallback(async () => {
    if (product.stock>0) return;
    setIsAddingToCart(true);
    await new Promise((r) => setTimeout(r, 600));
    addToCart({
  id: product.id,
  title: product.name,
  image: product.image,
  category: product.category,
  price: product.price,
  originalPrice: product.originalPrice
});
    setIsAddingToCart(false);
    toast(`Added to cart! ${product.name}`, "success");
  }, [addToCart, product]);

  const handleBuyNow = useCallback(async () => {
    if (product.stock>0) return;
    setIsBuyingNow(true);
    await new Promise((r) => setTimeout(r, 500));
    addToCart({
  id: product.id,
  title: product.name,
  image: product.image,
  category: product.category,
  price: product.price,
  originalPrice: product.originalPrice
});
    setIsBuyingNow(false);
    toast(`Proceeding to checkout... ${product.name}`, "success");
  }, [addToCart, product]);

  const handleRemove = useCallback(async () => {
    setIsRemoving(true);
    await new Promise((r) => setTimeout(r, 300));
    removeItem(product.id);
    toast(`Removed from wishlist ${product.name}`, "success");
  }, [removeItem, product]);

  return (
    <AnimatePresence>
      {!isRemoving && (
        <motion.article
          layout
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92, y: -12, transition: { duration: 0.25 } }}
          transition={{
            duration: 0.5,
            delay: index * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{ y: -5 }}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] transition-shadow duration-300 hover:border-[#E9CC2F]/20 hover:shadow-[0_8px_40px_rgba(233,204,47,0.08)]"
          style={{ backdropFilter: "blur(20px)" }}
          aria-label={`${product.name} wishlist card`}
        >
          {/* Hover glow overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl bg-gradient-to-b from-[#E9CC2F]/[0.03] to-transparent" />

          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
              {product.badge=="New" && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1 rounded-md bg-[#E9CC2F] px-2 py-0.5 text-[10px] font-bold text-[#1A1A1A] uppercase tracking-wide"
                >
                  <Sparkles className="h-2.5 w-2.5" />
                  New
                </motion.span>
              )}
              {discount > 0 && (
                <span className="flex items-center gap-1 rounded-md bg-red-500/90 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
                  <BadgePercent className="h-2.5 w-2.5" />
                  -{discount}%
                </span>
              )}
                <span className="rounded-md bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                  Free Ship
                </span>
            </div>

            {/* Remove button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemove}
              aria-label="Remove from wishlist"
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white/60 backdrop-blur-sm hover:bg-red-500/80 hover:text-white transition-all duration-200"
            >
              <Heart className="h-4 w-4" fill="currentColor" />
            </motion.button>

            {/* Product image */}
            <motion.div
              className="relative h-full w-full"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {!imageLoaded && (
                <div className="absolute inset-0 shimmer bg-white/5" />
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={cn(
                  "object-cover transition-opacity duration-500",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>

            {/* Quick view overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <button
                onClick={() => onQuickView(product)}
                className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
              >
                <Eye className="h-4 w-4" />
                Quick View
              </button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-4">
            {/* Category + Rating */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-[#E9CC2F]/80 uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-[#E9CC2F] text-[#E9CC2F]" />
                <span className="text-xs font-semibold text-white/80">{product.rating}</span>
                <span className="text-xs text-white/30">({product.reviews})</span>
              </div>
            </div>

            {/* Name */}
            <h3 className="text-sm font-semibold text-white leading-tight mb-1 line-clamp-2 group-hover:text-[#E9CC2F]/90 transition-colors">
              {product.name}
            </h3>

            {/* Short desc */}
            <p className="text-xs text-white/40 mb-2 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Compatibility */}
            {/* <div className="mb-3 flex flex-wrap gap-1">
              {product.compatibility.slice(0, 2).map((compat) => (
                <span
                  key={compat}
                  className="rounded-md bg-white/5 border border-white/8 px-2 py-0.5 text-[10px] text-white/40"
                >
                  {compat}
                </span>
              ))}
              {product.compatibility.length > 2 && (
                <span className="rounded-md bg-white/5 border border-white/8 px-2 py-0.5 text-[10px] text-white/30">
                  +{product.compatibility.length - 2}
                </span>
              )}
            </div> */}

            {/* Price */}
            <div className="flex items-end gap-2 mb-3">
              <span className="text-lg font-bold text-[#E9CC2F]">
                {formatPKR(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-white/30 line-through">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock + Warranty */}
            <div className="flex items-center gap-3 mb-4">
              {product.stock>0 ? (
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">
                    {product.stock > 5 ? "In Stock" : `Only ${product.stock} left`}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <XCircle className="h-3.5 w-3.5 text-red-400" />
                  <span className="text-xs text-red-400 font-medium">Out of Stock</span>
                </div>
              )}
                <div className="flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5 text-white/30" />
                  <span className="text-xs text-white/30">Free</span>
                </div>
            </div>

            {/* Warranty badge */}
            {/* {product.warranty && (
              <div className="mb-4 flex items-center gap-1.5 rounded-lg bg-white/[0.04] border border-white/6 px-2.5 py-1.5">
                <Shield className="h-3.5 w-3.5 text-[#E9CC2F]/60 shrink-0" />
                <span className="text-[11px] text-white/40 truncate">{product.warranty}</span>
              </div>
            )} */}

            {/* Primary actions */}
            <div className="space-y-2 mt-auto">
              <div className="grid grid-cols-2 gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock>0 || isAddingToCart}
                  aria-label="Add to cart"
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold transition-all",
                    product.stock>0
                      ? isInCart
                        ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                        : "bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#d4b828] active:bg-[#b89620]"
                      : "bg-white/5 text-white/20 cursor-not-allowed"
                  )}
                >
                  {isAddingToCart ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent"
                    />
                  ) : isInCart ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      In Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Add to Cart
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  disabled={product.stock>0 || isBuyingNow}
                  aria-label="Buy now"
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold border transition-all",
                    product.stock>0
                      ? "border-[#E9CC2F]/30 bg-[#E9CC2F]/8 text-[#E9CC2F] hover:bg-[#E9CC2F]/15"
                      : "border-white/8 bg-white/3 text-white/20 cursor-not-allowed"
                  )}
                >
                  {isBuyingNow ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="h-3.5 w-3.5 rounded-full border-2 border-[#E9CC2F] border-t-transparent"
                    />
                  ) : (
                    <>
                      <Zap className="h-3.5 w-3.5" />
                      Buy Now
                    </>
                  )}
                </motion.button>
              </div>

              {/* Secondary actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onQuickView(product)}
                  aria-label="Quick view"
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] text-white/40 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">View</span>
                </button>
                <button
                  onClick={() => onCompare(product)}
                  aria-label="Compare"
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] text-white/40 hover:text-white hover:bg-white/5 transition-all"
                >
                  <GitCompare className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Compare</span>
                </button>
                <button
                  onClick={() => onShare(product)}
                  aria-label="Share"
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] text-white/40 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <Link
                  href={`/product/${product.id}`}
                  aria-label="View product details"
                  className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-[11px] text-white/40 hover:text-white hover:bg-white/5 transition-all"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Details</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
}
