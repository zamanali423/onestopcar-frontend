"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotalItems = useCartStore((s) => s.getTotalItems);
  const getTotal = useCartStore((s) => s.getTotal);
  const router = useRouter();
  const total = getTotal();

  const continueShopping = () => {
    closeCart()
    router.push("/shop")
  }

  const goToCart = () => {
    closeCart();
    router.push("/cart");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#1A1A1A]">
              <div className="flex items-center gap-3">
                <ShoppingCart size={20} className="text-[#E9CC2F]" />
                <h2 className="font-black text-white text-lg">Shopping Cart</h2>
                {items.length > 0 && (
                  <span className="bg-[#E9CC2F] text-[#1A1A1A] text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-[#E9CC2F]/10 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart size={36} className="text-[#E9CC2F]" />
                  </div>
                  <h3 className="font-black text-[#1A1A1A] text-lg mb-2">Cart is Empty</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Add some car accessories to get started!
                  </p>
                  <button
                    onClick={continueShopping}
                    className="btn-primary text-sm py-2.5 px-6"
                  >
                    Start Shopping <ArrowRight size={15} />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-4 bg-[#F8FAFC] rounded-xl p-3 border border-gray-100"
                    >
                      <div className="w-14 h-14 bg-[#E9CC2F]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <ShoppingCart size={20} className="text-[#B69E24]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#1A1A1A] text-sm leading-tight mb-1 truncate">
                          {item.title}
                        </h4>
                        <div className="text-[#E9CC2F] font-black text-sm">
                          PKR {item.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-[#E9CC2F] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                        <span className="font-black text-sm w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.id, item.quantity - 1);
                            } else {
                              removeItem(item.id);
                            }
                          }}
                          className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-6 h-6 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center hover:bg-red-100 text-red-400 transition-colors ml-1"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>PKR {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold">
                      {total >= 2000 ? "FREE" : "PKR 200"}
                    </span>
                  </div>
                  <div className="flex justify-between font-black text-[#1A1A1A] text-lg border-t border-gray-100 pt-2">
                    <span>Total</span>
                    <span className="text-[#E9CC2F]">
                      PKR {(total + (total >= 2000 ? 0 : 200)).toLocaleString()}
                    </span>
                  </div>
                </div>
                {total < 2000 && (
                  <div className="bg-[#E9CC2F]/10 rounded-xl p-3 text-xs text-[#B69E24] font-semibold text-center">
                    Add PKR {(2000 - total).toLocaleString()} more for FREE shipping! 🎉
                  </div>
                )}
                <button
                  onClick={goToCart}
                  className="w-full flex items-center justify-center gap-2 border-2 border-[#E9CC2F] text-[#1A1A1A] hover:bg-[#E9CC2F] hover:text-[#1A1A1A] font-bold py-3.5 rounded-xl transition-all duration-300"
                >
                  <ShoppingCart size={18} />
                  View Shopping Cart
                </button>
                <button className="w-full btn-primary justify-center text-base py-3.5" onClick={() => router.push("/checkout")}>
                  Proceed to Checkout <ArrowRight size={16} />
                </button>
                <button
                  onClick={continueShopping}
                  className="w-full text-center text-sm text-gray-400 hover:text-[#1A1A1A] transition-colors font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
