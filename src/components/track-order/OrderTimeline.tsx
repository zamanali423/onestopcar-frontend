"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/lib/mock/orders";
import { STATUS_META } from "@/lib/mock/orders";

const STEPS: {
  key: OrderStatus;
  label: string;
  sublabel: string;
  Icon: React.ElementType;
}[] = [
  {
    key: "placed",
    label: "Placed",
    sublabel: "Order received",
    Icon: ShoppingCart,
  },
  {
    key: "confirmed",
    label: "Confirmed",
    sublabel: "Team verified",
    Icon: CheckCircle,
  },
  {
    key: "packed",
    label: "Packed",
    sublabel: "Ready to ship",
    Icon: Package,
  },
  {
    key: "shipped",
    label: "Shipped",
    sublabel: "In transit",
    Icon: Truck,
  },
  {
    key: "out_for_delivery",
    label: "Out for Delivery",
    sublabel: "Almost there",
    Icon: MapPin,
  },
  {
    key: "delivered",
    label: "Delivered",
    sublabel: "Enjoy your order",
    Icon: Star,
  },
];

interface OrderTimelineProps {
  status: OrderStatus;
}

export default function OrderTimeline({ status }: OrderTimelineProps) {
  const currentStep = STATUS_META[status].step;

  return (
    <motion.div
      className="bg-[#1A1A1A]/80 backdrop-blur-sm rounded-2xl border border-white/8 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/8 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">
            Order Progress
          </h3>
          <p className="text-xs text-white/40 mt-0.5">
            Live status of your shipment
          </p>
        </div>
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border",
            STATUS_META[status].color,
            STATUS_META[status].bg,
            STATUS_META[status].border
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {STATUS_META[status].label}
        </div>
      </div>

      {/* Timeline — Desktop horizontal, Mobile vertical */}
      <div className="p-6 sm:p-8">
        {/* Desktop horizontal */}
        <div className="hidden sm:block">
          <div className="relative">
            {/* Progress track - behind icons */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10 z-0">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B69E24] to-[#E9CC2F]"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX:
                    currentStep === 0
                      ? 0
                      : currentStep / (STEPS.length - 1),
                }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </div>

            {/* Steps - on top of progress line */}
            <div className="relative flex justify-between z-10">
              {STEPS.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isFuture = index > currentStep;

                return (
                  <motion.div
                    key={step.key}
                    className="flex flex-col items-center gap-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index + 0.4 }}
                  >
                    {/* Icon circle with background */}
                    <div
                      className={cn(
                        "relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 z-20",
                        isCompleted &&
                          "bg-emerald-500/20 border-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.25)]",
                        isCurrent &&
                          "bg-gradient-to-br from-[#E9CC2F] to-[#B69E24] border-[#E9CC2F] shadow-[0_4px_16px_rgba(233,204,47,0.35)]",
                        isFuture && "bg-[#1A1A1A] border-white/10"
                      )}
                    >
                      {isCurrent && (
                        <span className="absolute inset-0 rounded-full bg-[#E9CC2F]/30 animate-ping" />
                      )}
                      <step.Icon
                        size={20}
                        className={cn(
                          "relative z-10",
                          isCompleted && "text-emerald-400",
                          isCurrent && "text-[#1A1A1A]",
                          isFuture && "text-white/30"
                        )}
                        strokeWidth={isCurrent ? 2.5 : 2}
                      />
                    </div>

                    {/* Label */}
                    <div className="text-center">
                      <p
                        className={cn(
                          "text-xs font-bold leading-tight",
                          isCompleted && "text-emerald-400",
                          isCurrent && "text-[#E9CC2F]",
                          isFuture && "text-white/30"
                        )}
                      >
                        {step.label}
                      </p>
                      <p
                        className={cn(
                          "text-[10px] mt-0.5",
                          isCompleted && "text-emerald-400/60",
                          isCurrent && "text-[#E9CC2F]/60",
                          isFuture && "text-white/20"
                        )}
                      >
                        {step.sublabel}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="sm:hidden">
          <div className="relative pl-6">
            {/* Vertical track - behind icons */}
            <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-white/10 z-0">
              <motion.div
                className="w-full bg-gradient-to-b from-[#B69E24] to-[#E9CC2F]"
                initial={{ scaleY: 0 }}
                animate={{
                  scaleY:
                    currentStep === 0
                      ? 0
                      : currentStep / (STEPS.length - 1),
                }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
              />
            </div>

            <div className="space-y-6 relative z-10">
              {STEPS.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isFuture = index > currentStep;

                return (
                  <motion.div
                    key={step.key}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index + 0.4 }}
                  >
                    {/* Icon with background */}
                    <div
                      className={cn(
                        "relative w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 -ml-6 z-20",
                        isCompleted &&
                          "bg-emerald-500/20 border-emerald-500 shadow-[0_2px_8px_rgba(16,185,129,0.25)]",
                        isCurrent &&
                          "bg-gradient-to-br from-[#E9CC2F] to-[#B69E24] border-[#E9CC2F] shadow-[0_2px_12px_rgba(233,204,47,0.35)]",
                        isFuture && "bg-[#1A1A1A] border-white/10"
                      )}
                    >
                      {isCurrent && (
                        <span className="absolute inset-0 rounded-full bg-[#E9CC2F]/30 animate-ping" />
                      )}
                      <step.Icon
                        size={16}
                        className={cn(
                          "relative z-10",
                          isCompleted && "text-emerald-400",
                          isCurrent && "text-[#1A1A1A]",
                          isFuture && "text-white/30"
                        )}
                        strokeWidth={2}
                      />
                    </div>

                    {/* Label */}
                    <div>
                      <p
                        className={cn(
                          "text-sm font-bold",
                          isCompleted && "text-emerald-400",
                          isCurrent && "text-[#E9CC2F]",
                          isFuture && "text-white/30"
                        )}
                      >
                        {step.label}
                      </p>
                      <p
                        className={cn(
                          "text-xs",
                          isCompleted && "text-emerald-400/60",
                          isCurrent && "text-[#E9CC2F]/60",
                          isFuture && "text-white/20"
                        )}
                      >
                        {step.sublabel}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}