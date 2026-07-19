// src/components/shared/WhyChooseUs.tsx
"use client";

import { motion } from "framer-motion";
import {
    Car, Star, Truck, ShieldCheck, Headphones, Award,
    Wrench, Sparkles, BadgeCheck, Users, Tag
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Feature {
    icon: React.ReactNode;
    title: string;
    desc: string;
    color?: string;
}

interface WhyChooseUsProps {
    variant?: "default" | "features-only" | "with-chart";
    title?: string;
    subtitle?: string;
    features?: Feature[];
    className?: string;
}

const defaultFeatures: Feature[] = [
    {
        icon: <Car size={26} className="text-[#E9CC2F]" />,
        title: "Vehicle Specific",
        desc: "Products designed to fit your exact car model perfectly. No modifications needed.",
    },
    {
        icon: <Star size={26} className="text-[#E9CC2F]" />,
        title: "Premium Quality",
        desc: "We source only from certified manufacturers with proven quality standards.",
    },
    {
        icon: <Truck size={26} className="text-[#E9CC2F]" />,
        title: "Countrywide Delivery",
        desc: "Fast and reliable delivery to all major cities across Pakistan.",
    },
    {
        icon: <ShieldCheck size={26} className="text-[#E9CC2F]" />,
        title: "Trusted Shopping",
        desc: "Secure payment, easy returns, and genuine product guarantee on every order.",
    },
    {
        icon: <Headphones size={26} className="text-[#E9CC2F]" />,
        title: "Expert Support",
        desc: "Our car accessories experts are ready to help you find the perfect product.",
    },
    {
        icon: <Award size={26} className="text-[#E9CC2F]" />,
        title: "15+ Years Experience",
        desc: "Pakistan's most trusted car accessories store since 2008.",
    },
];

const aboutFeatures: Feature[] = [
    {
        icon: <Star size={26} className="text-[#E9CC2F]" />,
        title: "Premium Accessories",
        desc: "Curated collection of over 1,000+ genuine premium automotive accessories from world-renowned brands.",
        color: "#E9CC2F",
    },
    {
        icon: <BadgeCheck size={26} className="text-[#3B82F6]" />,
        title: "Certified Installation",
        desc: "Every installation is carried out by our certified technicians using industry-standard tools and techniques.",
        color: "#3B82F6",
    },
    {
        icon: <Sparkles size={26} className="text-[#8B5CF6]" />,
        title: "Professional Detailing",
        desc: "From basic wash to full ceramic coating, our detailing team delivers showroom-quality results every time.",
        color: "#8B5CF6",
    },
    {
        icon: <Truck size={26} className="text-[#10B981]" />,
        title: "Nationwide Delivery",
        desc: "Fast, insured delivery to every corner of the country. Same-day dispatch for most in-stock items.",
        color: "#10B981",
    },
    {
        icon: <ShieldCheck size={26} className="text-[#F59E0B]" />,
        title: "Warranty Support",
        desc: "All products and services come with comprehensive warranty and post-installation support you can count on.",
        color: "#F59E0B",
    },
    {
        icon: <Users size={26} className="text-[#EC4899]" />,
        title: "Expert Team",
        desc: "30+ certified automotive professionals with decades of combined experience serving car enthusiasts.",
        color: "#EC4899",
    },
    {
        icon: <Tag size={26} className="text-[#14B8A6]" />,
        title: "Affordable Prices",
        desc: "Premium doesn't have to mean unaffordable. We offer the best value without compromising on quality.",
        color: "#14B8A6",
    },
    {
        icon: <Wrench size={26} className="text-[#E9CC2F]" />,
        title: "Trusted Brand",
        desc: "10+ years of excellence, 25,000+ happy customers, and multiple industry awards speak for themselves.",
        color: "#E9CC2F",
    },
];

const chartData = [
    { month: "Jan", orders: 1200 },
    { month: "Feb", orders: 1800 },
    { month: "Mar", orders: 2200 },
    { month: "Apr", orders: 1900 },
    { month: "May", orders: 2800 },
    { month: "Jun", orders: 3200 },
    { month: "Jul", orders: 2900 },
    { month: "Aug", orders: 3800 },
    { month: "Sep", orders: 4200 },
    { month: "Oct", orders: 3900 },
    { month: "Nov", orders: 5100 },
    { month: "Dec", orders: 4800 },
];

export function WhyChooseUs({
    variant = "default",
    title = "Why Choose One Stop Car?",
    subtitle = "Pakistan's most trusted car accessories destination with over a decade of excellence",
    features,
    className = "",
}: WhyChooseUsProps) {
    const featureItems = features || (variant === "features-only" ? aboutFeatures : defaultFeatures);
    const isFeaturesOnly = variant === "features-only";
    const hasChart = variant === "with-chart" || variant === "default";

    if (isFeaturesOnly) {
        return (
            <section className={`py-24 bg-slate-50 overflow-hidden ${className}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            Why Us
                        </motion.p>
                        <motion.h2
                            variants={staggerItem}
                            className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4"
                        >
                            Why Choose <span className="text-[#E9CC2F]">One Stop Car</span>?
                        </motion.h2>
                        <motion.p
                            variants={staggerItem}
                            className="text-lg text-slate-500 max-w-2xl mx-auto"
                        >
                            {subtitle}
                        </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featureItems.map((feature, index) => {
                            return (
                                <motion.div
                                    key={feature.title}
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
                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{
                                            background: `radial-gradient(circle at 50% 0%, ${feature.color || "#E9CC2F"}25, transparent 70%)`,
                                        }}
                                    />

                                    <div className="relative rounded-2xl bg-white border border-slate-200 group-hover:border-transparent p-6 h-full transition-all duration-300 shadow-[0_2px_12px_rgba(16,24,40,0.06)] group-hover:shadow-[0_12px_40px_rgba(16,24,40,0.12)]">
                                        <div
                                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                            style={{
                                                boxShadow: `inset 0 0 0 1.5px ${feature.color || "#E9CC2F"}50`,
                                            }}
                                        />

                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                                            style={{ backgroundColor: `${feature.color || "#E9CC2F"}15` }}
                                        >
                                            {feature.icon}
                                        </div>

                                        <h3 className="text-base font-bold text-[#1A1A1A] mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            {feature.desc}
                                        </p>

                                        <div
                                            className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            style={{ backgroundColor: feature.color || "#E9CC2F" }}
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`py-16 bg-white ${className}`}>
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-3">
                        {title.split(" ").map((word, i) =>
                            word === "One" ? (
                                <span key={i} className="text-[#E9CC2F]">{word} </span>
                            ) : word === "Stop" ? (
                                <span key={i} className="text-[#E9CC2F]">{word} </span>
                            ) : word === "Car?" ? (
                                <span key={i} className="text-[#E9CC2F]">{word} </span>
                            ) : (
                                <span key={i}>{word} </span>
                            )
                        )}
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {featureItems.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[#F8FAFC] rounded-2xl p-5 hover:shadow-md transition-all border border-gray-100 hover:border-[#E9CC2F]/30"
                            >
                                <div className="feature-icon mb-3">{f.icon}</div>
                                <h3 className="font-black text-[#1A1A1A] text-base mb-1.5">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {hasChart && (
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#1A1A1A] rounded-2xl p-6"
                        >
                            <h3 className="text-white font-black text-xl mb-1">Monthly Orders Growth</h3>
                            <p className="text-gray-400 text-sm mb-6">Consistent growth in customer trust</p>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                                    <XAxis dataKey="month" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                                    <YAxis tick={{ fill: "#9ca3af", fontSize: 11 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "#2d2d2d",
                                            border: "1px solid #E9CC2F",
                                            borderRadius: "8px",
                                            color: "#fff",
                                        }}
                                    />
                                    <Bar dataKey="orders" fill="#E9CC2F" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                {[
                                    { label: "Total Orders", value: "38K+" },
                                    { label: "Satisfaction", value: "98%" },
                                    { label: "Cities", value: "120+" },
                                ].map((s) => (
                                    <div key={s.label} className="text-center">
                                        <div className="text-[#E9CC2F] font-black text-2xl">{s.value}</div>
                                        <div className="text-gray-400 text-xs">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}