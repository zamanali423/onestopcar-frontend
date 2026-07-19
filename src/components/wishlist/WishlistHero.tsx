"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Heart, Sparkles, Home } from "lucide-react";
import Image from "next/image";

const floatingShapes = [
  { size: 280, top: "-8%", right: "-3%", opacity: 0.05, delay: 0 },
  { size: 180, top: "55%", left: "-2%", opacity: 0.06, delay: 1.2 },
  { size: 120, top: "15%", left: "20%", opacity: 0.04, delay: 0.6 },
  { size: 90, bottom: "12%", right: "15%", opacity: 0.05, delay: 0.9 },
];

export function WishlistHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-[#1A1A1A]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-hero-bg.jpg"
          alt="One Stop Car - Premium Car Accessories"
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/95 to-[#1A1A1A]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
      </div>

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(233,204,47,0.10) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(182,158,36,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Floating geometric shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#E9CC2F]/15 pointer-events-none"
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
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,204,47,1) 1px, transparent 1px), linear-gradient(90deg, rgba(233,204,47,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center gap-1.5 text-sm"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="flex items-center gap-1 text-white/40 hover:text-white/70 transition-colors"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-white/20" />
          <span className="text-[#E9CC2F] font-medium">Wishlist</span>
        </motion.nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E9CC2F]/20 bg-[#E9CC2F]/10 px-4 py-2"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#E9CC2F]" />
              <span className="text-xs font-medium text-[#E9CC2F] uppercase tracking-widest">
                Your Collection
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight"
            >
              My{" "}
              <span className="text-[#E9CC2F]">Wishlist</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-4 text-base md:text-lg text-white/60 max-w-xl leading-relaxed"
            >
              Save your favorite automotive accessories and purchase them anytime.
              Your curated collection of premium car parts and accessories.
            </motion.p>
          </div>

          {/* Decorative heart icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#E9CC2F]/20 blur-2xl animate-pulse" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#E9CC2F]/20 bg-[#E9CC2F]/10 backdrop-blur-sm">
                <Heart className="h-10 w-10 text-[#E9CC2F]" fill="currentColor" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
          className="mt-10 h-px bg-gradient-to-r from-transparent via-[#E9CC2F]/20 to-transparent origin-left"
        />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex items-center gap-3"
        >
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-[#E9CC2F]/50 to-transparent"
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-xs text-white/30 uppercase tracking-widest">
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
}