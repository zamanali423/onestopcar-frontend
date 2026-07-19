"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail,
    Phone,
    CheckCircle,
    Package,
    Shield,
    Truck,
    Headphones,
    ArrowRight,
    Search,
    Clock,
    MapPin,
    CreditCard
} from "lucide-react";
import TrackOrderHero from "@/components/track-order/TrackOrderHero";
import TrackOrderForm from "@/components/track-order/TrackOrderForm";
import OrderTimeline from "@/components/track-order/OrderTimeline";
import OrderSummary from "@/components/track-order/OrderSummary";
import OrderProducts from "@/components/track-order/OrderProducts";
import ShippingCard from "@/components/track-order/ShippingCard";
import OrderActivity from "@/components/track-order/OrderActivity";
import OrderActions from "@/components/track-order/OrderActions";
import EmptyState from "@/components/track-order/EmptyState";
import LoadingState from "@/components/track-order/LoadingState";
import { findOrder, type MockOrder } from "@/lib/mock/orders";

type PageState = "idle" | "loading" | "found" | "not_found";

export default function TrackOrderPage() {
    const [pageState, setPageState] = useState<PageState>("idle");
    const [order, setOrder] = useState<MockOrder | null>(null);
    const [error, setError] = useState<string | null>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    const handleSearch = useCallback(
        async (orderNumber: string, emailOrPhone: string) => {
            setPageState("loading");
            setError(null);
            setOrder(null);

            const response = await findOrder(orderNumber, emailOrPhone);

            if (response.data) {
                setOrder(response.data);
                setPageState("found");

                setTimeout(() => {
                    resultsRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }, 100);
            } else {
                setPageState("not_found");
                setError(
                    response.message ||
                    "No order found with the provided order number and contact details."
                );

                setTimeout(() => {
                    resultsRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }, 100);
            }
        },
        []
    );

    const handleTrackAgain = useCallback(() => {
        setPageState("idle");
        setOrder(null);
        setError(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="min-h-screen bg-[#111111]">
            {/* Hero */}
            <TrackOrderHero />

            {/* Search form — always visible when not in found state */}
            <AnimatePresence>
                {(pageState === "idle" ||
                    pageState === "loading" ||
                    pageState === "not_found") && (
                        <motion.div
                            key="form"
                            className="py-8"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TrackOrderForm
                                onSearch={handleSearch}
                                isLoading={pageState === "loading"}
                                error={pageState === "not_found" ? error : null}
                            />
                        </motion.div>
                    )}
            </AnimatePresence>

            {/* Results area */}
            <div ref={resultsRef}>
                <AnimatePresence mode="wait">
                    {/* Loading skeleton */}
                    {pageState === "loading" && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <LoadingState />
                        </motion.div>
                    )}

                    {/* Not found empty state */}
                    {pageState === "not_found" && (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="pb-16"
                        >
                            <EmptyState onTryAgain={handleTrackAgain} />
                        </motion.div>
                    )}

                    {/* Order found! */}
                    {pageState === "found" && order && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
                        >
                            {/* Found banner */}
                            <motion.div
                                className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-2xl border border-emerald-500/20 shadow-[0_4px_16px_rgba(16,185,129,0.1)]"
                                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">
                                            Order Found — {order.orderNumber}
                                        </p>
                                        <p className="text-xs text-white/50 mt-0.5">
                                            Hello,{" "}
                                            <span className="font-semibold text-[#E9CC2F]">
                                                {order.customer.name}
                                            </span>
                                            ! Here&apos;s your order status.
                                        </p>
                                    </div>
                                </div>
                                <motion.button
                                    type="button"
                                    onClick={handleTrackAgain}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 text-sm font-semibold transition-all duration-200 border border-white/10 flex-shrink-0"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Search className="h-4 w-4" />
                                    Track Another Order
                                </motion.button>
                            </motion.div>

                            {/* Timeline — full width */}
                            <div className="mb-6">
                                <OrderTimeline status={order.status} />
                            </div>

                            {/* Two-column grid: Summary + Shipping */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                <OrderSummary order={order} />
                                <ShippingCard order={order} />
                            </div>

                            {/* Products — full width */}
                            <div className="mb-6">
                                <OrderProducts products={order.products} />
                            </div>

                            {/* Activity + Actions grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <OrderActivity activities={order.activity} />
                                <OrderActions order={order} onTrackAgain={handleTrackAgain} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom spacing */}
            {pageState === "idle" && (
                <div className="pb-20">
                    {/* How it works section */}
                    <motion.div
                        className="max-w-4xl mx-auto px-4 sm:px-6 mt-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white">
                                How Order Tracking Works
                            </h2>
                            <p className="text-white/50 mt-2 text-sm">
                                Simple, transparent, and always up-to-date.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[
                                {
                                    step: "01",
                                    title: "Enter Order ID",
                                    description:
                                        "Find your order number in the confirmation email we sent you.",
                                    icon: Mail,
                                },
                                {
                                    step: "02",
                                    title: "Verify Identity",
                                    description:
                                        "Provide the email or phone number used during checkout.",
                                    icon: Shield,
                                },
                                {
                                    step: "03",
                                    title: "Track Instantly",
                                    description:
                                        "See real-time status, courier details, and expected delivery date.",
                                    icon: Package,
                                },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.step}
                                    className="relative bg-[#1A1A1A]/80 backdrop-blur-sm rounded-2xl border border-white/8 p-6 text-center overflow-hidden hover:border-[#E9CC2F]/30 transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 1.2 + 0.15 * i }}
                                    whileHover={{
                                        y: -4,
                                        borderColor: "rgba(233,204,47,0.3)",
                                    }}
                                >
                                    {/* Step number */}
                                    <span className="absolute top-4 right-4 text-5xl font-black text-white/5 select-none leading-none">
                                        {item.step}
                                    </span>
                                    <div className="w-14 h-14 rounded-xl bg-[#E9CC2F]/10 flex items-center justify-center mx-auto mb-4 relative z-10 border border-[#E9CC2F]/20">
                                        <item.icon className="h-6 w-6 text-[#E9CC2F]" />
                                    </div>
                                    <h3 className="text-base font-bold text-white mb-2 relative z-10">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-white/50 leading-relaxed relative z-10">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* FAQ */}
                        <motion.div
                            className="mt-12 bg-[#1A1A1A]/80 backdrop-blur-sm rounded-2xl border border-white/8 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.7 }}
                        >
                            <div className="px-6 py-5 border-b border-white/8">
                                <h3 className="text-base font-bold text-white">
                                    Frequently Asked Questions
                                </h3>
                            </div>
                            <div className="divide-y divide-white/5">
                                {[
                                    {
                                        q: "Where can I find my order number?",
                                        a: "Your order number is in the confirmation email we sent after your purchase. It starts with 'OSC-' followed by digits.",
                                    },
                                    {
                                        q: "How long does delivery take?",
                                        a: "Standard delivery takes 5–10 business days. Express shipping takes 2–3 business days depending on your city.",
                                    },
                                    {
                                        q: "My tracking shows no updates. What should I do?",
                                        a: "Tracking updates may take up to 24 hours after shipment. If there are no updates for more than 48 hours, please contact our support team.",
                                    },
                                    {
                                        q: "Can I change my delivery address?",
                                        a: "You can change your delivery address before the order is packed. Once packed, we cannot modify the address. Please contact support immediately.",
                                    },
                                ].map((faq, i) => (
                                    <div key={i} className="px-6 py-5">
                                        <p className="text-sm font-bold text-white mb-1.5">
                                            {faq.q}
                                        </p>
                                        <p className="text-sm text-white/50 leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Support CTA */}
                        <motion.div
                            className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#1A1A1A] to-[#2d2d2d] border border-[#E9CC2F]/10 text-white text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 2 }}
                        >
                            <Headphones className="h-10 w-10 text-[#E9CC2F] mx-auto mb-3" />
                            <p className="text-lg font-bold mb-1">Still need help?</p>
                            <p className="text-sm text-white/50 mb-4">
                                Our customer support team is available 6 days a week, 9 AM – 6 PM.
                            </p>
                            <div className="flex flex-wrap gap-3 justify-center">
                                <a
                                    href="mailto:sales@onestopcar.net"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E9CC2F] hover:bg-[#d4b828] text-[#1A1A1A] font-bold text-sm transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    <Mail className="h-4 w-4" />
                                    Email Support
                                </a>
                                <a
                                    href="tel:+923000532034"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/10 transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    <Phone className="h-4 w-4" />
                                    Call Us
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}