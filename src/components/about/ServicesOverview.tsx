"use client";

import { motion } from "framer-motion";
import {
  Car,
  Shield,
  Droplets,
  Sofa,
  Zap,
  Music,
  Wrench,
  Sparkles,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";
import Link from "next/link";

const services = [
  {
    icon: Car,
    title: "Car Accessories",
    description:
      "Complete range of genuine car accessories — from exterior styling to interior comfort upgrades.",
    color: "#E9CC2F",
    bg: "#E9CC2F15",
    learnMore: "/services/accessories",
    book: "/booking?service=accessories",
  },
  {
    icon: Shield,
    title: "Paint Protection Film",
    description:
      "Military-grade PPF to protect your vehicle's paint from scratches, stone chips, and UV damage.",
    color: "#3B82F6",
    bg: "#3B82F615",
    learnMore: "/services/ppf",
    book: "/booking?service=ppf",
  },
  {
    icon: Sparkles,
    title: "Ceramic Coating",
    description:
      "Industry-leading ceramic coating for unmatched gloss, hydrophobic protection, and longevity.",
    color: "#8B5CF6",
    bg: "#8B5CF615",
    learnMore: "/services/ceramic",
    book: "/booking?service=ceramic",
  },
  {
    icon: Sofa,
    title: "Interior Detailing",
    description:
      "Deep clean, shampoo, leather conditioning, and sanitisation for a spotless, fresh interior.",
    color: "#10B981",
    bg: "#10B98115",
    learnMore: "/services/interior",
    book: "/booking?service=interior",
  },
  {
    icon: Droplets,
    title: "Exterior Detailing",
    description:
      "Hand wash, clay bar, polish, and wax for a mirror-finish exterior that turns heads.",
    color: "#06B6D4",
    bg: "#06B6D415",
    learnMore: "/services/exterior",
    book: "/booking?service=exterior",
  },
  {
    icon: Zap,
    title: "LED Installation",
    description:
      "Premium LED lighting upgrades — from headlights and DRLs to ambient interior lighting systems.",
    color: "#F59E0B",
    bg: "#F59E0B15",
    learnMore: "/services/led",
    book: "/booking?service=led",
  },
  {
    icon: Music,
    title: "Car Audio",
    description:
      "Custom car audio solutions including head units, amplifiers, subwoofers, and full sound deadening.",
    color: "#EC4899",
    bg: "#EC489915",
    learnMore: "/services/audio",
    book: "/booking?service=audio",
  },
  {
    icon: Wrench,
    title: "Custom Accessories",
    description:
      "Bespoke modifications tailored to your vision — body kits, wheels, spoilers, and more.",
    color: "#14B8A6",
    bg: "#14B8A615",
    learnMore: "/services/custom",
    book: "/booking?service=custom",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            What We Offer
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4"
          >
            Our Premium{" "}
            <span className="text-[#E9CC2F]">Services</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            From accessories to detailing, we offer everything your car needs
            under one roof — with the quality and care it deserves.
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: (index % 4) * 0.08,
                }}
                whileHover={{ y: -6 }}
                className="group relative"
              >
                <div className="relative rounded-2xl bg-white border border-slate-200 group-hover:border-transparent p-6 h-full flex flex-col transition-all duration-300 shadow-[0_2px_12px_rgba(16,24,40,0.06)] group-hover:shadow-[0_16px_48px_rgba(16,24,40,0.12)] overflow-hidden">
                  {/* Hover bg */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: service.bg }}
                  />
                  {/* Border glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${service.color}50` }}
                  />

                  {/* Icon */}
                  <div
                    className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: service.bg }}
                  >
                    <Icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>

                  {/* Content */}
                  <h3 className="relative z-10 text-base font-bold text-[#1A1A1A] mb-2">
                    {service.title}
                  </h3>
                  <p className="relative z-10 text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                    {service.description}
                  </p>

                  {/* Action buttons */}
                  <div className="relative z-10 flex gap-2">
                    <Link
                      href={service.learnMore}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-slate-200 hover:border-current text-xs font-semibold transition-all duration-200"
                      style={{ color: service.color }}
                      aria-label={`Learn more about ${service.title}`}
                    >
                      Learn More
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      href={service.book}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 text-white"
                      style={{ backgroundColor: service.color }}
                      aria-label={`Book ${service.title}`}
                    >
                      <CalendarDays className="w-3 h-3" />
                      Book
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
