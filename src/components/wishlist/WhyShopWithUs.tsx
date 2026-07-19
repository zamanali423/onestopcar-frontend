"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Award,
  CreditCard,
  Shield,
  Lock,
  Wrench,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over $500. Premium packaging included.",
    color: "#E9CC2F",
    gradient: "from-[#E9CC2F]/15 to-[#B69E24]/5",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Every product is rigorously tested and quality certified.",
    color: "#60a5fa",
    gradient: "from-blue-500/15 to-blue-600/5",
  },
  {
    icon: CreditCard,
    title: "Cash on Delivery",
    description: "Pay when your order arrives. No upfront payment required.",
    color: "#4ade80",
    gradient: "from-emerald-500/15 to-emerald-600/5",
  },
  {
    icon: Shield,
    title: "Warranty Coverage",
    description: "All products come with manufacturer warranty protection.",
    color: "#a78bfa",
    gradient: "from-violet-500/15 to-violet-600/5",
  },
  {
    icon: Lock,
    title: "Secure Checkout",
    description: "256-bit SSL encryption. Your data is always safe.",
    color: "#f472b6",
    gradient: "from-pink-500/15 to-pink-600/5",
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    description: "Professional installation guides and technical support.",
    color: "#fb923c",
    gradient: "from-orange-500/15 to-orange-600/5",
  },
];

export function WhyShopWithUs() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="mt-20"
    >
      {/* Section header */}
      <div className="text-center mb-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs text-[#E9CC2F]/70 uppercase tracking-wider font-semibold mb-2"
        >
          Our Promise
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-white"
        >
          Why Shop With{" "}
          <span className="text-gradient-gold">One Stop Car</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            whileHover={{ y: -5 }}
            className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br ${feature.gradient} p-5 transition-shadow hover:shadow-lg`}
          >
            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.25 }}
              className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ backgroundColor: `${feature.color}20` }}
            >
              <feature.icon className="h-5.5 w-5.5" style={{ color: feature.color }} />
            </motion.div>

            {/* Text */}
            <h3 className="text-sm font-bold text-white mb-1.5">{feature.title}</h3>
            <p className="text-xs text-white/40 leading-relaxed">{feature.description}</p>

            {/* Hover glow */}
            <div
              className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl pointer-events-none"
              style={{ backgroundColor: feature.color }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
