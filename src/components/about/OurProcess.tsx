"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageCircle,
  Lightbulb,
  Wrench,
  CheckCircle,
  Car,
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Consultation",
    description:
      "Share your requirements with our expert team. We listen carefully to understand exactly what you need for your vehicle.",
    color: "#E9CC2F",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Recommendation",
    description:
      "We present tailored solutions — the right products, services, and packages that match your car and budget perfectly.",
    color: "#3B82F6",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Installation",
    description:
      "Our certified technicians carry out the work with precision and care, using only the finest materials available.",
    color: "#8B5CF6",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Quality Check",
    description:
      "Every job goes through a rigorous multi-point quality inspection before we consider it complete and client-ready.",
    color: "#10B981",
  },
  {
    number: "05",
    icon: Car,
    title: "Customer Delivery",
    description:
      "We hand back your vehicle in pristine condition — clean, detailed, and ready to impress — with full service documentation.",
    color: "#F59E0B",
  },
];

function ProcessStep({
  step,
  index,
  total,
}: {
  step: (typeof steps)[0];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = step.icon;

  return (
    <div ref={ref} className="relative flex-1 flex flex-col items-center">
      {/* Connector line - horizontal on desktop */}
      {index < total - 1 && (
        <div className="hidden lg:block absolute top-10 left-1/2 w-full h-px z-0">
          <motion.div
            className="h-full bg-gradient-to-r from-slate-200 to-slate-200"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
          {/* Animated dot */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{ backgroundColor: step.color }}
            initial={{ left: "0%", opacity: 0 }}
            animate={isInView ? { left: "100%", opacity: [0, 1, 1, 0] } : {}}
            transition={{ duration: 2, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}

      {/* Step circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
        className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
        style={{
          backgroundColor: `${step.color}15`,
          border: `2px solid ${step.color}40`,
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ backgroundColor: step.color }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>

        {/* Number badge */}
        <div
          className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#1A1A1A] text-white text-xs font-bold flex items-center justify-center"
        >
          {step.number}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.2, ease: "easeOut" }}
        className="text-center px-2"
      >
        <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{step.title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
      </motion.div>

      {/* Mobile connector - vertical */}
      {index < total - 1 && (
        <motion.div
          className="lg:hidden w-px h-10 my-4"
          style={{ backgroundColor: `${step.color}40` }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
        />
      )}
    </div>
  );
}

export default function OurProcess() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-20"
        >
          <motion.p
            variants={staggerItem}
            className="text-xs font-bold text-[#E9CC2F] uppercase tracking-[0.2em] mb-3"
          >
            How It Works
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4"
          >
            Our{" "}
            <span className="text-[#E9CC2F]">5-Step Process</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            A seamless, transparent process from first consultation to final
            delivery — designed around your convenience.
          </motion.p>
        </motion.div>

        {/* Desktop: horizontal / Mobile: vertical */}
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-4 items-start lg:items-start">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={index}
              total={steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
