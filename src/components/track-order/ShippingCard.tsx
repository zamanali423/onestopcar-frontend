"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Truck,
  Calendar,
  Hash,
  ClipboardList,
  CheckCircle,
  Phone
} from "lucide-react";
import type { MockOrder } from "@/lib/mock/orders";

interface ShippingCardProps {
  order: MockOrder;
}

export default function ShippingCard({ order }: ShippingCardProps) {
  return (
    <motion.div
      className="bg-[#1A1A1A]/80 backdrop-blur-sm rounded-2xl border border-white/8 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/8 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-[#E9CC2F]/10 flex items-center justify-center">
          <Truck size={18} className="text-[#E9CC2F]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">
            Shipping Information
          </h3>
          <p className="text-xs text-white/40">Delivery & courier details</p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Courier info */}
        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#E9CC2F]/20 to-[#B69E24]/10 border border-[#E9CC2F]/30 flex items-center justify-center text-2xl flex-shrink-0">
            {order.courier.logo}
          </div>
          <div className="flex-1">
            <p className="text-xs text-white/30 font-semibold uppercase tracking-wider">
              Courier Partner
            </p>
            <p className="text-sm font-bold text-white mt-0.5">
              {order.courier.name}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/30 font-semibold uppercase tracking-wider">
              Tracking ID
            </p>
            <p className="text-sm font-mono font-bold text-[#E9CC2F] mt-0.5 tracking-wide">
              {order.courier.trackingId}
            </p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Expected Delivery */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <Calendar size={15} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                Expected Delivery
              </p>
              <p className="text-sm font-bold text-emerald-300 mt-0.5">
                {order.dates.expectedDelivery}
              </p>
              {order.dates.delivered && (
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <CheckCircle size={10} />
                  Delivered on {order.dates.delivered}
                </p>
              )}
            </div>
          </div>

          {/* Tracking */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Hash size={15} className="text-white/40" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/30">
                Tracking Number
              </p>
              <p className="text-sm font-mono font-bold text-[#E9CC2F] mt-0.5 tracking-wide">
                {order.courier.trackingId}
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E9CC2F]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin size={15} className="text-[#E9CC2F]" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/30 mb-1.5">
                Delivery Address
              </p>
              <p className="text-sm font-bold text-white">
                {order.customer.name}
              </p>
              <p className="text-sm text-white/60 mt-0.5">
                {order.address.street}
              </p>
              <p className="text-sm text-white/60">
                {order.address.city}, {order.address.province}{" "}
                {order.address.postalCode}
              </p>
              <p className="text-sm text-white/60">{order.address.country}</p>
              <p className="text-xs text-white/40 mt-0.5">
                <Phone className="inline-block w-3 h-3" /> {order.customer.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Delivery instructions */}
        {order.address.instructions && (
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <ClipboardList size={15} className="text-amber-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Delivery Instructions
              </p>
              <p className="text-sm text-amber-300 font-medium mt-0.5">
                {order.address.instructions}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}