"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, ShoppingCart, ExternalLink, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderProduct } from "@/lib/mock/orders";
import { toast } from "@/lib/toast";

interface OrderProductsProps {
  products: OrderProduct[];
}

function formatPKR(price: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(price);
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={11}
          className={cn(
            star <= Math.round(rating)
              ? "fill-[#E9CC2F] text-[#E9CC2F]"
              : "fill-white/10 text-white/10"
          )}
        />
      ))}
      <span className="text-xs text-white/40 ml-1 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function OrderProducts({ products }: OrderProductsProps) {
  return (
    <motion.div
      className="bg-[#1A1A1A]/80 backdrop-blur-sm rounded-2xl border border-white/8 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/8 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-[#E9CC2F]/10 flex items-center justify-center">
          <Package size={18} className="text-[#E9CC2F]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">
            Ordered Products
          </h3>
          <p className="text-xs text-white/40">
            {products.length} item{products.length > 1 ? "s" : ""} in this
            order
          </p>
        </div>
      </div>

      {/* Products list */}
      <div className="divide-y divide-white/5">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            className="group p-5 sm:p-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index + 0.4 }}
          >
            <div className="flex gap-4 sm:gap-5">
              {/* Product Image */}
              <motion.div
                className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 112px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div className="min-w-0">
                    {/* Category */}
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#E9CC2F] mb-1.5">
                      {product.category}
                    </span>
                    {/* Name */}
                    <h4 className="text-sm sm:text-base font-bold text-white leading-snug truncate">
                      {product.name}
                    </h4>
                    {/* Rating */}
                    <div className="mt-1.5">
                      <StarRating rating={product.rating} />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-left sm:text-right flex-shrink-0">
                    <p className="text-lg font-black text-[#E9CC2F]">
                      {formatPKR(product.price * product.quantity)}
                    </p>
                    {product.quantity > 1 && (
                      <p className="text-xs text-white/40">
                        {formatPKR(product.price)} × {product.quantity}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quantity badge */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-xs font-semibold text-white/60">
                    Qty: {product.quantity}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/20 text-xs font-semibold text-emerald-400">
                    In Order
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <motion.button
                    type="button"
                    onClick={() =>
                      toast(
                        `Viewing product: ${product.name}`,
                        "info"
                      )
                    }
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all duration-200 border border-white/10 hover:border-white/20"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ExternalLink size={12} />
                    View Product
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() =>
                      toast(
                        `${product.name} added to cart!`,
                        "success"
                      )
                    }
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#E9CC2F]/10 hover:bg-[#E9CC2F]/20 border border-[#E9CC2F]/30 hover:border-[#E9CC2F]/60 text-[#E9CC2F] text-xs font-semibold transition-all duration-200"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <ShoppingCart size={12} />
                    Buy Again
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}