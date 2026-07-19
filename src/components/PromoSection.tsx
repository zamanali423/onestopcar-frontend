"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight, Lightbulb, Droplets } from "lucide-react";
import Image from "next/image";

export default function PromoSection() {
  return (
    <section className="py-10 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Projector Headlights */}
          <div className="relative rounded-2xl overflow-hidden bg-[#1A1A1A] group cursor-pointer w-full">
            <Image
              src="https://images.pexels.com/photos/25189112/pexels-photo-25189112.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=700"
              alt="Premium Projector Headlights"
              width={700}
              height={300}
              className="w-full h-56 object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 flex items-center p-6 md:p-8">
              <div className="w-full max-w-full">
                <div className="inline-flex items-center gap-1.5 bg-[#E9CC2F] text-[#1A1A1A] text-[10px] font-black px-3 py-1 rounded-full mb-3">
                  <Zap size={11} /> New Arrivals
                </div>
                <h3 className="text-white font-black text-xl md:text-2xl mb-2 leading-tight">
                  Premium Projector Headlights
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  Superior Night Driving experience with advanced LED projector technology.
                </p>
                <button className="flex items-center gap-2 bg-[#E9CC2F] text-[#1A1A1A] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#B69E24] transition-colors">
                  Shop Now <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Wiper Blades Valinno */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#003087] to-[#001a52] group cursor-pointer w-full">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#E9CC2F]/10 rounded-full blur-3xl" />
            <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between min-h-[220px]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[#E9CC2F] font-black text-2xl md:text-3xl tracking-tighter mb-1">
                    VELINNO
                  </div>
                  <div className="text-white/60 text-xs font-medium tracking-widest uppercase">
                    Official Partner
                  </div>
                </div>
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Droplets size={26} className="text-[#E9CC2F]" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-black text-xl mb-1">Car Wiper Blades</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  Premium frameless wiper blades for crystal-clear visibility.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-[#E9CC2F] font-black text-2xl">PKR 1,200</div>
                  <div className="text-gray-500 line-through text-sm">PKR 1,800</div>
                  <div className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                    33% OFF
                  </div>
                </div>
                <button className="mt-3 flex items-center gap-2 bg-[#E9CC2F] text-[#1A1A1A] font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-[#B69E24] transition-colors" onClick={() => window.open("https://velinno.com/")}>
                  Go Velinno <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Wide Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#1A1A1A] via-[#2a2a2a] to-[#1A1A1A] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 w-full"
        >
          <div className="text-center md:text-left w-full md:w-auto">
            <div className="text-[#E9CC2F] text-xs font-black uppercase tracking-widest mb-1">
              Pakistan&apos;s Trusted Car Accessories Store
            </div>
            <h3 className="text-white font-black text-xl md:text-2xl lg:text-3xl">
              Over 10,000+ Products Available
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4 md:gap-6 text-center w-full md:w-auto flex-shrink-0">
            {[
              { val: "50K+", label: "Orders" },
              { val: "120+", label: "Cities" },
              { val: "98%", label: "Satisfied" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-[#E9CC2F] font-black text-xl md:text-2xl lg:text-3xl">{s.val}</div>
                <div className="text-gray-400 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
          <button className="btn-primary whitespace-nowrap w-full md:w-auto">
            View All Products <ArrowRight size={15} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}