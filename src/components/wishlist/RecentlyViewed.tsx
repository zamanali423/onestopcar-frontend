"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { toast } from "@/lib/toast";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/lib/mock/products";
import { formatPKR } from "@/lib/utils";

interface recentlyViewedProps {
  products: Product[];
}

function RecentlyViewedCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addItem);
  const addToWishlist = useWishlistStore((s) => s.addItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group w-52 shrink-0 overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] hover:border-[#E9CC2F]/20 transition-colors"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
        {!imageLoaded && <div className="absolute inset-0 shimmer" />}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          className="relative h-full w-full"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            sizes="208px"
          />
        </motion.div>
        {/* Wishlist button */}
        <button
          onClick={() => {
            if (!isInWishlist) {
              addToWishlist(product);
              toast("Added to wishlist!", "success");
            }
          }}
          aria-label="Add to wishlist"
          className={`absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-sm transition-all ${isInWishlist
              ? "bg-red-500/20 text-red-400"
              : "bg-black/30 text-white/40 hover:text-red-400 hover:bg-red-500/20"
            }`}
        >
          <Heart className={`h-3.5 w-3.5 ${isInWishlist ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-[10px] font-semibold text-[#E9CC2F]/70 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h4 className="text-xs font-semibold text-white line-clamp-2 leading-tight mb-1.5">
          {product.name}
        </h4>
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-3 w-3 fill-[#E9CC2F] text-[#E9CC2F]" />
          <span className="text-[11px] text-white/60">{product.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#E9CC2F]">{formatPKR(product.price)}</span>
          <button
            onClick={() => {
              addToCart({
                id: product.id,
                title: product.name,
                image: product.image,
                category: product.category,
                price: product.price,
                originalPrice: product.originalPrice
              });
              toast("Added to cart!", "success");
            }}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E9CC2F]/15 text-[#E9CC2F] hover:bg-[#E9CC2F]/25 transition-all"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function RecentlyViewed({ products }: recentlyViewedProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -280 : 280,
        behavior: "smooth",
      });
    }
  }, []);

  if (products.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="mt-16"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs text-[#E9CC2F]/70 uppercase tracking-wider font-semibold mb-1">
            Recently Viewed
          </p>
          <h2 className="text-xl font-bold text-white">Continue Browsing</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-white/40 hover:text-white hover:border-white/15 transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-white/40 hover:text-white hover:border-white/15 transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 no-scrollbar"
      >
        {products.map((product) => (
          <RecentlyViewedCard key={product.id} product={product} />
        ))}
      </div>
    </motion.section>
  );
}
