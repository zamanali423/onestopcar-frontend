"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { slideInLeft, slideInRight, staggerContainer, staggerItem } from "@/lib/motion";

const milestones = [
  {
    year: "2014",
    title: "The Beginning",
    description:
      "Founded in a small workshop with a single mission: deliver premium automotive care that car enthusiasts actually deserve. Our founder, a lifelong car lover, started with hand-picked accessories and a passion for perfection.",
    icon: "🚗",
  },
  {
    year: "2017",
    title: "Growing Our Reach",
    description:
      "Expanded our product catalog to over 500 accessories and launched professional detailing services. Word spread fast — our 5-star service turned first-time customers into lifelong advocates.",
    icon: "📈",
  },
  {
    year: "2020",
    title: "Going National",
    description:
      "Launched nationwide delivery and our e-commerce platform, bringing premium automotive care to every corner of the country. Our team grew to 30+ certified professionals.",
    icon: "🌍",
  },
  {
    year: "2023",
    title: "Milestone Moments",
    description:
      "Crossed 25,000 happy customers and 15,000+ products sold. Became an authorized dealer for 12 premium automotive brands and earned multiple industry excellence awards.",
    icon: "🏆",
  },
  {
    year: "Today",
    title: "The Future",
    description:
      "We continue to push boundaries — expanding our PPF and ceramic coating expertise, opening new service centers, and building the ultimate one-stop destination for every car owner.",
    icon: "✨",
  },
];

function TimelineItem({
  item,
  index,
}: {
  item: (typeof milestones)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-6 md:gap-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className={`w-full md:w-5/12 ${
          isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
        } pl-12 md:pl-0`}
      >
        <div
          className={`inline-flex items-center gap-2 mb-3 ${
            isLeft ? "md:flex-row-reverse" : ""
          }`}
        >
          <span className="text-2xl">{item.icon}</span>
          <span className="text-xs font-bold text-[#E9CC2F] uppercase tracking-[0.15em] bg-[#E9CC2F]/10 px-3 py-1 rounded-full">
            {item.year}
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{item.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
      </motion.div>

      {/* Center line & dot */}
      <div className="absolute left-0 md:static md:w-2/12 flex justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          className="relative z-10 w-12 h-12 rounded-full bg-[#E9CC2F] flex items-center justify-center shadow-[0_0_0_6px_rgba(233,204,47,0.2)] flex-shrink-0"
        >
          <div className="w-4 h-4 rounded-full bg-[#1A1A1A]" />
        </motion.div>
      </div>

      {/* Spacer */}
      <div className="hidden md:block md:w-5/12" />
    </div>
  );
}

export default function OurStory() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={staggerContainer}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.p
            variants={staggerItem}
            className="text-xs font-bold text-[#E9CC2F] uppercase tracking-[0.2em] mb-3"
          >
            Our Journey
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4"
          >
            A Story Built on{" "}
            <span className="text-[#E9CC2F]">Passion</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            From a small workshop to a nationwide automotive brand — here&apos;s
            how we became the most trusted name in car care.
          </motion.p>
        </motion.div>

        {/* Alternating story section with image */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(16,24,40,0.12)]">
              <Image
                src="/images/story-image.jpg"
                alt="Our Story"
                width={640}
                height={480}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex gap-4">
                  {[
                    { n: "10+", l: "Years" },
                    { n: "25K+", l: "Customers" },
                    { n: "4.9★", l: "Rating" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-center"
                    >
                      <div className="text-lg font-bold text-[#E9CC2F]">{s.n}</div>
                      <div className="text-[10px] text-white/70 uppercase tracking-wide">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <p className="text-xs font-bold text-[#E9CC2F] uppercase tracking-[0.2em] mb-3">
              Est. 2014
            </p>
            <h3 className="text-3xl font-bold text-[#1A1A1A] mb-6">
              Driven by Passion, <br />Defined by Quality
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              One Stop Car was born from a simple frustration: finding
              genuinely premium automotive accessories was unnecessarily hard.
              Our founder, a passionate car enthusiast with over a decade in the
              automotive industry, decided to change that.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              What started as a curated selection of hand-picked accessories has
              grown into a full-service automotive destination — offering
              everything from exclusive accessories to professional-grade
              detailing, PPF, and ceramic coating services.
            </p>
            <div className="flex items-center gap-3 p-4 bg-[#E9CC2F]/8 rounded-xl border border-[#E9CC2F]/20">
              <div className="text-3xl">💛</div>
              <p className="text-sm text-slate-700 font-medium italic">
                &ldquo;Every car tells a story. We make sure yours is
                extraordinary.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E9CC2F]/60 via-[#E9CC2F]/30 to-transparent -translate-x-px md:-translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-16">
            {milestones.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
