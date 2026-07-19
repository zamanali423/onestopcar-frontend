"use client";

import { motion } from "framer-motion";
import { Activity, CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderActivity as ActivityItem } from "@/lib/mock/orders";

interface OrderActivityProps {
  activities: ActivityItem[];
}

export default function OrderActivity({ activities }: OrderActivityProps) {
  return (
    <motion.div
      className="bg-[#1A1A1A]/80 backdrop-blur-sm rounded-2xl border border-white/8 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/8 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-[#E9CC2F]/10 flex items-center justify-center">
          <Activity size={18} className="text-[#E9CC2F]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Order Activity</h3>
          <p className="text-xs text-white/40">Complete shipment history</p>
        </div>
      </div>

      <div className="p-6">
        <div className="relative">
          {activities.map((activity, index) => {
            const isLast = index === activities.length - 1;
            return (
              <motion.div
                key={activity.id}
                className="relative flex gap-4"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index + 0.5 }}
              >
                {/* Timeline line */}
                {!isLast && (
                  <div
                    className={cn(
                      "absolute left-[13px] top-7 bottom-0 w-px",
                      activity.completed ? "bg-[#E9CC2F]/30" : "bg-white/10"
                    )}
                    style={{ minHeight: "2rem" }}
                  />
                )}

                {/* Icon */}
                <div className="relative flex-shrink-0 mt-0.5">
                  {activity.completed ? (
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center",
                        activity.current
                          ? "bg-gradient-to-br from-[#E9CC2F] to-[#B69E24] shadow-[0_2px_10px_rgba(233,204,47,0.35)]"
                          : "bg-emerald-500/30 shadow-[0_2px_8px_rgba(16,185,129,0.2)]"
                      )}
                    >
                      {activity.current && (
                        <span className="absolute inset-0 rounded-full bg-[#E9CC2F]/30 animate-ping" />
                      )}
                      <CheckCircle
                        size={14}
                        className="text-white relative z-10"
                        strokeWidth={2.5}
                      />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-white/5 border-2 border-white/20 flex items-center justify-center">
                      <Circle size={10} className="text-white/20" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "flex-1 pb-5",
                    isLast && "pb-0"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5">
                    <p
                      className={cn(
                        "text-sm font-bold leading-snug",
                        activity.current
                          ? "text-[#E9CC2F]"
                          : activity.completed
                            ? "text-white"
                            : "text-white/30"
                      )}
                    >
                      {activity.title}
                    </p>
                    <div className="text-right flex-shrink-0">
                      <p
                        className={cn(
                          "text-xs font-semibold",
                          activity.completed ? "text-white/40" : "text-white/20"
                        )}
                      >
                        {activity.date}
                      </p>
                      {activity.time && (
                        <p className="text-[10px] text-white/30 mt-0.5">
                          {activity.time}
                        </p>
                      )}
                    </div>
                  </div>
                  <p
                    className={cn(
                      "text-xs mt-0.5 leading-relaxed",
                      activity.completed ? "text-white/40" : "text-white/20"
                    )}
                  >
                    {activity.description}
                  </p>

                  {/* Current badge */}
                  {activity.current && (
                    <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-md bg-[#E9CC2F]/15 border border-[#E9CC2F]/30 text-[10px] font-bold text-[#E9CC2F] uppercase tracking-wider">
                      <span className="w-1 h-1 rounded-full bg-[#E9CC2F] animate-pulse" />
                      Current Status
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}