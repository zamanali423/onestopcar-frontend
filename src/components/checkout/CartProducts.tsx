"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Minus, Plus, Trash2, Tag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPKR } from "@/lib/utils";

export default function CartProducts() {
  const cartItems = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeItem);

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {cartItems.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            whileHover={{
              y: -2,
              boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
            }}
            className="group relative flex items-start gap-3 rounded-xl border border-white/8 bg-white/3 p-3 transition-all duration-200 hover:border-white/15 hover:bg-white/5"
          >
            {/* Product Image */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <Image
                src={item.image ?? ""}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="64px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              {/* Fallback */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Tag className="h-6 w-6 text-white/20" />
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium text-[#E9CC2F]/70 uppercase tracking-wider mb-0.5 truncate">
                {item.category}
              </p>
              <p className="text-xs font-semibold text-white leading-tight mb-0.5 line-clamp-2">
                {item.title}
              </p>
              {item.sku && (
                <p className="text-[10px] text-white/25">SKU: {item.sku}</p>
              )}

              {/* Price row */}
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-sm font-bold text-white">
                  {formatPKR(item.price)}
                </span>
                {item.price && item.price > item.price && (
                  <span className="text-[10px] text-white/30 line-through">
                    {formatPKR(item.price)}
                  </span>
                )}
              </div>

              {/* Quantity & Remove */}
              <div className="flex items-center gap-2 mt-2">
                {/* Quantity controls */}
                <div className="flex items-center rounded-lg border border-white/10 bg-white/5 overflow-hidden">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(item.id, item.quantity - 1);
                      } else {
                        removeFromCart(item.id);
                      }
                    }}
                    className="flex h-7 w-7 items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label={`Decrease quantity of ${item.title}`}
                  >
                    <Minus className="h-3 w-3" />
                  </motion.button>
                  <span className="w-7 text-center text-xs font-semibold text-white select-none">
                    {item.quantity}
                  </span>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="flex h-7 w-7 items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label={`Increase quantity of ${item.title}`}
                  >
                    <Plus className="h-3 w-3" />
                  </motion.button>
                </div>

                {/* Remove */}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.85 }}
                  onClick={() => removeFromCart(item.id)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/5 text-red-400/60 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-200"
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <Trash2 className="h-3 w-3" />
                </motion.button>

                {/* Item subtotal */}
                <span className="ml-auto text-xs font-bold text-[#E9CC2F]">
                  {formatPKR(item.price * item.quantity)}
                </span>
              </div>
            </div>

            {/* Savings badge */}
            {item.price && item.price > item.price && (
              <div className="absolute -top-1.5 -right-1.5">
                <div className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  SAVE {Math.round(((item.price - item.price) / item.price) * 100)}%
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
