"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
// Fix: Import from the correct path
import { mockProducts, recommendedProducts, recentlyViewedProducts } from "@/lib/mock/products";
import { WishlistHero } from "@/components/wishlist/WishlistHero";
import { WishlistStats } from "@/components/wishlist/WishlistStats";
import { WishlistGrid } from "@/components/wishlist/WishlistGrid";
import { WishlistSummary } from "@/components/wishlist/WishlistSummary";
import { QuickPreviewModal } from "@/components/wishlist/QuickPreviewModal";
import { ShareWishlistModal } from "@/components/wishlist/ShareWishlistModal";
import { RecentlyViewed } from "@/components/wishlist/RecentlyViewed";
import { RecommendedProducts } from "@/components/wishlist/RecommendedProducts";
import { WhyShopWithUs } from "@/components/wishlist/WhyShopWithUs";
import { CustomerTrust } from "@/components/wishlist/CustomerTrust";
import type { Product } from "@/lib/mock/products";
import { Share2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { toast } from "@/lib/toast";

export default function WishlistPage() {
  const wishlistItems = useWishlistStore((s) => s.items);
  const wishlistProducts: Product[] = wishlistItems
    .map((item) =>
      mockProducts.find((product) => product.id === item.id)
    )
    .filter((product): product is Product => product !== undefined);
  const addToWishlist = useWishlistStore((s) => s.addItem);
  const addToCart = useCartStore((s) => s.addItem);

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [shareProduct, setShareProduct] = useState<Product | null>(null);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  // Simulate initial load
  useEffect(() => {
    setHasMounted(true);

    // Seed wishlist with mock products if empty (demo)
    const currentItems = useWishlistStore.getState().items;
    if (currentItems.length === 0) {
      // Only add first 3 products for demo to avoid overwhelming
      mockProducts.slice(0, 3).forEach((product) => {
        useWishlistStore.getState().addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          slug: product.slug,
        });
      });
    }

    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const handleShare = useCallback((product: Product) => {
    setShareProduct(product);
  }, []);

  const handleCompare = useCallback((product: Product) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        toast("Removed from comparison", "success");
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        toast("Max 3 products for comparison", "error");
        return prev;
      }
      toast(`${product.name} added to comparison`, "success");
      return [...prev, product];
    });
  }, []);

  const handleShareWishlist = useCallback(() => {
    const firstItem = wishlistItems[0];

    if (!firstItem) {
      toast("Your wishlist is empty", "error");
      setShareProduct(null); // Set to null instead of returning
      return;
    }

    const product = mockProducts.find((p) => p.id === firstItem.id) ?? null;
    setShareProduct(product);
  }, [wishlistItems]);

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen bg-[#111111]">

      <main>
        {/* Hero */}
        <WishlistHero />

        {/* Page content */}
        <div className="mx-auto max-w-screen-xl px-4 md:px-6 pb-12">

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <WishlistStats items={wishlistProducts} />
          </motion.div>

          {/* Top action bar */}
          {wishlistItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 flex flex-wrap items-center justify-between gap-3"
            >
              <p className="text-sm text-white/40">
                <span className="font-semibold text-white">{wishlistItems.length}</span>{" "}
                {wishlistItems.length === 1 ? "item" : "items"} saved
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShareWishlist}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 hover:text-white hover:border-white/20 transition-all"
                >
                  <Share2 className="h-4 w-4" />
                  Share Wishlist
                </button>
                <Link
                  href="/shop"
                  className="flex items-center gap-2 rounded-xl bg-[#E9CC2F]/10 border border-[#E9CC2F]/20 px-4 py-2 text-sm text-[#E9CC2F] hover:bg-[#E9CC2F]/15 transition-all"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          )}

          {/* Main layout: Grid (left) + Summary (right) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
            {/* Left: Product Grid */}
            <div className="min-w-0">
              <WishlistGrid
                items={wishlistProducts}
                isLoading={isLoading}
                onQuickView={handleQuickView}
                onShare={handleShare}
                onCompare={handleCompare}
              />
            </div>

            {/* Right: Sticky Summary */}
            {!isLoading && wishlistItems.length > 0 && (
              <div className="hidden lg:block">
                <WishlistSummary items={wishlistProducts} />
              </div>
            )}
          </div>

          {/* Mobile Summary */}
          {!isLoading && wishlistItems.length > 0 && (
            <div className="mt-6 lg:hidden">
              <WishlistSummary items={wishlistProducts} />
            </div>
          )}

          {/* Compare bar */}
          {compareList.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 rounded-2xl border border-[#E9CC2F]/20 bg-[#1a1a1a]/95 backdrop-blur-xl px-5 py-3 shadow-2xl"
            >
              <span className="text-xs text-white/50">Comparing:</span>
              {compareList.map((p) => (
                <span key={p.id} className="text-xs font-semibold text-white bg-white/10 rounded-lg px-2 py-1">
                  {p.name.split(" ").slice(0, 2).join(" ")}
                </span>
              ))}
              <button
                onClick={() => {
                  toast("Opening comparison view...", "success");
                  setCompareList([]);
                }}
                className="rounded-xl bg-[#E9CC2F] px-4 py-1.5 text-xs font-bold text-[#1A1A1A]"
              >
                Compare
              </button>
              <button
                onClick={() => setCompareList([])}
                className="text-xs text-white/30 hover:text-white"
              >
                ✕
              </button>
            </motion.div>
          )}

          {/* Recently Viewed */}
          <RecentlyViewed products={recentlyViewedProducts} />

          {/* Recommended Products */}
          <RecommendedProducts products={recommendedProducts} />

          {/* Why Shop With Us */}
          <WhyShopWithUs />

          {/* Customer Trust */}
          <CustomerTrust />
        </div>
      </main>

      {/* Modals */}
      <QuickPreviewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
      <ShareWishlistModal
        product={shareProduct}
        onClose={() => setShareProduct(null)}
      />
    </div>
  );
}