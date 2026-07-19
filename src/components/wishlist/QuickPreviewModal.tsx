"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  Shield,
  Truck,
  CheckCircle2,
  XCircle,
  ShoppingCart,
  Zap,
  Heart,
  ChevronLeft,
  ChevronRight,
  BadgePercent,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { toast } from "@/lib/toast";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/lib/mock/products";
import { cn, formatPKR } from "@/lib/utils";

interface QuickPreviewModalProps {
  product: Product | null;
  onClose: () => void;
}

export function QuickPreviewModal({ product, onClose }: QuickPreviewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const addToCart = useCartStore((s) => s.addItem);
  const isInCart = useCartStore((s) => (product ? s.isInCart(product.id) : false));
  const wishlistItems = useWishlistStore(s => s.items);
  const isInWishlist = !!product &&
    wishlistItems.some(i => i.id === product.id);
  const addToWishlist = useWishlistStore((s) => s.addItem);
  const removeWishlist = useWishlistStore((s) => s.removeItem);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  const handleAddToCart = useCallback(async () => {
    if (!product || product.stock <= 0) return;
    setIsAddingToCart(true);
    await new Promise((r) => setTimeout(r, 600));
    addToCart({
      id: product.id,
      title: product.name,
      image: product.image,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice
    }, quantity);
    setIsAddingToCart(false);
    toast(
      `Added ${product.name} × ${quantity} to cart`,
      "success"
    );
  }, [product, addToCart, quantity]);

  const handleBuyNow = useCallback(async () => {
    if (!product || product.stock <= 0) return;
    setIsBuying(true);
    await new Promise((r) => setTimeout(r, 500));
    addToCart({
      id: product.id,
      title: product.name,
      image: product.image,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice
    }, quantity);
    setIsBuying(false);
    toast("Proceeding to checkout...", "info");
    onClose();
  }, [product, addToCart, quantity, onClose]);

  const handleToggleWishlist = () => {
    if (!product) return;

    if (isInWishlist) {
      removeWishlist(product.id);
      toast("Removed from wishlist", "success");
    } else {
      addToWishlist(product);
      toast("Added to wishlist", "success");
    }
  };

  useEffect(() => {
    setQuantity(1);
    setSelectedImageIdx(0);
  }, [product]);

  if (!product) return null;
  const discount = product.discount ?? 0;
  const images =
    product.thumbnails.length > 0
      ? product.thumbnails
      : [product.image];

  return (
    <AnimatePresence>
      {product && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick preview: ${product.name}`}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/8 bg-[#161616] shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close preview"
              className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image section */}
              <div className="relative bg-[#1a1a1a]">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  {product.badge === "New" && (
                    <span className="flex items-center gap-1 rounded-md bg-[#E9CC2F] px-2 py-0.5 text-[10px] font-bold text-[#1A1A1A] uppercase">
                      <Sparkles className="h-2.5 w-2.5" />
                      New
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="flex items-center gap-1 rounded-md bg-red-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
                      <BadgePercent className="h-2.5 w-2.5" />
                      -{discount}%
                    </span>
                  )}
                </div>

                {/* Main image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={images[selectedImageIdx] ?? product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImageIdx(i)}
                        className={cn(
                          "relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                          selectedImageIdx === i
                            ? "border-[#E9CC2F]"
                            : "border-white/10 hover:border-white/30"
                        )}
                      >
                        <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="56px" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Image nav arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIdx((i) => (i - 1 + images.length) % images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white backdrop-blur-sm transition-all"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIdx((i) => (i + 1) % images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/70 hover:text-white backdrop-blur-sm transition-all"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Details section */}
              <div className="flex flex-col p-6 overflow-y-auto max-h-[90vh] md:max-h-[600px]">
                {/* Category */}
                <span className="text-xs font-semibold text-[#E9CC2F]/80 uppercase tracking-wider mb-1">
                  {product.category} · {product.model}
                </span>

                {/* Name */}
                <h2 className="text-xl font-bold text-white mb-2 leading-tight">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          "h-3.5 w-3.5",
                          s <= Math.round(product.rating)
                            ? "fill-[#E9CC2F] text-[#E9CC2F]"
                            : "text-white/15"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-white/70">{product.rating}</span>
                  <span className="text-xs text-white/30">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-end gap-3 mb-4">
                  <span className="text-3xl font-bold text-[#E9CC2F]">
                    {formatPKR(product.price)}
                  </span>
                  {discount > 0 && (
                    <>
                      <span className="text-base text-white/30 line-through mb-1">
                        {product.originalPrice && (
                          <span>
                            {formatPKR(product.originalPrice)}
                          </span>
                        )}
                      </span>
                      <span className="mb-1 rounded-md bg-red-500/20 px-2 py-0.5 text-xs font-bold text-red-400">
                        {product.originalPrice && (
                          <span>
                            Save {formatPKR(product.originalPrice - product.price)}
                          </span>
                        )}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-4">
                  {product.description}
                </p>

                {/* Compatibility */}
                {/* <div className="mb-4">
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">
                    Compatible With
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.compatibility.map((c) => (
                      <span
                        key={c}
                        className="rounded-md bg-white/5 border border-white/8 px-2 py-1 text-xs text-white/50"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div> */}

                {/* Specs */}
                {/* {Object.keys(product.specifications).length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">
                      Specifications
                    </p>
                    <div className="space-y-1.5 rounded-xl border border-white/6 bg-white/[0.02] p-3">
                      {Object.entries(product.specifications).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between">
                          <span className="text-xs text-white/30">{k}</span>
                          <span className="text-xs font-medium text-white/70">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )} */}

                {/* Stock */}
                <div className="flex items-center gap-2 mb-5">
                  {product.stock > 0 ? (
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className="text-sm text-emerald-400 font-medium">
                        {product.stock > 5 ? "In Stock" : `Only ${product.stock} remaining`}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <XCircle className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-red-400 font-medium">Out of Stock</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 ml-auto">
                    <Truck className="h-4 w-4 text-white/30" />
                    <span className="text-xs text-white/40">Free Shipping</span>
                  </div>

                </div>

                {/* Quantity selector */}
                {product.stock > 0 && (
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-xs text-white/40">Qty:</span>
                    <div className="flex items-center rounded-xl border border-white/10 overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="flex h-9 w-9 items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all text-lg"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                        className="flex h-9 w-9 items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all text-lg"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-white/25">Max: {product.stock}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="space-y-2.5 mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0 || isAddingToCart}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold transition-all",
                      product.stock > 0
                        ? isInCart
                          ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                          : "bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#d4b828]"
                        : "bg-white/5 text-white/20 cursor-not-allowed"
                    )}
                  >
                    {isAddingToCart ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                      />
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        {isInCart ? "In Cart — Add More" : "Add to Cart"}
                      </>
                    )}
                  </motion.button>

                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleBuyNow}
                      disabled={product.stock <= 0 || isBuying}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold border transition-all",
                        product.stock > 0
                          ? "border-[#E9CC2F]/30 bg-[#E9CC2F]/8 text-[#E9CC2F] hover:bg-[#E9CC2F]/15"
                          : "border-white/8 bg-white/3 text-white/20 cursor-not-allowed"
                      )}
                    >
                      {isBuying ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          className="h-4 w-4 rounded-full border-2 border-[#E9CC2F] border-t-transparent"
                        />
                      ) : (
                        <>
                          <Zap className="h-4 w-4" />
                          Buy Now
                        </>
                      )}
                    </motion.button>

                    <button
                      onClick={handleToggleWishlist}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold border transition-all",
                        isInWishlist
                          ? "border-red-500/30 bg-red-500/8 text-red-400"
                          : "border-white/10 bg-white/[0.04] text-white/60 hover:text-white"
                      )}
                    >
                      <Heart className={cn("h-4 w-4", isInWishlist && "fill-current")} />
                      {isInWishlist ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>

                {/* Warranty */}
                {/* {product.warranty && (
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/6 bg-white/[0.02] px-3 py-2.5">
                    <Shield className="h-4 w-4 text-[#E9CC2F]/60 shrink-0" />
                    <span className="text-xs text-white/40">{product.warranty}</span>
                  </div>
                )} */}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
