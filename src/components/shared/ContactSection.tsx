// src/components/shared/ContactSection.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle, Navigation } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Enter a valid phone number"),
    email: z.string().email("Enter a valid email address"),
    subject: z.string().min(3, "Subject is required"),
    message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

interface ContactInfo {
    icon: React.ReactNode;
    label: string;
    value: string;
    sub: string;
    href?: string;
}

interface ContactSectionProps {
    variant?: "default" | "preview";
    className?: string;
}

const contactInfoDefault: ContactInfo[] = [
    {
        icon: <Phone size={20} />,
        label: "Phone / WhatsApp",
        value: "+92 300 0532034",
        sub: "Mon-Sat, 9AM - 10PM",
        href: "tel:+923000532034",
    },
    {
        icon: <Mail size={20} />,
        label: "Email",
        value: "sales@onestop.net",
        sub: "Reply within 24 hours",
        href: "mailto:sales@onestop.net",
    },
    {
        icon: <MapPin size={20} />,
        label: "Address",
        value: "Main Entrance, G Mangolia Park",
        sub: "Leopard Head Office, Near GT Rd, Gujranwala",
        href:"https://maps.google.com/?q=Main+Entrance,+G+Mangolia+Park,+Gujranwala+Pakistan",
    },
];

export function ContactSection({ variant = "default", className = "" }: ContactSectionProps) {
    const [submitted, setSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

    const onSubmit = async (data: ContactForm) => {
        console.log(data);
        await new Promise((r) => setTimeout(r, 1000));
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 4000);
    };

    const isPreview = variant === "preview";

    if (isPreview) {
        return (
            <section className="py-20 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                            Find Us
                        </motion.p>
                        <motion.h2
                            variants={staggerItem}
                            className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4"
                        >
                            Get in <span className="text-[#E9CC2F]">Touch</span>
                        </motion.h2>
                        <motion.p
                            variants={staggerItem}
                            className="text-lg text-slate-500 max-w-2xl mx-auto"
                        >
                            Visit our workshop, call us, or drop an email. Our team is ready to
                            assist you with anything your car needs.
                        </motion.p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-10 items-start">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {contactInfoDefault.map((info, index) => {
                                const content = (
                                    <motion.div
                                        key={info.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{
                                            duration: 0.5,
                                            ease: "easeOut",
                                            delay: index * 0.08,
                                        }}
                                        whileHover={info.href ? { y: -4 } : {}}
                                        className="group"
                                    >
                                        <div className="h-full p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#E9CC2F]/40 hover:shadow-[0_8px_24px_rgba(233,204,47,0.10)] transition-all duration-300">
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                                style={{ backgroundColor: `${info.label === "Phone / WhatsApp" ? "#E9CC2F" : info.label === "Email" ? "#3B82F6" : "#10B981"}15` }}
                                            >
                                                {info.icon}
                                            </div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                                {info.label}
                                            </p>
                                            <p className="font-semibold text-[#1A1A1A] text-sm leading-snug">
                                                {info.value}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">{info.sub}</p>
                                        </div>
                                    </motion.div>
                                );

                                return info.href ? (
                                    <a key={info.label} href={info.href} target={info.href.startsWith("https") ? "_blank" : undefined} rel="noopener noreferrer">
                                        {content}
                                    </a>
                                ) : (
                                    <div key={info.label}>{content}</div>
                                );
                            })}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="sm:col-span-2 flex gap-3"
                            >
                                <a
                                    href="https://maps.google.com/?q=Main+Entrance,+G+Mangolia+Park,+Gujranwala+Pakistan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#E9CC2F] text-[#1A1A1A] font-bold text-sm hover:bg-[#F5D730] transition-colors duration-200 shadow-[0_4px_16px_rgba(233,204,47,0.3)]"
                                >
                                    <Navigation className="w-4 h-4" />
                                    Get Directions
                                </a>
                                <a
                                    href="/contact"
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 border-[#1A1A1A] text-[#1A1A1A] font-bold text-sm hover:bg-[#1A1A1A] hover:text-white transition-all duration-200"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Contact Us
                                </a>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_8px_32px_rgba(16,24,40,0.08)] bg-slate-100 h-96">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center">
                                    <div className="absolute inset-0 opacity-20">
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-full h-px bg-slate-400"
                                                style={{ top: `${(i + 1) * 12}%` }}
                                            />
                                        ))}
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute h-full w-px bg-slate-400"
                                                style={{ left: `${(i + 1) * 12}%` }}
                                            />
                                        ))}
                                    </div>
                                    <div className="absolute inset-0 opacity-30">
                                        <div className="absolute w-full h-1.5 bg-white top-1/2 -translate-y-1/2" />
                                        <div className="absolute h-full w-1.5 bg-white left-1/2 -translate-x-1/2" />
                                        <div className="absolute w-2/3 h-1 bg-white/70 top-1/3 left-10 rotate-12" />
                                        <div className="absolute w-1/2 h-1 bg-white/70 bottom-1/4 right-0 -rotate-6" />
                                    </div>
                                    <motion.div
                                        animate={{ y: [0, -6, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative z-10 flex flex-col items-center"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-[#E9CC2F] shadow-[0_8px_24px_rgba(233,204,47,0.5)] flex items-center justify-center">
                                            <MapPin className="w-7 h-7 text-[#1A1A1A]" />
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-[#E9CC2F]/40 mt-1" />
                                    </motion.div>
                                    <p className="relative z-10 mt-4 text-sm font-semibold text-slate-600">
                                        One Stop Car Workshop
                                    </p>
                                    <p className="relative z-10 text-xs text-slate-400 mt-0.5">
                                        Main Entrance, G Mangolia Park, Gujranwala
                                    </p>
                                </div>
                                <a
                                    href="https://maps.google.com/?q=Main+Entrance,+G+Mangolia+Park,+Gujranwala+Pakistan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/10"
                                >
                                    <span className="px-4 py-2 bg-white rounded-full text-xs font-bold text-[#1A1A1A] shadow-lg">
                                        Open in Google Maps →
                                    </span>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={`py-16 bg-[#1A1A1A] ${className}`}>
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 mb-3 bg-[#E9CC2F]/20 px-4 py-1.5 rounded-full">
                        <MessageSquare size={16} className="text-[#E9CC2F]" />
                        <span className="text-[#E9CC2F] font-bold text-sm uppercase tracking-wide">
                            Get In Touch
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
                        Talk With Our <span className="text-[#E9CC2F]">Team Representative</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Have questions? Our car experts are ready to help you find the perfect accessories for
                        your vehicle.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-5 mb-8">
                            {contactInfoDefault.map((info) => (
                                <div
                                    key={info.label}
                                    className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#E9CC2F]/40 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-[#E9CC2F]/20 rounded-xl flex items-center justify-center text-[#E9CC2F] flex-shrink-0">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-400 font-medium">{info.label}</div>
                                        <div className="text-white font-bold text-sm">{info.value}</div>
                                        <div className="text-[10px] text-gray-500">{info.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a
                            href="https://wa.me/923000532034?text=I%20want%20to%20get%20in%20touch%20with%20you."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all text-base"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                <path d="M11.998 2.003C6.476 2.003 2 6.479 2 12.001c0 1.762.461 3.418 1.268 4.858L2.006 22l5.288-1.243C8.67 21.54 10.29 22 11.998 22c5.522 0 9.998-4.476 9.998-9.999 0-5.524-4.476-9.998-9.998-9.998zm0 18.257c-1.59 0-3.156-.442-4.511-1.275l-.324-.19-3.136.737.77-3.039-.209-.339C3.538 14.848 3 13.463 3 12.001 3 7.031 7.031 3 11.998 3 16.965 3 21 7.031 21 12.001c0 4.967-4.035 8.259-9.002 8.259z" />
                            </svg>
                            Chat on WhatsApp
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle size={32} className="text-green-400" />
                                    </div>
                                    <h3 className="text-white font-black text-xl mb-2">Message Sent!</h3>
                                    <p className="text-gray-400">Our team will get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-gray-400 font-bold mb-1.5 block">
                                                Full Name *
                                            </label>
                                            <input
                                                {...register("name")}
                                                placeholder="Muhammad Ali"
                                                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E9CC2F] transition-colors"
                                            />
                                            {errors.name && (
                                                <p className="text-red-400 text-[10px] mt-1">{errors.name.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-400 font-bold mb-1.5 block">
                                                Phone *
                                            </label>
                                            <input
                                                {...register("phone")}
                                                placeholder="+92 300 1234567"
                                                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E9CC2F] transition-colors"
                                            />
                                            {errors.phone && (
                                                <p className="text-red-400 text-[10px] mt-1">{errors.phone.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 font-bold mb-1.5 block">Email *</label>
                                        <input
                                            {...register("email")}
                                            placeholder="your@email.com"
                                            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E9CC2F] transition-colors"
                                        />
                                        {errors.email && (
                                            <p className="text-red-400 text-[10px] mt-1">{errors.email.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 font-bold mb-1.5 block">
                                            Subject *
                                        </label>
                                        <input
                                            {...register("subject")}
                                            placeholder="I need help finding accessories for..."
                                            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E9CC2F] transition-colors"
                                        />
                                        {errors.subject && (
                                            <p className="text-red-400 text-[10px] mt-1">{errors.subject.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 font-bold mb-1.5 block">
                                            Message *
                                        </label>
                                        <textarea
                                            {...register("message")}
                                            rows={4}
                                            placeholder="Tell us about your car model and what you're looking for..."
                                            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#E9CC2F] transition-colors resize-none"
                                        />
                                        {errors.message && (
                                            <p className="text-red-400 text-[10px] mt-1">{errors.message.message}</p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full btn-primary justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-4 h-4 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin" />
                                                Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Send size={16} /> Send Message
                                            </span>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}