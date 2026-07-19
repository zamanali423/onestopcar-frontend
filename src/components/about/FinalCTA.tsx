"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/lib/motion";

export default function FinalCTA() {
  return (
    <section className="relative py-28 bg-[#1A1A1A] overflow-hidden">
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(233,204,47,0.10) 0%, transparent 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(233,204,47,1) 1px, transparent 1px), linear-gradient(90deg, rgba(233,204,47,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating rings */}
      {[400, 600, 800].map((size, i) => (
        <motion.div
          key={size}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E9CC2F]/10 pointer-events-none"
          style={{ width: size, height: size }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Badge */}
          <motion.div variants={staggerItem} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E9CC2F]/10 border border-[#E9CC2F]/25 text-[#E9CC2F] text-xs font-bold uppercase tracking-widest">
              ✨ Premium Automotive Care
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={staggerItem}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] mb-6"
          >
            Ready to{" "}
            <span className="text-[#E9CC2F]">Upgrade</span>
            <br />
            Your Car?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={staggerItem}
            className="text-md sm:text-lg text-white/55 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Join 25,000+ satisfied customers who trust One Stop Car for
            premium accessories, professional detailing, and expert
            installation. Your dream car experience starts here.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#E9CC2F] text-[#1A1A1A] font-bold text-base shadow-[0_8px_30px_rgba(233,204,47,0.4)] hover:bg-[#F5D730] hover:shadow-[0_12px_40px_rgba(233,204,47,0.55)] transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                href="/booking"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white/8 border border-white/20 text-white font-semibold text-base hover:bg-white/15 hover:border-[#E9CC2F]/50 transition-all duration-300 backdrop-blur-sm"
              >
                <CalendarDays className="w-4 h-4" />
                Book Appointment
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <a
                href="tel:+60123456789"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-white/8 border border-white/20 text-white font-semibold text-base hover:bg-white/15 hover:border-[#E9CC2F]/50 transition-all duration-300 backdrop-blur-sm"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <a
                href="https://wa.me/60123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-semibold text-base hover:bg-[#25D366]/25 hover:border-[#25D366]/60 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={staggerItem}
            className="mt-14 flex flex-wrap justify-center gap-8 text-white/30 text-xs font-semibold uppercase tracking-widest"
          >
            {[
              "✅ 10+ Years Experience",
              "🚚 Free Delivery on Orders 200+",
              "🏅 4.9★ Rating",
              "🔒 100% Genuine Products",
            ].map((trust) => (
              <span key={trust}>{trust}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
