"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  Mail,
  AlertCircle,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TrackOrderFormProps {
  onSearch: (orderNumber: string, emailOrPhone: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export default function TrackOrderForm({
  onSearch,
  isLoading,
  error,
}: TrackOrderFormProps) {
  const [orderNumber, setOrderNumber] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    orderNumber?: string;
    emailOrPhone?: string;
  }>({});
  const [touched, setTouched] = useState<{
    orderNumber?: boolean;
    emailOrPhone?: boolean;
  }>({});

  const validate = () => {
    const errors: { orderNumber?: string; emailOrPhone?: string } = {};
    if (!orderNumber.trim()) {
      errors.orderNumber = "Order number is required";
    }
    if (!emailOrPhone.trim()) {
      errors.emailOrPhone = "Email or phone number is required";
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ orderNumber: true, emailOrPhone: true });
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    await onSearch(orderNumber.trim(), emailOrPhone.trim());
  };

  const handleBlur = (field: "orderNumber" | "emailOrPhone") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errors = validate();
    setFieldErrors(errors);
  };

  const demoOrders = [
    { number: "OSC-202600125", contact: "muhammadali@gmail.com", status: "Shipped" },
    { number: "OSC-202600089", contact: "sara.khan@gmail.com", status: "Delivered" },
    { number: "OSC-202600201", contact: "ahmed.raza@outlook.com", status: "Confirmed" },
  ];

  const fillDemo = (number: string, contact: string) => {
    setOrderNumber(number);
    setEmailOrPhone(contact);
    setFieldErrors({});
    setTouched({});
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-4">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glass card */}
        <div className="relative bg-[#1A1A1A]/80 backdrop-blur-xl rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.05)] p-8 sm:p-10 overflow-hidden border border-white/8">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-[#B69E24] via-[#E9CC2F] to-[#B69E24]" />

          {/* Card header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white leading-tight">
              Enter Order Details
            </h2>
            <p className="mt-1.5 text-sm text-white/50">
              Provide your order number and registered email or phone to track
              your shipment.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              {/* Order Number Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="orderNumber"
                  className="block text-sm font-semibold text-white/90"
                >
                  Order Number{" "}
                  <span className="text-[#E9CC2F]" aria-hidden>
                    *
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                    <Package size={18} />
                  </div>
                  <motion.input
                    id="orderNumber"
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    onBlur={() => handleBlur("orderNumber")}
                    placeholder="e.g. OSC-202600125"
                    autoComplete="off"
                    className={cn(
                      "w-full pl-11 pr-4 py-3.5 rounded-xl text-white text-sm font-medium placeholder:text-white/30 border-2 transition-all duration-200 outline-none bg-white/5",
                      touched.orderNumber && fieldErrors.orderNumber
                        ? "border-red-400/50 bg-red-500/10 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                        : "border-white/10 focus:border-[#E9CC2F] focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(233,204,47,0.15)]"
                    )}
                    whileFocus={{ scale: 1.002 }}
                    aria-describedby={
                      touched.orderNumber && fieldErrors.orderNumber
                        ? "orderNumber-error"
                        : undefined
                    }
                    aria-invalid={
                      !!(touched.orderNumber && fieldErrors.orderNumber)
                    }
                  />
                </div>
                <AnimatePresence>
                  {touched.orderNumber && fieldErrors.orderNumber && (
                    <motion.p
                      id="orderNumber-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-red-400 font-medium"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                    >
                      <AlertCircle size={12} />
                      {fieldErrors.orderNumber}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email or Phone Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="emailOrPhone"
                  className="block text-sm font-semibold text-white/90"
                >
                  Email or Phone Number{" "}
                  <span className="text-[#E9CC2F]" aria-hidden>
                    *
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                    <Mail size={18} />
                  </div>
                  <motion.input
                    id="emailOrPhone"
                    type="text"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    onBlur={() => handleBlur("emailOrPhone")}
                    placeholder="e.g. yourname@email.com or 03001234567"
                    autoComplete="off"
                    className={cn(
                      "w-full pl-11 pr-4 py-3.5 rounded-xl text-white text-sm font-medium placeholder:text-white/30 border-2 transition-all duration-200 outline-none bg-white/5",
                      touched.emailOrPhone && fieldErrors.emailOrPhone
                        ? "border-red-400/50 bg-red-500/10 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                        : "border-white/10 focus:border-[#E9CC2F] focus:bg-white/10 focus:shadow-[0_0_0_3px_rgba(233,204,47,0.15)]"
                    )}
                    whileFocus={{ scale: 1.002 }}
                    aria-describedby={
                      touched.emailOrPhone && fieldErrors.emailOrPhone
                        ? "emailOrPhone-error"
                        : undefined
                    }
                    aria-invalid={
                      !!(touched.emailOrPhone && fieldErrors.emailOrPhone)
                    }
                  />
                </div>
                <AnimatePresence>
                  {touched.emailOrPhone && fieldErrors.emailOrPhone && (
                    <motion.p
                      id="emailOrPhone-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-red-400 font-medium"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                    >
                      <AlertCircle size={12} />
                      {fieldErrors.emailOrPhone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* API Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    role="alert"
                    className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-400/20"
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                  >
                    <AlertCircle
                      size={18}
                      className="text-red-400 flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-semibold text-red-400">
                        Order Not Found
                      </p>
                      <p className="text-xs text-red-400/70 mt-0.5">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "relative w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-base text-[#1A1A1A] overflow-hidden transition-all duration-200",
                  "bg-gradient-to-r from-[#B69E24] to-[#E9CC2F]",
                  "shadow-[0_4px_24px_rgba(233,204,47,0.3)]",
                  "hover:shadow-[0_8px_32px_rgba(233,204,47,0.5)] hover:-translate-y-0.5",
                  "active:translate-y-0 active:shadow-[0_2px_12px_rgba(233,204,47,0.2)]",
                  "disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                )}
                whileTap={isLoading ? {} : { scale: 0.99 }}
              >
                {/* Shimmer overlay */}
                {!isLoading && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                )}
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>Tracking your order…</span>
                  </>
                ) : (
                  <>
                    <Search size={20} strokeWidth={2.5} />
                    <span>Track Order</span>
                    <ChevronRight size={18} strokeWidth={2.5} />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Demo orders */}
          <div className="mt-8 pt-6 border-t border-white/8">
            <p className="text-xs text-white/30 font-semibold uppercase tracking-widest mb-3">
              Try Demo Orders
            </p>
            <div className="flex flex-col gap-2">
              {demoOrders.map((demo) => (
                <motion.button
                  key={demo.number}
                  type="button"
                  onClick={() => fillDemo(demo.number, demo.contact)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-[#E9CC2F]/10 border border-white/8 hover:border-[#E9CC2F]/30 transition-all duration-200 text-left group"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center gap-3">
                    <Package size={14} className="text-[#E9CC2F]" />
                    <span className="text-xs font-bold text-white">
                      {demo.number}
                    </span>
                    <span className="text-xs text-white/30">
                      {demo.contact}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#E9CC2F] group-hover:underline">
                    {demo.status}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}