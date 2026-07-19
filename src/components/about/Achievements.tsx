"use client";

import { motion } from "framer-motion";
import {
  Trophy,
  BadgeCheck,
  ShieldCheck,
  Truck,
  Heart,
  Star,
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const achievements = [
  {
    icon: Trophy,
    title: "Best Automotive Brand",
    subtitle: "Industry Excellence Award 2023",
    description:
      "Recognized as Malaysia's leading automotive accessories and detailing brand for two consecutive years.",
    color: "#E9CC2F",
  },
  {
    icon: BadgeCheck,
    title: "Certified Experts",
    subtitle: "3M, Garmin & PPF Certified",
    description:
      "Our technicians hold certifications from 12 leading automotive brands and product manufacturers.",
    color: "#3B82F6",
  },
  {
    icon: ShieldCheck,
    title: "Authorized Dealer",
    subtitle: "12 Premium Brands",
    description:
      "Officially authorized to supply, install, and service products from the world's most trusted automotive brands.",
    color: "#8B5CF6",
  },
  {
    icon: Star,
    title: "Premium Quality",
    subtitle: "ISO-Aligned Standards",
    description:
      "Every service and product adheres to strict quality control processes that meet international standards.",
    color: "#F59E0B",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    subtitle: "Same-Day Dispatch",
    description:
      "Our logistics network ensures rapid, insured delivery across the country with real-time tracking.",
    color: "#10B981",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    subtitle: "4.9★ Average Rating",
    description:
      "Over 25,000 verified customer reviews with an industry-leading 4.9-star average satisfaction score.",
    color: "#EC4899",
  },
];

export default function Achievements() {
  return (
    <section className="py-24 bg-[#1A1A1A] overflow-hidden relative">
      {/* Decorative glow */}
      <div
        className="absolute top-0 left-0 w-full h-px opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, #E9CC2F, transparent)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-px opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, #E9CC2F, transparent)",
        }}
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
            Recognition & Awards
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4"
          >
            Our{" "}
            <span className="text-[#E9CC2F]">Achievements</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-white/50 max-w-2xl mx-auto"
          >
            A decade of excellence recognized by industry leaders, brand
            partners, and our customers.
          </motion.p>
        </motion.div>

        {/* Achievements grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: (index % 3) * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="group relative"
              >
                <div className="relative rounded-2xl bg-white/5 border border-white/10 p-7 h-full backdrop-blur-sm group-hover:border-white/20 transition-all duration-300">
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${item.color}12 0%, transparent 70%)`,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="relative z-10 w-14 h-14 rounded-xl flex items-center justify-center mb-5 shadow-lg"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-3"
                      style={{ color: item.color }}
                    >
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Corner accent */}
                  <div
                    className="absolute top-0 right-0 w-16 h-16 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
