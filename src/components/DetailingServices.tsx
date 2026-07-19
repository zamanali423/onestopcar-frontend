"use client";

import { motion } from "framer-motion";
import { Shield, Star, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ppfPackages = [
  {
    name: "Basic PPF",
    coverage: "Hood Only",
    price: "25,000",
    features: ["Hood Protection", "3M Premium Film", "5 Year Warranty", "UV Protection"],
    popular: false,
    color: "#1A1A1A",
  },
  {
    name: "Standard PPF",
    coverage: "Front End",
    price: "55,000",
    features: [
      "Hood + Fenders",
      "Side Mirrors",
      "3M Premium Film",
      "7 Year Warranty",
      "Self Healing",
    ],
    popular: true,
    color: "#E9CC2F",
  },
  {
    name: "Full PPF",
    coverage: "Full Car",
    price: "120,000",
    features: [
      "Entire Vehicle",
      "3M Premium Film",
      "10 Year Warranty",
      "Self Healing",
      "Hydrophobic",
      "UV + Scratch",
    ],
    popular: false,
    color: "#1A1A1A",
  },
];

export default function DetailingServices() {
  const router = useRouter();
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3 bg-[#E9CC2F]/15 px-4 py-1.5 rounded-full">
            <Sparkles size={16} className="text-[#B69E24]" />
            <span className="text-[#B69E24] font-bold text-sm uppercase tracking-wide">
              Professional Services
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-3">
            Professional Car Detailing &{" "}
            <span className="text-[#E9CC2F]">Paint Protection</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We offer world-class car detailing and paint protection services. Our certified
            technicians use premium products to deliver showroom results.
          </p>
        </motion.div>

        {/* Two Services */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {/* Car Detailing */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            <Image
              src="https://images.pexels.com/photos/14908957/pexels-photo-14908957.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700"
              alt="Professional Car Detailing"
              width={700}
              height={420}
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <div className="inline-flex items-center gap-1 bg-[#E9CC2F] text-[#1A1A1A] text-xs font-black px-3 py-1 rounded-full mb-3">
                <Star size={11} fill="#1A1A1A" /> Top Rated Service
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Professional Car Detailing</h3>
              <p className="text-gray-300 text-sm mb-4">
                Complete interior & exterior cleaning with premium products. Your car restored to
                showroom condition.
              </p>
              <button
                onClick={() =>
                  window.open(
                    "https://wa.me/923000532034?text=Hello!%20I%20would%20like%20to%20book%20an%20appointment%20for%20car%20detailing.",
                    "_blank"
                  )
                }
                className="btn-primary text-sm py-2.5 px-5"
              >
                Book Now <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>

          {/* PPF */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden group cursor-pointer"
          >
            <Image
              src="https://images.pexels.com/photos/10126657/pexels-photo-10126657.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700"
              alt="PPF Paint Protection Film"
              width={700}
              height={420}
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <div className="inline-flex items-center gap-1 bg-[#E9CC2F] text-[#1A1A1A] text-xs font-black px-3 py-1 rounded-full mb-3">
                <Shield size={11} /> Premium Protection
              </div>
              <h3 className="text-2xl font-black text-white mb-2">PPF Paint Protection Film</h3>
              <p className="text-gray-300 text-sm mb-4">
                Invisible armor for your car. Self-healing film protects against scratches, chips,
                UV rays and more.
              </p>
              <button className="btn-primary text-sm py-2.5 px-5" onClick={() => router.push("/services/paint-protection-film")}>
                View PPF Packages <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* PPF Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <h3 className="text-2xl font-black text-[#1A1A1A] text-center mb-8">
            PPF Packages &amp;{" "}
            <span className="text-[#E9CC2F]">Pricing</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ppfPackages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`relative rounded-2xl p-6 border-2 transition-all ${pkg.popular
                  ? "border-[#E9CC2F] bg-[#1A1A1A] shadow-2xl scale-105"
                  : "border-gray-200 bg-white hover:border-[#E9CC2F]"
                  }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E9CC2F] text-[#1A1A1A] text-xs font-black px-4 py-1 rounded-full">
                    ⭐ Most Popular
                  </div>
                )}
                <div className="text-xs font-bold text-[#E9CC2F] uppercase tracking-widest mb-2">
                  {pkg.coverage}
                </div>
                <h4 className={`text-xl font-black mb-1 ${pkg.popular ? "text-white" : "text-[#1A1A1A]"}`}>
                  {pkg.name}
                </h4>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-xs text-gray-400">PKR</span>
                  <span className={`text-3xl font-black ${pkg.popular ? "text-[#E9CC2F]" : "text-[#1A1A1A]"}`}>
                    {pkg.price}
                  </span>
                </div>
                <div className="space-y-2.5 mb-6">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle size={15} className="text-[#E9CC2F] flex-shrink-0" />
                      <span className={`text-sm ${pkg.popular ? "text-gray-300" : "text-gray-600"}`}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${pkg.popular
                    ? "bg-[#E9CC2F] text-[#1A1A1A] hover:bg-[#B69E24]"
                    : "bg-[#1A1A1A] text-[#E9CC2F] hover:bg-[#E9CC2F] hover:text-[#1A1A1A]"
                    }`}
                >
                  Get This Package
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
