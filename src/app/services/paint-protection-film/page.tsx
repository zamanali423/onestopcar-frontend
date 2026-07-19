'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight, CheckCircle2, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function PaintProtectionFilm() {
    const packages = [
        { id: 1, name: '1 TPH SILVER PACKAGE', price: 'Rs 65000' },
        { id: 2, name: '2 TPH GOLD PACKAGE', price: 'Rs 94000' },
        { id: 3, name: '3 TPH PLATINUM PACKAGE', price: 'Rs 126,500' },
        { id: 4, name: '4 TPU BRONZE PACKAGE', price: 'Rs 125,000' },
        { id: 5, name: '5 TPU SILVER PACKAGE', price: 'Rs 151,500' },
        { id: 6, name: '6 TPU GOLD PACKAGE', price: 'Rs 176,500' },
        { id: 7, name: '7 TPU PLATINUM PACKAGE', price: 'Rs 226,500' },
        { id: 8, name: '8 TPU DIAMOND PACKAGE', price: 'Rs 276,500' },
        { id: 9, name: '9 TPU WORLD CLASS PACKAGE', price: 'Rs 351,500' },
        { id: 10, name: '10 TPU SIGNATURE CLASS PACKAGE', price: 'Rs 451,500' },
    ]

    const benefits = [
        'Scratch Protection',
        'Stone Chip Resistance',
        'UV Protection',
        'Stain Prevention',
        'Preserving Original Paint',
    ]

    return (
        <div className="flex flex-col min-h-screen">

            <main className="flex-1">
                {/* Hero Section */}
                <motion.section
                    className="relative w-full h-96 md:h-[500px] bg-cover bg-center flex items-center justify-center overflow-hidden"
                    style={{
                        backgroundImage: 'url(/ppf-hero.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="relative z-10 text-white max-w-4xl mx-auto px-4 py-12">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                                    <Image src="/logo-main.jpeg" alt="One Stop Car" width={60} height={60} className="w-full h-full object-cover rounded-full" />
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold">PPF Scratch Protection</h1>
                            </div>

                            <p className="text-lg md:text-xl max-w-2xl">
                                By applying PPF, you can preserve the original paint underneath, maintaining the car&apos;s value for resale or trade-in.
                            </p>

                            <div className="space-y-2 pt-4">
                                {benefits.map((benefit, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="flex items-center gap-2"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 + idx * 0.1 }}
                                    >
                                        <span className="text-2xl">{idx + 1}.</span>
                                        <span className="text-lg font-semibold italic">{benefit}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Packages Section */}
                <section className="py-12 md:py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Package</h2>
                            <p className="text-muted-foreground text-lg">
                                Select the perfect PPF protection package for your vehicle
                            </p>
                        </motion.div>

                        {/* Packages Grid */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {/* Package List */}
                            <motion.div
                                className="bg-white rounded-lg shadow-lg p-8"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-2xl font-bold mb-6">Choose Your Package</h3>
                                <ul className="space-y-3">
                                    {packages.map((pkg) => (
                                        <motion.li
                                            key={pkg.id}
                                            className="flex items-start gap-3 text-sm"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                            viewport={{ once: true }}
                                        >
                                            <CheckCircle2
                                                size={20}
                                                className="text-primary flex-shrink-0 mt-0.5"
                                            />
                                            <div>
                                                <p className="font-semibold">{pkg.name}</p>
                                                <p className="text-primary font-bold">{pkg.price}</p>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Info Section */}
                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8">
                                    <h3 className="text-xl font-bold mb-4">Why Choose PPF?</h3>
                                    <ul className="space-y-3 text-sm">
                                        {benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-primary rounded-full" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white rounded-lg shadow-lg p-6">
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Our expert technicians will ensure your vehicle gets the best protection
                                        possible with premium quality materials.
                                    </p>
                                    <Button className="w-full bg-primary hover:bg-secondary text-primary-foreground gap-2" onClick={() => window.location.href = "tel:+923000532034"}>
                                        <Phone size={18} />
                                        Call Now
                                    </Button>
                                </div>
                            </motion.div>
                        </div>

                        {/* CTA Button */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Link href="/shop">
                                <Button size="lg" className="bg-primary hover:bg-secondary gap-2">
                                    Explore All Products
                                    <ChevronRight size={20} />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Featured Section */}
                <section className="py-12 md:py-20 px-4 bg-muted/20">
                    <div className="max-w-6xl mx-auto">
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            You may also like
                        </motion.h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((item) => (
                                <motion.div
                                    key={item}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: item * 0.1, duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="aspect-square bg-gray-200" />
                                    <div className="p-4">
                                        <p className="text-sm font-semibold mb-2">Product Name {item}</p>
                                        <p className="text-primary font-bold mb-3">Rs 5,000</p>
                                        <Button variant="outline" size="sm" className="w-full">
                                            View Details
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
