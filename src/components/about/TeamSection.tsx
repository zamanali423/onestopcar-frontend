"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Phone,
  Mail,
  ExternalLink,
  Globe,
  Link,
  Share2,
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const team = [
  {
    name: "Rahul Sharma",
    role: "Founder & CEO",
    experience: "15+ Years Experience",
    intro:
      "A lifelong car enthusiast who turned his passion into a premier automotive brand. Rahul leads vision, strategy, and quality across every division.",
    avatar: "RS",
    color: "#E9CC2F",
    phone: "tel:+60123456789",
    email: "mailto:rahul@onestopcar.com",
    profile: "/team/rahul",
    socials: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Priya Patel",
    role: "Head of Detailing",
    experience: "12+ Years Experience",
    intro:
      "Certified master detailer and PPF specialist. Priya leads our detailing team with an obsession for perfection in every coat, cut, and finish.",
    avatar: "PP",
    color: "#3B82F6",
    phone: "tel:+60123456790",
    email: "mailto:priya@onestopcar.com",
    profile: "/team/priya",
    socials: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Arjun Mehta",
    role: "Accessories Director",
    experience: "10+ Years Experience",
    intro:
      "Product expert and brand curator with deep knowledge of global automotive accessory trends. Arjun hand-selects every product in our catalog.",
    avatar: "AM",
    color: "#8B5CF6",
    phone: "tel:+60123456791",
    email: "mailto:arjun@onestopcar.com",
    profile: "/team/arjun",
    socials: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Siti Aminah",
    role: "Customer Experience",
    experience: "8+ Years Experience",
    intro:
      "Dedicated to creating seamless, delightful customer journeys. Siti ensures every interaction with One Stop Car exceeds expectations.",
    avatar: "SA",
    color: "#10B981",
    phone: "tel:+60123456792",
    email: "mailto:siti@onestopcar.com",
    profile: "/team/siti",
    socials: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
    },
  },
];

function TeamCard({
  member,
  index,
}: {
  member: (typeof team)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative"
    >
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-[0_2px_12px_rgba(16,24,40,0.06)] group-hover:shadow-[0_16px_48px_rgba(16,24,40,0.12)] transition-all duration-300">
        {/* Avatar area */}
        <div
          className="relative h-52 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: `${member.color}12` }}
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle, ${member.color} 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Avatar initials */}
          <motion.div
            animate={hovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-28 h-28 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-xl"
            style={{ backgroundColor: member.color }}
          >
            {member.avatar}
          </motion.div>

          {/* Experience badge */}
          <div
            className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold border"
            style={{
              backgroundColor: `${member.color}20`,
              borderColor: `${member.color}40`,
              color: member.color,
            }}
          >
            {member.experience}
          </div>

          {/* Social icons overlay */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 flex gap-2"
          >
            {[
              { Icon: Globe, href: member.socials.instagram, label: "Instagram" },
              { Icon: Link, href: member.socials.linkedin, label: "LinkedIn" },
              { Icon: Share2, href: member.socials.twitter, label: "Share" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors duration-200 shadow-sm"
              >
                <Icon className="w-3.5 h-3.5 text-[#1A1A1A]" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{member.name}</h3>
          <p
            className="text-sm font-semibold mb-3"
            style={{ color: member.color }}
          >
            {member.role}
          </p>
          <p className="text-sm text-slate-500 leading-relaxed mb-5">
            {member.intro}
          </p>

          {/* Action buttons */}
          <div className="flex gap-2">
            <a
              href={member.phone}
              aria-label={`Call ${member.name}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 hover:border-[#E9CC2F] hover:bg-[#E9CC2F]/5 transition-all duration-200 text-xs font-semibold text-slate-600 hover:text-[#1A1A1A]"
            >
              <Phone className="w-3.5 h-3.5" />
              Call
            </a>
            <a
              href={member.email}
              aria-label={`Email ${member.name}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 hover:border-[#E9CC2F] hover:bg-[#E9CC2F]/5 transition-all duration-200 text-xs font-semibold text-slate-600 hover:text-[#1A1A1A]"
            >
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
            <a
              href={member.profile}
              aria-label={`View ${member.name}'s profile`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-200 hover:border-[#E9CC2F] hover:bg-[#E9CC2F]/5 transition-all duration-200 text-xs font-semibold text-slate-600 hover:text-[#1A1A1A]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Profile
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
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
            Our People
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4"
          >
            Meet the{" "}
            <span className="text-[#E9CC2F]">Dream Team</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Behind every premium service is a team of passionate automotive
            professionals committed to excellence.
          </motion.p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
