"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Link2, MessageCircle, Mail, Check, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/lib/toast";
import type { Product } from "@/lib/mock/products";

interface ShareWishlistModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ShareWishlistModal({ product, onClose }: ShareWishlistModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const shareUrl = product
    ? `https://onestopcar.net/product/${product.id}`
    : "https://onestopcar.net/wishlist";

  const shareTitle = product
    ? `Check out ${product.name} on onestopcar!`
    : "Check out my onestopcar Wishlist!";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast("Link copied!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast("Could not copy link", "error");
    }
  };

  const shareOptions = [
    {
      label: "WhatsApp",
      icon: "💬",
      color: "#25D366",
      bg: "rgba(37,211,102,0.1)",
      border: "rgba(37,211,102,0.2)",
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(`${shareTitle} ${shareUrl}`)}`,
          "_blank"
        );
        toast("Opening WhatsApp...", "success");
      },
    },
    {
      label: "Facebook",
      icon: "📘",
      color: "#1877F2",
      bg: "rgba(24,119,242,0.1)",
      border: "rgba(24,119,242,0.2)",
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
        toast("Opening Facebook...", "success");
      },
    },
    {
      label: "Messenger",
      icon: "⚡",
      color: "#0084FF",
      bg: "rgba(0,132,255,0.1)",
      border: "rgba(0,132,255,0.2)",
      action: () => {
        window.open(
          `https://m.me/?link=${encodeURIComponent(shareUrl)}`,
          "_blank"
        );
        toast("Opening Messenger...", "success");
      },
    },
    {
      label: "Email",
      icon: "✉️",
      color: "#E9CC2F",
      bg: "rgba(233,204,47,0.1)",
      border: "rgba(233,204,47,0.2)",
      action: () => {
        window.open(
          `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareTitle}\n\n${shareUrl}`)}`,
          "_blank"
        );
        toast("Opening email...", "success");
      },
    },
  ];

  return (
    <AnimatePresence>
      {product !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-sm rounded-2xl border border-white/8 bg-[#161616] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/50 hover:text-white transition-all"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            {/* Header */}
            <div className="mb-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9CC2F]/15">
                <Share2 className="h-5 w-5 text-[#E9CC2F]" />
              </div>
              <h3 className="text-base font-bold text-white">Share Product</h3>
              {product && (
                <p className="mt-0.5 text-sm text-white/40 line-clamp-1">{product.name}</p>
              )}
            </div>

            {/* Copy link */}
            <div className="mb-4">
              <p className="text-xs text-white/30 mb-1.5 uppercase tracking-wider">Link</p>
              <div className="flex gap-2">
                <div className="flex-1 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2.5 text-xs text-white/40 truncate">
                  {shareUrl}
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${copied
                      ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"
                      : "bg-[#E9CC2F]/15 border border-[#E9CC2F]/20 text-[#E9CC2F] hover:bg-[#E9CC2F]/25"
                    }`}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Share options */}
            <div>
              <p className="text-xs text-white/30 mb-3 uppercase tracking-wider">Share Via</p>
              <div className="grid grid-cols-2 gap-2">
                {shareOptions.map((opt) => (
                  <motion.button
                    key={opt.label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={opt.action}
                    className="flex items-center gap-2.5 rounded-xl border px-3 py-3 text-sm font-medium transition-all hover:brightness-110"
                    style={{
                      borderColor: opt.border,
                      backgroundColor: opt.bg,
                      color: opt.color,
                    }}
                  >
                    <span className="text-base">{opt.icon}</span>
                    {opt.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Web Share API */}
            {typeof navigator !== "undefined" && "share" in navigator && (
              <button
                onClick={() => {
                  navigator.share({ title: shareTitle, url: shareUrl }).catch(() => { });
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] py-2.5 text-sm text-white/50 hover:text-white hover:border-white/15 transition-all"
              >
                <Share2 className="h-4 w-4" />
                More Options
              </button>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}