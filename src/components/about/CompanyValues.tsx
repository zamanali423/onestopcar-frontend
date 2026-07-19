"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  Heart,
  Users,
  BadgeCheck,
  ShieldCheck,
  Handshake,
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly explore new products, technologies, and techniques to stay at the forefront of automotive care.",
    color: "#E9CC2F",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Honest advice, transparent pricing, and genuine products — we earn trust the right way, every single time.",
    color: "#3B82F6",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description:
      "Your satisfaction isn't a metric for us — it's our purpose. We go above and beyond on every order and service.",
    color: "#EC4899",
  },
  {
    icon: BadgeCheck,
    title: "Quality",
    description:
      "Only the best materials, certified products, and skilled technicians make it into our offering. No compromise.",
    color: "#8B5CF6",
  },
  {
    icon: Users,
    title: "Trust",
    description:
      "Built over 10+ years and 25,000+ customers, our reputation is our most valuable asset — and we protect it fiercely.",
    color: "#10B981",
  },
  {
    icon: Handshake,
    title: "Commitment",
    description:
      "From your first inquiry to long after your service, we remain committed to your car and your experience.",
    color: "#F59E0B",
  },
];

export default function CompanyValues() {
  return (
    <section className="py-24 bg-[#1A1A1A] overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(233,204,47,1) 25%, transparent 25%), linear-gradient(-45deg, rgba(233,204,47,1) 25%, transparent 25%)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

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
            What We Stand For
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-4"
          >
            Our Core{" "}
            <span className="text-[#E9CC2F]">Values</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-white/50 max-w-2xl mx-auto"
          >
            The principles that guide every decision, every interaction, and
            every product we put our name on.
          </motion.p>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: (index % 3) * 0.1,
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative"
              >
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${value.color}40 0%, transparent 60%)`,
                  }}
                />

                <div className="relative rounded-2xl bg-white/5 border border-white/10 group-hover:border-transparent p-7 h-full backdrop-blur-sm transition-all duration-300"
                  style={{
                    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Animated border effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 0 1.5px ${value.color}60`,
                    }}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300"
                    style={{ backgroundColor: `${value.color}15` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: value.color }} />
                  </motion.div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-3 transition-colors duration-300"
                    style={{ color: value.color }}
                  >
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/55 leading-relaxed">
                    {value.description}
                  </p>

                  {/* Bottom line animation */}
                  <motion.div
                    className="absolute bottom-0 left-7 right-7 h-0.5 rounded-full opacity-0 group-hover:opacity-100"
                    style={{ backgroundColor: value.color }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
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
