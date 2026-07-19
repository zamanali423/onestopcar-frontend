"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const categories = ["All", "Workshop", "Accessories", "PPF", "Detailing", "Team"];

const galleryItems = [
  {
    id: 1,
    src: "/images/workshop-1.jpg",
    alt: "Professional car detailing workshop",
    category: "Workshop",
    title: "State-of-the-art Workshop",
    width: 800,
    height: 600,
  },
  {
    id: 2,
    src: "/images/workshop-2.jpg",
    alt: "Premium car accessories showroom",
    category: "Accessories",
    title: "Premium Accessories Showroom",
    width: 800,
    height: 600,
  },
  {
    id: 3,
    src: "/images/workshop-3.jpg",
    alt: "Luxury car interior detailing",
    category: "Detailing",
    title: "Interior Detailing Suite",
    width: 800,
    height: 600,
  },
  {
    id: 4,
    src: "/images/story-image.jpg",
    alt: "Our team at work",
    category: "Team",
    title: "Expert Team at Work",
    width: 800,
    height: 600,
  },
  {
    id: 5,
    src: "/images/about-hero-bg.jpg",
    alt: "Premium automotive workshop",
    category: "Workshop",
    title: "Premium Workshop Facility",
    width: 800,
    height: 600,
  },
  {
    id: 6,
    src: "/images/workshop-2.jpg",
    alt: "Ceramic coating application",
    category: "PPF",
    title: "PPF & Ceramic Application",
    width: 800,
    height: 600,
  },
];

export default function WorkshopGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + filtered.length) % filtered.length : null
    );
  const nextImage = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <motion.p
            variants={staggerItem}
            className="text-xs font-bold text-[#E9CC2F] uppercase tracking-[0.2em] mb-3"
          >
            Our Facility
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4"
          >
            Workshop{" "}
            <span className="text-[#E9CC2F]">Showcase</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            A look inside our state-of-the-art facility where every vehicle
            receives the premium treatment it deserves.
          </motion.p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#E9CC2F] border-[#E9CC2F] text-[#1A1A1A] shadow-[0_4px_16px_rgba(233,204,47,0.35)]"
                  : "bg-white border-slate-200 text-slate-600 hover:border-[#E9CC2F] hover:text-[#1A1A1A]"
              }`}
              type="button"
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Gallery grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-[0_4px_20px_rgba(16,24,40,0.08)]"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/50 transition-all duration-300" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#E9CC2F]/90 text-[#1A1A1A] text-xs font-bold">
                    {item.category}
                  </div>

                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-[#E9CC2F] flex items-center justify-center shadow-xl">
                      <ZoomIn className="w-5 h-5 text-[#1A1A1A]" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-semibold text-sm">{item.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                width={1200}
                height={900}
                className="w-full object-cover rounded-2xl"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white font-semibold">{filtered[lightboxIndex].title}</p>
              </div>
            </motion.div>

            {/* Controls */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              type="button"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              type="button"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              type="button"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
