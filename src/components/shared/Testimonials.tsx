// src/components/shared/Testimonials.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Star, Quote, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

interface Testimonial {
    id?: string;
    name: string;
    city: string;
    rating: number;
    date?: string;
    review: string;
    product: string;
    initials?: string;
    avatarColor?: string;
}

interface TestimonialsProps {
    variant?: "grid" | "carousel";
    title?: string;
    subtitle?: string;
    items?: Testimonial[];
    className?: string;
}

const defaultTestimonials: Testimonial[] = [
    {
        name: "Muhammad Asad",
        city: "Lahore",
        rating: 5,
        date: "2 weeks ago",
        review: "Absolutely amazing quality! Ordered sun shades for my Toyota Corolla and they fit perfectly. Fast delivery, great packaging. Will definitely order again!",
        product: "Magnetic Sun Shade",
        initials: "MA",
        avatarColor: "#E9CC2F",
    },
    {
        name: "Fatima Khan",
        city: "Karachi",
        rating: 5,
        date: "1 month ago",
        review: "Best car accessories shop in Pakistan! Got my Honda Civic leather seat covers and they look premium. Customer service was excellent too.",
        product: "Leather Seat Covers",
        initials: "FK",
        avatarColor: "#3B82F6",
    },
    {
        name: "Ahmed Raza",
        city: "Islamabad",
        rating: 5,
        date: "3 weeks ago",
        review: "PPF installation service is top-notch! The team was professional and the film quality is excellent. My car looks brand new. Highly recommended!",
        product: "PPF Installation",
        initials: "AR",
        avatarColor: "#10B981",
    },
    {
        name: "Sana Malik",
        city: "Rawalpindi",
        rating: 4,
        date: "2 months ago",
        review: "Great selection of products. Found the exact floor mats I needed for my KIA Sportage. Reasonably priced and good quality. Will shop again!",
        product: "Floor Mats Set",
        initials: "SM",
        avatarColor: "#8B5CF6",
    },
    {
        name: "Usman Ali",
        city: "Faisalabad",
        rating: 5,
        date: "1 week ago",
        review: "Ordered Daewoo wiper blades and they are brilliant! Easy to install, great visibility in rain. One Stop Car is my go-to for all car accessories.",
        product: "Daewoo Wiper Blades",
        initials: "UA",
        avatarColor: "#F59E0B",
    },
    {
        name: "Zainab Hussain",
        city: "Multan",
        rating: 5,
        date: "3 months ago",
        review: "The car detailing service was exceptional! They transformed my 5-year-old car to look brand new. Worth every rupee. Team was very professional.",
        product: "Car Detailing Service",
        initials: "ZH",
        avatarColor: "#EF4444",
    },
];

const carouselTestimonials: Testimonial[] = [
    {
        name: "Ahmad Faizal",
        city: "Kuala Lumpur",
        rating: 5,
        review: "Absolutely blown away by the ceramic coating job! My car looks better than the showroom. The team was professional, punctual, and the result exceeded every expectation. One Stop Car is now my go-to for everything automotive.",
        product: "Ceramic Coating Package",
        initials: "AF",
        avatarColor: "#E9CC2F",
    },
    {
        name: "Sarah Lim",
        city: "Petaling Jaya",
        rating: 5,
        review: "Ordered a full set of interior accessories and they arrived beautifully packaged the very next day. Installation was seamless and the quality is premium — you can feel the difference immediately. Highly recommended!",
        product: "Premium Interior Set",
        initials: "SL",
        avatarColor: "#3B82F6",
    },
    {
        name: "Rajesh Kumar",
        city: "Johor Bahru",
        rating: 5,
        review: "The PPF installation was flawless. I've had film done at other places before but this is on another level. The clarity, the fit, the finish — simply perfect. And the customer service was genuinely excellent throughout.",
        product: "Full Body PPF",
        initials: "RK",
        avatarColor: "#8B5CF6",
    },
    {
        name: "Nurul Huda",
        city: "Shah Alam",
        rating: 5,
        review: "Booked the full detailing package for my SUV and the transformation was incredible. Every inch of the interior was spotless, and the exterior had a mirror-like shine. Worth every ringgit and then some!",
        product: "Full Detail Package",
        initials: "NH",
        avatarColor: "#10B981",
    },
    {
        name: "David Tan",
        city: "Penang",
        rating: 5,
        review: "Fantastic experience from start to finish. The team was knowledgeable, the consultation was thorough, and the final result was outstanding. My car audio system has completely transformed my daily commute.",
        product: "Premium Car Audio System",
        initials: "DT",
        avatarColor: "#F59E0B",
    },
];

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={rating >= 4.5 ? 13 : 15}
                    className={i < Math.floor(rating) ? "fill-[#E9CC2F] text-[#E9CC2F]" : "text-gray-200"}
                />
            ))}
        </div>
    );
};

export function Testimonials({
    variant = "grid",
    title = "What Our Customers Say",
    subtitle = "Join thousands of satisfied customers who trust One Stop Car",
    items,
    className = "",
}: TestimonialsProps) {
    const testimonials = items || (variant === "carousel" ? carouselTestimonials : defaultTestimonials);
    const isCarousel = variant === "carousel";

    if (isCarousel) {
        return <TestimonialsCarousel items={testimonials as Testimonial[]} title={title} subtitle={subtitle} className={className} />;
    }

    return <TestimonialsGrid items={testimonials} title={title} subtitle={subtitle} className={className} />;
}

