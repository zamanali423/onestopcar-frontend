"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { staggerContainer, staggerItem } from "@/lib/motion";

const floatingShapes = [
  { size: 320, top: "-10%", left: "-5%", opacity: 0.06, delay: 0 },
  { size: 200, top: "60%", right: "-3%", opacity: 0.08, delay: 1.2 },
  { size: 140, top: "20%", right: "15%", opacity: 0.05, delay: 0.6 },
  { size: 100, bottom: "10%", left: "10%", opacity: 0.07, delay: 0.9 },
];

const sideStats = [
  { value: "10+", label: "Years" },
  { value: "25K+", label: "Customers" },
  { value: "4.9★", label: "Rating" },
];

export default function AboutHero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#1A1A1A]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-hero-bg.jpg"
          alt="One Stop Car Workshop"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/90 to-[#1A1A1A]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
      </div>

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(233,204,47,0.12) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(182,158,36,0.1) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating geometric shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#E9CC2F]/20 pointer-events-none"
          style={{
            width: shape.size,
            height: shape.size,
            top: "top" in shape ? shape.top : undefined,
            left: "left" in shape ? shape.left : undefined,
            right: "right" in shape ? shape.right : undefined,
            bottom: "bottom" in shape ? shape.bottom : undefined,
            opacity: shape.opacity,
          }}
          animate={{ y: [0, -20, 0], rotate: [0, 15, 0], scale: [1, 1.05, 1] }}
          transition={{
            duration: 7 + i * 1.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,204,47,1) 1px, transparent 1px), linear-gradient(90deg, rgba(233,204,47,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Breadcrumb */}
          <motion.nav
            variants={staggerItem}
            className="flex items-center gap-2 mb-8"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="text-sm text-white/50 hover:text-[#E9CC2F] transition-colors duration-200"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-sm text-[#E9CC2F] font-medium">
              About Us
            </span>
          </motion.nav>

          {/* Badge */}
          <motion.div variants={staggerItem} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E9CC2F]/10 border border-[#E9CC2F]/25 text-[#E9CC2F] text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Premium Automotive Brand
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-6"
          >
            About{" "}
            <span className="text-[#E9CC2F]">One Stop</span>
            <br />
            <span className="text-white/90">Car</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="text-lg sm:text-xl text-white/65 leading-relaxed max-w-2xl mb-10"
          >
            We help car owners enhance, protect, and personalize their vehicles
            with{" "}
            <span className="text-white/90 font-medium">premium accessories</span>{" "}
            and{" "}
            <span className="text-white/90 font-medium">professional detailing services</span>.
            Your car deserves the best — and so do you.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#E9CC2F] text-[#1A1A1A] font-bold text-base shadow-[0_8px_30px_rgba(233,204,47,0.35)] hover:bg-[#F5D730] hover:shadow-[0_12px_40px_rgba(233,204,47,0.5)] transition-all duration-300"
              >
                Explore Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/booking"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-white/8 border border-white/20 text-white font-semibold text-base backdrop-blur-sm hover:bg-white/15 hover:border-[#E9CC2F]/50 transition-all duration-300"
              >
                Book Detailing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div variants={staggerItem} className="mt-16 flex items-center gap-3">
            <motion.div
              className="w-px h-12 bg-gradient-to-b from-[#E9CC2F]/60 to-transparent"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-xs text-white/30 uppercase tracking-widest">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>

        {/* Right side stats strip */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6"
        >
          {sideStats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm w-20"
            >
              <div className="text-xl font-bold text-[#E9CC2F]">{stat.value}</div>
              <div className="text-[10px] text-white/40 uppercase tracking-wide mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
