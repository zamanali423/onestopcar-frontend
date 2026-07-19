"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "@/lib/toast";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import type { Product } from "@/lib/mock/products";
import { formatPKR } from "@/lib/utils";
import Link from "next/link";

interface RecommendedProductsProps {
  products: Product[];
}

function RecommendedCard({ product, index }: { product: Product; index: number }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const addToCart = useCartStore((s) => s.addItem);
  const isInCart = useCartStore((s) => s.isInCart(product.id));
  const addToWishlist = useWishlistStore((s) => s.addItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const removeWishlist = useWishlistStore((s) => s.removeItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] hover:border-[#E9CC2F]/20 hover:shadow-[0_8px_32px_rgba(233,204,47,0.07)] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#1a1a1a]">
        {!imageLoaded && <div className="absolute inset-0 shimmer" />}
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.4 }}
          className="relative h-full w-full"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </motion.div>

        {/* Overlay actions */}
        <div className="absolute inset-0 flex items-end justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => {
              if (isInWishlist) {
                removeWishlist(product.id);
                toast("Removed from wishlist", "success");
              } else {
                addToWishlist({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  category: product.category,
                  slug: product.slug,
                });
                toast("Added to wishlist", "success");
              }
            }}
            aria-label="Add to wishlist"
            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-all ${isInWishlist
              ? "bg-red-500/30 text-red-400"
              : "bg-black/40 text-white/60 hover:bg-red-500/30 hover:text-red-400"
              }`}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* New badge */}
        {product.badge == "New" && (
          <div className="absolute top-2 left-2">
            <span className="flex items-center gap-1 rounded-md bg-[#E9CC2F] px-2 py-0.5 text-[10px] font-bold text-[#1A1A1A] uppercase">
              <Sparkles className="h-2.5 w-2.5" />
              New
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="text-[11px] font-semibold text-[#E9CC2F]/70 uppercase tracking-wider">
          {product.category}
        </span>
        <h4 className="mt-1 text-sm font-semibold text-white line-clamp-2 leading-tight group-hover:text-[#E9CC2F]/90 transition-colors">
          {product.name}
        </h4>

        <div className="mt-2 flex items-center gap-1">
          <Star className="h-3 w-3 fill-[#E9CC2F] text-[#E9CC2F]" />
          <span className="text-xs font-medium text-white/60">{product.rating}</span>
          <span className="text-xs text-white/30">({product.reviews})</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-[#E9CC2F]">
              {formatPKR(product.price)}
            </span>
            {product.originalPrice &&
              product.originalPrice > product.price && (
                <span className="ml-1.5 text-xs text-white/30 line-through">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
          </div>
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
              toast(`Added to cart! ${product.name}`, "success");
            }}
            aria-label="Add to cart"
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${isInCart
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#d4b828]"
              }`}
          >
            {isInCart ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function RecommendedProducts({ products }: RecommendedProductsProps) {
  if (products.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="mt-16"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-[#E9CC2F]/70 uppercase tracking-wider font-semibold mb-1">
            Recommended
          </p>
          <h2 className="text-xl font-bold text-white">You May Also Like</h2>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-1.5 text-sm text-[#E9CC2F]/70 hover:text-[#E9CC2F] transition-colors"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product, i) => (
          <RecommendedCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
