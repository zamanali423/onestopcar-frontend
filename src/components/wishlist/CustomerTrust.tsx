"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Users, Star, BadgeCheck, Award } from "lucide-react";

function AnimatedNumber({ target, decimals = 0 }: { target: number; decimals?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString()
  );

  useEffect(() => {
    const controls = animate(count, target, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [count, target]);

  return <motion.span>{rounded}</motion.span>;
}

const stats = [
  {
    icon: Users,
    value: 25000,
    suffix: "+",
    label: "Happy Customers",
    color: "#E9CC2F",
  },
  {
    icon: Star,
    value: 4.9,
    decimals: 1,
    suffix: "★",
    label: "Average Rating",
    color: "#f5e06a",
  },
  {
    icon: BadgeCheck,
    value: 100,
    suffix: "%",
    label: "Authentic Products",
    color: "#4ade80",
  },
  {
    icon: Award,
    value: 8,
    suffix: "+ Years",
    label: "In Business",
    color: "#60a5fa",
  },
];

export function CustomerTrust() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="mt-16 relative overflow-hidden rounded-2xl border border-white/6 bg-white/[0.02] p-8 md:p-12"
    >
      {/* Background decoration */}
      <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-[#E9CC2F]/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#E9CC2F]/3 blur-3xl pointer-events-none" />

      <div className="relative">
        <div className="text-center mb-10">
          <p className="text-xs text-[#E9CC2F]/70 uppercase tracking-wider font-semibold mb-2">
            Trusted By Thousands
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            The One Stop Car{" "}
            <span className="text-gradient-gold">Difference</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
              </motion.div>

              {/* Number */}
              <div className="text-3xl md:text-4xl font-black" style={{ color: stat.color }}>
                <AnimatedNumber target={stat.value} decimals={stat.decimals ?? 0} />
                <span>{stat.suffix}</span>
              </div>

              {/* Label */}
              <p className="mt-1.5 text-xs text-white/40 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
