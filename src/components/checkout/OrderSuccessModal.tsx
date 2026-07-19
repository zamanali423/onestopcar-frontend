"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Package,
  Phone,
  Printer,
  ArrowRight,
  X,
  MapPin,
  Clock,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { OrderDetails } from "@/types/checkout";
import { formatPKR } from "@/lib/utils";
import { toast } from "@/lib/toast";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDetails | null;
}

export default function OrderSuccessModal({
  isOpen,
  onClose,
  order,
}: OrderSuccessModalProps) {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#1A1A1A] shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/50 hover:text-white hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Success animation top */}
            <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-[#E9CC2F]/20 to-[#B69E24]/10 px-6 py-10 text-center">
              {/* Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(233,204,47,0.15),transparent_70%)] pointer-events-none" />

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center"
              >
                <div className="absolute inset-0 rounded-full bg-[#E9CC2F]/20 animate-ping" />
                <div className="absolute inset-2 rounded-full bg-[#E9CC2F]/20" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#E9CC2F] shadow-[0_0_40px_rgba(233,204,47,0.5)]">
                  <CheckCircle2 className="h-8 w-8 text-[#1A1A1A]" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2
                  id="success-title"
                  className="text-2xl font-bold text-white mb-1"
                >
                  Order Placed! 🎉
                </h2>
                <p className="text-sm text-white/60">
                  Thank you for your order, {order.customerName.split(" ")[0]}!
                </p>
              </motion.div>

              {/* Order Number */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#E9CC2F]/30 bg-[#E9CC2F]/10 px-4 py-2"
              >
                <Tag className="h-4 w-4 text-[#E9CC2F]" />
                <div className="text-left">
                  <p className="text-[10px] text-[#E9CC2F]/60 uppercase tracking-wider">Order Number</p>
                  <p className="text-sm font-bold text-[#E9CC2F] tracking-wider">
                    {order.orderNumber}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Delivery Info */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-3"
              >
                <div className="rounded-xl border border-white/8 bg-white/3 p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#E9CC2F]" />
                    <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                      Estimated Delivery
                    </p>
                  </div>
                  <p className="text-sm font-bold text-white">{order.estimatedDelivery}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">2–5 business days</p>
                </div>

                <div className="rounded-xl border border-white/8 bg-white/3 p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#E9CC2F]" />
                    <p className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                      Delivering To
                    </p>
                  </div>
                  <p className="text-sm font-bold text-white">
                    {order.city}, {order.province}
                  </p>
                  <p className="text-[10px] text-white/30 mt-0.5 truncate">{order.phone}</p>
                </div>
              </motion.div>

              {/* Order Items Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="rounded-xl border border-white/8 bg-white/3 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-xs font-semibold text-white/60">Order Items</p>
                </div>
                <div className="p-4 space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs">
                      <span className="text-white/70 flex-1 truncate pr-2">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold text-white shrink-0">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-white/5 px-4 py-3 space-y-1.5">
                  <div className="flex justify-between text-xs text-white/50">
                    <span>Subtotal</span>
                    <span>{formatPKR(order.subtotal)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-xs text-emerald-400">
                      <span>Coupon Discount</span>
                      <span>-{formatPKR(order.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-white/50">
                    <span>Shipping</span>
                    <span className="text-[#E9CC2F] font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-white/5">
                    <span>Total</span>
                    <span className="text-[#E9CC2F]">{formatPKR(order.total)}</span>
                  </div>
                </div>
              </motion.div>

              {/* Confirmation note */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 p-3"
              >
                <Phone className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-xs text-white/60 leading-relaxed">
                  Our team will call you on{" "}
                  <span className="font-semibold text-white">{order.phone}</span> to
                  confirm your order within 1–2 hours.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="grid grid-cols-2 gap-3 pt-1"
              >
                <Link href="/">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
                  >
                    Continue Shopping
                  </motion.div>
                </Link>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // alert(`Tracking order ${order.orderNumber}. Call +92 300 053 2034 for live tracking.`);
                    toast(`Tracking order ${order.orderNumber}. Call +92 300 053 2034 for live tracking.`);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#E9CC2F] px-4 py-3 text-sm font-bold text-[#1A1A1A] hover:bg-[#B69E24] transition-all shadow-[0_4px_15px_rgba(233,204,47,0.3)]"
                >
                  <Package className="h-4 w-4" />
                  Track Order
                  <ArrowRight className="h-3.5 w-3.5" />
                </motion.button>
              </motion.div>

              {/* Print */}
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handlePrint}
                className="w-full flex items-center justify-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors py-1"
              >
                <Printer className="h-3.5 w-3.5" />
                Print Order Confirmation
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
