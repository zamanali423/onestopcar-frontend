"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ChevronDown } from "lucide-react";
interface OrderNotesProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
}

export default function OrderNotes({ register }: OrderNotesProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      className="rounded-2xl border border-white/10 bg-[#1A1A1A]/60 backdrop-blur-sm overflow-hidden"
    >
      {/* Toggle Header */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
        className="w-full flex items-center gap-3 px-6 py-5 text-left transition-colors"
        aria-expanded={isOpen}
        aria-controls="order-notes-content"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E9CC2F]/10 border border-[#E9CC2F]/20 shrink-0">
          <MessageSquare className="h-[18px] w-[18px] text-[#E9CC2F]" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Order Notes</p>
          <p className="text-xs text-white/40">Special delivery instructions (optional)</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="h-5 w-5 text-white/30" />
        </motion.div>
      </motion.button>

      {/* Expandable content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="order-notes-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <div className="h-px bg-white/5 mb-5" />
              <motion.textarea
                id="orderNotes"
                rows={4}
                placeholder="E.g. Please call before delivery, leave at gate, preferred morning delivery, etc..."
                {...register("orderNotes")}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#E9CC2F]/40 focus:border-[#E9CC2F]/60 hover:border-white/20"
              />
              <p className="mt-2 text-[11px] text-white/30">
                💡 Include any special instructions to help our delivery team serve you better.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
