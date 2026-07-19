"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const stats = [
  {
    value: 10,
    suffix: "+",
    label: "Years Experience",
    sublabel: "In the automotive industry",
    icon: "🏅",
    color: "from-[#E9CC2F]/20 to-[#E9CC2F]/5",
  },
  {
    value: 25000,
    suffix: "+",
    label: "Happy Customers",
    sublabel: "Across the country",
    icon: "😊",
    color: "from-blue-50 to-blue-50/30",
  },
  {
    value: 15000,
    suffix: "+",
    label: "Products Sold",
    sublabel: "Premium automotive accessories",
    icon: "📦",
    color: "from-emerald-50 to-emerald-50/30",
  },
  {
    value: 4.9,
    suffix: "★",
    label: "Customer Rating",
    sublabel: "Average satisfaction score",
    icon: "⭐",
    color: "from-orange-50 to-orange-50/30",
  },
  {
    value: 100,
    suffix: "%",
    label: "Quality Guarantee",
    sublabel: "On every product & service",
    icon: "✅",
    color: "from-purple-50 to-purple-50/30",
  },
];

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const isDecimal = value % 1 !== 0;

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, value);
      if (step >= steps) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  const display = isDecimal
    ? count.toFixed(1)
    : count >= 1000
    ? (count / 1000).toFixed(0) + "K"
    : count.toString();

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function CompanyStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#1A1A1A] relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(233,204,47,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(233,204,47,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.p
            variants={staggerItem}
            className="text-xs font-bold text-[#E9CC2F] uppercase tracking-[0.2em] mb-3"
          >
            By the Numbers
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl font-bold text-white leading-tight"
          >
            Numbers That{" "}
            <span className="text-[#E9CC2F]">Speak Volumes</span>
          </motion.h2>
        </motion.div>

        {/* Stats grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-[#E9CC2F]/0 group-hover:bg-[#E9CC2F]/5 blur-xl transition-all duration-500 pointer-events-none" />

              <div className="relative rounded-2xl bg-white/5 border border-white/10 p-6 text-center backdrop-blur-sm group-hover:border-[#E9CC2F]/40 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="text-3xl mb-4">{stat.icon}</div>

                {/* Animated number */}
                <div className="text-4xl font-bold text-[#E9CC2F] mb-2 tabular-nums">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isInView={isInView}
                  />
                </div>

                {/* Label */}
                <div className="text-sm font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-white/40">{stat.sublabel}</div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-[#E9CC2F]/0 group-hover:bg-[#E9CC2F] rounded-full transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
