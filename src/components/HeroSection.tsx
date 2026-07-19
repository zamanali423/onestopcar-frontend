"use client";

import { motion } from "framer-motion";
import { ChevronRight, Star, Shield, Truck, Award } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const stats = [
  { value: "1K+", label: "Happy Customers" },
  { value: "1K+", label: "Products" },
  { value: "50+", label: "Car Models" },
  { value: "12+", label: "Years Experience" },
];

const badges = [
  { icon: <Shield size={16} />, text: "100% Genuine Products" },
  { icon: <Truck size={16} />, text: "Fast Nationwide Delivery" },
  { icon: <Award size={16} />, text: "Quality Guaranteed" },
];

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden bg-[#1A1A1A] min-h-[85vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #E9CC2F 0px, #E9CC2F 1px, transparent 0px, transparent 50%)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Yellow Glow */}
      <div className="absolute top-1/2 right-1/4 pointer-events-none w-96 h-96 bg-[#E9CC2F]/10 rounded-full blur-3xl transform -translate-y-1/2" />
      <div className="absolute bottom-0 left-1/4 pointer-events-none w-64 h-64 bg-[#E9CC2F]/5 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-20 w-full">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#E9CC2F]/20 border border-[#E9CC2F]/30 rounded-full px-4 py-1.5 text-[#E9CC2F] text-sm font-semibold mb-6"
            >
              <Star size={14} fill="#E9CC2F" />
              Pakistan&apos;s #1 Car Accessories Store
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-5"
            >
              Premium Car{" "}
              <span className="text-[#E9CC2F] relative">
                Accessories
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  fill="none"
                >
                  <path d="M0 3 Q100 0 200 3" stroke="#E9CC2F" strokeWidth="2.5" fill="none" />
                </svg>
              </span>{" "}
              <br />
              in Pakistan
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg"
            >
              Discover our vast collection of premium car accessories sun shades, seat covers, floor
              mats, PPF protection, and more. Find the perfect fit for your vehicle.
            </motion.p>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {badges.map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-gray-300 text-sm"
                >
                  <span className="text-[#E9CC2F]">{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button className="btn-primary text-base cursor-pointer hover:bg-amber-500/10 hover:text-amber-500" onClick={() => router.push("/shop")}>
                Shop Now <ChevronRight size={18} />
              </button>
              <button className="btn-dark text-base">Explore Services</button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center border-r border-white/10 last:border-0 pr-4 last:pr-0">
                  <div className="text-2xl md:text-3xl font-black text-[#E9CC2F]">{s.value}</div>
                  <div className="text-xs text-gray-400 font-medium">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Car Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/33345481/pexels-photo-33345481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Premium Sports Car"
                  width={700}
                  height={420}
                  className="w-full h-72 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent" />
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-2xl p-4 max-w-[180px]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-[#E9CC2F]/20 rounded-lg flex items-center justify-center">
                    <Shield size={16} className="text-[#B69E24]" />
                  </div>
                  <span className="text-xs font-bold text-[#1A1A1A]">PPF Protection</span>
                </div>
                <div className="text-[10px] text-gray-500">Advanced paint protection film</div>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-[#E9CC2F] rounded-xl shadow-2xl p-4"
              >
                <div className="text-2xl font-black text-[#1A1A1A]">1K+</div>
                <div className="text-xs font-semibold text-[#1A1A1A]/70">Products Sold</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
