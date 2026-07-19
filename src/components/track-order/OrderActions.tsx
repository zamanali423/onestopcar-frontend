"use client";

import { motion } from "framer-motion";
import {
  RotateCcw,
  ShoppingBag,
  MessageCircle,
  Phone,
  Download,
  Printer,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import type { MockOrder } from "@/lib/mock/orders";

interface OrderActionsProps {
  order: MockOrder;
  onTrackAgain: () => void;
}

export default function OrderActions({ order, onTrackAgain }: OrderActionsProps) {
  const handleShare = async () => {
    const text = `Tracking order ${order.orderNumber} — Status: ${order.status}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Track My Order", text });
        toast("Shared successfully!", "success");
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(
        `Order: ${order.orderNumber}\nStatus: ${order.status}\nTracking: ${order.courier.trackingId}`
      );
      toast("Tracking info copied to clipboard!", "success");
    }
  };

  const handleDownloadInvoice = () => {
    toast("Invoice download starting…", "info");
    // Simulate a download
    setTimeout(() => {
      toast(`Invoice for ${order.orderNumber} downloaded!`, "success");
    }, 1200);
  };

  const handlePrintInvoice = () => {
    toast("Opening print dialog…", "info");
    setTimeout(() => window.print(), 500);
  };

  const handleContactSupport = () => {
    toast("Opening support chat…", "info");
    setTimeout(() => {
      toast("Support team notified. We'll get back to you shortly!", "success");
    }, 1500);
  };

  const handleCallStore = () => {
    window.location.href = "tel:+923001234567";
    toast("Dialing store number…", "info");
  };

  const handleContinueShopping = () => {
    toast("Redirecting to store…", "info");
    setTimeout(() => {
      window.location.href = "/";
    }, 600);
  };

  const primaryActions = [
    {
      label: "Track Again",
      icon: RotateCcw,
      onClick: onTrackAgain,
      variant: "primary" as const,
      description: "Search a different order",
    },
    {
      label: "Continue Shopping",
      icon: ShoppingBag,
      onClick: handleContinueShopping,
      variant: "dark" as const,
      description: "Browse our catalog",
    },
  ];

  const secondaryActions = [
    {
      label: "Contact Support",
      icon: MessageCircle,
      onClick: handleContactSupport,
    },
    {
      label: "Call Store",
      icon: Phone,
      onClick: handleCallStore,
    },
    {
      label: "Download Invoice",
      icon: Download,
      onClick: handleDownloadInvoice,
    },
    {
      label: "Print Invoice",
      icon: Printer,
      onClick: handlePrintInvoice,
    },
    {
      label: "Share Tracking",
      icon: Share2,
      onClick: handleShare,
    },
  ];

  return (
    <motion.div
      className="bg-[#1A1A1A]/80 backdrop-blur-sm rounded-2xl border border-white/8 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45 }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/8">
        <h3 className="text-base font-bold text-white">Quick Actions</h3>
        <p className="text-xs text-white/40 mt-0.5">
          Manage your order and get support
        </p>
      </div>

      <div className="p-6 space-y-4">
        {/* Primary actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {primaryActions.map((action) => (
            <motion.button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1.5 p-4 rounded-xl font-bold text-sm transition-all duration-200 overflow-hidden border",
                action.variant === "primary"
                  ? "bg-gradient-to-r from-[#B69E24] to-[#E9CC2F] text-[#1A1A1A] border-[#E9CC2F]/50 shadow-[0_4px_16px_rgba(233,204,47,0.3)] hover:shadow-[0_6px_24px_rgba(233,204,47,0.5)] hover:-translate-y-0.5"
                  : "bg-white/10 text-white border-white/10 hover:bg-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
              )}
              whileTap={{ scale: 0.98 }}
            >
              <action.icon size={20} strokeWidth={2} />
              <span>{action.label}</span>
              <span
                className={cn(
                  "text-[10px] font-normal opacity-75",
                  action.variant === "primary"
                    ? "text-[#1A1A1A]/70"
                    : "text-white/60"
                )}
              >
                {action.description}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Secondary actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {secondaryActions.map((action, index) => (
            <motion.button
              key={action.label}
              type="button"
              onClick={action.onClick}
              className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/20 text-white/60 hover:text-white transition-all duration-200 text-xs font-semibold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 * index + 0.5 }}
            >
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                <action.icon size={15} className="text-[#E9CC2F]" />
              </div>
              <span className="text-center leading-tight">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}