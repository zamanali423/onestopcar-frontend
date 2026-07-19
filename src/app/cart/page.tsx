'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from "@/store/cartStore";
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.getTotal());
  const discount = total * 0.13
  const grandTotal = total - discount

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-primary text-primary-foreground py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold">Shopping Cart</h1>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {items.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-2xl font-bold mb-4">Your cart is empty</p>
              <p className="text-muted-foreground mb-8">
                Start shopping to add items to your cart
              </p>
              <Link href="/shop">
                <Button className="bg-primary hover:bg-secondary text-primary-foreground">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                  {items.map((item: any, idx: number) => (
                    <motion.div
                      key={item.id}
                      className="flex gap-4 pb-4 border-b last:border-b-0"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-primary font-bold">Rs {item.price.toLocaleString()}</p>
                      </div>

                      {/* Quantity Control */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item.id, item.quantity - 1);
                            } else {
                              removeItem(item.id);
                            }
                          }}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="w-20 text-right">
                        <p className="font-bold">
                          Rs {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="text-red-500 hover:bg-red-50"
                  >
                    Clear Cart
                  </Button>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                  <div className="space-y-3 mb-4 pb-4 border-b">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>Rs {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Discount (13%):</span>
                      <span>Rs {discount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping:</span>
                      <span className="text-green-600">Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-bold text-lg mb-6">
                    <span>Total:</span>
                    <span>Rs {grandTotal.toLocaleString()}</span>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full bg-primary hover:bg-secondary text-primary-foreground mb-3">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/shop" className="block">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Free shipping on all orders
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
