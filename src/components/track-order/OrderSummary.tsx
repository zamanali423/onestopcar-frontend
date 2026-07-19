"use client";

import { motion } from "framer-motion";
import {
  Receipt,
  CreditCard,
  Tag,
  Truck,
  ShoppingBag,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MockOrder } from "@/lib/mock/orders";
import { STATUS_META } from "@/lib/mock/orders";

interface OrderSummaryProps {
  order: MockOrder;
}

function formatPKR(price: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function OrderSummary({ order }: OrderSummaryProps) {
  const statusMeta = STATUS_META[order.status];
  const totalItems = order.products.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <motion.div
      className="bg-[#1A1A1A]/80 backdrop-blur-sm rounded-2xl border border-white/8 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E9CC2F]/10 flex items-center justify-center">
              <Receipt size={18} className="text-[#E9CC2F]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Order Summary
              </h3>
              <p className="text-xs text-white/40">Invoice breakdown</p>
            </div>
          </div>
          <div
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-bold border",
              statusMeta.color,
              statusMeta.bg,
              statusMeta.border
            )}
          >
            {statusMeta.label}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Order meta */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            {
              icon: Hash,
              label: "Order ID",
              value: order.orderNumber,
              mono: true,
            },
            { icon: ShoppingBag, label: "Order Date", value: order.dates.placed },
            {
              icon: Tag,
              label: "Total Items",
              value: `${totalItems} item${totalItems > 1 ? "s" : ""}`,
            },
            {
              icon: CreditCard,
              label: "Payment",
              value: order.payment.method,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white/5 rounded-xl p-3.5 space-y-1 border border-white/5"
            >
              <div className="flex items-center gap-1.5 text-white/30">
                <item.icon size={12} />
                <span className="text-[10px] font-semibold uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
              <p
                className={cn(
                  "text-sm font-bold text-white leading-snug",
                  item.mono && "font-mono text-xs tracking-wide text-[#E9CC2F]"
                )}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50 flex items-center gap-2">
              <ShoppingBag size={14} className="text-white/30" />
              Subtotal ({totalItems} item{totalItems > 1 ? "s" : ""})
            </span>
            <span className="font-semibold text-white">
              {formatPKR(order.pricing.subtotal)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/50 flex items-center gap-2">
              <Truck size={14} className="text-white/30" />
              Shipping Fee
            </span>
            <span
              className={cn(
                "font-semibold",
                order.pricing.shipping === 0
                  ? "text-emerald-400"
                  : "text-white"
              )}
            >
              {order.pricing.shipping === 0
                ? "Free"
                : formatPKR(order.pricing.shipping)}
            </span>
          </div>

          {order.pricing.discount > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-emerald-400 flex items-center gap-2">
                <Tag size={14} />
                Discount Applied
              </span>
              <span className="font-semibold text-emerald-400">
                -{formatPKR(order.pricing.discount)}
              </span>
            </div>
          )}

          <div className="pt-3 border-t border-white/8">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-white">
                Grand Total
              </span>
              <div className="text-right">
                <span className="text-xl font-black text-[#E9CC2F]">
                  {formatPKR(order.pricing.grandTotal)}
                </span>
                <p className="text-xs text-white/30 mt-0.5">
                  {order.payment.method}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment status badge */}
        <div
          className={cn(
            "mt-5 p-3 rounded-xl flex items-center gap-2.5 border",
            order.payment.status === "Paid"
              ? "bg-emerald-500/10 border-emerald-500/20"
              : "bg-amber-500/10 border-amber-500/20"
          )}
        >
          <CreditCard
            size={16}
            className={
              order.payment.status === "Paid"
                ? "text-emerald-400"
                : "text-amber-400"
            }
          />
          <div>
            <p
              className={cn(
                "text-xs font-bold",
                order.payment.status === "Paid"
                  ? "text-emerald-400"
                  : "text-amber-400"
              )}
            >
              Payment {order.payment.status}
            </p>
            <p
              className={cn(
                "text-[10px]",
                order.payment.status === "Paid"
                  ? "text-emerald-400/60"
                  : "text-amber-400/60"
              )}
            >
              {order.payment.status === "Paid"
                ? "Payment collected successfully"
                : "Payable on delivery"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}