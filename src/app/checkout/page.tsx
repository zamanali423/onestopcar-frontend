"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import CheckoutHero from "@/components/checkout/CheckoutHero";
import CustomerInformation from "@/components/checkout/CustomerInformation";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import OrderNotes from "@/components/checkout/OrderNotes";
import OrderSummary from "@/components/checkout/OrderSummary";
import OrderSuccessModal from "@/components/checkout/OrderSuccessModal";
import EmptyCheckout from "@/components/checkout/EmptyCheckout";
import { useCartStore } from "@/store/cartStore";
import { generateOrderNumber, getEstimatedDelivery } from "@/lib/utils";
import { OrderDetails } from "@/types/checkout";
import { checkoutSchema, FormValues } from "@/lib/validations";


// ─── Page Component ────────────────────────────────────────────────────────────

export default function CheckoutPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

    const items = useCartStore(state => state.items);
    const getSubtotal = useCartStore(state => state.getSubtotal);
    const getTotal = useCartStore(state => state.getTotal);
    const couponCode = useCartStore(state => state.couponCode);
    const couponDiscount = useCartStore(state => state.couponDiscount);
    const clearCart = useCartStore(state => state.clearCart);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } = useForm<FormValues>({
        resolver: zodResolver(checkoutSchema) as any,
        defaultValues: {
            country: "Pakistan",
            province: "Punjab",
            city: "Lahore",
            altPhone: "",
            email: "",
            area: "",
            postalCode: "",
            landmark: "",
            orderNotes: "",
        },
    });

    const processOrder = useCallback(
        async (data: FormValues) => {
            setIsSubmitting(true);

            // Simulate API/processing delay
            await new Promise((r) => setTimeout(r, 2000));

            const order: OrderDetails = {
                orderNumber: generateOrderNumber(),
                items: items.map(item => ({
                    id: item.id,
                    name: item.title,
                    quantity: item.quantity,
                    price: item.price,
                    image: item.image ?? "/images/product-placeholder.png",
                })),
                subtotal: getSubtotal(),
                discount: couponDiscount,
                total: getTotal(),
                estimatedDelivery: getEstimatedDelivery(),
                customerName: `${data.firstName} ${data.lastName}`,
                phone: data.phone,
                address: data.address,
                city: data.city,
                province: data.province,
                couponCode: couponCode,
            };

            setOrderDetails(order);
            clearCart();
            setIsSubmitting(false);
            setSuccessModal(true);
        },
        [items, getSubtotal, getTotal, couponDiscount, couponCode, clearCart]
    );

    // Empty cart state
    if (items.length === 0 && !successModal) {
        return (
            <div className="min-h-screen bg-[#0f0f0f]">
                <EmptyCheckout />
            </div>
        );
    }

    // Cast register and watch to any to avoid deep generic mismatch with CheckoutFormData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const reg = register as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const watchFn = watch as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const errs = errors as any;

    return (
        <div className="min-h-screen bg-[#0f0f0f]">

            {/* Hero & Breadcrumb & Progress */}
            <CheckoutHero />

            {/* Main Content */}
            <main className="mx-auto max-w-[1400px] px-4 sm:px-6 pb-20">
                <form onSubmit={handleSubmit(processOrder)} noValidate>
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-6 xl:gap-10">

                        {/* ── Left Column ─────────────────────────────────── */}
                        <div className="space-y-5">
                            {/* Delivery Information */}
                            <CustomerInformation
                                register={reg}
                                errors={errs}
                                watch={watchFn}
                            />

                            {/* Order Notes */}
                            <OrderNotes register={reg} />

                            {/* Shipping Method */}
                            <ShippingMethod />

                            {/* Payment Method */}
                            <PaymentMethod />

                            {/* Mobile Place Order Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="lg:hidden"
                            >
                                <PlaceOrderButton isSubmitting={isSubmitting} />
                            </motion.div>
                        </div>

                        {/* ── Right Column (Sticky on Desktop) ────────────── */}
                        <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start space-y-5">
                            <OrderSummary
                                isSubmitting={isSubmitting}
                                onSubmit={handleSubmit(processOrder)}
                            />
                        </div>
                    </div>
                </form>
            </main>

            {/* Success Modal */}
            <OrderSuccessModal
                isOpen={successModal}
                onClose={() => setSuccessModal(false)}
                order={orderDetails}
            />
        </div>
    );
}

// ─── Mobile Place Order Button ────────────────────────────────────────────────

function PlaceOrderButton({ isSubmitting }: { isSubmitting: boolean }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#1A1A1A]/80 p-5">
            <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="relative w-full overflow-hidden rounded-xl bg-[#E9CC2F] px-6 py-4 text-base font-bold text-[#1A1A1A] shadow-[0_4px_20px_rgba(233,204,47,0.3)] hover:bg-[#B69E24] hover:shadow-[0_8px_30px_rgba(233,204,47,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
                {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Placing Order...
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
                        🔒 Place Order Securely
                    </span>
                )}
                {!isSubmitting && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                )}
            </motion.button>
            <p className="mt-2 text-center text-[11px] text-white/30">
                By placing your order, you agree to our Terms &amp; Privacy Policy
            </p>
        </div>
    );
}
