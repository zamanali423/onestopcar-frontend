"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Star, Eye, Heart, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { getNewArrivals, type Product } from "@/lib/mock/products";
import { useEffect, useState } from "react";


const badgeColors: Record<string, string> = {
  New: "bg-[#E9CC2F] text-[#1A1A1A]",
  Hot: "bg-red-500 text-white",
  Sale: "bg-green-500 text-white",
  Best: "bg-blue-500 text-white",
  Popular: "bg-purple-500 text-white",
};

export default function NewArrivals() {
  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state: any) => state.addItem);
  const removeFromWishlist = useWishlistStore((state: any) => state.removeItem);
  const checkWishlist = useWishlistStore((state: any) => state.isInWishlist);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const handleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Prevent navigation when clicking wishlist button
    e.stopPropagation(); // Stop event bubbling

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

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart button
    e.stopPropagation(); // Stop event bubbling

    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  useEffect(() => {
    const loadProducts = async () => {
      const response = await getNewArrivals();

      if (response.data) {
        setProducts(response.data);
      }

      setLoading(false);
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="text-center">
          Loading new arrivals...
        </div>
      </section>
    );
  }

  return (
    <section id="new-arrivals" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={18} className="text-[#E9CC2F]" />
              <span className="text-[#E9CC2F] font-bold text-sm uppercase tracking-widest">
                Fresh Stock
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A]">
              New{" "}
              <span className="text-[#E9CC2F]">Arrivals</span>
            </h2>
          </div>
          <Link href="/shop">
            <button className="btn-primary text-sm py-2.5 px-5">
              View All Products <Eye size={15} />
            </button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="product-card group"
            >
              <Link
                href={`/product-detail/${product.slug}`}
                className="block cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-square">
                  <Image
                    src={product.image || '/placeholder-image.png'}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src = '/placeholder-image.png';
                    }}
                  />
                  {/* Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-md ${badgeColors[product.badge]
                        }`}
                    >
                      {product.badge}
                    </div>
                  )}
                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <button
                      onClick={(e) => handleWishlist(e, product)}
                      className={`w-7 h-7 rounded-lg shadow flex items-center justify-center transition-all duration-300 ${checkWishlist(product.id)
                          ? "bg-[#E9CC2F] text-white"
                          : "bg-white text-gray-600 hover:bg-[#E9CC2F] hover:text-white"
                        }`}
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        size={13}
                        fill={checkWishlist(product.id) ? "currentColor" : "none"}
                        className="transition-all duration-300"
                      />
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-[9px] text-[#B69E24] font-bold uppercase tracking-wide mb-0.5">
                    {product.category}
                  </div>
                  <h3 className="text-xs font-bold text-[#1A1A1A] mb-1.5 leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={10} fill="#E9CC2F" className="text-[#E9CC2F]" />
                    <span className="text-[9px] font-bold text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-black text-[#1A1A1A]">
                        PKR {product.price.toLocaleString()}
                      </div>
                      {product.originalPrice && (
                        <div className="text-[9px] text-gray-400 line-through">
                          PKR {product.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-7 h-7 bg-[#E9CC2F] rounded-lg flex items-center justify-center hover:bg-[#B69E24] transition-colors"
                      aria-label="Add to cart"
                    >
                      <ShoppingCart size={13} className="text-[#1A1A1A]" />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}