"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, ChevronDown, CheckCircle2, XCircle, Loader2, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { validateCoupon } from "@/lib/mock/coupons";
import { formatPKR } from "@/lib/utils";

export default function CouponCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const couponCode = useCartStore((state) => state.couponCode);
  const couponDiscount = useCartStore((state) => state.couponDiscount);

  const applyCoupon = useCartStore((state) => state.setCoupon);
  const removeCoupon = useCartStore((state) => state.removeCoupon);

  const getSubtotal = useCartStore((state) => state.getSubtotal);

  const handleApply = async () => {
    if (!code.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    const response = await validateCoupon(code.trim());

    if (!response.data) {
      setStatus("error");
      setErrorMsg(response.message ?? "Invalid coupon code.");
      return;
    }

    const coupon = response.data;
    const subtotal = getSubtotal();

    let discount = 0;

    if (coupon.type === "percent") {
      discount = Math.round((subtotal * coupon.discount) / 100);
    } else {
      discount = coupon.discount;
    }

    applyCoupon(coupon.code, discount);

    setStatus("success");
    setCode("");
  };

  const handleRemove = () => {
    removeCoupon();
    setStatus("idle");
    setCode("");
    setErrorMsg("");
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/3 overflow-hidden">
      {/* Toggle */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors"
        aria-expanded={isOpen}
      >
        <Tag className="h-4 w-4 text-[#E9CC2F] shrink-0" />
        <div className="flex-1">
          <span className="text-sm font-medium text-white">
            {couponCode ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Coupon Applied!</span>
                <span className="text-white/40">({couponCode})</span>
              </span>
            ) : (
              "Have a coupon code?"
            )}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-white/30" />
        </motion.div>
      </motion.button>

      {/* Expandable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 border-t border-white/5 pt-3">
              {couponCode ? (
                /* Applied Coupon */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <div>
                      <p className="text-sm font-semibold text-emerald-400">{couponCode}</p>
                      <p className="text-xs text-white/50">
                        You save {formatPKR(couponDiscount)}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={handleRemove}
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    aria-label="Remove coupon"
                  >
                    <X className="h-3.5 w-3.5" />
                  </motion.button>
                </motion.div>
              ) : (
                /* Input */
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value.toUpperCase());
                        setStatus("idle");
                        setErrorMsg("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleApply()}
                      placeholder="Enter coupon code (try WELCOME10)"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/40 focus:border-[#E9CC2F]/60 transition-all uppercase tracking-wider"
                    />
                    <AnimatePresence>
                      {status === "success" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        </motion.div>
                      )}
                      {status === "error" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <XCircle className="h-4 w-4 text-red-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={handleApply}
                    disabled={status === "loading" || !code.trim()}
                    className="flex min-w-[80px] items-center justify-center gap-1.5 rounded-xl bg-[#E9CC2F] px-4 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-all duration-200 hover:bg-[#B69E24] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Apply"
                    )}
                  </motion.button>
                </div>
              )}

              {/* Error */}
              <AnimatePresence>
                {status === "error" && errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-2 flex items-center gap-1.5 text-xs text-red-400"
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Hint */}
              {!couponCode && status === "idle" && (
                <p className="mt-2 text-[10px] text-white/25">
                  Try: WELCOME10 · SAVE500 · DRIVE20
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
