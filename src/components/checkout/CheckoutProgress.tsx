"use client";

import { motion } from "framer-motion";
import { ShoppingCart, CreditCard, CheckCircle } from "lucide-react";
import Link from "next/link";

const STEPS = [
  { id: 1, label: "Shopping Cart", icon: ShoppingCart, href: "/cart" },
  { id: 2, label: "Checkout", icon: CreditCard, href: "/checkout" },
  { id: 3, label: "Confirmation", icon: CheckCircle, href: "#" },
];

interface CheckoutProgressProps {
  currentStep?: number;
}

export default function CheckoutProgress({ currentStep = 2 }: CheckoutProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex items-center justify-center gap-0"
    >
      {STEPS.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;
        const isUpcoming = step.id > currentStep;
        const Icon = step.icon;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              {isCompleted ? (
                <Link href={step.href} className="group">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#E9CC2F] shadow-[0_0_20px_rgba(233,204,47,0.4)] transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(233,204,47,0.6)]">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#1A1A1A]" />
                  </div>
                  <span className="mt-1.5 block text-center text-[10px] sm:text-xs font-medium text-[#E9CC2F]">
                    {step.label}
                  </span>
                </Link>
              ) : isCurrent ? (
                <div className="flex flex-col items-center">
                  <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-[#E9CC2F] bg-[#1A1A1A] shadow-[0_0_0_4px_rgba(233,204,47,0.15)]">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#E9CC2F]" />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-[#E9CC2F]"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <span className="mt-1.5 block text-center text-[10px] sm:text-xs font-semibold text-white">
                    {step.label}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white/25" />
                  </div>
                  <span className="mt-1.5 block text-center text-[10px] sm:text-xs font-medium text-white/25">
                    {step.label}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Connector */}
            {index < STEPS.length - 1 && (
              <div className="relative mx-3 sm:mx-4 mb-5 h-px w-16 sm:w-24 bg-white/10">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isCompleted ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute inset-0 origin-left bg-[#E9CC2F] shadow-[0_0_8px_rgba(233,204,47,0.4)]"
                />
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
