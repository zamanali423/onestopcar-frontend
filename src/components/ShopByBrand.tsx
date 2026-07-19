"use client";

import { motion } from "framer-motion";
import { Tag, ArrowRight } from "lucide-react";

const brands = [
  { name: "Daewoo", country: "Korea", products: 145, color: "#003087" },
  { name: "3M", country: "USA", products: 280, color: "#FF0000" },
  { name: "Meguiar's", country: "USA", products: 98, color: "#002868" },
  { name: "Turtle Wax", country: "USA", products: 76, color: "#1B4D3E" },
  { name: "AutoGlym", country: "UK", products: 54, color: "#C41E3A" },
  { name: "Sonax", country: "Germany", products: 67, color: "#0066CC" },
  { name: "Rain-X", country: "USA", products: 43, color: "#1A5276" },
  { name: "WD-40", country: "USA", products: 32, color: "#003366" },
  { name: "Armor All", country: "USA", products: 89, color: "#CC0000" },
  { name: "Chemical Guys", country: "USA", products: 112, color: "#2E86AB" },
  { name: "Mothers", country: "USA", products: 78, color: "#E74C3C" },
  { name: "Gtechniq", country: "UK", products: 45, color: "#1A1A2E" },
];

export default function ShopByBrand() {
  return (
    <section id="brands" className="py-16 bg-[#F8FAFC] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 mb-3 bg-[#E9CC2F]/15 px-4 py-1.5 rounded-full">
            <Tag size={16} className="text-[#B69E24]" />
            <span className="text-[#B69E24] font-bold text-sm uppercase tracking-wide">
              Top Brands
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A]">
            Shop by{" "}
            <span className="text-[#E9CC2F]">Brand</span>
          </h2>
          <p className="text-gray-500 mt-3">Authentic products from world-renowned brands</p>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="brand-logo-box group flex flex-col items-center gap-2 cursor-pointer w-full"
            >
              {/* Brand Logo Placeholder */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xs mb-2 mx-auto group-hover:scale-110 transition-transform flex-shrink-0"
                style={{ backgroundColor: brand.color }}
              >
                {brand.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="text-center w-full overflow-hidden">
                <div className="text-xs font-black text-[#1A1A1A] leading-tight truncate w-full">
                  {brand.name}
                </div>
                <div className="text-[9px] text-gray-400 font-medium truncate">{brand.country}</div>
                <div className="text-[9px] text-[#E9CC2F] font-bold mt-0.5">
                  {brand.products} items
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <button className="btn-dark">
            View All Brands <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}