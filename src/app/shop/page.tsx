'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { ChevronDown, Heart, Star } from 'lucide-react'
import {
  mockProducts,
  type Product,
} from "@/lib/mock/products";

import {
  mockCategories,
  carModels,
  priceRanges,
} from "@/lib/mock/categories";
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image'
import { useWishlistStore } from '@/store/wishlistStore';
import { Pagination } from '@/components/ui/pagination';

const PRODUCTS_PER_PAGE = 10;

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedModel, setSelectedModel] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const addToWishlist = useWishlistStore((state: any) => state.addItem);
  const removeFromWishlist = useWishlistStore((state: any) => state.removeItem);
  const checkWishlist = useWishlistStore((state: any) => state.isInWishlist);
  const addToCart = useCartStore((state: any) => state.addItem);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p: any) => p.category === selectedCategory)
    }

    if (selectedModel !== "all") {
      filtered = filtered.filter(
        (p) =>
          p.model.toLowerCase() ===
          carModels
            .find((m) => m.id === selectedModel)
            ?.name.toLowerCase()
      );
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((p: any) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Price range filter
    const range = priceRanges.find((r: any) => r.id === priceRange)
    if (range && priceRange !== 'all') {
      filtered = filtered.filter((p) => p.price >= range.min && p.price <= range.max)
    }

    // Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    return filtered
  }, [selectedCategory, selectedModel, searchTerm, priceRange, sortBy])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedModel, searchTerm, priceRange, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handleWishlist = (product: Product) => {
    if (checkWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        category: product.category,
        slug: product.slug,
      })
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        {/* Page Header */}
        <section className="relative bg-[#1A1A1A] text-white py-12 px-4 overflow-hidden">
          {/* Background image with overlay */}
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500&h=500&fit=crop"
              alt="one stop car"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/90 to-transparent" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
        linear-gradient(rgba(233,204,47,0.5) 1px, transparent 1px),
        linear-gradient(90deg, rgba(233,204,47,0.5) 1px, transparent 1px)
      `,
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative max-w-6xl mx-auto z-10">
            <div className="inline-flex items-center gap-2 mb-3 bg-[#E9CC2F]/15 px-4 py-1.5 rounded-full border border-[#E9CC2F]/20">
              <span className="text-[#E9CC2F] font-bold text-xs uppercase tracking-wide">
                Premium Collection
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Shop <span className="text-[#E9CC2F]">Accessories</span>
            </h1>
            <p className="text-white/60 text-sm max-w-xl">
              Explore our collection of premium car accessories for your vehicle
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div
              className="
                   overflow-y-auto
                   scrollbar-hide
                 "
            >
              <motion.div
                className={`${showFilters ? 'block' : 'hidden'
                  } lg:block w-full lg:w-64 flex-shrink-0`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-6 bg-gray-50 p-6 rounded-lg sticky top-24">
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
                      {mockCategories.map((cat: any) => (
                        <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            value={cat.id}
                            checked={selectedCategory === cat.id}
                            onChange={() => setSelectedCategory(cat.id)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">{cat.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* car model filter */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center justify-between">
                      Car Model
                      <ChevronDown size={16} />
                    </h3>

                    <div className="space-y-2">
                      {carModels.map((model) => (
                        <label
                          key={model.id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="model"
                            value={model.id}
                            checked={selectedModel === model.id}
                            onChange={() => setSelectedModel(model.id)}
                            className="w-4 h-4"
                          />

                          <span className="text-sm">{model.name}</span>
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
                      setSelectedCategory('all')
                      setSelectedModel('all')
                      setPriceRange('all')
                      setSearchTerm('')
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
                  <p className="text-sm text-muted-foreground">
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
                    {showFilters ? 'Hide' : 'Show'} Filters
                  </Button>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-border rounded-md bg-white text-sm"
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
                    {paginatedProducts.map((product, idx) => (
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
                            className={`absolute top-2 right-2 p-2 rounded-full transition-all ${checkWishlist(product.id)
                              ? 'bg-[#E9CC2F] text-white shadow-lg shadow-[#E9CC2F]/30'
                              : 'bg-white text-gray-600 hover:bg-gray-100 shadow-md'
                              }`}
                          >
                            <Heart
                              size={20}
                              fill={checkWishlist(product.id) ? 'currentColor' : 'none'}
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
                    ))}
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
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No products found</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory('all')
                      setSelectedModel('all')
                      setPriceRange('all')
                      setSearchTerm('')
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
  )
}