function TestimonialsGrid({ items, title, subtitle, className }: Omit<TestimonialsProps, "variant"> & { items: Testimonial[] }) {
    return (
        <section className={`py-16 bg-[#F8FAFC] ${className}`}>
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 mb-3 bg-[#E9CC2F]/15 px-4 py-1.5 rounded-full">
                        <MessageSquare size={16} className="text-[#B69E24]" />
                        <span className="text-[#B69E24] font-bold text-sm uppercase tracking-wide">
                            Customer Reviews
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] mb-3">
                        {title}
                    </h2>
                    <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-md border border-gray-100">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={18} fill="#E9CC2F" className="text-[#E9CC2F]" />
                            ))}
                        </div>
                        <span className="font-black text-[#1A1A1A] text-lg">4.9/5</span>
                        <span className="text-gray-500 text-sm">Based on 2,400+ reviews</span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#E9CC2F]/30 transition-all"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                                        style={{ backgroundColor: t.avatarColor || "#E9CC2F" }}
                                    >
                                        {t.initials || t.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="font-black text-[#1A1A1A] text-sm">{t.name}</div>
                                        <div className="text-xs text-gray-400">
                                            {t.city} {t.date && `· ${t.date}`}
                                        </div>
                                    </div>
                                </div>
                                <Quote size={22} className="text-[#E9CC2F] opacity-60 flex-shrink-0" />
                            </div>

                            <div className="flex mb-3">
                                {Array.from({ length: t.rating }).map((_, j) => (
                                    <Star key={j} size={13} fill="#E9CC2F" className="text-[#E9CC2F]" />
                                ))}
                                {Array.from({ length: 5 - t.rating }).map((_, j) => (
                                    <Star key={j} size={13} className="text-gray-200" />
                                ))}
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.review}</p>

                            <div className="inline-flex items-center gap-1.5 bg-[#E9CC2F]/10 text-[#B69E24] text-xs font-bold px-3 py-1 rounded-full">
                                <span>✓</span> Verified Purchase: {t.product}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function TestimonialsCarousel({ items, title, subtitle, className }: Omit<TestimonialsProps, "variant"> & { items: Testimonial[] }) {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((c) => (c + 1) % items.length);
    }, [items.length]);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((c) => (c - 1 + items.length) % items.length);
    }, [items.length]);

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    const slideVariants = {
        enter: (d: number) => ({ x: d > 0 ? 100 : -100, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -100 : 100, opacity: 0 }),
    };

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
                        Customer Stories
                    </motion.p>
                    <motion.h2
                        variants={staggerItem}
                        className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight mb-4"
                    >
                        What Our Customers <span className="text-[#E9CC2F]">Say</span>
                    </motion.h2>
                    <motion.p
                        variants={staggerItem}
                        className="text-lg text-slate-500 max-w-2xl mx-auto"
                    >
                        {subtitle || "Don't take our word for it — here's what 25,000+ satisfied customers have to say."}
                    </motion.p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="overflow-hidden rounded-3xl">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={current}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="relative bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_40px_rgba(16,24,40,0.10)]"
                            >
                                <div className="absolute top-8 right-8 md:top-12 md:right-12">
                                    <Quote className="w-10 h-10 text-[#E9CC2F]/20" />
                                </div>

                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="flex-shrink-0">
                                        <div
                                            className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                                            style={{ backgroundColor: items[current].avatarColor || "#E9CC2F" }}
                                        >
                                            {items[current].initials || items[current].name.slice(0, 2).toUpperCase()}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <StarRating rating={items[current].rating} />
                                        <blockquote className="mt-4 text-lg text-slate-700 leading-relaxed font-medium">
                                            &ldquo;{items[current].review}&rdquo;
                                        </blockquote>

                                        <div className="mt-6 flex flex-wrap gap-4 items-center">
                                            <div>
                                                <p className="font-bold text-[#1A1A1A]">{items[current].name}</p>
                                                <p className="text-sm text-slate-500">{items[current].city}</p>
                                            </div>
                                            <div className="flex items-center gap-2 px-4 py-2 bg-[#E9CC2F]/10 rounded-lg border border-[#E9CC2F]/20">
                                                <span className="text-xs text-slate-500">Purchased:</span>
                                                <span className="text-xs font-semibold text-[#1A1A1A]">
                                                    {items[current].product}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="flex items-center justify-between mt-8">
                        <button
                            onClick={prev}
                            className="w-12 h-12 rounded-full bg-white border border-slate-200 hover:border-[#E9CC2F] hover:bg-[#E9CC2F]/5 flex items-center justify-center transition-all duration-200 shadow-sm"
                            type="button"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="w-5 h-5 text-slate-600" />
                        </button>

                        <div className="flex gap-2">
                            {items.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setDirection(i > current ? 1 : -1);
                                        setCurrent(i);
                                    }}
                                    className={`rounded-full transition-all duration-300 ${i === current
                                            ? "w-8 h-2.5 bg-[#E9CC2F]"
                                            : "w-2.5 h-2.5 bg-slate-300 hover:bg-[#E9CC2F]/50"
                                        }`}
                                    type="button"
                                    aria-label={`Go to testimonial ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={next}
                            className="w-12 h-12 rounded-full bg-white border border-slate-200 hover:border-[#E9CC2F] hover:bg-[#E9CC2F]/5 flex items-center justify-center transition-all duration-200 shadow-sm"
                            type="button"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="w-5 h-5 text-slate-600" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}