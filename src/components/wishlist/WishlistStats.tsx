"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Heart, Package, DollarSign, Clock } from "lucide-react";
import type { Product } from "@/lib/mock/products";
import { formatPKR } from "@/lib/utils";

// Extend Product type for wishlist-specific tracking
interface WishlistProduct extends Product {
  addedToWishlistAt?: number; // timestamp when added to wishlist
}

interface WishlistStatsProps {
  items: WishlistProduct[];
}

function AnimatedCounter({ 
  target, 
  prefix = "", 
  suffix = "" 
}: { 
  target: number; 
  prefix?: string; 
  suffix?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [count, target]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  prefix,
  suffix,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-5 cursor-default"
      style={{ backdropFilter: "blur(20px)" }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}12 0%, transparent 70%)` }}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-2">{label}</p>
          <p
            className="text-2xl md:text-3xl font-bold"
            style={{ color }}
          >
            <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
          </p>
        </div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}15`, color }}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        initial={{ width: 0 }}
        animate={{ width: "60%" }}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
      />
    </motion.div>
  );
}

export function WishlistStats({ items }: WishlistStatsProps) {
  const savedCount = items.length;
  
  // Use stock > 0 to determine availability
  const availableCount = items.filter((i) => i.stock > 0).length;
  
  // Use price (not salePrice) for total value
  const totalValue = items.reduce((sum, i) => sum + i.price, 0);
  
  // Check if added in last 7 days (86400000 ms = 1 day)
  const oneWeekAgo = Date.now() - 86400000 * 7;
  const recentCount = items.filter(
    (i) => i.addedToWishlistAt && i.addedToWishlistAt > oneWeekAgo
  ).length;

  const stats = [
    {
      icon: Heart,
      label: "Saved Products",
      value: savedCount,
      color: "#E9CC2F",
      delay: 0.1,
    },
    {
      icon: Package,
      label: "Available Now",
      value: availableCount,
      color: "#4ade80",
      delay: 0.2,
    },
    {
      icon: DollarSign,
      label: "Total Value",
      value: totalValue,
      prefix: "₨ ", // Use PKR symbol
      color: "#60a5fa",
      delay: 0.3,
    },
    {
      icon: Clock,
      label: "Added This Week",
      value: recentCount,
      color: "#a78bfa",
      delay: 0.4,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </motion.div>
  );
}