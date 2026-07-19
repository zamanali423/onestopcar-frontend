"use client";

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, Heart, Star, ArrowLeft, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockProducts, type Product } from '@/lib/mock/products';
import { carModels, priceRanges } from '@/lib/mock/categories';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { Pagination } from '@/components/ui/pagination';

// Define the brand info type
interface BrandInfo {
    name: string;
    years: string;
    products: number;
    color: string;
    image: string;
}

const PRODUCTS_PER_PAGE = 10;

export default function CarModels() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedModel, setSelectedModel] = useState('all');
    const [priceRange, setPriceRange] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const [showFilters, setShowFilters] = useState(false);
    const [brandInfo, setBrandInfo] = useState<BrandInfo | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const addToWishlist = useWishlistStore((state: any) => state.addItem);
    const removeFromWishlist = useWishlistStore((state: any) => state.removeItem);
    const checkWishlist = useWishlistStore((state: any) => state.isInWishlist);
    const addToCart = useCartStore((state: any) => state.addItem);

    // Set isMounted to true after component mounts
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Get brand info from slug
    useEffect(() => {
        const brand = carModels.find(
            (car) => car.name.toLowerCase().replace(/\s+/g, '-') === slug
        );
        if (brand) {
            setBrandInfo(brand);
            // Auto-select the model filter
            setSelectedModel(slug);
        } else {
            // If brand not found, redirect to shop
            router.push('/shop');
        }
    }, [slug, router]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let filtered = [...mockProducts];

        // Get brand name from slug
        const brand = carModels.find(
            (car) => car.name.toLowerCase().replace(/\s+/g, '-') === slug
        );

        // Filter by brand/model (case insensitive)
        if (brand) {
            // Check both model field AND brands array
            filtered = filtered.filter(
                (p) =>
                    p.model.toLowerCase() === brand.name.toLowerCase() ||
                    p.brands.some((b) => b.toLowerCase() === brand.name.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter((p: any) => p.category === selectedCategory);
        }

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter((p: any) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Price range filter
        const range = priceRanges.find((r: any) => r.id === priceRange);
        if (range && priceRange !== 'all') {
            filtered = filtered.filter((p) => p.price >= range.min && p.price <= range.max);
        }

        // Sorting
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }

        return filtered;
    }, [slug, selectedCategory, searchTerm, priceRange, sortBy]);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [slug, selectedCategory, searchTerm, priceRange, sortBy]);

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
        const endIndex = startIndex + PRODUCTS_PER_PAGE;
        return filteredProducts.slice(startIndex, endIndex);
    }, [filteredProducts, currentPage]);

    const handleWishlist = (product: Product) => {
        if (checkWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                category: product.category,
                slug: product.slug,
            });
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of products section
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Get unique categories from filtered products
    const availableCategories = useMemo(() => {
        const brand = carModels.find(
            (car) => car.name.toLowerCase().replace(/\s+/g, '-') === slug
        );

        if (!brand) return ['all'];

        const categories = new Set(
            mockProducts
                .filter(p =>
                    p.model.toLowerCase() === brand.name.toLowerCase() ||
                    p.brands.some((b) => b.toLowerCase() === brand.name.toLowerCase())
                )
                .map(p => p.category)
        );
        return ['all', ...Array.from(categories)];
    }, [slug]);

    // Check if a product is in wishlist (with hydration check)
    const checkWishlistStatus = (productId: string) => {
        if (!isMounted) return false;
        return checkWishlist(productId);
    };

    if (!brandInfo) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E9CC2F] mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <main className="flex-1">
                {/* Page Header */}
                <section className="relative bg-[#1A1A1A] text-white py-12 px-4 overflow-hidden">
                    {/* Background image with overlay */}
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src={brandInfo.image}
                            alt={brandInfo.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/90 to-transparent" />

                    <div className="relative max-w-6xl mx-auto">
                        <button
                            onClick={() => router.push('/shop')}
                            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
                        >
                            <ArrowLeft size={18} />
                            <span>Back to Shop</span>
                        </button>

                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                    {brandInfo.name}
                                </h1>
                                <p className="text-white/60 text-sm">
                                    {brandInfo.years} • {filteredProducts.length} accessories available
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs bg-[#E9CC2F] text-[#1A1A1A] px-3 py-1 rounded-full font-bold">
                                    {filteredProducts.length}+ Products
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <div className="overflow-y-auto scrollbar-hide">
                            <motion.div
                                className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm sticky top-24">
                                    {/* Search */}
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Search</label>
                                        <Input
                                            type="text"
                                            placeholder="Search products..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full"
                                        />
                                    </div>

                                    {/* Category Filter */}
                                    <div>
                                        <h3 className="font-semibold mb-3 flex items-center justify-between">
                                            Category
                                            <ChevronDown size={16} />
                                        </h3>
                                        <div className="space-y-2">
                                            {availableCategories.map((cat) => (
                                                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="category"
                                                        value={cat}
                                                        checked={selectedCategory === cat}
                                                        onChange={() => setSelectedCategory(cat)}
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm capitalize">{cat === 'all' ? 'All Categories' : cat}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price Range Filter */}
                                    <div>
                                        <h3 className="font-semibold mb-3 flex items-center justify-between">
                                            Price Range
                                            <ChevronDown size={16} />
                                        </h3>
                                        <div className="space-y-2">
                                            {priceRanges.map((range) => (
                                                <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="price"
                                                        value={range.id}
                                                        checked={priceRange === range.id}
                                                        onChange={() => setPriceRange(range.id)}
                                                        className="w-4 h-4"
                                                    />
                                                    <span className="text-sm">{range.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Clear Filters */}
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            setPriceRange('all');
                                            setSearchTerm('');
                                        }}
                                    >
                                        Clear Filters
                                    </Button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Products Section */}
                        <div className="flex-1" id="products-section">
                            {/* Top Bar */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-gray-500">
                                        Showing {paginatedProducts.length} of {filteredProducts.length} products
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="lg:hidden"
                                        onClick={() => setShowFilters(!showFilters)}
                                    >
                                        <Filter size={14} className="mr-2" />
                                        {showFilters ? 'Hide' : 'Show'} Filters
                                    </Button>

                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-3 py-2 border border-gray-200 rounded-md bg-white text-sm"
                                    >
                                        <option value="newest">Newest</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="rating">Best Rating</option>
                                    </select>
                                </div>
                            </div>

                            {/* Products Grid */}
                            {paginatedProducts.length > 0 ? (
                                <>
                                    <motion.div
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {paginatedProducts.map((product, idx) => {
                                            const isInWishlist = checkWishlistStatus(product.id);

                                            return (
                                                <motion.div
                                                    key={product.id}
                                                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden group"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                                                >
                                                    {/* Image Container */}
                                                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                        {product.badge && (
                                                            <span className="absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-md bg-[#E9CC2F] text-[#1A1A1A]">
                                                                {product.badge}
                                                            </span>
                                                        )}
                                                        <button
                                                            onClick={() => handleWishlist(product)}
                                                            className={`absolute top-2 right-2 p-2 rounded-full transition-all ${isInWishlist
                                                                    ? 'bg-[#E9CC2F] text-white shadow-lg shadow-[#E9CC2F]/30'
                                                                    : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
                                                                }`}
                                                        >
                                                            <Heart
                                                                size={20}
                                                                fill={isInWishlist ? 'currentColor' : 'none'}
                                                                className={isInWishlist ? 'scale-110' : ''}
                                                            />
                                                        </button>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-4">
                                                        <p className="text-sm text-gray-500 mb-1">{product.model}</p>
                                                        <h3 className="font-semibold line-clamp-2 mb-2">{product.name}</h3>

                                                        {/* Rating */}
                                                        <div className="flex items-center gap-1 mb-3">
                                                            <div className="flex gap-0.5">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        size={14}
                                                                        className={
                                                                            i < Math.floor(product.rating)
                                                                                ? 'fill-[#E9CC2F] text-[#E9CC2F]'
                                                                                : 'text-gray-300'
                                                                        }
                                                                    />
                                                                ))}
                                                            </div>
                                                            <span className="text-xs text-gray-500">
                                                                ({product.reviews})
                                                            </span>
                                                        </div>

                                                        {/* Price */}
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <p className="text-lg font-bold text-[#1A1A1A]">
                                                                Rs {product.price.toLocaleString()}
                                                            </p>
                                                            {product.originalPrice && (
                                                                <p className="text-sm text-gray-400 line-through">
                                                                    Rs {product.originalPrice.toLocaleString()}
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="space-y-2">
                                                            <Button
                                                                onClick={() =>
                                                                    addToCart({
                                                                        id: product.id,
                                                                        title: product.name,
                                                                        price: product.price,
                                                                        quantity: 1,
                                                                        image: product.image,
                                                                    })
                                                                }
                                                                className="w-full bg-[#1A1A1A] hover:bg-[#2d2d2d] text-white cursor-pointer"
                                                                size="sm"
                                                            >
                                                                Add to Cart
                                                            </Button>
                                                            <Link href={`/product-detail/${product.slug}`} className="block">
                                                                <Button variant="outline" className="w-full cursor-pointer" size="sm">
                                                                    View Details
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="mt-8 flex justify-center">
                                            <Pagination
                                                current={currentPage}
                                                total={totalPages}
                                                hrefBuilder={(page) => `#page-${page}`}
                                                onPageChange={handlePageChange}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                                    <p className="text-gray-500 mb-4">No products found for this brand</p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            setPriceRange('all');
                                            setSearchTerm('');
                                        }}
                                    >
                                        Clear Filters
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}