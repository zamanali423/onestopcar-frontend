"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";

const brands = [
  { name: "3M", description: "Film & Protection" },
  { name: "Meguiar's", description: "Detailing" },
  { name: "Garmin", description: "Navigation" },
  { name: "Pioneer", description: "Car Audio" },
  { name: "Thule", description: "Roof Systems" },
  { name: "Turtle Wax", description: "Car Care" },
  { name: "AutoGlym", description: "Premium Care" },
  { name: "WeatherTech", description: "Interior" },
  { name: "NITTO", description: "Tyres" },
  { name: "Philips", description: "LED Lighting" },
  { name: "Bosch", description: "Auto Parts" },
  { name: "Kenwood", description: "Audio Systems" },
];

export default function BrandPartners() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <motion.p
            variants={staggerItem}
            className="text-xs font-bold text-[#E9CC2F] uppercase tracking-[0.2em] mb-3"
          >
            Trusted Partners
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4"
          >
            Our Brand{" "}
            <span className="text-[#E9CC2F]">Partners</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            We&apos;re proud authorized dealers and certified installers for
            the world&apos;s most respected automotive brands.
          </motion.p>
        </motion.div>

        {/* Brand grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: (index % 6) * 0.06,
              }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="group"
            >
              <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#E9CC2F]/40 hover:shadow-[0_8px_24px_rgba(233,204,47,0.12)] transition-all duration-300 h-full min-h-[90px]">
                {/* Brand name as styled text logo */}
                <span className="text-lg font-bold text-slate-400 group-hover:text-[#1A1A1A] transition-colors duration-300 text-center leading-tight">
                  {brand.name}
                </span>
                <span className="text-[10px] text-slate-400/60 group-hover:text-slate-500 mt-1 uppercase tracking-wider transition-colors duration-300">
                  {brand.description}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-6 pt-8 border-t border-slate-100"
        >
          {[
            "✅ Authorized Dealer",
            "🏅 Certified Installer",
            "🔒 100% Genuine Products",
            "🚚 Official Distributor",
          ].map((badge) => (
            <div
              key={badge}
              className="text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-5 py-2"
            >
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
